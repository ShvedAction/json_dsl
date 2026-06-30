# Definition of Done

**Проект:** [PROJECT_NAME]  
**Версия:** [VERSION]  
**Дата:** [DATE]

## DoD: фича (spec-level)

Фича считается **готовой**, когда выполнены **все** пункты:

### Spec & docs

- [ ] `specs/NNN-*/spec.md` approved и соответствует constitution
- [ ] Все REQ/EDGE из spec покрыты unit-тестами
- [ ] Glossary обновлён, если появились новые термины

### Code

- [ ] TypeScript strict — без ошибок (`npm run typecheck`)
- [ ] Pure functions, no I/O
- [ ] `dependencies` в `package.json` пуст (zero runtime deps)

### Tests

- [ ] Unit tests для всех публичных путей и edge cases из spec
- [ ] `npm test` green

### Tasks

- [ ] Все задачи в `tasks.md` отмечены `[x]`
- [ ] Verifier role прошёл review

## DoD: библиотека (library level)

- [ ] Публичный API задокументирован в spec
- [ ] Constitution compliance check пройден
- [ ] ADR для всех архитектурных решений

## DoD: релиз (release-level)

- [ ] Semver bump при breaking changes
- [ ] Нет secrets в репозитории
