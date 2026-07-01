# Логические выражения

Используются в предикатах `find`, в комбинации с другими узлами и (в будущем) везде, где нужно условие.

## `eq` — абстрактное равенство (`==`)

```json
{
  "type": "eq",
  "left": { "type": "literal", "value": 1 },
  "right": { "type": "literal", "value": "1" }
}
```

→ `true` (как JS `==`, с приведением типов)

## `strictEq` — строгое равенство (`===`)

```json
{
  "type": "strictEq",
  "left": { "type": "literal", "value": 1 },
  "right": { "type": "literal", "value": "1" }
}
```

→ `false` (как JS `===`)

Для сравнения строк без coercion используйте `strictEq`.

## `and` / `or`

Бинарные, оба операнда должны быть `boolean`.

```json
{
  "type": "and",
  "op1": { "type": "strictEq", "left": { ... }, "right": { ... } },
  "op2": { "type": "strictEq", "left": { ... }, "right": { ... } }
}
```

## `not`

Унарный инвертор. Операнд должен быть `boolean`.

```json
{ "type": "not", "op": { "type": "literal", "value": true } }
```

→ `false`

Не-boolean операнд в `and` / `or` / `not` → `INVALID_OPERAND`.
