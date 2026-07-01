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

Как в 001: тесты → ревью → реализация. См. gate T006 в [tasks.md](./tasks.md).

## Новые узлы DSL

### `literal`

```json
{ "type": "literal", "value": "some_string_value" }
```

Константа: `string | number | boolean | null`.

### `eq`

```json
{
  "type": "eq",
  "left": { "type": "read", "path": ["item", "some_property"] },
  "right": { "type": "literal", "value": "some_string_value" }
}
```

Строгое равенство `===` после eval обоих операндов.

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
| `predicate` | да | Узел → boolean (см. coercion ниже) |
| `path` | нет | Если задан — `resolvePath(foundItem, path)`; иначе весь элемент |

**Контекст предиката:** `{ item: <текущий элемент> }` (как `item` в reduce).

**Coercion в предикате:** если результат eval узла `find` — не boolean, он трактуется как `true`, если найден элемент (`!== null`), иначе `false`. Это покрывает вложенный `find` в предикате без отдельного узла `some`.

## Requirements

### Functional

| ID | Given | When | Then |
|----|-------|------|------|
| REQ-101 | `literal` / `read` + `literal` | `eq` | `true`/`false` по `===` |
| REQ-102 | два boolean | `and` / `or` / `not` | стандартная логика |
| REQ-103 | массив + предикат `eq` на `item` | `find` без `path` | первый подходящий элемент целиком |
| REQ-104 | nested fixture (TC-101) | вложенный `find` в `predicate` внешнего `find` + `eq` | находит элемент с нужным вложенным значением |
| REQ-105 | TC-101 | `find` с `path: ["prop","path"]` | строка `"/api/router"` |
| REQ-106 | top-level computation | `find` как тело computation с `id` | `{ id, value }` в результате `dslInterpreter` |

### Edge cases

| ID | Сценарий | Ожидаемое поведение |
|----|----------|---------------------|
| EDGE-101 | `find` — нет совпадений | `value: null` (не throw) |
| EDGE-102 | `eq` с неподдерживаемым типом для сравнения | `[ASSUMED]` `===` как в JS (объекты по ссылке не равны) |
| EDGE-103 | `and`/`or`/`not` — операнд не boolean | throw `DslError`, `code: 'INVALID_OPERAND'` |
| EDGE-104 | `find.collection` не массив | throw `INVALID_OPERAND` |
| EDGE-105 | `path` на `find`, но элемент не найден | `null` (не throw) |

## Test cases

| ID | Fixture | DSL | Expected |
|----|---------|-----|----------|
| TC-101 | `tests/fixtures/nested-find.json` | `tests/fixtures/nested-find.json` → `program` | `{ id: "foundPath", value: "/api/router" }` |

### Структура TC-101 (fixture)

`equipment[].nested_collection[]` — вложенные объекты; ровно один `router` с `some_property === "some_string_value"`; у него `prop.path === "/api/router"`.

## Покрытие тестами

| REQ/EDGE/TC | Файл | Тест |
|-------------|------|------|
| REQ-101 | `tests/boolean.test.ts` | `eq` true / false |
| REQ-102 | `tests/boolean.test.ts` | `and`, `or`, `not` |
| REQ-103 | `tests/find.test.ts` | `find` returns whole item |
| REQ-104 | `tests/find.test.ts` | nested find as predicate |
| REQ-105 | `tests/find.test.ts` | `find` with result path |
| REQ-106 | `tests/dslInterpreter-find.test.ts` | TC-101 integration |
| EDGE-101 | `tests/find.test.ts` | no match → null |
| EDGE-103 | `tests/boolean.test.ts` | non-boolean to `not` |
| EDGE-104 | `tests/find.test.ts` | collection not array |
| EDGE-105 | `tests/find.test.ts` | path when not found |

## Out of scope

- `!=`, `<`, `>`, `in`, regex
- `filter` / `map` / `every`
- Ссылки между computations по `id`
- Short-circuit оптимизации (семантика как у JS достаточна)

## Non-goals

- SQL-подобный query language
- Произвольные lambda / user-defined functions

## Assumptions

- `[ASSUMED]` `find` без совпадения → `null` (не throw); отличается от `PATH_NOT_FOUND`
- `[ASSUMED]` В предикате вложенный `find` → truthiness найденного элемента
- `[ASSUMED]` `literal` — единственный способ передать константу в `eq` (нет inline scalar в `eq.right`)
