# Data model: Core interpreter

**Plan:** [plan.md](./plan.md)  
**Дата:** 2026-06-30

## DslProgram

| Field | Type | Description |
|-------|------|-------------|
| `version` | `string` | Версия схемы DSL (v0.1 не валидируется) |
| `computations` | `Computation[]` | Упорядоченный список вычислений |

## Computation (top-level)

Каждый элемент `computations` имеет `id: string` и тело узла (`type` + поля).

## Node types

### ReadNode

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"read"` | |
| `path` | `(string \| number)[]` | Путь в source или reduce-контексте |

### ReduceNode

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"reduce"` | |
| `collection` | `DslNode` | Узел, возвращающий массив |
| `aggregator` | `DslNode` | Выражение свёртки |

### SumNode

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"sum"` | |
| `op1` | `DslNode` | Левый операнд |
| `op2` | `DslNode` | Правый операнд |

### MulNode

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"mul"` | |
| `op1` | `DslNode` | Левый операнд |
| `op2` | `DslNode` | Правый операнд |

## Path resolution

- Начальный контекст для top-level: `source` (корневой объект)
- Внутри `reduce`: контекст `{ accumulator: number, item: unknown }`
- Path `["accumulator"]` → текущий accumulator
- Path `["item", "price"]` → поле текущего `item`

## Result shape

```typescript
type ComputationResult = { id: string; value: unknown };
```

Выход `dslInterpreter` — `ComputationResult[]` в порядке `computations`.

## Errors

```typescript
class DslError extends Error {
  code: 'PATH_NOT_FOUND' | 'UNKNOWN_NODE' | 'INVALID_OPERAND';
}
```
