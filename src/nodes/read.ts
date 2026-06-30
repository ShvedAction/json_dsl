import { resolvePath } from '../path.js';
import type { ReadNode } from '../types.js';

export function evalRead(node: ReadNode, context: unknown): unknown {
  return resolvePath(context, node.path);
}
