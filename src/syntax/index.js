/**
 * CSSTree syntax extension fork for "Adblock Extended CSS" syntax.
 *
 * ! DURING DEVELOPMENT, PLEASE DO NOT DIFFER FROM THE ORIGINAL CSSTREE API
 * ! IN ANY WAY!
 * ! OUR PRIMARY GOAL IS TO KEEP THE API AS CLOSE AS POSSIBLE TO THE ORIGINAL
 * ! CSSTREE API, SO CSSTREE EASILY CAN BE REPLACED WITH ECSSTREE EVERYWHERE
 * ! ANY TIME.
 *
 * This library supports various Extended CSS language elements from
 * - AdGuard,
 * - uBlock Origin and
 * - Adblock Plus.
 *
 * @see {@link https://github.com/AdguardTeam/ExtendedCss}
 * @see {@link https://github.com/gorhill/uBlock/wiki/Procedural-cosmetic-filters}
 * @see {@link https://help.adblockplus.org/hc/en-us/articles/360062733293#elemhide-emulation}
 */

import { tokenizeExtended } from '@adguard/css-tokenizer';
import { fork, tokenTypes } from '@eslint/css-tree';

const selector = {
    /**
     * CSSTree logic for parsing a selector from the token stream.
     * Via "this" we can access the parser's internal context, e.g.
     * methods, token stream, etc.
     *
     * Idea comes from CSSTree source code.
     *
     * @see {@link https://github.com/csstree/csstree/blob/master/lib/syntax/pseudo/index.js}
     *
     * @returns Doubly linked list which contains the parsed selector node.
     *
     * @throws If parsing not possible.
     */
    parse() {
        return this.createSingleNodeList(this.Selector());
    },
};

const selectorList = {
    /**
     * CSSTree logic for parsing a selector list from the token stream.
     * Via "this" we can access the parser's internal context, e.g.
     * methods, token stream, etc.
     *
     * Idea comes from CSSTree source code.
     *
     * @see {@link https://github.com/csstree/csstree/blob/master/lib/syntax/pseudo/index.js}
     *
     * @returns Doubly linked list which contains the parsed selector list node.
     *
     * @throws If parsing not possible.
     */
    parse() {
        return this.createSingleNodeList(this.SelectorList());
    },
};

const mediaQueryList = {
    /**
     * CSSTree logic for parsing a media query list from the token stream.
     * Via "this" we can access the parser's internal context, e.g.
     * methods, token stream, etc.
     *
     * Idea comes from CSSTree source code.
     *
     * @see {@link https://github.com/csstree/csstree/blob/master/lib/syntax/pseudo/index.js}
     *
     * @returns Doubly linked list which contains the parsed media query list node.
     *
     * @throws If parsing not possible.
     */
    parse() {
        return this.createSingleNodeList(this.MediaQueryList());
    },
};

const numberOrSelectorList = {
    /**
     * CSSTree logic for parsing a number or a selector list from the token
     * stream.
     * Via "this" we can access the parser's internal context, e.g.
     * methods, token stream, etc.
     *
     * Idea comes from CSSTree source code.
     *
     * @see {@link https://github.com/csstree/csstree/blob/master/lib/syntax/pseudo/index.js}
     *
     * @returns Doubly linked list which contains the parsed number or selector list node.
     *
     * @throws If parsing not possible.
     */
    parse() {
        // Save the current token index
        const startToken = this.tokenIndex;

        // Don't use "parseWithFallback" here, because we don't want to
        // throw parsing error, if just the number parsing fails.
        try {
            // Try to parse :upward()'s argument as a number, but if it fails,
            // that's not a problem, because we can try to parse it as a selector list.
            return this.createSingleNodeList(this.Number.call(this));
        } catch (error) {
            // If the number parsing fails, then we try to parse a selector list.
            // If the selector list parsing fails, then an error will be thrown,
            // because the argument is invalid.
            return this.createSingleNodeList(this.SelectorList.call(this, startToken));
        }
    },
};

const number = {
    /**
     * CSSTree logic for parsing a number from the token stream.
     * Via "this" we can access the parser's internal context, e.g.
     * methods, token stream, etc.
     *
     * Idea comes from CSSTree source code.
     *
     * @see {@link https://github.com/csstree/csstree/blob/master/lib/syntax/pseudo/index.js}
     *
     * @returns Doubly linked list which contains the parsed number node.
     *
     * @throws If parsing not possible.
     */
    parse() {
        return this.createSingleNodeList(this.Number());
    },
};

const style = {
    /**
     * ECSSTree logic for parsing uBO's style from the token stream.
     * Via "this" we can access the parser's internal context, e.g.
     * methods, token stream, etc.
     *
     * @returns Doubly linked list which contains the parsed declaration list node.
     *
     * @throws If parsing not possible.
     */
    parse() {
        // Throw an error if the current token is not a left parenthesis,
        // which means that the style is not specified at all.
        if (this.tokenType === tokenTypes.RightParenthesis) {
            this.error('No style specified');
        }

        // Prepare a doubly linked list for children
        const children = this.createList();

        // Get the current token's balance from the token stream. Balance pair map
        // lets us to determine when the current function ends.
        const balance = this.balance[this.tokenIndex];

        // In order to avoid infinite loop we also need to track the current token index
        while (this.balance[this.tokenIndex] === balance && this.tokenIndex < this.tokenCount) {
            switch (this.tokenType) {
                // Skip whitespaces, comments and semicolons, which are actually not needed
                // here
                case tokenTypes.WhiteSpace:
                case tokenTypes.Comment:
                case tokenTypes.Semicolon:
                    // Jump to the next token
                    this.next();
                    break;

                // At this point we can assume that we have a declaration, so it's time to parse it
                default:
                    children.push(
                        // Parse declaration with fallback to Raw node
                        // We need arrow function here, because we need to use the current parser
                        // context via "this" keyword, but regular functions will have their own
                        // context, that breaks the logic.

                        // eslint-disable-next-line arrow-body-style
                        this.parseWithFallback(this.Declaration, (startToken) => {
                            // Parse until the next semicolon (this handles if we have multiple declarations in
                            // the same style, so we not parse all of them as a single Raw rule because of this)
                            return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true);
                        }),
                    );
            }
        }

        // Create a DeclarationList node and pass the children to it
        // You can find the structure of the node in the CSSTree documentation:
        // https://github.com/csstree/csstree/blob/master/docs/ast.md#declarationlist
        const declarationList = {
            type: 'DeclarationList',
            // CSSTree will handle position calculation for us
            loc: this.getLocationFromList(children),
            children,
        };

        // Return the previously created CSSTree-compatible node
        return this.createSingleNodeList(declarationList);
    },
};

/**
 * Extended CSS syntax via CSSTree fork API. Thanks for the idea to `@lahmatiy`!
 *
 * @see {@link https://github.com/csstree/csstree/issues/211#issuecomment-1349732115}
 * @see {@link https://github.com/csstree/csstree/blob/master/lib/syntax/create.js}
 */
const extendedCssSyntax = fork({
    tokenize: tokenizeExtended,
    pseudo: {
        '-abp-has': selectorList,
        'if-not': selector,
        'matches-media': mediaQueryList,
        'min-text-length': number,
        'nth-ancestor': number,
        style,
        upward: numberOrSelectorList,
    },
});

export default extendedCssSyntax;
