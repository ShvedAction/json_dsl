---
name: sdd-docs-language
description: >-
  Sync consumer-facing DSL documentation in README.md and docs/language/ after
  new nodes, semantic changes, or releases. Use after feature implementation,
  during sdd-maintain archive, or when Verifier checks doc drift vs eval.ts.
---

# SDD Docs Language — consumer documentation sync

Потребительская документация **не** дублирует `specs/` — это краткий reference с примерами JSON.

## Когда использовать

- Новый узел DSL (`type` в `src/eval.ts`)
- Изменение семантики существующего узла
- Verifier phase после фичи
- Archive в `sdd-maintain`
- Подготовка релиза

## Карта узлов → файлы

| Узлы | Файл |
|------|------|
| program, API, порядок eval | `docs/language/overview.md` |
| `read`, `literal`, path | `docs/language/data-access.md` |
| `sum`, `mul`, `sumString` | `docs/language/arithmetic.md` |
| `reduce`, `find` | `docs/language/collections.md` |
| `eq`, `strictEq`, `and`, `or`, `not` | `docs/language/logic.md` |
| `toNumber`, `toString` | `docs/language/coercion.md` |
| `DslError`, коды | `docs/language/errors.md` |
| end-to-end сценарии | `docs/language/examples.md` |

## Checklist

1. Прочитать `src/eval.ts` — список `case` = полный набор узлов
2. Для каждого нового/изменённого `type`:
   - [ ] Раздел в `docs/language/*.md` обновлён (поля, пример, edge cases)
   - [ ] Пример из `tests/fixtures/` или теста (не выдумывать)
   - [ ] При необходимости — строка в `docs/language/examples.md`
3. Если меняется quick start → обновить `README.md`
4. Таблица узлов в `overview.md` актуальна
5. **Не** копировать REQ/EDGE таблицы из spec — пересказ для потребителя

## Drift detection

```
src/eval.ts switch cases  ↔  docs/language/*.md headings / tables
```

Лишний узел в docs без кода — удалить. Узел в коде без docs — добавить.

## Handoff

После doc sync → Verifier может закрывать DoD фичи.
