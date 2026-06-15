---
type: concept
tags: [ci-cd, github, debugging, workflow, testing]
date: 2026-05-23
sources: [2026-05-23-openai-gh-fix-ci-skill]
---

# CI Failure Debugging

Паттерн отладки failing CI checks: inspect -> summarize -> plan -> fix -> recheck. Извлечено из OpenAI gh-fix-ci skill.

## Workflow

1. **Auth**: убедиться gh CLI authenticated (repo + workflow scopes)
2. **Resolve PR**: текущая ветка -> `gh pr view --json number,url` или по номеру/URL
3. **Inspect checks**: только GitHub Actions. External providers = report URL only
4. **Log extraction fallback**:
   - `gh pr checks <pr> --json name,state,link,workflow`
   - `gh run view <run_id> --log` для каждого failing check
   - `gh api /repos/owner/repo/actions/jobs/<job_id>/logs` если run ещё in progress
5. **Summarize**: check name + run URL + concise log snippet. Call out missing logs
6. **Plan + approval**: draft fix plan, explicit approval before implementation
7. **Implement**: apply approved changes, summarize diffs
8. **Recheck**: `gh pr checks` после изменений

## External Provider Scoping

CI providers не на GitHub Actions = out of scope. Не парсить чужие логи. Только: check name + details URL для пользователя. Сохранять workflow lean.

## Approval Gate

Никогда не применять fix без подтверждения пользователя. Сначала plan, потом implement. Это критично когда insecure/failing code may be relied upon (аналог security fix discipline).

## Fallback Chain

`gh` CLI field drift -- API fields могут меняться. Если field rejected -> rerun с доступными fields. Скрипт handles drift -> manual fallback если скрипта нет.

## Связанные

- [[entities/github-actions]] -- GitHub Actions
- [[security-review-workflow]] -- аналог fix discipline (approval gate)
- [[agent-workflow]] -- операционные процедуры агента
