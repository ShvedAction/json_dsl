# Constitution: [PACKAGE_NAME]

**Тип репозитория:** `library`  
**Пакет:** `[PACKAGE_NAME]`

Zero-dependency TypeScript-библиотека. Один публичный export.

## Public API

```typescript
export { dslInterpreter } from './index';
export type { DslProgram, ComputationResult } from './types';
```

## Принципы

- **Zero runtime dependencies** — `package.json` → `dependencies` пуст
- **Pure function** — deterministic, sync, no I/O, no globals
- **TypeScript strict** — named exports, English identifiers
- **Тесты** — `node:test` (devDependency only)
- **Документация** — русский; breaking changes → semver + ADR

## Non-goals

- [NON_GOAL_1]
- [NON_GOAL_2]
- [NON_GOAL_3]

## SDD gates

- Нет feature-кода без approved `specs/NNN-*/spec.md`
- Каждый REQ из spec покрыт unit-тестом
- Архитектурные решения → ADR в `docs/adr/`
