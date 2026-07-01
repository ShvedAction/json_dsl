import { evalNode } from '../eval';
import { DslError, type AndNode, type EqNode, type NotNode, type OrNode, type StrictEqNode } from '../types';

function asBoolean(value: unknown, op: string): boolean {
  if (typeof value !== 'boolean') {
    throw new DslError('INVALID_OPERAND', `${op} expects a boolean`);
  }
  return value;
}

export function evalEq(node: EqNode, context: unknown): boolean {
  const left = evalNode(node.left, context);
  const right = evalNode(node.right, context);
  // Intentional loose equality per spec (JS ==)
  return left == right;
}

export function evalStrictEq(node: StrictEqNode, context: unknown): boolean {
  return evalNode(node.left, context) === evalNode(node.right, context);
}

export function evalAnd(node: AndNode, context: unknown): boolean {
  return asBoolean(evalNode(node.op1, context), 'and') && asBoolean(evalNode(node.op2, context), 'and');
}

export function evalOr(node: OrNode, context: unknown): boolean {
  return asBoolean(evalNode(node.op1, context), 'or') || asBoolean(evalNode(node.op2, context), 'or');
}

export function evalNot(node: NotNode, context: unknown): boolean {
  return !asBoolean(evalNode(node.op, context), 'not');
}
