import { resolvePath } from '../path';
import type { ReadNode } from '../types';

export function evalRead(node: ReadNode, context: unknown): unknown {
  return resolvePath(context, node.path);
}
