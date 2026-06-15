---
type: source
tags: [ci-cd, github, testing, debugging, workflow]
date: 2026-05-23
---
[source](raw/2026-05-23-openai-gh-fix-ci-skill.md)

# GitHub CI Failure Debugging (OpenAI)

OpenAI skills repo, `skills/.curated/gh-fix-ci`. Workflow отладки failing PR checks через gh CLI: inspect -> summarize -> plan -> fix -> recheck.

## Ключевые тезисы

1. **Workflow**: auth -> resolve PR -> inspect failing checks -> summarize failures -> create fix plan -> implement after approval -> recheck. Линейный, без ветвлений

2. **GitHub Actions only scope**: external CI providers (Buildkite и т.д.) = out of scope, только report details URL. Не пытаться парсить чужие логи

3. **Log extraction fallback chain**: bundled script (handles field drift) -> `gh pr checks --json` -> `gh run view --log` -> `gh api /actions/jobs/<id>/logs`. Каждый уровень = fallback если предыдущий не работает

4. **Summarize before fix**: concise failure snippet (check name, run URL, log snippet) + call out missing logs. Пользователь видит контекст до плана

5. **Approval gate**: plan -> explicit approval -> implement. Не применять fix без подтверждения

6. **Recheck after fix**: `gh pr checks` для подтверждения. Цикл может повторяться

## Применение к проекту

Релевантно для проектов с GitHub Actions (Kingthronoid, CORE):
- GitHub Actions уже в tech stack
- CI failure debugging = повседневная задача
- gh CLI = часть рабочего стека, не чужая зависимость

Игнорируемое (Codex-специфика): Python-скрипт inspect_pr_checks.py, create-plan skill reference

## Связанные концепции

- ci-failure-debugging -- извлечённый паттерн
- entities/github-actions -- GitHub Actions entity
