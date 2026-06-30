# AGENTS.md — [PROJECT_NAME]

## Project overview

[ONE_SENTENCE: zero-dep TS library, dslInterpreter]

## Node.js (nvm)

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
tests/               # node:test unit tests
docs/sdd/            # constitution, DoD, glossary
docs/adr/            # architecture decision records
specs/               # feature specs (NNN-name/)
changes/             # change proposals (1→n updates)
templates/           # library SDD templates
.cursor/skills/      # SDD skills
```

## SDD workflow

1. Brain dump → `sdd-init` skill
2. Feature → `sdd-specify` → `sdd-plan` → `sdd-tasks`
3. Implement with test-first per spec
4. Changes to existing behavior → `sdd-maintain` + `changes/`

## Code style

- TypeScript strict, named exports
- English identifiers; Russian docs
- Pure functions in `src/`

## Boundaries

### Allowed without asking

- Read files, run typecheck/test
- Edit files within current approved spec scope

### Ask first

- Install/remove packages (runtime deps forbidden without ADR)
- Delete files
- Architectural changes without ADR
- Commit and push

### Never

- Commit secrets or `.env`
- Add runtime dependencies without ADR
- Implement without approved spec.md

## Key files

- `docs/sdd/constitution.md` — non-negotiable rules
- `docs/sdd/definition-of-done.md` — done criteria
- `.cursor/skills/sdd-init/SKILL.md` — bootstrap entry point
