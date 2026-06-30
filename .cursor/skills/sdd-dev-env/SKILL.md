---
name: sdd-dev-env
description: >-
  Node.js and nvm setup for library repos on macOS (incl. Apple Silicon).
  Use before npm install, scaffold, or when Node version errors occur. Covers
  .nvmrc, engines field, and version policy for TypeScript + node:test stack.
---

# SDD Dev Environment — Node & nvm

## Version policy

| Node | Status (2026) | Use |
|------|---------------|-----|
| 18.x | End-of-life | **Не использовать** |
| 20.x | Maintenance | Работает |
| **22.x** | Maintenance LTS | **Рекомендуемый default** |
| 24.x | Active LTS | Ок для новых проектов |

**Решение:** `.nvmrc` → `22`

## Per-repo files

Every library scaffold **must** include:

```
.nvmrc              # single line: 22
package.json        # "engines": { "node": ">=22.12.0" }
```

## nvm workflow

```bash
nvm install 22
cd json_dsl
nvm use
node -v                # expect v22.x.x
npm install
```

## Before npm install (agent checklist)

1. Run `node -v` in target directory
2. If not 22.x or 24.x LTS → ask user to `nvm use` or `nvm install 22`
3. Do **not** run `npm install` on Node 18
4. After install: `npm run typecheck && npm test`

## Package manager

- Default: **npm**

## Runtime dependencies

- **Forbidden** without ADR — library is zero-dep by constitution
- DevDependencies only: `typescript`, `tsx`, `@types/node`

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `EBADENGINE` warnings | `nvm use` → Node 22+ |
| `node --test` cannot load TS | use `node --import tsx --test` |

## Scaffold handoff

After `sdd-init` + before `npm install`:

1. Write `.nvmrc` + `engines`
2. Remind user: `nvm use && npm install`
