# Plan: [FEATURE_NAME]

**Spec:** [SPEC_PATH]  
**Дата:** [DATE]  
**Статус:** [STATUS]

## Constitution check

- [ ] Zero runtime dependencies
- [ ] Pure function, sync evaluation
- [ ] Unit test coverage для всех REQ/EDGE из spec
- [ ] Новые runtime deps → ADR

## Technical approach

[APPROACH_SUMMARY]

## File changes

### New files

| Path | Purpose |
|------|---------|
| `src/[path]` | [PURPOSE] |
| `tests/[path].test.ts` | Unit tests |

### Modified files

| Path | Change |
|------|--------|
| `[path]` | [CHANGE] |

## Data model

См. [data-model.md](./data-model.md)

## ADR triggers

| Решение | ADR needed? |
|---------|-------------|
| [DECISION] | Yes → `docs/adr/NNNN-*.md` |

## Validation commands

```bash
npm run typecheck
npm test
```

## Risks

| Risk | Mitigation |
|------|------------|
| [RISK] | [MITIGATION] |
