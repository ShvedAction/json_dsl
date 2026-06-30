import type { DslNode } from './types.js';

export function evalNode(_node: DslNode, _context: unknown): unknown {
  throw new Error('Not implemented');
}
