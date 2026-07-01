import { evalNode } from '../eval';
import { DslError, type MulNode, type SumNode, type SumStringNode } from '../types';

function asNumber(value: unknown, op: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new DslError('INVALID_OPERAND', `${op} expects a number`);
  }
  return value;
}

function asString(value: unknown, op: string): string {
  if (typeof value !== 'string') {
    throw new DslError('INVALID_OPERAND', `${op} expects a string`);
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

export function evalSumString(node: SumStringNode, context: unknown): string {
  const left = asString(evalNode(node.op1, context), 'sumString');
  const right = asString(evalNode(node.op2, context), 'sumString');
  return left + right;
}
