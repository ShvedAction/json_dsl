---
name: sdd-tasks
description: >-
  Break approved spec and plan into phased tasks.md with checkboxes, parallel
  markers, and agent roles. Use before implementation of a feature. Outputs
  actionable task list for incremental development with verification gates.
---

# SDD Tasks — plan → tasks.md

## Prerequisites

- [ ] `specs/NNN-*/spec.md` approved
- [ ] `specs/NNN-*/plan.md` approved

## Workflow

1. Read spec, plan, DoD
2. Create `specs/NNN-*/tasks.md` from `templates/library-tasks-template.md`
3. Break into phases: types/fixtures → **tests (RED)** → **test review gate (Product)** → implementation (GREEN) → verification
4. Each task: `- [ ] TNNN [Role] description`
5. Mark parallelizable: `[P]`
6. Test tasks **before** implementation tasks; gate: owner approves tests in tasks.md
7. Final phase: Verifier DoD check

## Task sizing

Each task must be:

- Completable in one agent session
- Independently verifiable
- Small enough to review

**Good:** "T005 Implementer Add reduce.test.ts — EDGE-001 empty collection"

**Bad:** "T005 Implementer Build entire interpreter"

## Roles

| Role | Tasks |
|------|-------|
| Product | Test review gate before implementation |
| Architect | ADR, data model, module layout |
| Implementer | Code + tests |
| Verifier | DoD, typecheck, constitution check |

## Dependencies

Document in tasks.md:

```
T001 → T002 → T004
T003 [P] T002
```

## Handoff

Execute tasks in order. After each task: update checkbox `[x]`.

All tasks done → Verifier phase → `sdd-maintain` if scope drifted.
