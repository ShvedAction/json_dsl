# Plan: Boolean expressions + find

**Spec:** [spec.md](./spec.md)  
**Дата:** 2026-06-30  
**Статус:** approved

## Constitution check

- [x] Zero runtime dependencies
- [x] Test-first (фаза тестов до реализации)
- [x] Обратная совместимость: 001 specs/tests не ломаются

## Technical approach

1. **`src/types.ts`** — новые node types; расширить `DslNode` union
2. **`src/nodes/literal.ts`** — `evalLiteral`
3. **`src/nodes/boolean.ts`** — `evalEq` (`==`), `evalStrictEq` (`===`), `evalAnd`, `evalOr`, `evalNot`
4. **`src/nodes/find.ts`** — `evalFind` + `predicateTruthy`
5. **`src/eval.ts`** — dispatch новых типов
6. **Тесты** — `boolean.test.ts`, `find.test.ts`, `dslInterpreter-find.test.ts`

### evalFind

```
collection = evalNode(collection, context) // must be array
for element of collection:
  pred = evalNode(predicate, { item: element })
  if predicateTruthy(pred, predicateNode): 
    found = element
    return path ? resolvePath(found, path) : found
return undefined
```

### predicateTruthy

- if boolean → return value
- if predicate node was `find` → JS truthiness (`undefined` is false)
- else throw INVALID_OPERAND

## File changes

### Phase: tests

| Path | Purpose |
|------|---------|
| `tests/fixtures/nested-find.json` | TC-101 |
| `tests/boolean.test.ts` | REQ-101, REQ-102, EDGE-103 |
| `tests/find.test.ts` | REQ-103..105, EDGE-101, EDGE-104, EDGE-105 |
| `tests/dslInterpreter-find.test.ts` | REQ-106, TC-101 |

### Phase: implementation

| Path | Change |
|------|--------|
| `src/types.ts` | new nodes |
| `src/nodes/literal.ts` | new |
| `src/nodes/boolean.ts` | new |
| `src/nodes/find.ts` | new |
| `src/eval.ts` | dispatch |
| `docs/sdd/glossary.md` | новые термины |

## Validation

```bash
npm run typecheck && npm test
```

## Risks

| Risk | Mitigation |
|------|------------|
| Truthiness coercion неочевидна | явно в spec + unit test nested find |
| `find` null vs throw | `undefined` как `Array.find` |
