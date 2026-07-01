# Glossary — json_dsl

**Дата:** 2026-06-30

## Термины

| Термин | Определение |
|--------|-------------|
| **Source data** | Объект с исходными данными, первый аргумент `dslInterpreter` (например `{ cart, equipment }`) |
| **DSL instruction / DSL program** | Объект с полями `version` и `computations[]`, второй аргумент `dslInterpreter` |
| **Computation** | Элемент массива `computations` с уникальным `id` и телом вычисления |
| **Computation graph** | Зависимости между вычислениями; в v0.1 — линейный порядок в `computations[]` |
| **Node** | Узел AST внутри computation (`read`, `reduce`, `sum`, `mul`, `eq`, `find`, …) |
| **literal** | Константное значение в DSL |
| **eq** | Абстрактное равенство `==` (как в JS) |
| **strictEq** | Строгое равенство `===` (как в JS) |
| **and / or / not** | Булевы комбинаторы |
| **find** | Поиск первого элемента массива по предикату; как `Array.find` → элемент или `undefined` |
| **read** | Узел чтения значения по path из source data или reduce-контекста |
| **path** | Массив `(string \| number)[]` — ключи объекта или индексы массива |
| **reduce** | Итерация по коллекции с агрегатором; контекст: `accumulator`, `item` |
| **aggregator** | Выражение свёртки внутри reduce (`sum`, `sumString`, …) |
| **sum** / **mul** | Арифметика над числами |
| **sumString** | Конкатенация двух строк |
| **toNumber** | `string` → `number` (`Number()`) |
| **toString** | `number` → `string` (`String()`) |
| **accumulator** | Текущее накопленное значение при reduce; path `["accumulator"]` |
| **item** | Текущий элемент коллекции при reduce; path `["item", …]` |
| **Result** | `{ id: string, value: unknown }` — один элемент выходного массива |

## Сокращения

| Сокращение | Значение |
|------------|----------|
| REQ | Functional requirement в spec |
| EDGE | Edge case в spec |
| TC | Test case (fixture → expected) |
