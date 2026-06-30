import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { dslInterpreter } from '../src/index.js';
import { DslError } from '../src/types.js';
import type { DslProgram } from '../src/types.js';
import fixture from './fixtures/cart-equipment.json' with { type: 'json' };

const tc001Program = fixture.program as DslProgram;

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, 'fixtures', 'cart-equipment.json');

describe('dslInterpreter', () => {
  it('TC-001: cart-equipment fixture', () => {
    const result = dslInterpreter(fixture.source, tc001Program);

    assert.deepEqual(result, [
      { id: 'ip1', value: 500 },
      { id: 'etotal1', value: 740 },
    ]);
  });

  it('returns results in computations order', () => {
    const result = dslInterpreter(fixture.source, tc001Program);

    assert.equal(result.length, 2);
    assert.equal(result[0]?.id, 'ip1');
    assert.equal(result[1]?.id, 'etotal1');
  });

  it('EDGE-001: empty equipment reduce', () => {
    const source = {
      ...fixture.source,
      equipment: [] as typeof fixture.source.equipment,
    };
    const reduceOnlyProgram: DslProgram = {
      version: '1.0',
      computations: [tc001Program.computations[1]!],
    };

    const result = dslInterpreter(source, reduceOnlyProgram);

    assert.deepEqual(result, [{ id: 'etotal1', value: 0 }]);
  });

  it('EDGE-003: unknown computation type', () => {
    const badProgram = {
      version: '1.0',
      computations: [{ type: 'unknown', id: 'bad' }],
    } as unknown as DslProgram;

    assert.throws(
      () => dslInterpreter(fixture.source, badProgram),
      (err: unknown) => err instanceof DslError && err.code === 'UNKNOWN_NODE'
    );
  });
});

// Sanity: fixture file matches spec path (review aid)
describe('fixtures', () => {
  it('cart-equipment.json is readable and matches TC-001 structure', () => {
    const raw = JSON.parse(readFileSync(fixturePath, 'utf8'));
    assert.ok(raw.source?.cart?.items?.[0]?.price === 500);
    assert.ok(Array.isArray(raw.source?.equipment) && raw.source.equipment.length === 3);
    assert.equal(raw.program?.computations?.length, 2);
  });
});
