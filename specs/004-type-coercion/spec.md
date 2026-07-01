# Spec: Type coercion — toNumber / toString

**ID:** 004-type-coercion  
**Дата:** 2026-06-30  
**Статус:** approved

## Overview

Унарные узлы преобразования типов `string` ↔ `number`, по семантике JS `Number()` / `String()`.

## Узлы DSL

### `toNumber`

```json
{ "type": "toNumber", "op": { "type": "literal", "value": "42" } }
```

→ `42`

### `toString`

```json
{ "type": "toString", "op": { "type": "literal", "value": 42 } }
```

→ `"42"`

## Requirements

| ID | Given | When | Then |
|----|-------|------|------|
| REQ-301 | string `"42"` | `toNumber` | `42` |
| REQ-302 | number `42` | `toString` | `"42"` |
| REQ-303 | pipeline | `toString` → `sumString` или `toNumber` → `sum` | корректная цепочка |

## Edge cases

| ID | Сценарий | Поведение |
|----|----------|-----------|
| EDGE-301 | `toNumber` операнд не `string` | `INVALID_OPERAND` |
| EDGE-302 | `toNumber` → `NaN` (напр. `"abc"`) | `INVALID_OPERAND` |
| EDGE-303 | `toString` операнд не `number` | `INVALID_OPERAND` |
