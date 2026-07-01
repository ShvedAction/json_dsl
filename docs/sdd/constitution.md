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
- **Module resolution** — `module: ESNext`, `moduleResolution: bundler`; относительные импорты **без** `.js` (см. [Модули](#модули))
- **Тесты** — `node:test` + `tsx` (devDependencies only)
- **Test-first** — тесты по spec пишутся до реализации; реализация `src/` после ревью тестов владельцем (см. tasks.md gate T006)
- **Документация** — русский; breaking changes → semver + ADR
- **Потребительская документация** — `README.md` + `docs/language/` синхронны с реализованными узлами DSL; новый/изменённый `type` → обновление соответствующего раздела (skill `sdd-docs-language`)

## Модули

Библиотека поставляется **исходниками TypeScript**, без отдельной сборки (`package.json` → `exports["."]` = `./src/index.ts`).

| Настройка | Значение | Зачем |
|-----------|----------|-------|
| `module` | `ESNext` | ESM-синтаксис |
| `moduleResolution` | `bundler` | импорты без `.js`, как в Vite/Next |
| Относительные импорты | без расширения | исходники подключаются в bundler-проектах «как есть» |

**Не** используем `NodeNext` + суффикс `.js` в импортах — это требование нативного ESM Node после `tsc`, а не bundler-стека на фронте.

Потребитель: `import { dslInterpreter } from 'json_dsl'` (или `file:` / workspace). В Next.js — `transpilePackages: ['json_dsl']`. У потребителя ожидается `moduleResolution: bundler` (дефолт Vite/Next).

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
- **Doc sync:** `docs/language/` и README актуальны относительно `src/eval.ts`
