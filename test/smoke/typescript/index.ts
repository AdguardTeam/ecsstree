import { parse } from '@adguard/ecss-tree';
import { ok } from 'assert';

const node = parse('.foo { color: red; }');

ok(node);

console.log('Smoke test passed');
