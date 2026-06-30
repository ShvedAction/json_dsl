# Tasks: Core interpreter — read, reduce, базовые операторы

**Spec:** [spec.md](./spec.md)  
**Plan:** [plan.md](./plan.md)  
**Дата:** 2026-06-30  
**Статус:** pending

## Phase 1: Types & fixtures

> Goal: типы AST и fixtures из brain dump

- [ ] T001 [Architect] `src/types.ts` — DslProgram, node types, ComputationResult, DslError
- [ ] T002 [Implementer] `tests/fixtures/cart-equipment.json` — source + program для TC-001

## Phase 2: Path & read

> Goal: разрешение path и узел read

- [ ] T003 [Implementer] `src/path.ts` — resolvePath + `tests/path.test.ts` (EDGE-002)
- [ ] T004 [Implementer] `src/nodes/read.ts` — evalRead + тесты

## Phase 3: Ops & reduce

> Goal: sum, mul, reduce

- [ ] T005 [Implementer] `src/nodes/ops.ts` — evalSum, evalMul + тесты
- [ ] T006 [Implementer] `src/nodes/reduce.ts` — evalReduce + тесты (EDGE-001)

## Phase 4: Interpreter

> Goal: evalNode + dslInterpreter + integration

- [ ] T007 [Implementer] `src/eval.ts` — evalNode dispatch (EDGE-003)
- [ ] T008 [Implementer] `src/index.ts` — dslInterpreter + `tests/dslInterpreter.test.ts` (REQ-001..003, TC-001)

## Phase 5: Verification

> Goal: DoD и CI-local checks

- [ ] T009 [Verifier] DoD check по [definition-of-done.md](../../docs/sdd/definition-of-done.md)
- [ ] T010 [Verifier] `npm run typecheck && npm test` green

## Legend

- `[P]` — можно выполнять параллельно с соседней `[P]` задачей
- Roles: Architect | Implementer | Verifier

## Dependencies

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010
T005 [P] T004
```
