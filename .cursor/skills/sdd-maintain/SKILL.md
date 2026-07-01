---
name: sdd-maintain
description: >-
  Sync specs and ADRs when requirements change on an existing library (1→n).
  Use when updating requirements after v0.1, detecting spec drift, or archiving
  completed changes. Manages changes/ folder.
---

# SDD Maintain — lifecycle & change tracking

For **changes to existing behavior** after baseline release. Not for greenfield (use `sdd-init`).

## When to use

- «Добавь оператор `filter`»
- «Забыли требование в spec»
- After implement: scope differed from spec
- Post-merge artifact sync

## Change workflow

```
PROPOSE → APPROVE → IMPLEMENT → ARCHIVE
```

### 1. Propose

Create `changes/NNN-kebab-name/`:

```
changes/003-add-filter-op/
├── proposal.md
├── tasks.md         # optional, if non-trivial
└── spec-delta.md    # ADDED/MODIFIED/REMOVED requirements
```

### 2. Classify change

| Type | Action |
|------|--------|
| internal refactor | Note in proposal; no spec delta if behavior unchanged |
| behavioral | spec delta + tasks + tests |
| architectural | New ADR + plan update |

### 3. Drift detection

Compare:

- `specs/*/spec.md` vs code/tests
- `src/eval.ts` switch cases vs `docs/language/`
- constitution vs practices (zero-deps, test coverage, consumer docs)

Report gaps; do not auto-fix without approval.

### 4. Approve

AskQuestion on proposal before implement.

### 5. Implement

Follow `changes/*/tasks.md` or create via `sdd-tasks` for the delta.

### 6. Archive

Merge approved delta into canonical artifacts:

- `spec-delta.md` → `specs/NNN-*/spec.md`
- glossary if new terms
- **`docs/language/`** via `sdd-docs-language` if nodes/semantics changed
- Mark `changes/NNN-*/` archived in proposal frontmatter

### 7. Constitution check

Every change must pass constitution rules before archive. Runtime deps require ADR.

## Handoff

- New feature (0→1) → `sdd-specify`
- New library repo → `sdd-init`
