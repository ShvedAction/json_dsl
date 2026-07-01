import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evalNode } from '../src/eval';
import { DslError } from '../src/types';
import fixture from './fixtures/nested-find.json' with { type: 'json' };

const nestedFindPredicate = {
  type: 'find' as const,
  collection: { type: 'read' as const, path: ['item', 'nested_collection'] },
  predicate: {
    type: 'eq' as const,
    left: { type: 'read' as const, path: ['item', 'some_property'] },
    right: { type: 'literal' as const, value: 'some_string_value' },
  },
};

describe('find', () => {
  it('find returns whole matching item', () => {
    const result = evalNode(
      {
        type: 'find',
        collection: { type: 'read', path: ['equipment'] },
        predicate: {
          type: 'strictEq',
          left: { type: 'read', path: ['item', 'name'] },
          right: { type: 'literal', value: 'router' },
        },
      },
      fixture.source
    );

    assert.equal((result as { name?: string }).name, 'router');
  });

  it('nested find as predicate matches parent item', () => {
    const result = evalNode(
      {
        type: 'find',
        collection: { type: 'read', path: ['equipment'] },
        predicate: nestedFindPredicate,
      },
      fixture.source
    );

    assert.equal((result as { name?: string }).name, 'router');
  });

  it('find with result path returns projected field', () => {
    const result = evalNode(
      {
        type: 'find',
        collection: { type: 'read', path: ['equipment'] },
        predicate: nestedFindPredicate,
        path: ['prop', 'path'],
      },
      fixture.source
    );

    assert.equal(result, '/api/router');
  });

  it('find returns undefined when no match (like Array.find)', () => {
    const result = evalNode(
      {
        type: 'find',
        collection: { type: 'read', path: ['equipment'] },
        predicate: {
          type: 'strictEq',
          left: { type: 'read', path: ['item', 'name'] },
          right: { type: 'literal', value: 'missing' },
        },
      },
      fixture.source
    );

    assert.equal(result, undefined);
  });

  it('find with path returns undefined when no match', () => {
    const result = evalNode(
      {
        type: 'find',
        collection: { type: 'read', path: ['equipment'] },
        predicate: {
          type: 'strictEq',
          left: { type: 'read', path: ['item', 'name'] },
          right: { type: 'literal', value: 'missing' },
        },
        path: ['prop', 'path'],
      },
      fixture.source
    );

    assert.equal(result, undefined);
  });

  it('find throws INVALID_OPERAND when collection is not array', () => {
    assert.throws(
      () =>
        evalNode(
          {
            type: 'find',
            collection: { type: 'literal', value: 'not-array' },
            predicate: { type: 'literal', value: true },
          },
          {}
        ),
      (err: unknown) => err instanceof DslError && err.code === 'INVALID_OPERAND'
    );
  });
});
