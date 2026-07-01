import { evalNode } from '../eval';
import { DslError, type MulNode, type SumNode } from '../types';

function asNumber(value: unknown, op: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new DslError('INVALID_OPERAND', `${op} expects a number`);
  }
  return value;
}

export function evalSum(node: SumNode, context: unknown): number {
  const left = asNumber(evalNode(node.op1, context), 'sum');
  const right = asNumber(evalNode(node.op2, context), 'sum');
  return left + right;
}

export function evalMul(node: MulNode, context: unknown): number {
  const left = asNumber(evalNode(node.op1, context), 'mul');
  const right = asNumber(evalNode(node.op2, context), 'mul');
  return left * right;
}
