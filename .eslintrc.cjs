module.exports = {
    plugins: ["prettier", "import"],
    extends: ["airbnb-base", "prettier", "plugin:import/recommended"],
    env: {
        node: true,
        jest: true,
    },
    rules: {
        "prettier/prettier": "error",
        "max-len": [
            "error",
            {
                code: 120,
                comments: 120,
                tabWidth: 4,
                ignoreUrls: false,
                ignoreTrailingComments: false,
                ignoreComments: false,
            },
        ],
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "import/extensions": 0,
        "import/no-extraneous-dependencies": 0,
    },
};
