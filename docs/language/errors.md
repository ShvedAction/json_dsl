# Ошибки

Интерпретатор бросает `DslError` с полем `code`. Это **не** часть результата `dslInterpreter` — исключение прерывает выполнение.

```typescript
import { dslInterpreter, DslError } from 'json_dsl';

try {
  dslInterpreter(source, program);
} catch (err) {
  if (err instanceof DslError) {
    console.log(err.code); // 'PATH_NOT_FOUND' | ...
  }
}
```

## Коды

| Код | Когда |
|-----|--------|
| `PATH_NOT_FOUND` | `read` / path указывает на несуществующий ключ, индекс или промежуточный `null`/`undefined` |
| `UNKNOWN_NODE` | неизвестный `type` узла |
| `INVALID_OPERAND` | неверный тип операнда (`sum` не number, `not` не boolean, `find.collection` не массив, `toNumber` → NaN и т.д.) |

## Что не является ошибкой

| Ситуация | Поведение |
|----------|-----------|
| `find` ничего не нашёл | `value: undefined` в результате |
| `reduce` по пустому массиву | `0` |

См. [collections.md](./collections.md).
