---
type: concept
tags: [security, workflow, code-review]
date: 2026-05-23
sources: [2026-05-23-openai-security-best-practices-skill]
---

# Security Review Workflow

Процедура security review: identify stack -> load guidance -> review/report/fix. Извлечено из OpenAI security-best-practices skill. Процедурная часть -> hook `.agents/hooks/security-review.md`.

## Workflow

1. Identify stack: все языки + фреймворки проекта. Фронтенд + бэкенд отдельно
2. Load relevant guidance: wiki context, known best practices для identified stack
3. Выбрать режим: secure-by-default / passive detection / full report
4. Review: фокус на critical/high impact. Не шуметь на каждый potential issue
5. Report (если full): severity sections, numeric IDs, line numbers, impact statements
6. Fixes: single finding, regression awareness, separate commits, follow test flow

## Decision Tree

- Язык/фреймворк неясен -> инспектировать repo, list evidence
- Есть guidance -> load + follow
- Нет guidance -> использовать известные best practices + предупредить

## Fix Discipline

- Один finding за раз
- Осознание регрессии: небезопасный код может быть завязан на другие части
- Отдельный коммит на каждый finding
- Следовать тестовому flow проекта
- Документировать rationale при override

## Связанные

- [[web-security-basics]] -- знания по web security
- [[agent-workflow]] -- операционные процедуры агента
