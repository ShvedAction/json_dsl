import type { DslNode } from '../types.js';

export function evalSum(_node: DslNode & { type: 'sum' }, _context: unknown): unknown {
  throw new Error('Not implemented');
}

export function evalMul(_node: DslNode & { type: 'mul' }, _context: unknown): unknown {
  throw new Error('Not implemented');
}
