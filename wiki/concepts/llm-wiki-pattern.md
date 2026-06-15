---
type: concept
tags: [llm-wiki, pattern, karpathy, knowledge-base, edges, promotion]
date: 2026-05-03
sources: [2026-05-03-karpathy-llm-wiki, 2026-05-28-agentmemory-llm-wiki-v2]
---

# LLM Wiki Pattern (Karpathy)

Паттерн построения персональной базы знаний через LLM-агента. Wiki — не RAG-индекс, а **постоянный, нарастающий артефакт**: cross-references уже построены, противоречия помечены, синтез отражает всё прочитанное.

Источник: sources frontmatter

## Суть

RAG: каждый запрос → извлечение чанков → синтез с нуля. Нет накопления.

LLM Wiki: агент **инкрементально строит и поддерживает wiki** между пользователем и сырыми источниками. Каждый новый источник интегрируется — обновляются страницы, отмечаются противоречия, усиливается синтез. Знание компилируется однажды и поддерживается актуальным, не выводится заново при каждом запросе.

Человек = куратор (источники, направление, вопросы). LLM = автор (summarization, cross-referencing, bookkeeping).

## Три слоя

| Слой | Назначение | Наш маппинг |
|---|---|---|
| Raw sources | Immutable source of truth | `wiki/raw/` |
| The wiki | LLM-генерируемые markdown, interlinked | `wiki/{concepts,entities,sources}/` |
| The schema | Конфиг для LLM-агента (структура, конвенции, hooks) | `AGENTS.md` + `.agents/hooks/` |

## Операции

| Операция | Описание (Karpathy) | Наша реализация |
|---|---|---|
| Ingest | Читать источник → summary → обновить 10-15 страниц → log | INGEST hook в `.agents/hooks/ingest.md` |
| Query | Поиск по wiki → синтез → ценные ответы filed обратно | QUERY режим (AGENTS.md секция 3) |
| Lint | Проверка здоровья: противоречия, orphans, пробелы | LINT hook в `.agents/hooks/lint.md` |

## Наша реализация vs референс

### Соответствия

- 3 слоя (raw/wiki/schema) — ✅
- `wiki/raw/` immutable — ✅
- `log.md` append-only, parseable (`## [YYYY-MM-DD] тип | описание`) — ✅
- Cross-references: каждая страница → 2-3 ссылки — ✅
- Противоречия помечаются явно — ✅
- Ingest затрагивает 5-15 страниц — ✅
- Query → ценные ответы filed в wiki — ✅
- Obsidian wikilinks (двойные квадратные скобки) — ✅
- LLM владеет wiki, человек читает — ✅

### Осознанные отклонения

| Пункт | Karpathy | Наше решение | Причина |
|---|---|---|---|
| index.md | Browsable контент-каталог для LLM-навигации | CLI `brief`/`context` (`search.js`) | Дешёвые локальные команды вместо browsable файла; функциональный эквивалент |

### Расширения сверх референса

- **REFACTOR** hook — периодическая реорганизация, слияние дублей, MOC-хабы
- **TECH-ADD** hook — подключение технологий в проект
- **INTEGRATE** hook — IDEAS.md → GDD.md pipeline
- **PROJECT-INIT** hook — шаблон нового проекта
- **INGEST** hook — обработка внешних источников
- **Agent hooks** (`.agents/hooks/`) — формализованные процедуры с intent-триггерами, signals, includes-каскадами
- **Search CLI** (`search.js`) — BM25 + summary, context, tags, links, orphans, broken
- **YAML frontmatter** — типизация страниц (concept/entity/source/project)
- **Named edges** — типизированные связи `type::[[target]]` (canonical: uses, caused, fixes, supersedes, contradicts, derived). Парсятся из markdown, хранятся в edgeMap. Graph export с labels. → [[llm-wiki-conventions]]
- **Consolidation promotion** — pipeline source→entity→concept. Lint флагает кандидатов (3+ sources/incoming links). Promotion = новый уровень абстракции через derived edge, не замена типа. → [[llm-wiki-conventions]]
- **Crystallization** — hook для извлечения знаний из собственной работы (vs ingest = внешние источники). Завершённая цепочка → structured digest → wiki pages + typed edges. → `.agents/hooks/crystallize.md`

### Зафиксированные gaps

- **Synthesis-слой** — нет страницы с эволюционирующим тезисом/синтезом проекта. CLI `brief`/`context` заменили browsable каталог, но не дают проекта-уровневого синтеза. Karpathy подчёркивает: "The synthesis already reflects everything you've read."
- **Git-версионирование** — wiki как git-repo даёт history, branching, collaboration из коробки
- **Vector search** — при 94 страницах BM25 достаточен. Архитектурно: `all-MiniLM-L6-v2` (local, free) → embeddings в `.cache/`. Страницы > 200 — станет необходимым

### agentmemory LLM Wiki v2 — заимствования

Источник: [agentmemory gist](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2). Извлечено и адаптировано:

| Концепция agentmemory | Адаптация в CORE | Статус |
|---|---|---|
| Typed edges (knowledge graph) | Named edges (type::target syntax) | Реализовано |
| Confidence scoring | `sources[]` длина = confidence proxy (не numeric float) | Существующее |
| Supersession | supersedes edge type + frontmatter `superseded-by` | Частично (edge type) |
| Forgetting/decay | Нет. Supersession > decay. Raw immutable, wiki не удаляется | Осознанный отказ |
| Consolidation tiers (working→episodic→semantic→procedural) | Promotion pipeline (source→entity→concept) | Реализовано (lint detection) |
| Crystallization (work → wiki) | Crystallize hook | В разработке |
| Auto-hooks | Нет. Human-in-the-loop через wiki writing guard | Осознанный отказ |
| Numeric confidence | Нет. `sources: [s1, s2, s3]` верифицируемо, float — нет | Осознанный отказ |
| Hybrid search (BM25+vector+graph) | BM25 + `--tags` pre-filter. Vector при росте > 200 страниц | Отложено |

### LSM-подобная архитектура wiki

Wiki реализует LSM-подобную модель хранения: `raw/` = immutable source (L0), parsed pages = L1, `.cache/index.json` = L2 (скомпилированный индекс + brief). `--tags` pre-filter = аналог Pinecone metadata bitmaps. Детали → [[lsm-slab-architecture]]

### Progressive Disclosure как расширение

3-слойная модель (raw/wiki/schema) аналогична progressive disclosure из [[agent-skills-architecture]]: raw = level 3 (по требованию), wiki pages = level 2 (при активации), schema (AGENTS.md + hooks) = level 1 (всегда в контексте). CORE не следует строго progressive — start.md компилирует level 1+2, hooks загружаются по триггеру, wiki — по guard. Trade-off: компиляция = больше токенов сразу, но агент не тратит решения на "загружать ли".

## Связанные страницы

- [[agent-skills-architecture]] — progressive disclosure паттерн (аналог 3-слойной модели)
- [[llm-wiki-conventions]] — конвенции wiki-страниц, CLI reference, named edges, promotion
- derived::[[lsm-slab-architecture]] — LSM-подобная архитектура wiki
