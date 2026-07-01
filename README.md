# json_dsl

Zero-dependency интерпретатор JSON DSL: описываете вычисления в JSON, получаете результаты из ваших данных.

```typescript
import { dslInterpreter } from 'json_dsl';

const results = dslInterpreter(sourceData, program);
// [{ id: 'ip1', value: 500 }, { id: 'etotal1', value: 740 }]
```

## Установка

Требуется **Node.js 22+**.

```bash
nvm use
npm install json_dsl
```

Для разработки из репозитория:

```bash
git clone <repo-url>
cd json_dsl
nvm use && npm install
npm test
```

## Быстрый старт

**Данные:**

```json
{
  "cart": {
    "items": [{ "price": 500, "quantity": 2 }]
  },
  "equipment": [
    { "name": "router", "price": 30, "quantity": 22 }
  ]
}
```

**Программа:**

```json
{
  "version": "1.0",
  "computations": [
    {
      "type": "read",
      "path": ["cart", "items", 0, "price"],
      "id": "ip1"
    },
    {
      "type": "reduce",
      "collection": { "type": "read", "path": ["equipment"] },
      "aggregator": {
        "type": "sum",
        "op1": { "type": "read", "path": ["accumulator"] },
        "op2": {
          "type": "mul",
          "op1": { "type": "read", "path": ["item", "price"] },
          "op2": { "type": "read", "path": ["item", "quantity"] }
        }
      },
      "id": "etotal1"
    }
  ]
}
```

**Результат:** цена первого товара (`500`) и сумма по equipment (`660` для одного router).

Полный fixture: [tests/fixtures/cart-equipment.json](tests/fixtures/cart-equipment.json).

## Документация языка

| Раздел | Содержание |
|--------|------------|
| [Обзор](docs/language/overview.md) | программа, API, порядок вычислений |
| [Доступ к данным](docs/language/data-access.md) | `read`, `literal`, path |
| [Арифметика](docs/language/arithmetic.md) | `sum`, `mul`, `sumString` |
| [Коллекции](docs/language/collections.md) | `reduce`, `find` |
| [Логика](docs/language/logic.md) | `eq`, `strictEq`, `and`, `or`, `not` |
| [Приведение типов](docs/language/coercion.md) | `toNumber`, `toString` |
| [Ошибки](docs/language/errors.md) | `DslError` и коды |
| [Примеры](docs/language/examples.md) | сценарии из fixtures |

## Для контрибьюторов

Процесс разработки (SDD, тесты, specs) — [AGENTS.md](AGENTS.md).

## Лицензия

ISC
