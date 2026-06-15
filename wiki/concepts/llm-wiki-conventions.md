---
type: concept
tags: [llm-wiki, conventions, cli, edges, promotion]
date: 2026-05-29
sources: [2026-05-28-agentmemory-llm-wiki-v2]
---

# LLM-Wiki: Conventions, CLI Reference

Конвенции wiki-страниц. CLI-справочник → start.md Wiki CLI. Процедуры → start.md Hook routing.

## Page Conventions

**YAML frontmatter** (обязательно):
```yaml
---
type: concept | entity | source | log
tags: [tag1, tag2]
date: YYYY-MM-DD
sources: [source1]   # опционально
---
```

**Именование**: kebab-case, короткие, описательные. Примеры: `incremental-games.md`, `yandex-games-sdk.md`, `2026-04-27-idle-mechanics-guide.md`.

**Ссылки**: Obsidian-style двойные-квадратные-скобки (без расширения, без пути). Cross-wiki: `[[sys:name]]` -- ссылка на страницу core wiki из проектной wiki. **Исключение: log.md не использует [[]] синтаксис** -- парсер создаёт ложные broken links из текстовых упоминаний. В log.md ссылаться на страницы plain text (имя без скобок).

**Named edges**: `type::[[target]]` — типизированная связь. Тип вне скобок, Obsidian видит `[[target]]` как обычную ссылку. Canonical типы (закрытый набор): `uses`, `caused`, `fixes`, `supersedes`, `contradicts`, `derived`. Обычные `[[]]` без типа = `related`. Новые типы рёбер — по согласию с автором (как hook creation). Lint флагает non-canonical типы.

Примеры синтаксиса (в кодовых блоках, парсер пропускает):
- `uses::[[redis]]` — зависимость
- `caused::[[n-plus-1-bug]]` — причина
- `fixes::[[auth-timeout]]` — решение
- `supersedes::[[old-approach]]` — замена
- `contradicts::[[claim-x]]` — противоречие
- `derived::[[lsm-slab-architecture]]` — происхождение

**Язык**: русский для описаний, rationale, объяснений во всех .md файлах репозитория. Английский для технических терминов (API, имена функций, паттернов, файлов), однозначных терминов (routing, hook, ingest, refactoring, baseline, fallback). Заголовки секций (##) и страниц -- английские. Wiki-заголовки -- английские (wiki-link targets).

**Стиль**: краткий, фактологический, структурированный. Заголовки ##, ###, списки, таблицы. Cross-references обязательны: каждая страница ссылается на 1-3 другие. Typed edges предпочтительнее plain links когда семантика связи известна.

**Запись страниц**: создание/обновление/удаление — только через start.md Wiki writing guard.

**Stale detection**: страницы с `date:` старше 30 дней помечаются как stale (log исключён). Это информационная проверка, не блокирует коммит.

**Граница типов страниц**:
- **concepts** = знание (паттерны, принципы, механики, декларации). Универсальное (core wiki) или проект-scoped (проектная wiki). Без конкретных чисел/имен файлов — конкретика → GDD/AGENTS проекта
- **entity** = конкретная сущность. Внешняя (платформа, организация) или проектная (эволюция типа, gotcha). Технологии = entity с tag `tech`: API, конфиг, готчи
- **sources** = LLM-суммаризация внешнего источника + допустим "Применение к проекту" как качественный мост (указание релевантности, без конкретных имён файлов/чисел/конфигураций). Конкретные конфигурации/ограничения -> проектная wiki
- **log** = хроника изменений wiki
- **raw** = immutable source of truth, не модифицируется (не type, а директория)

## Consolidation Promotion

Pipeline подтверждения знаний: source → entity → concept. Promotion = явный шаг, не автоматический. Lint флагает кандидатов, агент предлагает, автор подтверждает.

**Критерии**: entity с 3+ уникальными sources в frontmatter → кандидат в concept. Source с 3+ incoming wikilinks (из тел страниц, не из frontmatter) → кандидат в entity.

**Promotion = новый уровень, не замена**: concept-страница ссылается на source/entity через `derived::[[original]]`. Оригинальная страница остаётся. Concept = более высокий уровень абстракции поверх.

**Сигнал при ingest**: INGEST hook step 7 — если при обновлении страницы sources вырос до 3+, агент упоминает «promotion candidate».

## Two Wiki Levels

- **Core wiki** (`wiki/`) — универсальные знания, паттерны, технологии, внешние сущности
- **Проектная wiki** (`<проект>/wiki/`) — проект-specific знания: rationale механик, эволюция сущностей, gotchas, дизайн-решения
- Проектная wiki ссылается на core через `[[sys:name]]`. Core wiki не ссылается на проектную

## Wiki CLI

`wiki/bin/wiki.js` — модульный CLI для knowledge (BM25 + summary, LSM-inspired cache). Справочник → start.md Wiki CLI.

**Новые команды**:
- `edges <page>` — typed edges страницы (1-hop, входящие + исходящие)
- `promotion-stats` — кандидаты на promotion (entity→concept, source→entity)

## Core CLI

`bin/core.js` — CLI для agent orchestration (start, status, route, hooks, guard, log). Компилирует системное состояние и routing, аналогично wiki.js для knowledge. Справочник → start.md Core CLI.

## Karpathy LLM Wiki Pattern Relation

Wiki следует паттерну из [gist Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): три слоя (raw/wiki/schema), log.md, cross-references, LLM-авторство.

Расширения из agentmemory LLM Wiki v2: named edges (typed relationships), consolidation promotion (source→entity→concept pipeline), crystallization (собственная работа → wiki). → [[llm-wiki-pattern]]

Отклонения и расширения → [[llm-wiki-pattern]]. Процедуры → `.agents/hooks/`. LSM-подобная архитектура → [[lsm-slab-architecture]].

## Related

- uses::[[llm-wiki-pattern]]
- uses::[[lsm-slab-architecture]]
- [[agent-workflow]]
