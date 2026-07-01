# Доступ к данным

## Path

Путь — массив ключей и индексов:

```json
["cart", "items", 0, "price"]
```

- **строка** — ключ объекта
- **число** — индекс массива (с нуля)

Несуществующий ключ или индекс → ошибка `PATH_NOT_FOUND`.

## `read`

Читает значение по path из **текущего контекста**.

```json
{
  "type": "read",
  "path": ["cart", "items", 0, "price"]
}
```

### Контексты

| Где используется | Контекст |
|------------------|----------|
| Top-level в `computations` | корневой `sourceData` |
| Внутри `reduce` / `find` | см. [collections.md](./collections.md) — `item`, `accumulator` |

### Пример

Source: `{ "cart": { "items": [{ "price": 500 }] } }`  
Узел: `read` с path `["cart", "items", 0, "price"]`  
→ `500`

## `literal`

Константа в выражении.

```json
{ "type": "literal", "value": "hello" }
```

Допустимые типы `value`: `string`, `number`, `boolean`, `null`.

Используется в сравнениях, агрегаторах и т.д., когда значение не берётся из source.
