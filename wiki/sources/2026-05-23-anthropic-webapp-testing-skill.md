---
type: source
tags: [testing, playwright, automation, web, ui-testing]
date: 2026-05-23
---
[source](raw/2026-05-23-anthropic-webapp-testing-skill.md)

# Webapp Testing (Anthropic)

Anthropic skills repo, `skills/webapp-testing`. Playwright automation toolkit: reconnaissance-then-action pattern, server lifecycle, selector discovery.

## Ключевые тезисы

1. **Reconnaissance-then-action**: сначала inspect DOM (screenshot, content, locators), потом identify selectors, потом execute actions. Не угадывать селекторы -- обнаруживать из rendered state

2. **Decision tree**: static HTML -> read file directly -> selectors. Dynamic webapp -> server running? -> with_server.py или прямое подключение -> reconnaissance-then-action

3. **networkidle pitfall**: не инспектировать DOM до `page.wait_for_load_state('networkidle')` на динамических приложениях. JS может быть ещё не выполнен

4. **Server lifecycle**: with_server.py manages server start/stop. Supports multiple servers (backend + frontend). Playwright script = только automation logic, серверы managed отдельно

5. **Black-box scripts**: bundled scripts = вызывать через --help, не читать source. Сэкономить context window

6. **Selector strategy**: text=, role=, CSS selectors, IDs -- предпочтительнее descriptive selectors. `page.wait_for_selector()` для timing

## Отличие от iterative-ui-qa

iterative-ui-qa = QA process (inventory, functional/visual split, signoff). webapp-testing = automation strategy (DOM inspection, selector discovery, server lifecycle). Complementary: QA process определяет ЧТО проверить, automation strategy определяет КАК проверить программно.

## Связанные концепции

- [[agent-skills-architecture]] — архитектура навыков (black-box scripts, progressive disclosure)
- iterative-ui-qa -- QA process (complementary)
- entities/vite -- Vite dev server
