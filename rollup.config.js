import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import alias from "@rollup/plugin-alias";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

// CommonJS build
const cjs = {
    input: "./src/index.js",
    output: [
        {
            file: `./dist/ecsstree.cjs`,
            format: "cjs",
            exports: "auto",
            sourcemap: false,
        },
    ],
    plugins: [json(), externals(), commonjs({ sourceMap: false }), resolve({ preferBuiltins: false })],
};

// ECMAScript build
const esm = {
    input: "./src/index.js",
    output: [
        {
            file: `./dist/ecsstree.esm.js`,
            format: "esm",
            sourcemap: false,
        },
    ],
    plugins: [json(), externals(), commonjs({ sourceMap: false }), resolve({ preferBuiltins: false })],
};

const browserPlugins = [
    json(),
    commonjs({ sourceMap: false }),
    resolve({ preferBuiltins: false, browser: true }),
    alias({
        entries: [
            {
                find: "css-tree",
                replacement: "node_modules/css-tree/dist/csstree.esm.js",
            },
        ],
    }),
    getBabelOutputPlugin({
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: ["> 1%", "not dead"],
                },
            ],
        ],
        allowAllFormats: true,
    }),
    terser(),
];

// Browser-friendly UMD build
const umd = {
    input: "./src/index.js",
    output: [
        {
            file: `./dist/ecsstree.umd.min.js`,
            name: "ECSSTree",
            format: "umd",
            sourcemap: false,
        },
    ],
    plugins: browserPlugins,
};

// Browser-friendly IIFE build
const iife = {
    input: "./src/index.js",
    output: [
        {
            file: `./dist/ecsstree.iife.min.js`,
            name: "ECSSTree",
            format: "iife",
            sourcemap: false,
        },
    ],
    plugins: browserPlugins,
};

// Export build configs for Rollup
export default [cjs, esm, umd, iife];
