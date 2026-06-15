---
type: entity
tags: [tech, ci-cd, github, deploy, automation]
date: 2026-05-06
url: https://docs.github.com/en/actions
---

# GitHub Actions

## Зачем

CI/CD платформа GitHub. Автоматическая проверка кода + деплой при каждом пуш.

## Как работает

Workflow — YAML-файл в `.github/workflows/`. Триггерится событием (push, PR). Состоит из jobs, каждый job = набор steps в виртуальной машине.

## Типичный workflow для фронтенда

Два job в одном workflow:

### 1. check

- `npm ci` — установка зависимостей
- `npx biome check src/` — линт + формат
- `npx tsc --noEmit` — проверка типов

### 2. deploy (только если check зелёный)

- `npm ci` + `npm run build`
- Деплой билда в целевой репозиторий/платформу

## Паттерн: двухрепозиторный деплой

GitHub Pages из приватного репо требует GitHub Pro ($4/мес). Деплой в отдельный публичный репо — бесплатный, исходники закрыты.

```
main (приватный репо)
  → Actions: check (lint + typecheck)
  → Actions: deploy (build → dist/)
  → peaceiris/actions-gh-pages пушит dist/ в gh-pages бранч
  → публичный деплой-репо
  → GitHub Pages раздаёт из gh-pages
```

### PAT

Fine-grained Personal Access Token с доступом только к деплой-репо, permission Contents→Read+Write. Хранится как секрет в приватном репо.

### gh-pages бранч

GitHub Pages раздаёт статику только из бранча репозитория. CI пушит билд в `gh-pages`, Pages читает оттуда. Каждый деплой полностью перезаписывает содержимое.

## Ускорение CI: кэш

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: 'npm'
```

Кэширует `~/.npm` между runs. `npm ci` берёт пакеты из кэша вместо сети.

## Версия Node: .nvmrc

Файл `.nvmrc` в корне проекта фиксирует версию Node. CI и локальная разработка используют одну версию:

```
22
```

## Ключевые команды

| Команда | Что делает |
|---------|-----------|
| `gh run list` | Список запусков |
| `gh run view <id>` | Детали запуска |
| `gh run view --web` | Открыть в браузере |

## Почему не GitLab CI / CircleCI / Netlify

- GitHub Actions — нативный для GitHub, нулевой конфиг доступа
- Netlify/Cloudflare Pages — альтернативы для статики, но не для произвольных workflows
- Переход на другую CI — если GitHub перестанет устраивать

## Документация

- https://docs.github.com/en/actions — документация
- https://github.com/peaceiris/actions-gh-pages — action для деплоя

## Связанные страницы

- [[vite]] — build-конфиг (conditional base path)
- [[biome]] — линт в CI
- [[typescript]] — tsc в CI
- [[yaml]] -- синтаксис workflow-файлов
- [[ci-failure-debugging]] -- паттерн отладки failing CI checks