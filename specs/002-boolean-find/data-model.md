# Data model: Boolean expressions + find

**Plan:** [plan.md](./plan.md)  
**Дата:** 2026-06-30

## Новые узлы

### LiteralNode

| Field | Type |
|-------|------|
| `type` | `"literal"` |
| `value` | `string \| number \| boolean \| null` |

### EqNode (`==`)

| Field | Type |
|-------|------|
| `type` | `"eq"` |
| `left` | `DslNode` |
| `right` | `DslNode` |

Eval: `left == right` (JS abstract equality).

### StrictEqNode (`===`)

| Field | Type |
|-------|------|
| `type` | `"strictEq"` |
| `left` | `DslNode` |
| `right` | `DslNode` |

Eval: `left === right` (JS strict equality).

### AndNode / OrNode / NotNode

Без изменений — см. spec.

### FindNode

Возвращает `unknown | undefined`. Как `Array.find`.

## Predicate truthiness

| Eval result | Used as predicate |
|-------------|-------------------|
| `boolean` | as-is |
| `find` result | JS truthiness (`undefined` → false) |
| other non-boolean | throw `INVALID_OPERAND` |

## Пример TC-101

Внутренний предикат — `eq` (`==`):

```json
{
  "type": "eq",
  "left": { "type": "read", "path": ["item", "some_property"] },
  "right": { "type": "literal", "value": "some_string_value" }
}
```
