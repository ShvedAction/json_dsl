---
name: sdd-plan
description: >-
  Create technical plan and data model from an approved feature spec. Use after
  sdd-specify when architecture and file-level approach are needed before tasks.
  Outputs plan.md, data-model.md, and ADRs for architectural decisions.
---

# SDD Plan — spec → technical plan

## Prerequisites

- [ ] `specs/NNN-*/spec.md` status: approved
- [ ] `docs/sdd/constitution.md` read

## Workflow

1. Read spec + constitution
2. Constitution check (zero-deps, pure function, test coverage)
3. Create in `specs/NNN-*/`:
   - `plan.md` from `templates/library-plan-template.md`
   - `data-model.md` (DSL node types, not domain entities)
4. For each architectural decision → new `docs/adr/NNNN-*.md`
5. Map spec test cases → concrete file paths in plan
6. AskQuestion for approval

## ADR triggers

Create ADR when deciding:

- New **runtime** dependency (generally forbidden)
- Error model change
- Public API breaking change
- Package format (ESM/CJS/dual)

Do **not** implement without ADR for architectural changes.

## Default patterns (library)

- Public API → `src/index.ts`
- Types → `src/types.ts`
- Evaluators → `src/nodes/`, `src/eval.ts`
- Tests → `tests/*.test.ts`, fixtures in `tests/fixtures/`

## Handoff

Approved plan → `sdd-tasks`
