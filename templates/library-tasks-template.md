# Tasks: [FEATURE_NAME]

**Spec:** [SPEC_PATH]  
**Plan:** [PLAN_PATH]  
**Дата:** [DATE]  
**Статус:** [STATUS]

## Phase 0: Contract

> Goal: types + fixtures

- [ ] T001 [Architect] types
- [ ] T002 [Implementer] fixtures

## Phase 1: Tests (RED)

> Goal: тесты по spec; `npm test` падает — ожидаемо

- [ ] T003 [Implementer] unit/integration tests по таблице покрытия в spec
- [ ] T004 [Implementer] throw-заглушки в `src/` для компиляции

## Phase 2: Test review (GATE)

- [ ] T005 [Product] **Ревью тестов** — подтвердить покрытие REQ/EDGE

**До T005 реализация в `src/` запрещена.**

## Phase 3: Implementation (GREEN)

- [ ] T006 [Implementer] [IMPLEMENTATION_TASK]

## Phase 4: Verification

- [ ] T007 [Verifier] DoD check
- [ ] T008 [Verifier] `npm run typecheck && npm test` green
- [ ] T009 [Verifier] sync `docs/language/` (`sdd-docs-language`)

## Legend

- `[P]` — параллельно
- Roles: Architect | Implementer | Verifier | **Product** (ревью тестов)

## Dependencies

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008
```
