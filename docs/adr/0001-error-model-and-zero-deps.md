# ADR-0001: Error model и zero-deps

**Дата:** 2026-06-30  
**Статус:** accepted  
**Supersedes:** none

## Контекст

Brain dump описывает happy-path (e-commerce fixture), но не фиксирует поведение при ошибках, порядок eval и формат пакета. Библиотека должна оставаться zero-dependency.

## Решение

1. **Error model:** при невалидном DSL, неизвестном типе узла или несуществующем path — `throw` typed error (`DslError` с полем `code`)
2. **Eval order:** последовательно по `computations[]`; ссылки по `id` между computations — v2 (`[TBD]`)
3. **Reduce empty collection:** агрегатор `sum` на пустой коллекции → `0`
4. **Invalid path:** `throw` с `code: 'PATH_NOT_FOUND'`
5. **Unknown node type:** `throw` с `code: 'UNKNOWN_NODE'`
6. **Package format:** ESM (`"type": "module"`), entry `src/index.ts`; `dist/` — позже при публикации

## Обоснование

- `throw` — минимальный API без Result-типа и лишних зависимостей
- Линейный eval достаточен для v0.1 и соответствует примеру brain dump
- ESM — стандарт для Node 22+

## Рассмотренные альтернативы

### Result\<T, E\> вместо throw

- Плюсы: явная обработка ошибок
- Минусы: усложняет API единственной функции
- Почему отклонено: overkill для v0.1 tiny lib

### Vitest как runtime test runner

- Плюсы: удобный DX
- Минусы: лишняя devDependency при наличии `node:test`
- Почему отклонено: выбран `node:test` + `tsx`

## Последствия

### Положительные

- Предсказуемый контракт ошибок для потребителей
- Zero runtime deps сохранён

### Отрицательные / trade-offs

- Потребители обязаны try/catch
- Граф зависимостей по `id` отложен

## Compliance

- [x] Соответствует [constitution.md](../sdd/constitution.md)
- [x] Zero runtime dependencies
