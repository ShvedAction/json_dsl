import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evalNode } from '../src/eval';
import { dslInterpreter } from '../src/index';
import { DslError } from '../src/types';

describe('toNumber', () => {
  it('converts numeric string to number', () => {
    assert.equal(evalNode({ type: 'toNumber', op: { type: 'literal', value: '42' } }, {}), 42);
    assert.equal(evalNode({ type: 'toNumber', op: { type: 'literal', value: '3.14' } }, {}), 3.14);
  });

  it('converts empty string to 0', () => {
    assert.equal(evalNode({ type: 'toNumber', op: { type: 'literal', value: '' } }, {}), 0);
  });

  it('throws for non-string input', () => {
    assert.throws(
      () => evalNode({ type: 'toNumber', op: { type: 'literal', value: 1 } }, {}),
      (err: unknown) => err instanceof DslError && err.code === 'INVALID_OPERAND'
    );
  });

  it('throws for NaN result', () => {
    assert.throws(
      () => evalNode({ type: 'toNumber', op: { type: 'literal', value: 'abc' } }, {}),
      (err: unknown) => err instanceof DslError && err.code === 'INVALID_OPERAND'
    );
  });
});

describe('toString', () => {
  it('converts number to string', () => {
    assert.equal(evalNode({ type: 'toString', op: { type: 'literal', value: 42 } }, {}), '42');
    assert.equal(evalNode({ type: 'toString', op: { type: 'literal', value: 0 } }, {}), '0');
  });

  it('throws for non-number input', () => {
    assert.throws(
      () => evalNode({ type: 'toString', op: { type: 'literal', value: 'x' } }, {}),
      (err: unknown) => err instanceof DslError && err.code === 'INVALID_OPERAND'
    );
  });
});

describe('coercion chains', () => {
  it('toNumber then sum', () => {
    const result = evalNode(
      {
        type: 'sum',
        op1: { type: 'toNumber', op: { type: 'literal', value: '10' } },
        op2: { type: 'literal', value: 5 },
      },
      {}
    );
    assert.equal(result, 15);
  });

  it('toString then sumString', () => {
    const result = evalNode(
      {
        type: 'sumString',
        op1: { type: 'toString', op: { type: 'literal', value: 42 } },
        op2: { type: 'literal', value: '!' },
      },
      {}
    );
    assert.equal(result, '42!');
  });

  it('works in dslInterpreter', () => {
    const result = dslInterpreter(
      { qty: '3' },
      {
        version: '1.0',
        computations: [
          {
            type: 'mul',
            op1: { type: 'toNumber', op: { type: 'read', path: ['qty'] } },
            op2: { type: 'literal', value: 10 },
            id: 'total',
          },
        ],
      }
    );
    assert.deepEqual(result, [{ id: 'total', value: 30 }]);
  });
});
