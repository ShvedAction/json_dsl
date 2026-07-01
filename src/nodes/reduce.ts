import { evalNode } from '../eval';
import { DslError, type ReduceNode } from '../types';

function asNumber(value: unknown): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new DslError('INVALID_OPERAND', 'reduce aggregator must return a number');
  }
  return value;
}

export function evalReduce(node: ReduceNode, context: unknown): number {
  const collection = evalNode(node.collection, context);

  if (!Array.isArray(collection)) {
    throw new DslError('INVALID_OPERAND', 'reduce collection must be an array');
  }

  let accumulator = 0;

  for (const item of collection) {
    accumulator = asNumber(evalNode(node.aggregator, { accumulator, item }));
  }

  return accumulator;
}
