import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dslInterpreter } from '../src/index.js';

describe('dslInterpreter', () => {
  it('is not implemented yet', () => {
    assert.throws(
      () => dslInterpreter({}, { version: '1.0', computations: [] }),
      /Not implemented/
    );
  });
});
