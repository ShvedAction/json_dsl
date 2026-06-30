---
name: sdd-specify
description: >-
  Create feature-level spec.md for a library feature or API extension.
  Use when adding a new feature inside an existing library repo, before planning or
  coding. Outputs specs/NNN-name/spec.md with test case requirements.
---

# SDD Specify — scope → feature spec

Creates `specs/NNN-feature-name/spec.md` for a **feature inside a library**, not a new repo (use `sdd-init` for greenfield bootstrap).

## Prerequisites

- [ ] `docs/sdd/constitution.md` exists
- [ ] Feature scope agreed with user

## Workflow

1. Read constitution, glossary, existing specs
2. Assign next spec ID: `specs/NNN-kebab-name/` (NNN zero-padded)
3. Fill `templates/library-spec-template.md`
4. Include **Test cases table** — input fixtures → expected output
5. Given-When-Then for all functional requirements
6. List edge cases and explicit out-of-scope
7. AskQuestion for approval before marking spec `approved`

## Quality checklist

- [ ] Technology-agnostic requirements (what, not how)
- [ ] Testable acceptance criteria
- [ ] Test cases map to acceptance criteria
- [ ] `[ASSUMED]` / `[TBD]` for gaps
- [ ] Constitution compliance (zero-deps, pure function, unit tests)

## Output

```
specs/NNN-feature-name/
└── spec.md
```

## Handoff

Approved spec → `sdd-plan`
