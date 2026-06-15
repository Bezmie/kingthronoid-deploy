---
trigger:
  intent: Начать сессию агента
  signals: [старт, начать, start, begin, king]
  project-alias:
    king: kingthronoid
  examples:
    - "start"
    - "старт"
    - "start king"
    - "king"
---
# start

## Base block (always)

1. `node bin/core.js start [--root <project>]` -- wiki health + after-edit + diff + projects + active project context. Unlogged > 0 → предложить log.md
2. Прочитать **behavioural rules** ниже (wiki-first check, goal quality bar, validation gate, wiki writing guard)
2a. Husky pre-commit = `wiki lint --compact`. Failure → commit blocked. Чинь lint, не обходи. Do NOT use `--no-verify` (AGENTS.md ## 3 item 8)
3. `skill caveman` (full по умолчанию) -- terse output mode: drop articles/filler/hedging, fragments OK, short synonyms. Code unchanged. Off: "stop caveman"
4. Русский язык для reasoning + output, английский для технических терминов. Исключения → [[llm-wiki-conventions]] (см. AGENTS.md ## 3 item 9)
5. Если проект определён и `<project>/.agents/hooks/start.md` существует: загрузить и выполнить как **проектное расширение** (дополняет, не переопределяет Base block). Иначе — переход к шагу 6
6. Если проект определён (и не обработан шагом 5): прочитать ROADMAP.md. Фильтр кандидатов: depends выполнены (проверить по wiki/log.md, существование файлов из depends, последние 3 записи в log.md без блокеров) + отсортировать по impact (high→medium→low). Показать ready кандидатов top-3 + их effort. Автор выбирает задачу на сессию
7. **Context loss detection** (на любом turn сессии): если user сигналит "ты меня не понимаешь" / "контекст пропал" / "ты забыл правила" / "ты не знаешь проект" → предложить `core refresh [--root <project>]`. Не auto-run, а prompt с объяснением

## Core CLI

| Команда | Назначение |
|---|---|
| `core start [--root <p>]` | Сессия: wiki health, projects, контекст проекта. Persistent: `--root` сохраняется в `.core-session.json` (AGENTS.md ## 5) |
| `core status [--root <p>]` | Текущее состояние: git, unlogged |
| `core route <message>` | Мэтч сообщения → hook (signal-based routing) |
| `core hooks [--root <p>]` | Список всех хуков и их сигналов |
| `core guard <hook>` | Проверить guard условие хука |
| `core log <type> [desc] [--key val...]` | Запись в wiki/log.md |

## Wiki CLI

| Команда | Назначение |
|---|---|
| `brief` | Обзор wiki (~80 токенов) |
| `context "запрос" -n 3` | BM25 + summary top-3 |
| `context "q" --tags T1,T2 -n 3` | Pre-filter по тегам + BM25 |
| `context "q" --root <project>` | Проектная wiki |
| `context "q" --all` | Core + все проектные wiki. `--all` также для `search`/`brief`/`list` |
| `search "запрос"` | Полнотекстовый BM25 (без summary) |
| `tags "T1,T2"` | Страницы с тегами |
| `links "page"` | Входящие ссылки на страницу |
| `edges "page"` | Typed edges страницы |
| `list [-n N] [--type T]` | Список страниц |
| `orphans` | Страницы без входящих ссылок |
| `broken` | Сломанные `[[links]]` (+ cross-wiki hints на `[[sys:name]]`) |
| `lint` | Полная проверка здоровья (14 категорий: broken, orphans, stale, coverage, и др.) |
| `after-edit` | lint (compact) + diff (unlogged changes) |
| `diff [--since DATE]` | Файлы изменённые после даты |
| `gaps` | Упомянутые но не созданные страницы |
| `coverage` | Raw → source покрытие |
| `promotion-stats` | Кандидаты на повышение типа |
| `synthesis "tag"` | Синтез знаний по тегу |
| `crystallize-prep` | Контекст для кристаллизации знаний |
| `ingest-prep <raw-file>` | Контекст перед ingest |
| `log <last N \| stats \| since DATE>` | Хроника wiki (N записей / статистика / с даты) |
| `graph [--format mermaid\|dot]` | Экспорт link graph |

Полный список: `node wiki/bin/wiki.js --help`

Ссылки: `[[name]]` — wiki-ссылка, `[[sys:name]]` — cross-wiki (из проектной в core)

## Wiki-first check

Перед задачей где wiki может содержать релевантное (паттерны, принципы, rationale, gotchas):
`context "тема" -n 3` (+ `--root <project>` при работе в проекте).
Wiki кураторная — проверка недорога, пропуск дорог.
Не проверять: тривиальные фиксы, форматирование, однозначные вопросы.

## QUERY mode

Ни один hook не сработал. Wiki-first check = шаг 0 перед любым ответом.
1. `brief` → `context "запрос"` → чтение страниц
2. Формат: markdown/таблица/анализ по контексту
3. Ценный ответ → предложить ingest (по согласию)

## Goal quality bar

Размытые цели ("продвинуться", "улучшить") отвергаются. Цель отвечает:
1. Что конкретно станет true?
2. Какая evidence докажет?
3. Количественный порог (или pass/fail)
4. Scope boundaries
5. Stop condition при неуверенности

## Validation Gate

Изменение hook/wiki/AGENTS.md принимается только если проверяемо улучшает результат на representative задачах. Без improvement -- откат. Проверка: before/after на 1-3 задачах (не из контекста правки). Отвергнутые правки -- insight для следующих итераций.

## Wiki writing guard

Перед записью wiki (создание/обновление/удаление):
1. Загрузить hook (`.agents/hooks/<hook>.md`)
2. Загрузить `wiki/concepts/llm-wiki-conventions.md`
3. Следовать процедуре hook'а
Чтение wiki — свободно, протокол не нужен.

## Current project

Текущий проект = проект последней значимой активности. Определяется агентом:
1. **Явно**: пользователь назвал проект ("в кингтроноиде", "go kingthronoid", "start king") -- приоритетнее всех остальных способов. `project-alias` в frontmatter маппит короткие имена (`king` -> `kingthronoid`)
2. **По активности**: 2+ файл-редакции в поддиректории с AGENTS.md + .git/ (если ambiguous -- запросить уточнение)
3. **Не определено** -> CORE

**Маршрутизация по текущему проекту:**
- **Лог**: изменения в проекте -> `<project>/wiki/log.md`. CORE-изменения -> CORE `wiki/log.md`
- **Wiki**: `wiki.js --root <project>` при работе в проекте
- **Hooks**: проектные hooks активны когда текущий проект определён
- **AGENTS.md**: проектный AGENTS.md применяется к работе в проекте

## Hook routing

`core route <message>` — мэтч по signals. `core hooks` — полный список.
Project hooks (`<project>/.agents/hooks/`): приоритетнее CORE (кроме wiki-level: ingest, lint, refactor, integrate, tech-add).

## Hook composition

- **guard**: precondition check (не выполнен → ремедиация). Проверка: `core guard <hook>`
- Guard fail protocol: агент читает `remediation` строку из guard, выполняет предложенное действие, повторяет guard. Если невозможно выполнить — запрашивает пользователя
- Новый hook: формализация повторяющегося паттерна. Agent предлагает, автор подтверждает

### Guards

Structured precondition checks. Реестр: `GUARD_REGISTRY` в `bin/core/lib/route.js:4-18`. Поля: `check(ctx) => boolean` (обязательно), `remediation: string` (при fail), `sideEffect: 'needsLint'` + `note: string` (при pass). Hook frontmatter: `guard: <name>`. Неизвестное имя = pass + warning. 3 имени: `project-context`, `suggest-lint`, `work-completed` (см. AGENTS.md ## 5).

## Core log types

`core log <type> "description" [--root <project>] [--key val...]`. Допустимые типы:
- `session` — начало/конец сессии
- `refactor` — реорганизация кода/структуры
- `feature` — новая фича (проект)
- `deploy` — публикация (проект)
- `fix-ci` — фикс CI/PR checks
- `ingest` — добавление source в wiki
- `integrate` — формализация идей в GDD
- `init-project` — создание проекта
- `tech-add` — добавление зависимости
- `crystallize` — кристаллизация знаний из завершённой работы
- `security-review` — аудит безопасности
