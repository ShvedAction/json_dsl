import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dslInterpreter } from '../src/index';
import type { DslProgram } from '../src/types';
import fixture from './fixtures/nested-find.json' with { type: 'json' };

const tc101Program = fixture.program as DslProgram;

describe('dslInterpreter — find (002)', () => {
  it('TC-101: nested find returns prop.path', () => {
    const result = dslInterpreter(fixture.source, tc101Program);

    assert.deepEqual(result, [{ id: 'foundPath', value: '/api/router' }]);
  });
});
