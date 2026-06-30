import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evalRead } from '../src/nodes/read.js';
import { evalReduce } from '../src/nodes/reduce.js';
import { evalNode } from '../src/eval.js';
import { DslError } from '../src/types.js';
import fixture from './fixtures/cart-equipment.json' with { type: 'json' };

describe('evalRead', () => {
  it('evalRead reads value from source context', () => {
    const result = evalRead(
      { type: 'read', path: ['cart', 'items', 0, 'price'] },
      fixture.source
    );
    assert.equal(result, 500);
  });
});

describe('evalReduce', () => {
  it('evalReduce returns 0 for empty collection', () => {
    const source = { equipment: [] as unknown[] };
    const node = {
      type: 'reduce' as const,
      collection: { type: 'read' as const, path: ['equipment'] },
      aggregator: {
        type: 'sum' as const,
        op1: { type: 'read' as const, path: ['accumulator'] },
        op2: {
          type: 'mul' as const,
          op1: { type: 'read' as const, path: ['item', 'price'] },
          op2: { type: 'read' as const, path: ['item', 'quantity'] },
        },
      },
    };

    assert.equal(evalReduce(node, source), 0);
  });

  it('evalReduce sums price * quantity over collection', () => {
    const node = {
      type: 'reduce' as const,
      collection: { type: 'read' as const, path: ['equipment'] },
      aggregator: {
        type: 'sum' as const,
        op1: { type: 'read' as const, path: ['accumulator'] },
        op2: {
          type: 'mul' as const,
          op1: { type: 'read' as const, path: ['item', 'price'] },
          op2: { type: 'read' as const, path: ['item', 'quantity'] },
        },
      },
    };

    // 30*22 + 10*3 + 50*1 = 740
    assert.equal(evalReduce(node, fixture.source), 740);
  });
});

describe('evalNode', () => {
  it('evalNode throws UNKNOWN_NODE for unknown type', () => {
    assert.throws(
      () => evalNode({ type: 'unknown' } as never, {}),
      (err: unknown) => err instanceof DslError && err.code === 'UNKNOWN_NODE'
    );
  });
});
