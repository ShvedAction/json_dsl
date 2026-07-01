import { evalNode } from '../eval.js';
import { DslError, type ToNumberNode, type ToStringNode } from '../types.js';

function asString(value: unknown, op: string): string {
  if (typeof value !== 'string') {
    throw new DslError('INVALID_OPERAND', `${op} expects a string operand`);
  }
  return value;
}

function asNumberOperand(value: unknown, op: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new DslError('INVALID_OPERAND', `${op} expects a number operand`);
  }
  return value;
}

export function evalToNumber(node: ToNumberNode, context: unknown): number {
  const value = asString(evalNode(node.op, context), 'toNumber');
  const num = Number(value);
  if (Number.isNaN(num)) {
    throw new DslError('INVALID_OPERAND', 'toNumber cannot parse string to number');
  }
  return num;
}

export function evalToString(node: ToStringNode, context: unknown): string {
  return String(asNumberOperand(evalNode(node.op, context), 'toString'));
}
