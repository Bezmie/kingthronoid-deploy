---
type: concept
tags: [testing, playwright, automation, web, strategy]
date: 2026-05-23
sources: [2026-05-23-anthropic-webapp-testing-skill]
---

# Webapp Automation Strategy

Стратегия автоматизации тестирования web-приложений через Playwright: reconnaissance-then-action, selector discovery, server lifecycle. Извлечено из Anthropic webapp-testing skill.

## Reconnaissance-Then-Action

Не угадывать селекторы -- обнаруживать из rendered state:
1. Navigate + wait for `networkidle`
2. Inspect DOM: screenshot, `page.content()`, `page.locator('button').all()`
3. Identify selectors из inspection
4. Execute actions с discovered selectors

## Decision Tree

```
Static HTML? -> read file directly -> identify selectors
Dynamic webapp? -> server running?
  No -> start server (with_server.py or manual)
  Yes -> reconnaissance-then-action
```

## networkidle Pitfall

На динамических приложениях: НЕ инспектировать DOM до `page.wait_for_load_state('networkidle')`. JS может быть ещё не выполнен. Inspect до networkidle = stale/empty DOM.

## Server Lifecycle

Automation script = только Playwright logic. Серверы managed отдельно:
- Single server: `with_server.py --server "npm run dev" --port 5173 -- python script.py`
- Multiple servers: `with_server.py --server "backend" --port 3000 --server "frontend" --port 5173 -- python script.py`
- Или: dev server в persistent TTY session + Playwright подключается к running server

## Selector Strategy

- Descriptive selectors: `text=`, `role=`, CSS selectors, IDs
- `page.wait_for_selector()` для timing
- `page.locator()` для множественных элементов
- Избегать хрупких selectors (n-th child, auto-generated IDs)

## Отношение к iterative-ui-qa

iterative-ui-qa = ЧТО проверить (QA inventory, signoff, functional/visual split).
webapp-automation-strategy = КАК проверить программно (DOM inspection, selectors, server lifecycle).
Complementary: QA-процесс + стратегия автоматизации = полный подход к тестированию.

## Связанные

- [[iterative-ui-qa]] -- QA process (ЧТО)
- [[entities/vite]] -- Vite dev server
- [[ci-failure-debugging]] -- CI failure отладка
