import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evalNode } from '../src/eval';
import { dslInterpreter } from '../src/index';
import { DslError } from '../src/types';

describe('sumString', () => {
  it('concatenates two strings', () => {
    const result = evalNode(
      {
        type: 'sumString',
        op1: { type: 'literal', value: 'hello' },
        op2: { type: 'literal', value: ' world' },
      },
      {}
    );
    assert.equal(result, 'hello world');
  });

  it('reads operands from context', () => {
    const result = evalNode(
      {
        type: 'sumString',
        op1: { type: 'read', path: ['prefix'] },
        op2: { type: 'read', path: ['suffix'] },
      },
      { prefix: 'foo', suffix: 'bar' }
    );
    assert.equal(result, 'foobar');
  });

  it('throws INVALID_OPERAND for non-string operand', () => {
    assert.throws(
      () =>
        evalNode(
          {
            type: 'sumString',
            op1: { type: 'literal', value: 1 },
            op2: { type: 'literal', value: 'b' },
          },
          {}
        ),
      (err: unknown) => err instanceof DslError && err.code === 'INVALID_OPERAND'
    );
  });

  it('works in dslInterpreter computation', () => {
    const result = dslInterpreter(
      { suffix: '!' },
      {
        version: '1.0',
        computations: [
          {
            type: 'sumString',
            op1: { type: 'literal', value: 'hi' },
            op2: { type: 'read', path: ['suffix'] },
            id: 'greeting',
          },
        ],
      }
    );
    assert.deepEqual(result, [{ id: 'greeting', value: 'hi!' }]);
  });
});
