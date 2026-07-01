# Brain dump: type coercion

Унарные преобразования string ↔ number:

- `toNumber` — `string` → `number` (как `Number()` в JS)
- `toString` — `number` → `string` (как `String()` в JS)

Невалидный вход или `NaN` → `INVALID_OPERAND`.
