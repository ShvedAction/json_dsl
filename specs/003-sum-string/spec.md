# Spec: sumString

**ID:** 003-sum-string  
**Дата:** 2026-06-30  
**Статус:** approved  
**Зависит от:** [001-core-interpreter](../001-core-interpreter/spec.md)

## Overview

Узел `sumString` — бинарная конкатенация строк (`op1 + op2`), по аналогии с `sum` для чисел.

## Узел DSL

```json
{
  "type": "sumString",
  "op1": { "type": "literal", "value": "a" },
  "op2": { "type": "literal", "value": "b" }
}
```

→ `"ab"`

## Requirements

| ID | Given | When | Then |
|----|-------|------|------|
| REQ-201 | два string | `sumString` | конкатенация |
| REQ-202 | `sumString` в computation | `dslInterpreter` | `{ id, value }` с результатом |

## Edge cases

| ID | Сценарий | Поведение |
|----|----------|-----------|
| EDGE-201 | операнд не `string` | throw `INVALID_OPERAND` |

## Test cases

| ID | Input | Expected |
|----|-------|----------|
| TC-201 | `"hello"` + `" world"` | `"hello world"` |

## Покрытие

| REQ/EDGE | Файл | Тест |
|----------|------|------|
| REQ-201 | `tests/sumString.test.ts` | concatenates two strings |
| EDGE-201 | `tests/sumString.test.ts` | non-string operand |
| REQ-202 | `tests/sumString.test.ts` | via dslInterpreter |
