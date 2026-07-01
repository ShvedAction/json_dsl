# Brain dump: sumString

Конкатенация двух строк — аналог `sum` для чисел.

```json
{
  "type": "sumString",
  "op1": { "type": "literal", "value": "hello" },
  "op2": { "type": "read", "path": ["suffix"] }
}
```

Операнды должны быть `string`; иначе `INVALID_OPERAND`.
