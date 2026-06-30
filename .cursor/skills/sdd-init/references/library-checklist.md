# Library checklist

Gaps to check before scoring confidence for `repo-type=library`.

## API surface

- [ ] Public function name and signature defined
- [ ] Input types (source data, DSL program) described
- [ ] Output shape defined (`[{ id, value }]` or other)
- [ ] Error model: throw vs Result

## DSL semantics

- [ ] Node types listed (`read`, `reduce`, `sum`, `mul`, …)
- [ ] Path resolution rules
- [ ] Reduce: empty collection behavior
- [ ] Evaluation order (sequential vs dependency graph)
- [ ] Version field in DSL program

## Constraints

- [ ] Zero runtime dependencies confirmed
- [ ] Sync vs async
- [ ] ESM vs dual package

## Testability

- [ ] At least one end-to-end fixture (source + DSL → output)
- [ ] Edge cases identified or marked `[TBD]`

## Non-goals

- [ ] Minimum 3 explicit non-goals for v0.1
