import { evalAnd, evalEq, evalNot, evalOr, evalStrictEq } from './nodes/boolean';
import { evalToNumber, evalToString } from './nodes/coerce';
import { evalFind } from './nodes/find';
import { evalLiteral } from './nodes/literal';
import { evalRead } from './nodes/read';
import { evalMul, evalSum, evalSumString } from './nodes/ops';
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
    case 'sumString':
      return evalSumString(node, context);
    case 'toNumber':
      return evalToNumber(node, context);
    case 'toString':
      return evalToString(node, context);
    case 'reduce':
      return evalReduce(node, context);
    case 'literal':
      return evalLiteral(node);
    case 'eq':
      return evalEq(node, context);
    case 'strictEq':
      return evalStrictEq(node, context);
    case 'and':
      return evalAnd(node, context);
    case 'or':
      return evalOr(node, context);
    case 'not':
      return evalNot(node, context);
    case 'find':
      return evalFind(node, context);
    default:
      throw new DslError(
        'UNKNOWN_NODE',
        `Unknown node type: ${(node as { type: string }).type}`
      );
  }
}
