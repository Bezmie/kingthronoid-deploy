---
type: source
tags: [agent, skills, architecture, anthropic]
date: 2026-05-25
sources: []
---

# Agent Skills Specification (Anthropic)

Суммаризация спецификации Anthropic Agent Skills (agentskills.io + github.com/anthropics/skills). Фокус: архитектурные концепции, не реализация.

## Progressive Disclosure

3-уровневая загрузка навыков:
1. **Metadata** (~100 токенов): name + description — всегда в контексте для всех навыков
2. **Instructions** (<5000 токенов): SKILL.md body — загружается при активации
3. **Resources** (по требованию): scripts/, references/, assets/ — загружается при необходимости

SKILL.md < 500 строк. Детальный reference — в отдельные файлы. Ссылки на файлы — относительные пути, один уровень вложенности.

## Skill Composition

Структура навыка: папка с обязательным SKILL.md (YAML frontmatter + markdown инструкции). Опционально: scripts/ (исполняемый код), references/ (документация), assets/ (шаблоны, ресурсы).

Frontmatter: name (обязательный, идентификатор), description (обязательный, триггер), license, compatibility, metadata, allowed-tools (экспериментальный).

## Description-Based Triggering

Description = первичный механизм определения когда агент активирует навык. Рекомендуются "pushy" описания — включать что навык делает И конкретные контексты когда использовать. Агент консультирует навыки для задач которые не может решить самостоятельно — простые запросы могут не триггерить даже при совпадении.

## Eval-Driven Creation

Итеративный цикл: draft → test prompts → eval (with-skill vs baseline) → improve → repeat.
Принципы улучшения:
- Объяснять WHY, не только WHAT — LLM понимают рассуждения лучше чем жёсткие MUST
- Держать prompt lean — убирать что не работает
- Обобщать из feedback — не overfittить на тест-кейсы
- Искать повторяющуюся работу — извлекать в bundled scripts

## Black-Box Scripts

Скрипты вызываются как чёрные ящики, не читаются в контекст. Сначала `--help`, исходный код — только если кастомизация неизбежна. Экономит контекстное окно.

## Reconnaissance-Then-Action

Паттерн для динамических задач: исследовать → идентифицировать → действовать. Не предполагать структуру, а обнаруживать из рендеренного состояния.

## Project Application

CORE hooks — параллельная реализация с иной философией:
- **Progressive disclosure**: CORE start.md = level 1+2 сразу (скомпилированный контекст), hooks = level 2 по триггеру, wiki = level 3 по guard. Anthropic — строго progressive, CORE — оптимизировано под "всё под рукой"
- **Triggering**: CORE = signals (список слов), Anthropic = description (семантическое описание). Description устойчивее к перефразировкам
- **Eval**: CORE hooks формализуются из паттернов без формального eval. Anthropic — итеративный цикл с бенчмарками
- **Scripts**: CORE wiki.js = black-box, аналогично Anthropic. Не формализовано как принцип

Подробнее: [[agent-skills-architecture]]

## Related

- [[agent-skills-architecture]] — универсальная концепция архитектуры навыков
- uses::[[agent-workflow]] — операционная модель CORE
- uses::[[llm-wiki-pattern]] — паттерн Karpathy (три слоя, progressive disclosure)
