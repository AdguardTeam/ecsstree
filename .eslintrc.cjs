const MAX_LINE_LENGTH = 120;
const TAB_WIDTH = 4;

module.exports = {
    root: true,
    env: { jest: true },
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: [
        'import',
        'import-newlines',
    ],
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:jsdoc/recommended',
    ],
    ignorePatterns: [
        'dist',
        'coverage',
        'examples',
    ],
    rules: {
        'max-len': [
            'error',
            {
                code: MAX_LINE_LENGTH,
                comments: MAX_LINE_LENGTH,
                tabWidth: TAB_WIDTH,
                ignoreUrls: true,
                ignoreTrailingComments: false,
                ignoreComments: false,
            },
        ],
        indent: [
            'error',
            TAB_WIDTH,
            {
                SwitchCase: 1,
            },
        ],

        'arrow-body-style': 'off',
        'no-await-in-loop': 'off',
        'no-continue': 'off',
        'no-new': 'off',
        'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],

        'import/prefer-default-export': 'off',
        'import-newlines/enforce': ['error', { items: 3, 'max-len': MAX_LINE_LENGTH }],
        // Split external and internal imports with an empty line
        'import/order': [
            'error',
            {
                groups: [
                    ['builtin', 'external'],
                ],
                'newlines-between': 'always',
            },
        ],

        'jsdoc/multiline-blocks': ['error', { noSingleLineBlocks: true }],
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/tag-lines': [
            'warn',
            'any',
            {
                startLines: 1,
            },
        ],
        'jsdoc/check-tag-names': [
            'warn',
            {
                // Define additional tags
                // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md#definedtags
                definedTags: ['note'],
            },
        ],
    },
};
