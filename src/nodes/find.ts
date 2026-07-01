import { evalNode } from '../eval';
import { resolvePath } from '../path';
import { DslError, type DslNode, type FindNode } from '../types';

function predicateTruthy(result: unknown, predicateNode: DslNode): boolean {
  if (typeof result === 'boolean') {
    return result;
  }
  if (predicateNode.type === 'find') {
    return Boolean(result);
  }
  throw new DslError('INVALID_OPERAND', 'predicate must evaluate to boolean');
}

export function evalFind(node: FindNode, context: unknown): unknown {
  const collection = evalNode(node.collection, context);

  if (!Array.isArray(collection)) {
    throw new DslError('INVALID_OPERAND', 'find collection must be an array');
  }

  for (const element of collection) {
    const predResult = evalNode(node.predicate, { item: element });
    if (predicateTruthy(predResult, node.predicate)) {
      if (node.path) {
        return resolvePath(element, node.path);
      }
      return element;
    }
  }

  return undefined;
}
