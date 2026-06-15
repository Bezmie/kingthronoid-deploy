---
type: concept
tags: [testing, qa, ui, iterative, viewport, web-game]
date: 2026-05-23
sources: [2026-05-23-openai-playwright-interactive-skill]
---

# Iterative UI QA

Паттерн итеративного тестирования UI: персистентная сессия, QA inventory, раздельные functional/visual проходы, signoff-критерии. Извлечено из OpenAI playwright-interactive skill.

## QA Inventory

Перед тестированием составляется инвентарь: claims x controls x states.

Источники инвентаря:
1. Требования пользователя
2. Реализованные user-visible features
3. Claims в финальном ответе/отчёте

Каждый элемент инвентаря -> минимум одна проверка. Добавить >=2 exploratory-сценария (off-happy-path).

Для каждого claim или control-state pair: functional check, конкретное состояние для visual check, ожидаемый evidence.

## Functional QA

- Реальный пользовательский ввод (клик, тач, клавиатура)
- Минимум один end-to-end critical flow
- Подтверждение visible result, не только internal state
- Для realtime/animation-heavy -- проверка под реальным timing
- Покрыть каждый visible control, не только happy path
- Reversible controls/toggles -> полный цикл: initial -> changed -> back to initial
- `page.evaluate(...)` может инспектировать state, но не считается signoff input

## Visual QA

Отдельный проход от functional QA. Общая coverage-база из QA inventory.

- Каждый claim проверяется в конкретном состоянии, где он должен восприниматься
- Inspect initial viewport before scrolling
- Inspect все required visible regions, не только main surface
- Если motion/transitions -- inspect минимум одно in-transition состояние
- Для dynamic visuals -- inspect достаточно долго для оценки stability/layering/readability
- Для dense-after-interaction interfaces -- inspect densest realistic state
- Distinguish presence from implementation: технически есть, но нечитаемо (контраст, occlusion, clipping) = visual failure

## Viewport Fit

Обязательная проверка. Скриншот = primary evidence, метрики = secondary.

- Для fixed-shell (игры): скролл не оправдание для clipping
- Проверять region bounds, не document bounds
- Document-level scroll metrics могут быть чистыми при реальном clipping внутри контейнеров

## Signoff

Три независимых проверки, каждая проходит отдельно:
1. Functional correctness -- real user input, critical flows, exploratory pass
2. Viewport fit -- intended initial view без clipping/overflow
3. Visual quality -- intentional, coherent, aesthetically not weak

Одна не подразумевает другую.

Negative confirmation: какие классы дефектов проверены и не найдены.

## Exploratory Pass

30-90с "свободного" тестирования после scripted checks. Если найдены новые states/controls -> добавить в QA inventory и покрыть.

## Persistent Session

Один браузер живёт через итерации:
- Renderer-only изменение -> reload
- Startup/main-process -> relaunch
- Не перезапускать whole toolchain после каждого изменения

## Mobile Context

Отдельный viewport + touch для мобильных контекстов. Критично для web-игр на платформах с мобильным трафиком (Yandex Games).

## Связанные

- [[agent-workflow]] -- операционные процедуры агента
- [[game-loop-pattern]] -- game loop + update method
- [[webapp-automation-strategy]] -- КАК автоматизировать проверки (Playwright)
- ui-update-protocol -- протокол обновления UI (kingthronoid)
