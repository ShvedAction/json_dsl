# Question bank by dimension

Use `AskQuestion` tool. 2–4 options per question when possible. Max 3–5 questions per round.

## Problem Clarity

- «Кто потребитель API: backend, frontend, другая библиотека?»
- «Какую боль решаем: дублирование вычислений, декларативные правила, конфигурируемые формулы?»

## Goal Definition

- «MVP — только `read` + `reduce` или полный набор операторов?»
- «Синхронный eval или async в будущем?»

## Success Criteria

- «Как поймём что интерпретатор работает: fixtures из brain dump + edge cases?»
- «Error model: throw или Result type?»

## Scope Boundaries

- «Что точно НЕ делаем в v0.1?» (async, JSON Schema, ссылки по id между computations)
- «Нужна ли валидация DSL schema?»

## Consistency

- «Граф вычислений — только порядок в `computations[]` или ссылки по `id`?»
- «Zero runtime deps — подтверждаете? devDeps (typescript, tsx) допустимы»

## Repo type

- `library` — zero-dep TS lib, один public export
- `meta` — skills + roadmap платформы
- `game` — edu game repo (не этот проект)
