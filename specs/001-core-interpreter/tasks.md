# Tasks: Core interpreter — read, reduce, базовые операторы

**Spec:** [spec.md](./spec.md)  
**Plan:** [plan.md](./plan.md)  
**Дата:** 2026-06-30  
**Статус:** completed

## Phase 0: Contract (types & fixtures)

> Goal: контракт и данные для тестов, без логики

- [x] T001 [Architect] `src/types.ts` — DslProgram, node types, ComputationResult, DslError
- [x] T002 [Implementer] `tests/fixtures/cart-equipment.json` — source + program для TC-001

## Phase 1: Tests (RED)

> Goal: полный набор тестов по spec; `npm test` падает — это норма

- [x] T003 [Implementer] `tests/path.test.ts` — EDGE-002
- [x] T004 [Implementer] `tests/nodes.test.ts` — REQ-001, REQ-002, EDGE-001, EDGE-003 (unit)
- [x] T005 [Implementer] `tests/dslInterpreter.test.ts` — TC-001, REQ-003, EDGE-001, EDGE-003 (integration)
- [x] T005b [Implementer] Заглушки `src/path.ts`, `src/nodes/*`, `src/eval.ts` — только `throw`, для компиляции тестов

## Phase 2: Test review (GATE)

> Goal: владелец подтверждает, что тесты проверяют нужное поведение из spec

- [x] T006 [Product] **Ревью тестов** — прочитать `tests/*.test.ts` + таблицу покрытия в [spec.md](./spec.md); явно отметить `[x]` когда готовы к реализации

**До закрытия T006 реализация в `src/` запрещена** (кроме types и throw-заглушек).

## Phase 3: Implementation (GREEN)

> Goal: снять заглушки, пройти тесты; не менять утверждения в тестах

- [x] T007 [Implementer] `src/path.ts` — resolvePath
- [x] T008 [Implementer] `src/nodes/read.ts` — evalRead
- [x] T009 [Implementer] `src/nodes/ops.ts` — evalSum, evalMul
- [x] T010 [Implementer] `src/nodes/reduce.ts` — evalReduce
- [x] T011 [Implementer] `src/eval.ts` — evalNode dispatch
- [x] T012 [Implementer] `src/index.ts` — dslInterpreter

## Phase 4: Verification

> Goal: DoD

- [x] T013 [Verifier] DoD check по [definition-of-done.md](../../docs/sdd/definition-of-done.md)
- [x] T014 [Verifier] `npm run typecheck && npm test` green

## Legend

- `[P]` — можно выполнять параллельно с соседней `[P]` задачей
- Roles: Architect | Implementer | Verifier | **Product** (ревью тестов)
- **RED** — тесты падают до реализации; **GREEN** — все проходят

## Dependencies

```
T001 → T002 → T003 → T004 → T005 → T005b → T006
T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014
T008 [P] T009
```
