---
type: source
tags: [testing, qa, playright, web-game, ui-testing, viewport, agent-skill]
date: 2026-05-23
---
[source](raw/2026-05-23-openai-playwright-interactive-skill.md)

# Playwright Interactive Skill (OpenAI)

OpenAI skills repo, `skills/.curated/playwright-interactive`. Скилл для итеративной отладки web/Electron приложений через персистентную Playwright-сессию с функциональным и визуальным QA.

## Ключевые тезисы

1. **QA Inventory** -- перед тестированием составляется инвентарь: claims x controls x states. Источники: требования пользователя, реализованные features, claims в финальном ответе. Каждый элемент инвентаря -- минимум одна проверка. Добавить >=2 exploratory-сценария

2. **Functional QA != Visual QA** -- два раздельных прохода с общей coverage-базой. Functional = реальный пользовательский ввод. Visual = отдельный проход с проверкой каждого claim в конкретном состоянии. Functional pass не доказывает visual claim

3. **Signoff = 3 независимых проверки** -- functional, viewport fit, visual quality. Каждая проходит отдельно, одна не подразумевает другую. Если скриншот и метрики расходятся -- скриншот приоритетнее

4. **Persistent session** -- один Playwright-браузер живёт через итерации. Renderer-only изменение -> reload. Startup/main-process -> relaunch. Не перезапускать whole toolchain после каждого изменения

5. **Viewport fit** -- обязательная проверка на clipping/overflow. Для fixed-shell (игры!) -- скролл не оправдание. Проверять region bounds, не только document bounds. Document-level scroll metrics могут выглядеть чистыми при реальном clipping внутри фиксированных контейнеров

6. **Exploratory pass** -- 30-90с "свободного" тестирования после scripted checks. Если найдены новые состояния/controls -- добавить в QA inventory и покрыть

7. **Mobile context** -- отдельный Playwright-контекст с mobile viewport + touch. Критично для web-игр на платформах с мобильным трафиком

8. **Signoff-критерии**: coverage explicit против QA inventory, каждый claim имеет matching visual check + screenshot, exploratory pass выполнен, negative confirmation -- какие дефекты проверены и не найдены

## Применение к проекту

Релевантно для web-game разработки (Kingthronoid и аналоги):
- QA inventory паттерн применим к любой interactive UI
- Functional/visual split особенно важен для игр -- механика может работать корректно, но визуально нечитаемо
- Viewport fit критичен для fixed-shell игр (Yandex Games -- встраивание в iframe)
- Mobile context обязателен -- мобильный трафик доминирует на Yandex Games
- Persistent session -- ускоряет итеративную отладку при работе с Vite dev server

Игнорируемое (Codex-специфика): `js_repl`, `codex.emitImage()`, sandbox-конфиг, Electron-секции, CSS-нормализация для model-bound screenshots

## Связанные концепции

- [[iterative-ui-qa]] -- извлечённый паттерн итеративного UI QA
- [[agent-workflow]] -- операционные процедуры агента
- [[game-loop-pattern]] -- game loop + update method
- ui-update-protocol -- протокол обновления UI (kingthronoid)
