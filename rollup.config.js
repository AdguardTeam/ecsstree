import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import externals from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import dtsPlugin from 'rollup-plugin-dts';

const commonPlugins = [
    json(),
    commonjs({ sourceMap: false }),
];

// CommonJS build
const cjs = {
    input: './src/index.js',
    output: [
        {
            file: './dist/ecsstree.cjs',
            format: 'cjs',
            exports: 'auto',
            sourcemap: false,
        },
    ],
    plugins: [
        ...commonPlugins,
        externals(),
        resolve({ preferBuiltins: false }),
    ],
};

// ECMAScript build
const esm = {
    input: './src/index.js',
    output: [
        {
            file: './dist/ecsstree.esm.js',
            format: 'esm',
            sourcemap: false,
        },
    ],
    plugins: [
        ...commonPlugins,
        externals(),
        resolve({ preferBuiltins: false }),
    ],
};

const browserPlugins = [
    ...commonPlugins,
    resolve({
        preferBuiltins: false,
        browser: true,
    }),
    alias({
        entries: [
            {
                find: 'css-tree',
                replacement: 'node_modules/css-tree/dist/csstree.esm.js',
            },
        ],
    }),
    getBabelOutputPlugin({
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: ['> 1%', 'not dead'],
                },
            ],
        ],
        allowAllFormats: true,
    }),
    terser(),
];

// Browser-friendly UMD build
const umd = {
    input: './src/index.js',
    output: [
        {
            file: './dist/ecsstree.umd.min.js',
            name: 'ECSSTree',
            format: 'umd',
            sourcemap: false,
        },
    ],
    plugins: browserPlugins,
};

// Browser-friendly IIFE build
const iife = {
    input: './src/index.js',
    output: [
        {
            file: './dist/ecsstree.iife.min.js',
            name: 'ECSSTree',
            format: 'iife',
            sourcemap: false,
        },
    ],
    plugins: browserPlugins,
};

// Automatically export type definitions from @types/css-tree
const dts = {
    input: './ecsstree.d.ts',
    output: [
        {
            file: 'dist/ecsstree.d.ts',
            format: 'es',
            // Add a banner to the top of the file
            // Note: don't add it directly to the file, because it will be moved
            // to the end of the file by Rollup, since it handles the imported
            // module first
            banner: [
                '/*',
                ' * Automatically exported CSSTree type definitions. Since ECSSTree uses',
                ' * the exact same API as CSSTree, we can use the same type definitions.',
                ' *',
                " * However, we can't use the @types/css-tree directly, because of a naming",
                " * conflict with the actual CSSTree package. Our package is called 'ecss-tree',",
                " * but the type definitions are written for 'css-tree'. Therefore, we need to",
                ' * export type definitions from @types/css-tree to this file at build time.',
                ' *',
                ' * Source: https://www.npmjs.com/package/@types/css-tree',
                ' */',
                ' ',
            ].join('\n'),
        },
    ],
    plugins: [
        dtsPlugin({
            // By default, this plugin excludes all external dependencies from the
            // type definitions. We want to include them, so we set this option to
            // true
            respectExternal: true,
        }),
    ],
};

// Export build configs for Rollup
export default [
    cjs,
    esm,
    umd,
    iife,
    dts,
];
