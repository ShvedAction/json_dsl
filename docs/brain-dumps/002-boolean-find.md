# Brain dump: boolean expressions + find

## Задача

Нужны операторы, которые строят условные булиновские выражения, и **`find`** по коллекции.

Целевой паттерн (JS):

```javascript
collection.find(itm =>
  itm.nested_collection.find(itm_nested =>
    itm_nested.some_property == 'some_string_value'
  )
).prop.path;
```

## Семантика

- Сравнение: `eq` (`==`) и `strictEq` (`===`) — как в JS, любые JSON-значения
- Логика: `and`, `or`, `not`
- `find` — как `Array.find`: первый элемент или `undefined`
- Вложенный `find` в предикате
- После нахождения — чтение поля по path (`prop.path`)

## Решения (2026-06-30)

- Операторы: `eq`, `strictEq`, `and`, `or`, `not`
- `find` без совпадения → `undefined` (как JS `Array.find`)
- Сравнение работает для любых JSON-значений по правилам JS `==` / `===`
