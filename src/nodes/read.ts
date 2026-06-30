import type { DslNode } from '../types.js';

export function evalRead(_node: DslNode & { type: 'read' }, _context: unknown): unknown {
  throw new Error('Not implemented');
}
