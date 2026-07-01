import { evalRead } from './nodes/read';
import { evalMul, evalSum } from './nodes/ops';
import { evalReduce } from './nodes/reduce';
import { DslError, type DslNode } from './types';

export function evalNode(node: DslNode, context: unknown): unknown {
  switch (node.type) {
    case 'read':
      return evalRead(node, context);
    case 'sum':
      return evalSum(node, context);
    case 'mul':
      return evalMul(node, context);
    case 'reduce':
      return evalReduce(node, context);
    default:
      throw new DslError(
        'UNKNOWN_NODE',
        `Unknown node type: ${(node as { type: string }).type}`
      );
  }
}
