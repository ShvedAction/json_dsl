# DSL Интерпретатор: Оригинальные Требования

## 🎯 Задача

Создать универсальный DSL интерпретатор, который принимает на вход:
1. **Объект с исходными данными** (например, `{ cart, equipment }`)
2. **DSL объект** с инструкциями для вычислений

Интерпретатор должен вычислить значения по инструкции DSL из первого объекта.

## 🔧 Ключевые требования

### Функциональность:
- **Граф вычислений** - реализовать зависимость между свойствами
- **Reduce операции** - поддержка агрегации по коллекциям


## 📊 Пример: E-commerce корзина

### Входные данные (Source Data):
```json
{
  "cart": {
    "items": [
      {"price": 500, "quantity": 2, "category": "electronics"},
      {"price": 100, "quantity": 1, "category": "books"}
    ],
    "discount": 50,
    "coupon": "PROMO123"
  },
  "equipment": [
    {"name": "router", "price": 30, "available": true, "quantity": 22},
    {"name": "cable", "price": 10, "available": false, "quantity": 3},
    {"name": "modem", "price": 50, "available": true, "quantity": 1}
  ]
}
```

### DSL объект (Instructions):
```json
{
  "version": "1.0",
  "computations": [
    {
        "type": "read",
        "path": ["cart", "items", 0, "price"],
        "id": "ip1",
    },
    {
        "type": "reduce",
        "collection": {"type": "read", "path": ["equipment"]}
        "aggregator": { 
            "type": "sum",
            "op1": {"type": "read", "path": ["accumulator"]},
            "op2": {
                "type": "mul", 
                "op1": {"type": "read", "path": ["item", "price"]},
                "op2": {"type": "read", "path": ["item", "quantity"]}, 
            }
        },
        "id": "etotal1",
    }
  ]
}
```

## Пример вызова

```typescript

const res = dlsInterpreter(source_data, dls_instruction);

```


### Ожидаемый результат (Output):
```json
[
    {
        "id": "ip1",
        "value": 500,
    },
    {
        "id": "etotal1",
        "value": 740,
    },
]
```
