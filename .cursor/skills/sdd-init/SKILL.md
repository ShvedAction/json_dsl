---
name: sdd-init
description: >-
  Bootstrap SDD artifacts from a raw brain dump: constitution, DoD, ADR,
  glossary, AGENTS.md. Use when starting a new library project or when the
  user provides messy ideas, brain dump, or asks to initialize spec-driven
  development from scratch.
---

# SDD Init — brain dump → artifacts

Transform unstructured brain dumps into project SDD artifacts via confidence-gated workflow.

**Language:** Russian for artifacts; English for code identifiers.

## Critical: use AskQuestion

When confidence < 95% or at approval gates, **use AskQuestion** — not plain-text questions.

## Workflow

```
INTAKE → EXTRACT → SCORE → [if <95%: ASK] → DRAFT → APPROVAL → WRITE
```

### 1. Intake

Accept chaos: voice transcripts, bullets, tangents, contradictions. Do not clarify yet.

If dump < 200 words → flag `extended_elicitation_required`.

### 2. Extract signals

From dump (+ codebase exploration if brownfield):

- Problem, goals, success, scope, non-goals
- Contradictions
- Repo type: `meta` | `game` | `orchestrator` | **`library`**
- Public API surface (for library)

**Brownfield:** use Explore subagent or Grep/Read before scoring.

### 3. Confidence score

Read [references/confidence-rubric.md](references/confidence-rubric.md). Score 5×20, total /100.

Also read [references/library-checklist.md](references/library-checklist.md) for library domain gaps.

### 4. Clarify (if < 95%)

Use [references/question-bank.md](references/question-bank.md). Max 3–5 questions/round. Recalculate after each round.

### 5. Anti-sycophancy

During intake and draft:

- Take a position: what's strong vs weak in the dump
- Challenge vague demand ("users want X" → who, what evidence?)
- Name undefined terms ("better UX" → faster? fewer clicks?)
- Score conservatively when gaps found

**Banned:** "interesting approach", "could work", "you might consider"

### 6. Generate draft

Read [references/artifact-outputs.md](references/artifact-outputs.md). Fill templates from `templates/`:

| Artifact | Template |
|----------|----------|
| constitution | `templates/library-constitution-template.md` |
| DoD | `templates/library-dod-template.md` |
| glossary | freeform from dump |
| AGENTS.md | `templates/library-agents-template.md` |
| ADRs | `templates/adr-template.md` (if needed) |
| Feature spec | `templates/library-spec-template.md` → `specs/001-*/spec.md` |

Mark unknowns: `[ASSUMED]`, `[TBD]`. Minimum 3 non-goals.

**Default tech stack** (library):

- TypeScript strict, ESM
- `node:test` + `tsx` (devDependencies only)
- Zero runtime dependencies

**Do not** propose Vite, React, Storybook, XState for library repos.

### 7. Approval gate

AskQuestion:

- "Approved" — write files
- "Needs changes" — revise draft
- "Missing scope" — return to questions
- "Start over" — re-intake

**Do not write files until Approved.**

### 8. Write files

Create directory structure per plan. Save brain dump to `docs/brain-dumps/NNN-*.md` if not already there.

Ensure `.cursor/rules/sdd-governance.mdc` exists.

## Branches

| Condition | Action |
|-----------|--------|
| `repo-type=meta` | platform-roadmap, skills focus |
| `repo-type=game` | full game PRD, game constitution |
| `repo-type=orchestrator` | platform-prd, host protocol ADR TBD |
| **`repo-type=library`** | constitution + single spec as product truth; no PRD |
| Multiple games mentioned | roadmap phasing, each game separate repo |
| dump < 200 words | force extended elicitation |

## Handoff

After init, next steps:

1. Scaffold → read `sdd-dev-env` skill; add `.nvmrc` + `engines`; `nvm use` before `npm install`
2. Feature → `sdd-specify` → `sdd-plan` → `sdd-tasks`
3. Changes to existing specs → `sdd-maintain` (after v0.1)

## References

- [confidence-rubric.md](references/confidence-rubric.md)
- [question-bank.md](references/question-bank.md)
- [library-checklist.md](references/library-checklist.md)
- [artifact-outputs.md](references/artifact-outputs.md)
