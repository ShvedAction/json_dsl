import type { LiteralNode } from '../types';

export function evalLiteral(node: LiteralNode): unknown {
  return node.value;
}
