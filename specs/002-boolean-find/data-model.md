# Data model: Boolean expressions + find

**Plan:** [plan.md](./plan.md)  
**Дата:** 2026-06-30

## Новые узлы

### LiteralNode

| Field | Type |
|-------|------|
| `type` | `"literal"` |
| `value` | `string \| number \| boolean \| null` |

### EqNode

| Field | Type |
|-------|------|
| `type` | `"eq"` |
| `left` | `DslNode` |
| `right` | `DslNode` |

### AndNode / OrNode

| Field | Type |
|-------|------|
| `type` | `"and"` \| `"or"` |
| `op1` | `DslNode` |
| `op2` | `DslNode` |

### NotNode

| Field | Type |
|-------|------|
| `type` | `"not"` |
| `op` | `DslNode` |

### FindNode

| Field | Type | Required |
|-------|------|----------|
| `type` | `"find"` | yes |
| `collection` | `DslNode` | yes |
| `predicate` | `DslNode` | yes |
| `path` | `(string \| number)[]` | no |

## Predicate context

```typescript
type FindContext = { item: unknown };
```

Eval `predicate` с `{ item: element }`. Родительский source context **не** пробрасывается в предикат (только `item`), как для `accumulator`/`item` в reduce.

## Predicate truthiness

| Eval result | Used as predicate |
|-------------|-------------------|
| `boolean` | as-is |
| `find` node result (object/null) | `true` if not `null` |
| other non-boolean | throw `INVALID_OPERAND` |

## DslErrorCode (расширение)

Добавить без нового ADR — в рамках `INVALID_OPERAND` для не-boolean в `and`/`or`/`not`.

## Пример TC-101 (сокращённо)

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
  },
  "path": ["prop", "path"]
}
```
