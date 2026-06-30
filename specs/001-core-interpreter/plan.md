# Plan: Core interpreter — read, reduce, базовые операторы

**Spec:** [spec.md](./spec.md)  
**Дата:** 2026-06-30  
**Статус:** approved

## Constitution check

- [x] Zero runtime dependencies
- [x] Pure function, sync evaluation
- [x] Unit test coverage для всех REQ/EDGE из spec
- [x] Новые runtime deps → ADR (не планируются)

## Technical approach

Слои снизу вверх:

1. **Types** — AST types в `src/types.ts`
2. **Path** — `resolvePath(context, path)` в `src/path.ts`
3. **Nodes** — `evalRead`, `evalSum`, `evalMul`, `evalReduce` в `src/nodes/`
4. **Dispatch** — `evalNode(node, context)` в `src/eval.ts`
5. **Orchestrator** — `dslInterpreter` в `src/index.ts`: цикл по `computations`, сбор `{ id, value }`

### Поток reduce

```
accumulator = 0
for item in collection:
  context = { accumulator, item }
  accumulator = evalNode(aggregator, context)
return accumulator
```

## File changes

### New files

| Path | Purpose |
|------|---------|
| `src/types.ts` | `DslProgram`, node types, `ComputationResult`, `DslError` |
| `src/path.ts` | `resolvePath` |
| `src/nodes/read.ts` | `evalRead` |
| `src/nodes/ops.ts` | `evalSum`, `evalMul` |
| `src/nodes/reduce.ts` | `evalReduce` |
| `src/eval.ts` | `evalNode` dispatch |
| `src/index.ts` | `dslInterpreter` export |
| `tests/fixtures/cart-equipment.json` | TC-001 fixtures |
| `tests/path.test.ts` | path + EDGE-002 |
| `tests/nodes.test.ts` | read, sum, mul, reduce |
| `tests/dslInterpreter.test.ts` | REQ-001..003, TC-001, EDGE-001, EDGE-003 |

### Modified files

| Path | Change |
|------|--------|
| `package.json` | scripts, devDependencies, engines |
| `tsconfig.json` | strict TS config |

## Data model

См. [data-model.md](./data-model.md)

## ADR triggers

| Решение | ADR needed? |
|---------|-------------|
| Error model, eval order, zero-deps | Done → [ADR-0001](../../docs/adr/0001-error-model-and-zero-deps.md) |
| Новый runtime dependency | Yes — forbidden by default |

## Validation commands

```bash
npm run typecheck
npm test
```

## Risks

| Risk | Mitigation |
|------|------------|
| Неявная типизация JSON на входе | strict types + runtime checks для operands |
| Граф по `id` запросят рано | явный out-of-scope в spec |
