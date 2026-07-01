# Spec: Boolean expressions + find

**ID:** 002-boolean-find  
**Дата:** 2026-06-30  
**Статус:** draft  
**Зависит от:** [001-core-interpreter](../001-core-interpreter/spec.md)

## Overview

Расширить DSL узлами для булевых выражений и поиска `find` в коллекции. Поддержать вложенный `find` в предикате и чтение поля из найденного элемента — эквивалент JS-паттерна:

```javascript
collection.find(itm =>
  itm.nested_collection.find(itm_nested =>
    itm_nested.some_property == 'some_string_value'
  )
).prop.path;
```

## Workflow: test-first

Как в 001: тесты → ревью → реализация. См. gate T106 в [tasks.md](./tasks.md).

## Новые узлы DSL

### `literal`

```json
{ "type": "literal", "value": "some_string_value" }
```

Константа: `string | number | boolean | null`.

### `eq` (абстрактное равенство `==`)

```json
{
  "type": "eq",
  "left": { "type": "read", "path": ["item", "some_property"] },
  "right": { "type": "literal", "value": "some_string_value" }
}
```

Семантика как JS `==` после eval обоих операндов (в т.ч. coercion `1 == "1"` → `true`).

### `strictEq` (строгое равенство `===`)

```json
{
  "type": "strictEq",
  "left": { "type": "literal", "value": 1 },
  "right": { "type": "literal", "value": "1" }
}
```

Семантика как JS `===` (без coercion).

### `and`, `or`, `not`

Бинарные / унарные булевы комбинаторы. Операнды должны eval в `boolean`.

### `find`

```json
{
  "type": "find",
  "collection": { "type": "read", "path": ["equipment"] },
  "predicate": { "type": "and", "op1": { ... }, "op2": { ... } },
  "path": ["prop", "path"]
}
```

| Поле | Обязательно | Описание |
|------|-------------|----------|
| `collection` | да | Узел → массив |
| `predicate` | да | Узел → boolean или truthy `find` (см. ниже) |
| `path` | нет | Если задан — `resolvePath(foundItem, path)`; иначе весь элемент |

**Контекст предиката:** `{ item: <текущий элемент> }`.

**Семантика как `Array.find`:** возвращает первый подходящий элемент или **`undefined`**, не throw.

**Coercion в предикате:** если eval узла `find` — не boolean, truthiness как в JS: `undefined` → `false`, найденный объект → `true`.

## Requirements

### Functional

| ID | Given | When | Then |
|----|-------|------|------|
| REQ-101a | `1` и `"1"` | `eq` | `true` (как JS `==`) |
| REQ-101b | `1` и `"1"` | `strictEq` | `false` (как JS `===`) |
| REQ-101c | одинаковые строки | `strictEq` | `true` |
| REQ-102 | два boolean | `and` / `or` / `not` | стандартная логика |
| REQ-103 | массив + предикат | `find` без `path` | первый подходящий элемент целиком |
| REQ-104 | nested fixture (TC-101) | вложенный `find` + `eq` в предикате | находит `router` |
| REQ-105 | TC-101 | `find` с `path: ["prop","path"]` | `"/api/router"` |
| REQ-106 | top-level computation | `find` с `id` | `{ id, value }` в `dslInterpreter` |

### Edge cases

| ID | Сценарий | Ожидаемое поведение |
|----|----------|---------------------|
| EDGE-101 | `find` — нет совпадений | `undefined` (как `Array.find`) |
| EDGE-103 | `and`/`or`/`not` — операнд не boolean | throw `INVALID_OPERAND` |
| EDGE-104 | `find.collection` не массив | throw `INVALID_OPERAND` |
| EDGE-105 | `path` на `find`, но элемент не найден | `undefined` |

## Test cases

| ID | Fixture | DSL | Expected |
|----|---------|-----|----------|
| TC-101 | `tests/fixtures/nested-find.json` | `program` | `{ id: "foundPath", value: "/api/router" }` |

Внутренний предикат TC-101 использует `eq` (`==`), как в brain dump.

## Покрытие тестами

| REQ/EDGE | Файл | Тест |
|----------|------|------|
| REQ-101a | `tests/boolean.test.ts` | `eq` loose equality |
| REQ-101b,c | `tests/boolean.test.ts` | `strictEq` |
| REQ-102 | `tests/boolean.test.ts` | `and`, `or`, `not` |
| REQ-103..105 | `tests/find.test.ts` | find scenarios |
| REQ-106 | `tests/dslInterpreter-find.test.ts` | TC-101 |
| EDGE-101,105 | `tests/find.test.ts` | no match → `undefined` |
| EDGE-103 | `tests/boolean.test.ts` | non-boolean to `not` |
| EDGE-104 | `tests/find.test.ts` | collection not array |

## Out of scope

- `!=`, `<`, `>`, `in`, regex
- `filter` / `map` / `every`

## Assumptions

- `[RESOLVED]` `find` → `undefined` если не найдено
- `[RESOLVED]` `eq` = `==`, `strictEq` = `===`
- `[RESOLVED]` `and`, `or`, `not` в scope
