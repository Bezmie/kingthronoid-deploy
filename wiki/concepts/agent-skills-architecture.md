---
type: concept
tags: [agent, skills, architecture, pattern]
date: 2026-05-25
sources: [2026-05-25-anthropic-agent-skills-spec]
---

# Agent Skills Architecture

Универсальная архитектура динамической загрузки инструкций в LLM-агенты. Извлечено из Anthropic Agent Skills spec, обобщено как паттерн.

## Progressive Disclosure

Принцип: агент не загружает весь контекст сразу, а раскрывает по уровням:

| Уровень | Содержание | Когда | Объём |
|---|---|---|---|
| Metadata | name + description | Всегда (startup) | ~100 токенов |
| Instructions | Полный текст инструкции | При активации | <5000 токенов |
| Resources | scripts, references, assets | По требованию | Без лимита |

**Ограничение**: инструкция < 500 строк. Детали — в отдельные файлы с относительными ссылками. Один уровень вложенности от корня навыка.

**Trade-off**: строго progressive = меньше токенов в idle, но требует дополнительного решения "загружать ли". Полная компиляция = больше токенов сразу, но агент всегда имеет всё под рукой.

CORE выбирает **компиляцию** для start.md (агент не ищет инструкции) и **progressive** для hooks (по триггеру) и wiki (по guard). → [[agent-workflow]]

## Skill Composition

Навык = папка с:
- **SKILL.md** (обязательный): YAML frontmatter (идентификация + triggering) + markdown тело (инструкции)
- **scripts/** (опционально): исполняемый код, вызывается как чёрный ящик
- **references/** (опционально): документация, загружается по требованию
- **assets/** (опционально): шаблоны, ресурсы, данные

Frontmatter минимально: name + description. Всё остальное — опциональные расширения (license, compatibility, metadata, allowed-tools).

**Black-box scripts**: скрипты вызываются без чтения исходника. Сначала `--help`, исходный код — только при необходимости кастомизации. Экономит контекстное окно. CORE wiki.js следует этому принципу неформально.

## Triggering Mechanisms

Два подхода к определению когда активировать навык:

| Подход | Механизм | Плюсы | Минусы |
|---|---|---|---|
| **Description-based** | Семантическое описание в frontmatter | Устойчив к перефразировкам, контекстно-зависимый | Зависит от качества описания |
| **Signal-based** | Список ключевых слов/фраз | Детерминированный, быстрый | Не покрывает синонимы и перефразировки |

Anthropic: description-based. "Pushy" описания рекомендуются — явно указывать когда навык уместен, даже если пользователь не называет его напрямую. Агент консультирует навыки для сложных задач; простые запросы могут не триггерить.

CORE: signal-based (список signals в frontmatter хуков). Реализовано в `bin/core.js route` — токенный overlap + intent boost. Project hooks приоритетнее CORE (кроме wiki-level). Потенциальное улучшение: дополнить signals семантическими description для лучшего мэтчинга синонимов.

## Eval-Driven Creation

Итеративный цикл создания навыков:

1. Capture intent (что, когда, формат вывода, нужны ли тесты)
2. Draft инструкции
3. Test prompts (with-skill vs baseline, параллельно)
4. Quantitative eval (assertions) + qualitative review (человек)
5. Improve (обобщать feedback, не overfittить; объяснять WHY; держать lean)
6. Repeat

Принципы улучшения:
- **Объяснять WHY** — LLM понимают рассуждения лучше жёстких MUST/NEVER
- **Держать lean** — убирать что не тянет вес
- **Обобщать** — навык для миллиона использований, не только для тест-кейсов
- **Извлекать повторяющуюся работу** — если 3 тест-кейса породили одинаковый helper → bundled script

CORE hooks создаются по паттерну без формального eval. Потенциальное усиление: лёгкий eval-цикл при формализации новых hooks. → [[agent-workflow]]

## Reconnaissance-Then-Action

Паттерн для задач с неизвестной структурой: исследовать → идентифицировать → действовать. Не предполагать структуру, а обнаруживать из наблюдаемого состояния.

Пример: webapp-testing — сначала screenshot/DOM инспекция, потом селекторы, потом действия. → [[iterative-ui-qa]]

## Связанные

- [[2026-05-25-anthropic-agent-skills-spec]] — источник (Anthropic Agent Skills spec)
- [[agent-workflow]] — операционная модель CORE (компиляция vs progressive)
- [[llm-wiki-pattern]] — три слоя (raw/wiki/schema), аналогия с progressive disclosure
- [[llm-wiki-conventions]] — конвенции wiki-страниц
- [[iterative-ui-qa]] — reconnaissance-then-action паттерн
- [[llm-coding-principles]] — принципы LLM-кодинга (Simplicity First, Surgical Changes)