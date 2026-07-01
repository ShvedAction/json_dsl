import type { LiteralNode } from '../types.js';

export function evalLiteral(node: LiteralNode): unknown {
  return node.value;
}
