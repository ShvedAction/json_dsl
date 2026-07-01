# Арифметика и строки

Все арифметические узлы — **бинарные**: `op1` и `op2` — вложенные выражения.

## `sum`

Сложение **чисел**.

```json
{
  "type": "sum",
  "op1": { "type": "literal", "value": 10 },
  "op2": { "type": "literal", "value": 5 }
}
```

→ `15`

Операнды должны быть `number`, иначе `INVALID_OPERAND`.

## `mul`

Умножение **чисел**.

```json
{
  "type": "mul",
  "op1": { "type": "read", "path": ["item", "price"] },
  "op2": { "type": "read", "path": ["item", "quantity"] }
}
```

Операнды должны быть `number`.

## `sumString`

Конкатенация **строк** (аналог `+` для string в JS).

```json
{
  "type": "sumString",
  "op1": { "type": "literal", "value": "hello" },
  "op2": { "type": "literal", "value": " world" }
}
```

→ `"hello world"`

Операнды должны быть `string`.

## Цепочки

Узлы вкладываются произвольно:

```json
{
  "type": "sum",
  "op1": { "type": "mul", "op1": { ... }, "op2": { ... } },
  "op2": { "type": "read", "path": ["accumulator"] }
}
```

Для преобразования типов перед арифметикой см. [coercion.md](./coercion.md).
