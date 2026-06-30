import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolvePath } from '../src/path.js';
import { DslError } from '../src/types.js';

describe('resolvePath', () => {
  it('resolves object keys and array indices', () => {
    const context = {
      cart: { items: [{ price: 500 }, { price: 100 }] },
      equipment: [{ name: 'router' }],
    };

    assert.equal(resolvePath(context, ['cart', 'items', 0, 'price']), 500);
    assert.equal(resolvePath(context, ['equipment', 0, 'name']), 'router');
  });

  it('throws PATH_NOT_FOUND for missing key', () => {
    assert.throws(
      () => resolvePath({ a: 1 }, ['missing']),
      (err: unknown) => err instanceof DslError && err.code === 'PATH_NOT_FOUND'
    );
  });

  it('throws PATH_NOT_FOUND for missing nested path', () => {
    assert.throws(
      () => resolvePath({ a: { b: 1 } }, ['a', 'c']),
      (err: unknown) => err instanceof DslError && err.code === 'PATH_NOT_FOUND'
    );
  });
});
