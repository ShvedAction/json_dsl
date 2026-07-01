# Работа с коллекциями

## `reduce`

Свёртка массива в одно значение. Аналог `array.reduce` с начальным аккумулятором `0`.

```json
{
  "type": "reduce",
  "collection": { "type": "read", "path": ["equipment"] },
  "aggregator": {
    "type": "sum",
    "op1": { "type": "read", "path": ["accumulator"] },
    "op2": {
      "type": "mul",
      "op1": { "type": "read", "path": ["item", "price"] },
      "op2": { "type": "read", "path": ["item", "quantity"] }
    }
  }
}
```

| Поле | Описание |
|------|----------|
| `collection` | Выражение → массив |
| `aggregator` | Выражение, вычисляемое на каждой итерации |

### Контекст итерации

На каждом шаге доступен контекст:

| Path | Значение |
|------|----------|
| `["accumulator"]` | текущий аккумулятор (старт: `0`) |
| `["item", ...]` | поля текущего элемента массива |

### Пустой массив

`reduce` по `[]` → `0`.

`collection` не массив → `INVALID_OPERAND`.

---

## `find`

Поиск **первого** элемента массива, для которого предикат истинен. Семантика как у `Array.find`.

```json
{
  "type": "find",
  "collection": { "type": "read", "path": ["equipment"] },
  "predicate": {
    "type": "strictEq",
    "left": { "type": "read", "path": ["item", "name"] },
    "right": { "type": "literal", "value": "router" }
  },
  "path": ["prop", "path"]
}
```

| Поле | Обязательно | Описание |
|------|-------------|----------|
| `collection` | да | Выражение → массив |
| `predicate` | да | Условие отбора |
| `path` | нет | Если задан — вернуть поле найденного элемента вместо всего объекта |

### Контекст предиката

Только `{ item: <текущий элемент> }`. Корневой source в предикат не пробрасывается.

### Результат

| Ситуация | Результат |
|----------|-----------|
| Элемент найден, без `path` | весь объект элемента |
| Элемент найден, с `path` | значение по path на элементе |
| Не найден | `undefined` (как JS `Array.find`) |

### Вложенный `find` в предикате

Внутренний `find` в `predicate` внешнего работает как truthiness: найденный объект → `true`, `undefined` → `false`.

```json
{
  "type": "find",
  "collection": { "type": "read", "path": ["equipment"] },
  "predicate": {
    "type": "find",
    "collection": { "type": "read", "path": ["item", "nested_collection"] },
    "predicate": {
      "type": "eq",
      "left": { "type": "read", "path": ["item", "some_property"] },
      "right": { "type": "literal", "value": "some_string_value" }
    }
  }
}
```

Полный пример — [examples.md](./examples.md#nested-find).
