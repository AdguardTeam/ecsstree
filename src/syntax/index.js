/**
 * CSSTree syntax fork for "Adblock Extended CSS" syntax.
 *
 * This library supports various CSS extensions from AdGuard and uBlock Origin.
 *
 * @see {@link https://github.com/AdguardTeam/ExtendedCss}
 * @see {@link https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters}
 */

import { fork, tokenize, tokenTypes } from "css-tree";
import { CLOSING_PARENTHESIS, DOUBLE_QUOTE, ESCAPE, OPENING_PARENTHESIS, SPACE } from "../utils/constants.js";

const CONTAINS_PSEUDO_CLASSES = ["contains(", "-abp-contains(", "has-text("];

const selector = {
    parse() {
        return this.createSingleNodeList(this.Selector());
    },
};

const selectorList = {
    parse() {
        return this.createSingleNodeList(this.SelectorList());
    },
};

const mediaQueryList = {
    parse() {
        return this.createSingleNodeList(this.MediaQueryList());
    },
};

const numberOrSelector = {
    parse() {
        return this.createSingleNodeList(this.parseWithFallback(this.Number, this.Selector));
    },
};

const number = {
    parse() {
        return this.createSingleNodeList(this.Number());
    },
};

const style = {
    parse() {
        // Empty style
        if (this.tokenType === tokenTypes.RightParenthesis) {
            this.error("No style specified");
        }

        // Create a list for children
        const children = this.createList();

        // Get the current token's balance from the token stream. Balance pair map allows
        // to determinate when the current function ends.
        const balance = this.balance[this.tokenIndex];

        // In order to avoid infinite loop we also need to track the current token index
        while (this.balance[this.tokenIndex] === balance && this.tokenIndex < this.tokenCount) {
            switch (this.tokenType) {
                // Skip whitespaces, comments and semicolons
                case tokenTypes.WhiteSpace:
                case tokenTypes.Comment:
                case tokenTypes.Semicolon:
                    this.next();
                    break;

                // At this point we can assume that we have a declaration
                default:
                    children.push(
                        // Parse declaration with fallback to Raw node
                        this.parseWithFallback(this.Declaration, (startToken) => {
                            // Parse until the next semicolon (this handles if we have multiple declarations in the
                            // same style, so we not parse all of them as a single Raw rule because of this)
                            return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true);
                        })
                    );
            }
        }

        // Create a DeclarationList node
        const declarationList = {
            type: "DeclarationList",
            loc: this.getLocationFromList(children),
            children,
        };

        return this.createSingleNodeList(declarationList);
    },
};

const extCssContains = {
    /**
     * Adblock Extended CSS allows using contains() without quote marks, so the tokenization maybe
     * turns wrong at this point.
     *
     * Here is an example why and how it can happen. Let's assume that the input is
     * ```css
     * :contains(aaa'bbb)
     * ```
     *
     * The tokenizer will tokenize it as
     *  :               colon-token
     *  contains(       function-token
     *  aaa             ident-token
     *  'bbb)           string-token
     *
     * So, at quote mark (') tokenizer will think that a string is starting, and it tokenizes
     * the rest of the input as a string. This is the normal behavior for the tokenizer, but
     * it is wrong for us, since the parser will fail with an ")" is expected error, because
     * it cannot find the closing balance pair for the opening parenthesis. So, we need to
     * fix the token stream here to avoid this error.
     */
    parse() {
        // Get the current token stream
        const tokens = this.dump();

        // Note: CSSTree removes the whitespace token after the function name before calling this function
        // So if we have :contains(  something), our tokenIndex here points to "something" and not to the
        // whitespace token.

        // :contains() case, but not :contains( something) case, so we check if the previous token is not a whitespace
        if (this.tokenType === tokenTypes.RightParenthesis && tokens[this.tokenIndex - 1].type !== "whitespace-token") {
            this.error("Empty parameter specified");
        }

        // Find the "real" start position of the contains() function's argument
        let startPosition = -1;

        // Save the current position within the token stream (we will need to restore it later)
        let prevTokenIndex = this.tokenIndex;

        for (let i = this.tokenIndex; i >= 0; i--) {
            // Check token name to avoid :contains(join('')) case, where join( is also a function token
            if (tokens[i].type === "function-token" && CONTAINS_PSEUDO_CLASSES.includes(tokens[i].chunk)) {
                // Token after the function name is the first token of the argument
                startPosition = this.getTokenStart(i + 1);
                prevTokenIndex = i + 1;
                break;
            }
        }

        // Theoretically, this should never happen, but we check it anyway
        if (startPosition === -1) {
            this.error("Cannot find the start position of the contains() function's argument");
        }

        // Create a list for children
        const children = this.createList();

        // Find the real end index of the contains() function's argument
        const sourceCode = this.source;

        let endPosition = -1;

        // Parenthesis balance
        let balance = 0;

        // Contains can contain any character, such as parentheses, quotes, etc,
        // so a bit tricky to find the end position of the pseudo-class
        for (let i = startPosition; i < sourceCode.length; i++) {
            const char = sourceCode[i];

            if (char === OPENING_PARENTHESIS && sourceCode[i - 1] !== ESCAPE) {
                balance++;
            } else if (char === CLOSING_PARENTHESIS && sourceCode[i - 1] !== ESCAPE) {
                balance--;

                if (balance === -1) {
                    endPosition = i;
                    break;
                }
            }
        }

        // If we cannot find the closing parenthesis, we cannot fix the token stream, so we
        // just return the children list as is. In this case, the parser will fail with an
        // error (which is correct behavior).
        if (endPosition === -1) {
            return children;
        }

        // Empty parameter
        if (endPosition === startPosition) {
            this.error('No parameter specified for "contains()" pseudo-class');
        }

        // Push content to children list
        children.push({
            type: "Raw",
            // Give positions, if enabled (CSSTree will handle it)
            loc: this.getLocation(startPosition, endPosition),
            value: sourceCode.substring(startPosition, endPosition),
        });

        // Create a new source code, where fill the contains() function's argument with whitespaces,
        // but keep the length of the source code the same. This will fix the token stream, so the
        // parser will not fail with an error, and positions remain the same.
        const newSourceCode =
            sourceCode.substring(0, startPosition) +
            new Array(endPosition - startPosition + 1).join(SPACE) +
            sourceCode.substring(endPosition);

        // Modify the parsed source code. This will reset the token stream, so we need to restore
        // the position within the token stream later.
        // Theoretically this "trick" doesn't cause problems, because we parsed the argument of the
        // contains() function as a Raw node, so we don't need to parse it again, but the parser will
        // continue its work from the correct position.
        this.setSource(newSourceCode, tokenize);

        // Restore the position within the token stream.
        while (this.tokenIndex < prevTokenIndex) {
            this.next();
        }

        // CSSTree will skip insterted whitespaces

        // Return the children list which contains the contains() function's argument as a Raw node
        return children;
    },
};

const xpath = {
    parse() {
        // Empty pseudo-class
        if (this.tokenType === tokenTypes.RightParenthesis) {
            this.error('No parameter specified for "xpath()" pseudo-class');
        }

        // Create a list for children
        const children = this.createList();

        // Save the current position within the token stream (we will need to restore it later)
        const prevTokenIndex = this.tokenIndex;

        // Find the real end index of the xpath() function's argument
        const sourceCode = this.source;

        const startPosition = this.getTokenStart(this.tokenIndex);

        // Find the end of the xpath() function's argument. It is a quite complex task, because
        // the argument can contain any characters, including parentheses, quotes, etc.
        // We will use a simple heuristic: checking parentheses balance. Maybe not the best
        // solution, but it works in most cases.
        let endPosition = -1;

        // Parentheses balance
        let balance = 0;

        // Whether we are inside a string
        let inString = false;

        // Iterate over the corresponding part of the source code
        for (let i = startPosition; i < sourceCode.length; i++) {
            if (sourceCode[i] == DOUBLE_QUOTE && sourceCode[i - 1] != ESCAPE) {
                inString = !inString;
            }

            // If we are inside a string, we don't care about parentheses
            if (inString) {
                continue;
            }

            // Check parentheses balance
            if (sourceCode[i] == OPENING_PARENTHESIS) {
                balance++;
            } else if (sourceCode[i] == CLOSING_PARENTHESIS) {
                balance--;

                // If the parentheses balance is -1, it means that we have found the closing,
                // because this closing breaks the parentheses balance, which means it is not
                // belongs to the xpath expression.
                if (balance === -1) {
                    endPosition = i;
                    break;
                }
            }
        }

        // If we cannot find the closing parenthesis, we cannot fix the token stream, so we
        // just return the children list as is. In this case, the parser will fail with an
        // error (which is correct behavior).
        if (endPosition === -1) {
            return children;
        }

        // Push content to children list
        children.push({
            type: "Raw",
            loc: this.getLocation(startPosition, endPosition),
            value: sourceCode.substring(startPosition, endPosition),
        });

        // Create a new source code, where fill the xpath() function's argument with whitespace,
        // but keep the length of the source code the same. This will fix the token stream, so the
        // parser will not fail with an error, and positions remain consistent.
        const newSourceCode =
            sourceCode.substring(0, startPosition) +
            new Array(endPosition - startPosition + 1).join(SPACE) +
            sourceCode.substring(endPosition);

        // Modify the parsed source code. This will reset the token stream, so we need to restore
        // the position within the token stream later.
        // Theoretically this "trick" doesn't cause problems, because we parsed the argument of the
        // xpath() function as a Raw node, so we don't need to parse it again, but the parser will
        // continue its work from the correct position.
        this.setSource(newSourceCode, tokenize);

        // Restore the position within the token stream.
        while (this.tokenIndex < prevTokenIndex) {
            this.next();
        }

        // CSSTree will skip insterted whitespaces

        // Return the children list which contains the xpath() function's argument as a Raw node
        return children;
    },
};

/**
 * Extended CSS syntax for css-tree (forked from css-tree)
 */
const extendedCssSyntax = fork({
    pseudo: {
        "-abp-has": selectorList,
        "if-not": selector,
        upward: numberOrSelector,
        "nth-ancestor": number,
        "min-text-length": number,
        "matches-media": mediaQueryList,
        style: style,
        contains: extCssContains,
        "has-text": extCssContains,
        "-abp-contains": extCssContains,
        xpath: xpath,
    },
});

export default extendedCssSyntax;
