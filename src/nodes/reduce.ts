import type { DslNode } from '../types.js';

export function evalReduce(_node: DslNode & { type: 'reduce' }, _context: unknown): unknown {
  throw new Error('Not implemented');
}
