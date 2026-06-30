# Spec: Core interpreter — read, reduce, базовые операторы

**ID:** 001-core-interpreter  
**Дата:** 2026-06-30  
**Статус:** approved

## Overview

Реализовать минимальный JSON DSL интерпретатор: одна публичная функция `dslInterpreter`, принимающая source data и DSL program, возвращающая массив `{ id, value }`. Поддержка узлов `read`, `reduce`, `sum`, `mul`. Eval последовательный по `computations[]`.

## Public API

```typescript
export function dslInterpreter(
  source: Record<string, unknown>,
  instructions: DslProgram
): ComputationResult[];

export type ComputationResult = { id: string; value: unknown };

export type DslProgram = {
  version: string;
  computations: Computation[];
};
```

## Requirements

### Functional

| ID | Given | When | Then |
|----|-------|------|------|
| REQ-001 | source с `cart.items[0].price = 500` | computation `read` path `["cart","items",0,"price"]`, id `ip1` | результат содержит `{ id: "ip1", value: 500 }` |
| REQ-002 | source с `equipment` (3 элемента, см. TC-001) | computation `reduce` по equipment, aggregator `sum(accumulator, mul(item.price, item.quantity))`, id `etotal1` | `{ id: "etotal1", value: 740 }` (30×22 + 10×3 + 50×1) |
| REQ-003 | program с 2 computations (REQ-001 + REQ-002) | `dslInterpreter(source, program)` | массив из 2 элементов в порядке `computations` |

### Edge cases

| ID | Сценарий | Ожидаемое поведение |
|----|----------|---------------------|
| EDGE-001 | `equipment` — пустой массив | reduce → `{ value: 0 }` |
| EDGE-002 | path указывает на несуществующий ключ/индекс | throw `DslError`, `code: 'PATH_NOT_FOUND'` |
| EDGE-003 | неизвестный `type` узла | throw `DslError`, `code: 'UNKNOWN_NODE'` |

## Test cases

| ID | Source fixture | DSL | Expected |
|----|----------------|-----|----------|
| TC-001 | `tests/fixtures/cart-equipment.json` → `source` | `tests/fixtures/cart-equipment.json` → `program` | `[{ id: "ip1", value: 500 }, { id: "etotal1", value: 740 }]` |

Расчёт REQ-002: router 30×22=660, cable 10×3=30, modem 50×1=50 → sum=740.

## Out of scope

- Async evaluation
- Ссылки между computations по `id` (граф зависимостей v2)
- Операторы кроме `read`, `reduce`, `sum`, `mul`
- JSON Schema validation входного DSL
- Публикация в npm / `dist/` build

## Non-goals

- UI и визуализация графа
- Расширяемый plugin API для custom operators
- Интернационализация сообщений об ошибках

## Assumptions

- `[ASSUMED]` Начальное значение `accumulator` при reduce — `0` (см. ADR-0001)
- `[ASSUMED]` `mul`/`sum` работают только с числами; нечисловые значения → throw
- `[TBD]` Версия `version` в program пока не валидируется
