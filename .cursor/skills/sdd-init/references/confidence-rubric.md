# Confidence rubric

Score each dimension 0–20. Total /100. Threshold for artifact generation: **≥95**.

## Dimensions

### Problem Clarity (0–20)

| Score | Criteria |
|-------|----------|
| 0–5 | Непонятно какую проблему решаем |
| 6–10 | Проблема названа, но без evidence |
| 11–15 | Проблема + потребитель API ясны |
| 16–20 | Проблема, потребитель, контекст использования конкретны |

### Goal Definition (0–20)

| Score | Criteria |
|-------|----------|
| 0–5 | Цели размыты или отсутствуют |
| 6–10 | Общие цели без измеримости |
| 11–15 | 2–3 конкретные цели |
| 16–20 | Цели SMART, приоритизированы |

### Success Criteria (0–20)

| Score | Criteria |
|-------|----------|
| 0–5 | Нельзя написать acceptance criteria |
| 6–10 | Успех описан словами «лучше», «удобнее» |
| 11–15 | Есть измеримые критерии для MVP |
| 16–20 | Given-When-Then ready, test fixtures определены |

### Scope Boundaries (0–20)

| Score | Criteria |
|-------|----------|
| 0–5 | Scope не ограничен |
| 6–10 | Частичный scope, non-goals отсутствуют |
| 11–15 | MVP scope + 3+ non-goals |
| 16–20 | Чёткий MVP, non-goals, out-of-scope для v0.1 |

### Consistency (0–20)

| Score | Criteria |
|-------|----------|
| 0–5 | Явные противоречия не разрешены |
| 6–10 | Мелкие противоречия, нужны уточнения |
| 11–15 | Противоречия отмечены и разрешены |
| 16–20 | Внутренне согласованный dump |

## Threshold actions

| Total | Action |
|-------|--------|
| <70 | 5+ вопросов, lowest dimensions first |
| 70–84 | 3–5 вопросов |
| 85–94 | 1–2 вопроса |
| ≥95 | Generate draft artifacts |

## Conservative scoring

При сомнении между уровнями — выбирай **нижний**.
