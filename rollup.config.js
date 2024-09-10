import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
import dtsPlugin from 'rollup-plugin-dts';

const node = {
    input: './src/index.js',
    external: ['css-tree'],
    output: [
        {
            file: './dist/ecsstree.cjs',
            format: 'cjs',
            exports: 'auto',
            sourcemap: false,
        },
        {
            file: './dist/ecsstree.js',
            format: 'esm',
            sourcemap: false,
        },
    ],
    plugins: [
        json(),
        swc(),
        resolve({ preferBuiltins: false }),
    ],
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
                " * conflict with the actual CSSTree package. Our package is called '@adguard/ecss-tree',",
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
    node,
    dts,
];
