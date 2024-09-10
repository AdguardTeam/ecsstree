/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    testEnvironment: 'node',
    testTimeout: 30000,
    testMatch: ['**/test/**/*.test.js'],
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
};
