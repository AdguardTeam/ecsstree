const { parse } = require('@adguard/ecss-tree');
const { ok } = require('assert');

const node = parse('.foo { color: red; }');

ok(node);

console.log('Smoke test passed');
