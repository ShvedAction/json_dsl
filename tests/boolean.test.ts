import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evalNode } from '../src/eval';
import { DslError } from '../src/types';

describe('eq (==)', () => {
  it('eq uses loose equality like JS ==', () => {
    assert.equal(
      evalNode(
        {
          type: 'eq',
          left: { type: 'literal', value: 1 },
          right: { type: 'literal', value: '1' },
        },
        {}
      ),
      true
    );
  });

  it('eq returns false when loosely unequal', () => {
    assert.equal(
      evalNode(
        {
          type: 'eq',
          left: { type: 'read', path: ['item', 'some_property'] },
          right: { type: 'literal', value: 'some_string_value' },
        },
        { item: { some_property: 'other' } }
      ),
      false
    );
  });
});

describe('strictEq (===)', () => {
  it('strictEq uses strict equality like JS ===', () => {
    assert.equal(
      evalNode(
        {
          type: 'strictEq',
          left: { type: 'literal', value: 1 },
          right: { type: 'literal', value: '1' },
        },
        {}
      ),
      false
    );
    assert.equal(
      evalNode(
        {
          type: 'strictEq',
          left: { type: 'literal', value: 'a' },
          right: { type: 'literal', value: 'a' },
        },
        {}
      ),
      true
    );
  });
});

describe('and / or / not', () => {
  it('and combines two booleans', () => {
    assert.equal(
      evalNode(
        {
          type: 'and',
          op1: { type: 'literal', value: true },
          op2: { type: 'literal', value: false },
        },
        {}
      ),
      false
    );
    assert.equal(
      evalNode(
        {
          type: 'and',
          op1: { type: 'literal', value: true },
          op2: { type: 'literal', value: true },
        },
        {}
      ),
      true
    );
  });

  it('or combines two booleans', () => {
    assert.equal(
      evalNode(
        {
          type: 'or',
          op1: { type: 'literal', value: false },
          op2: { type: 'literal', value: true },
        },
        {}
      ),
      true
    );
  });

  it('not inverts boolean', () => {
    assert.equal(evalNode({ type: 'not', op: { type: 'literal', value: true } }, {}), false);
  });

  it('not throws INVALID_OPERAND for non-boolean', () => {
    assert.throws(
      () => evalNode({ type: 'not', op: { type: 'literal', value: 42 } }, {}),
      (err: unknown) => err instanceof DslError && err.code === 'INVALID_OPERAND'
    );
  });
});
