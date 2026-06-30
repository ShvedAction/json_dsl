# Tasks: [FEATURE_NAME]

**Spec:** [SPEC_PATH]  
**Plan:** [PLAN_PATH]  
**Дата:** [DATE]  
**Статус:** [STATUS]

## Phase 1: [PHASE_NAME]

> Goal: [PHASE_GOAL]

- [ ] T001 [Architect] [TASK_DESCRIPTION]
- [ ] T002 [Implementer] [TASK_DESCRIPTION]
- [ ] T003 [P] [Implementer] [PARALLEL_TASK]

## Phase 2: Verification

- [ ] T004 [Verifier] DoD check по [definition-of-done.md](../../docs/sdd/definition-of-done.md)
- [ ] T005 [Verifier] `npm run typecheck && npm test` green

## Legend

- `[P]` — можно выполнять параллельно с соседней `[P]` задачей
- Roles: Architect | Implementer | Verifier

## Dependencies

```
T001 → T002 → T004
T003 [P] T002
```
