# Tasks: Boolean expressions + find

**Spec:** [spec.md](./spec.md)  
**Plan:** [plan.md](./plan.md)  
**Дата:** 2026-06-30  
**Статус:** in_progress — фаза тестов

## Phase 0: Contract

- [x] T101 [Architect] spec + data-model + brain dump
- [x] T102 [Implementer] `tests/fixtures/nested-find.json`

## Phase 1: Tests (RED)

- [x] T103 [Implementer] `tests/boolean.test.ts`
- [x] T104 [Implementer] `tests/find.test.ts`
- [x] T105 [Implementer] `tests/dslInterpreter-find.test.ts`
- [x] T105b [Implementer] расширить types + eval stubs для компиляции

## Phase 2: Test review (GATE)

- [ ] T106 [Product] **Ревью тестов** — подтвердить покрытие REQ/EDGE

## Phase 3: Implementation (GREEN)

- [ ] T107 [Implementer] `src/nodes/literal.ts`, `src/nodes/boolean.ts`
- [ ] T108 [Implementer] `src/nodes/find.ts`
- [ ] T109 [Implementer] `src/eval.ts` + `src/types.ts`
- [ ] T110 [Implementer] glossary sync

## Phase 4: Verification

- [ ] T111 [Verifier] 001 + 002 tests green, DoD

## Dependencies

```
T101 → T102 → T103 → T104 → T105 → T105b → T106 → T107 → T108 → T109 → T110 → T111
T103 [P] T104
```
