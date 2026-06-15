---
type: source
tags: [security, code-review, best-practices, vulnerability, javascript, typescript, web]
date: 2026-05-23
---
[source](raw/2026-05-23-openai-security-best-practices-skill.md)

# Security Best Practices (OpenAI)

OpenAI skills repo, `skills/.curated/security-best-practices`. Language/framework-specific security review: identify stack, load guidance, review/report/fix.

## Ключевые тезисы

1. **3 режима security review**: secure-by-default coding (новый код), passive detection (флаг критических уязвимостей при работе), full report (полный аудит по запросу). Passive mode -- только largest impact, не шуметь

2. **Workflow decision tree**: identify language/framework -> load relevant references -> review/fix. Если нет guidance -- использовать известные best practices + предупредить что конкретного guidance нет

3. **Report format**: executive summary, severity sections (critical/high/medium/low), numeric ID для каждого finding, line numbers для кода, one-sentence impact statement для critical

4. **Fix discipline**: single finding at a time, regression awareness (insecure code may be relied upon), separate commits per finding, follow project's test flow, consider second-order impacts

5. **General advice**: UUID4/random hex вместо incrementing IDs для public resources (предотвращает enumeration), TLS caveats -- не флагать отсутствие TLS в dev, secure cookies только при реальном TLS, HSTS опасен без понимания lasting impacts

6. **Override policy**: project-specific overrides допустимы, документировать почему bypass применяется

## Применение к проекту

Релевантно для Kingthronoid и аналогичных web-game проектов:
- JS/TS web security -- прямо релевантно (XSS через DOM, localStorage save data validation)
- Incrementing IDs -- проект использует string IDs (buildings), но save data = localStorage (не incrementing -- ок)
- Yandex Games iframe -- XSS surface, SDK inject
- Passive detection mode -- ценный паттерн для повседневной работы

## Связанные концепции

- [[security-review-workflow]] -- извлечённая процедура security review
- [[web-security-basics]] -- извлечённые знания по web security
- [[entities/typescript]] -- TypeScript (strict)
