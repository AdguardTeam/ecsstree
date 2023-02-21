import syntax from './syntax/index';

// Fork API doesn't export everything, so we need to export the rest of
// the API manually. See the original source code:
// https://github.com/csstree/csstree/blob/master/lib/index.js

export { default as version } from './version';

export {
    createSyntax,
    List,
    Lexer,
    tokenTypes,
    tokenNames,
    TokenStream,
    definitionSyntax,
    clone,
    ident,
    string,
    url,
} from 'css-tree';

// Export the forked syntax (comes from the Fork API)
export const {
    tokenize,
    parse,
    generate,
    lexer,
    createLexer,

    walk,
    find,
    findLast,
    findAll,

    toPlainObject,
    fromPlainObject,

    fork,
} = syntax;
