# AGENTS.md — json_dsl

## Project overview

Zero-dependency TypeScript-библиотека: JSON DSL интерпретатор с одной публичной функцией `dslInterpreter`.

## Node.js (nvm)

Platform default: **Node 22 LTS** (see `.nvmrc` and skill `sdd-dev-env`).

```bash
nvm use
node -v    # expect v22.x
```

## Key commands

```bash
npm install
npm run typecheck
npm test
```

## Project structure

```
src/                 # library source, export dslInterpreter
tests/               # node:test unit tests + fixtures
docs/sdd/            # constitution, DoD, glossary
docs/adr/            # architecture decision records
docs/brain-dumps/    # raw intake (not source of truth)
specs/               # feature specs (NNN-name/)
changes/             # change proposals (1→n updates)
templates/           # library SDD templates
.cursor/skills/      # SDD skill suite
```

## SDD workflow

1. Brain dump → `sdd-init` skill → approved artifacts
2. Feature → `sdd-specify` → `sdd-plan` → `sdd-tasks` → **тесты (RED)** → ревью → implement (GREEN)
3. Requirement changes after v0.1 → `sdd-maintain` + `changes/`

## Code style

- TypeScript strict, named exports
- Pure functions in `src/`
- English identifiers; Russian docs

## Boundaries

### Allowed without asking

- Read files, run typecheck/test
- Edit SDD artifacts and code within current approved spec scope

### Ask first

- Install/remove packages (runtime deps forbidden without ADR)
- Architectural changes without ADR
- Commit and push

### Never

- Commit secrets or `.env`
- Add runtime dependencies without ADR
- Implement game/UI features
- Implement without approved spec.md

## Key files

- `docs/sdd/constitution.md` — non-negotiable rules
- `docs/sdd/definition-of-done.md` — done criteria
- `specs/001-core-interpreter/spec.md` — product source of truth for v0.1
- `.cursor/skills/sdd-init/SKILL.md` — bootstrap entry point
