# Definition of Done

**Проект:** json_dsl  
**Версия:** 0.1  
**Дата:** 2026-06-30

## DoD: фича (spec-level)

Фича считается **готовой**, когда выполнены **все** пункты:

### Spec & docs

- [ ] `specs/NNN-*/spec.md` approved и соответствует constitution
- [ ] Все REQ/EDGE из spec покрыты unit-тестами
- [ ] Glossary обновлён, если появились новые термины
- [ ] `docs/language/` обновлён (или README, если затронут quick start)
- [ ] Verifier: каждый `case` в `src/eval.ts` описан в `docs/language/`

### Code

- [ ] TypeScript strict — без ошибок (`npm run typecheck`)
- [ ] Pure functions, no I/O
- [ ] `dependencies` в `package.json` пуст (zero runtime deps)

### Tests

- [ ] Все REQ/EDGE из spec имеют тесты **до** начала реализации
- [ ] Ревью тестов владельцем пройдено (gate в `tasks.md`)
- [ ] Unit tests для всех публичных путей и edge cases из spec
- [ ] `npm test` green (после фазы реализации)

### Tasks

- [ ] Все задачи в `tasks.md` отмечены `[x]`
- [ ] Verifier role прошёл review

## DoD: библиотека (library level)

- [ ] Публичный API задокументирован в spec и `docs/language/overview.md`
- [ ] Constitution compliance check пройден
- [ ] ADR для всех архитектурных решений

## DoD: релиз (release-level)

- [ ] Semver bump при breaking changes
- [ ] Нет secrets в репозитории
