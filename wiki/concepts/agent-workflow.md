---
type: concept
tags: [workflow, agent, process]
date: 2026-05-22
sources: []
---

# Agent Workflow

Концепция операционной модели CORE. Процедуры → start.md. Конвенции → [[llm-wiki-conventions]].

## Компиляция контекста

Сессия всегда со start. `core start` компилирует факты (wiki health, after-edit, diff, проектный контекст) в один вызов. Behavioural rules (wiki-first, goal bar, validation gate, wiki writing guard) агент читает из start.md напрямую — CLI не заменяет понимание. Routing: `core route <message>` — signal-based matching с intent boost. Конвенции записи — по guard.

## Wiki-first принцип

Wiki кураторная — только универсальные концепции и значимые источники. Нет "про запас". Поэтому проверка перед задачей недорога, а пропуск дорог. Два уровня: core (универсальное) + проектная (specific). Проектная дополняет core через [[sys:name]].

## Дополнения к процедурам start.md

### Goal quality bar: доменная квантификация

- Bug: воспроизведение → фикс → failing-then-passing validator
- Tests: точная команда + условие pass
- Performance: метрика + target + метод измерения + последовательные запуски
- Quality: lint/typecheck/test pass, пользовательский артефакт
- Research: решение + источники в scope + стандарт evidence

### После изменений кода

1. Предложить обновление проектного AGENTS.md (конвенция изменилась)
2. Предложить обновление проектного документа (механика/сущность изменилась)
3. Новое знание → предложить ingest (по согласию)
4. Коммит — только по запросу автора

## Связанные

- [[agent-skills-architecture]] — архитектура навыков (progressive disclosure, triggering, eval)
- [[llm-wiki-conventions]] — конвенции wiki-страниц
- [[llm-coding-principles]] — принципы LLM-кодинга
- [[llm-wiki-pattern]] — паттерн Karpathy LLM Wiki
