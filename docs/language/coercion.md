# Приведение типов

Унарные узлы для преобразования `string` ↔ `number`. Семантика как у JS `Number()` и `String()`.

## `toNumber`

`string` → `number`

```json
{ "type": "toNumber", "op": { "type": "literal", "value": "42" } }
```

→ `42`

| Вход | Результат |
|------|-----------|
| `"42"` | `42` |
| `"3.14"` | `3.14` |
| `""` | `0` |
| не `string` | `INVALID_OPERAND` |
| `"abc"` (NaN) | `INVALID_OPERAND` |

## `toString`

`number` → `string`

```json
{ "type": "toString", "op": { "type": "literal", "value": 42 } }
```

→ `"42"`

Не `number` на входе → `INVALID_OPERAND`.

## Цепочки

Строка из source → число → арифметика:

```json
{
  "type": "mul",
  "op1": { "type": "toNumber", "op": { "type": "read", "path": ["qty"] } },
  "op2": { "type": "literal", "value": 10 }
}
```

Число → строка → конкатенация:

```json
{
  "type": "sumString",
  "op1": { "type": "toString", "op": { "type": "literal", "value": 42 } },
  "op2": { "type": "literal", "value": "!" }
}
```

→ `"42!"`
