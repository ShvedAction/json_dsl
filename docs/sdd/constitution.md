# Constitution: json_dsl

**Тип репозитория:** `library`  
**Пакет:** `json_dsl`

Zero-dependency TypeScript-библиотека. Один публичный export — интерпретатор JSON DSL.

## Public API

```typescript
export { dslInterpreter } from './index';
export type { DslProgram, ComputationResult, DslNode } from './types';
```

## Принципы

- **Zero runtime dependencies** — `package.json` → `dependencies` пуст
- **Pure function** — `dslInterpreter` deterministic, sync, no I/O, no globals
- **TypeScript strict** — named exports, English identifiers
- **Тесты** — `node:test` + `tsx` (devDependencies only)
- **Test-first** — тесты по spec пишутся до реализации; реализация `src/` после ревью тестов владельцем (см. tasks.md gate T006)
- **Документация** — русский; breaking changes → semver + ADR

## Граф вычислений (v0.1)

- Вычисления выполняются **последовательно** по массиву `computations[]`
- Ссылки между computations по `id` — **out of scope v0.1** (`[TBD]` v2)

## Non-goals (библиотека)

- UI, React, Storybook
- Async evaluation
- JSON Schema validation DSL на входе
- Runtime npm-зависимости

## SDD gates

- Нет feature-кода без approved `specs/NNN-*/spec.md`
- **Test-first:** тесты по REQ/EDGE → ревью владельца → затем реализация
- Каждый REQ/EDGE из spec покрыт unit-тестом
- Архитектурные решения → ADR в `docs/adr/`
