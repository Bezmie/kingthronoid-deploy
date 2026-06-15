## 1. START

Read `.agents/hooks/start.md`. Маршрутизация по modifier/intent/signals. Нет совпадения -> QUERY mode.

## 2. WIKI ROUTING

Чтение wiki: свободно. Запись wiki → start.md Wiki writing guard.
Запись wiki без протокола = violation.

## 3. CORE ARCHITECTURE

1. No emoji/dangerous Unicode anywhere (code, CLI output, markdown, agent chat). Languages (Russian/etc) OK, symbols like ⚠️🔥❌ forbidden
2. CORE = корневой приватный репо (wiki + кросс-проектные файлы)
3. Projects = поддиректории, каждая со своим приватным репо + AGENTS.md
4. Агент находит проекты: поддиректории с AGENTS.md + .git/
5. Portable: clone CORE + projects -> работа -> push -> удаление
6. Deploy: builds -> публичные репо (GitHub Pages)
7. Новый проект: создать dir -> .gitignore -> git init -> AGENTS.md -> приватный remote
8. После clone CORE: `sh .husky/install.sh`. Устанавливает git hooks из `.husky/` в `.git/hooks/`
   - **pre-commit** запускает `node wiki/bin/wiki.js lint --compact`. При lint failure (broken links и т.п.) → commit блокируется. Чинь lint перед коммитом, не обходи
9. Язык wiki (русский для описаний, английский для технических терминов) — [[llm-wiki-conventions]] ## Page Conventions
## 4. WIKI

`node wiki/bin/wiki.js <command>`. CLI → start.md Wiki CLI. Конвенции → [[llm-wiki-conventions]]. Процедуры → start.md Hook routing.

Структура: `raw/` (immutable) → `sources/` (LLM-суммаризация) → `entities/` (конкретные сущности) → `concepts/` (универсальное знание). Promotion: source→entity→concept (3+ sources). Двухуровневая: core (универсальное) + проектная (specific), cross-link через `[[sys:name]]`.

Options: `--json` (machine-readable), `--compact` (minimal LLM context), `--all` (cross-wiki, для context/search/brief/list).

Rules:
1. wiki/raw/ immutable
2. log.md запись при значимых изменениях. Проектные изменения -> `<project>/wiki/log.md`, CORE -> CORE `wiki/log.md`
3. Предлагать, не навязывать -- создание страниц по согласию
4. Разделять факты и интерпретации

## 5. CORE CLI

`node bin/core.js <command>`. Agent orchestration: start, status, route, hooks, guard, log. → start.md Core CLI.

Code: `bin/core.js` (entry), `bin/core/lib/` (hooks, log, projects, route, status, test/).

### Session (.core-session.json)

Хранится в корне CORE. Определяет активный проект для команд без `--root`.

Пишет:  `core start [--root <p>]` — создаёт/перезаписывает/удаляет
         `core start` без --root — удаляет (CORE mode)
Читают: `core status`, `core route`, `core hooks`, `core guard`, `core log`
Файл:   `{ "activeProject": "<name>" }`. Нет файла = CORE mode.

### Guards (GUARD_REGISTRY)

Guards: structured names in GUARD_REGISTRY (`bin/core/lib/route.js:4-18`). Hook frontmatter `guard:` must use registry key, not free text. Расширенная документация + extension procedure: start.md ## Hook composition → Guards.

3 имени: `project-context` (pass = проект в сессии), `suggest-lint` (pass + note = рекомендует lint), `work-completed` (pass = log entry или git diff есть). Неизвестное имя = pass + warning.

## 6. WIKI CODE

`wiki/bin/wiki.js` (entry), `wiki/bin/lib/` (index, search, lint, format, analytics, ingest, cache, path-resolver), `wiki/bin/lib/shared/` (bm25, frontmatter, markdown-table, projects, tokenize, walk, result).

Shared helpers: `basename(name)`, `pageToResult(page, extra)`. Index cache: `wiki/.cache/index.json` (LSM-inspired, rebuild on change).

Skills provide specialized instructions and workflows for specific tasks.
Use the skill tool to load a skill when a task matches its description.
