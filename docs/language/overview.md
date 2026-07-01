# Обзор языка

JSON DSL — декларативный язык вычислений поверх JSON-данных. Программа описывает **что** вычислить; интерпретатор выполняет выражения и возвращает результаты.

## API

```typescript
import { dslInterpreter } from 'json_dsl';

const results = dslInterpreter(sourceData, program);
// → [{ id: string, value: unknown }, ...]
```

- **sourceData** — произвольный JSON-объект (корзина, каталог, конфиг и т.д.)
- **program** — объект `DslProgram` с инструкциями

## Структура программы

```json
{
  "version": "1.0",
  "computations": [
    { "type": "read", "path": ["cart", "items", 0, "price"], "id": "ip1" }
  ]
}
```

| Поле | Описание |
|------|----------|
| `version` | Версия схемы (пока не валидируется) |
| `computations` | Упорядоченный список вычислений |

Каждый элемент `computations` — **узел выражения** с обязательным полем `id`. Остальные поля зависят от `type` (см. разделы ниже).

## Порядок выполнения

Вычисления выполняются **последовательно** сверху вниз по массиву `computations`. Ссылки между вычислениями по `id` пока не поддерживаются.

## Формат результата

```json
[
  { "id": "ip1", "value": 500 },
  { "id": "etotal1", "value": 740 }
]
```

Порядок элементов совпадает с порядком в `computations`.

## Узлы выражений

Выражения строятся из узлов (`type` + поля). Узел может вкладываться в другой (например, `read` внутри `sum`).

| Группа | Узлы | Раздел |
|--------|------|--------|
| Данные | `read`, `literal` | [data-access.md](./data-access.md) |
| Арифметика | `sum`, `mul`, `sumString` | [arithmetic.md](./arithmetic.md) |
| Коллекции | `reduce`, `find` | [collections.md](./collections.md) |
| Логика | `eq`, `strictEq`, `and`, `or`, `not` | [logic.md](./logic.md) |
| Приведение типов | `toNumber`, `toString` | [coercion.md](./coercion.md) |

## Ошибки

При невалидном path, неизвестном типе узла или неверных операндах интерпретатор бросает `DslError`. См. [errors.md](./errors.md).

## Примеры

Готовые сценарии — [examples.md](./examples.md).
