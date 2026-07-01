# Примеры

## Корзина и equipment (reduce)

Источник и программа: `tests/fixtures/cart-equipment.json`.

**Задача:** прочитать цену первого товара и посчитать сумму `price × quantity` по equipment.

**Результат:**

```json
[
  { "id": "ip1", "value": 500 },
  { "id": "etotal1", "value": 740 }
]
```

Расчёт: 30×22 + 10×3 + 50×1 = 740.

---

## Nested find {#nested-find}

Источник и программа: `tests/fixtures/nested-find.json` → `program`.

Эквивалент JS:

```javascript
equipment.find(itm =>
  itm.nested_collection.find(n =>
    n.some_property == 'some_string_value'
  )
).prop.path;
```

**Результат:**

```json
[{ "id": "foundPath", "value": "/api/router" }]
```

---

## Строка qty → умножение

Source: `{ "qty": "3" }`

```json
{
  "version": "1.0",
  "computations": [
    {
      "type": "mul",
      "op1": { "type": "toNumber", "op": { "type": "read", "path": ["qty"] } },
      "op2": { "type": "literal", "value": 10 },
      "id": "total"
    }
  ]
}
```

**Результат:** `[{ "id": "total", "value": 30 }]`

---

## Приветствие (sumString)

```json
{
  "version": "1.0",
  "computations": [
    {
      "type": "sumString",
      "op1": { "type": "literal", "value": "hi" },
      "op2": { "type": "read", "path": ["suffix"] },
      "id": "greeting"
    }
  ]
}
```

Source: `{ "suffix": "!" }` → `[{ "id": "greeting", "value": "hi!" }]`
