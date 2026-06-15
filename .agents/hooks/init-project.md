---
trigger:
  intent: Создать новый проект
  signals: [новый проект, создай проект, инициируй / new project, create project, init project]
  examples:
    - "новый проект"
    - "создай проект"
    - "init project"
---
# init-project

1. Спросить: имя, тип (game/web/other), стек
2. Создать `<project>/`
3. Инициализировать проект (npm/vite/etc) -- по стеку из шага 1
4. Создать `<project>/.gitignore` -- node_modules/, dist/, .cache/ и т.д. по стеку
5. Создать `<project>/AGENTS.md` -- architecture, conventions, paths
6. Создать `<project>/IDEAS.md` -- авторский слой (свободная форма, без конвенций)
7. Создать `<project>/GDD.md` (для игр) или `<project>/spec.md` (для другого) -- проектный документ
8. Создать `<project>/ROADMAP.md` -- план по этапам
9. Создать `<project>/wiki/` (concepts/, entities/, sources/, raw/, .cache/) + начальный `log.md` + `concepts/tech-stack.md` (с `[[sys:]]` ссылками)
10. Добавить директорию проекта в CORE `.gitignore`
11. `git init` в директории проекта + приватный remote
12. Запись в `wiki/log.md` (core wiki): `core log init-project "<project-name>"` (или вручную)
