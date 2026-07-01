import { evalAnd, evalEq, evalNot, evalOr, evalStrictEq } from './nodes/boolean.js';
import { evalToNumber, evalToString } from './nodes/coerce.js';
import { evalFind } from './nodes/find.js';
import { evalLiteral } from './nodes/literal.js';
import { evalRead } from './nodes/read.js';
import { evalMul, evalSum, evalSumString } from './nodes/ops.js';
import { evalReduce } from './nodes/reduce.js';
import { DslError, type DslNode } from './types.js';

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
