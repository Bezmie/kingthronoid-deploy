---
guard: project-context
trigger:
  intent: Отладка/фикс failing CI checks на GitHub PR
  signals: [fix CI, failing checks, PR checks failed, CI failed, red CI, broken build, fix failing, ci error, failing tests CI, github actions failed]
  examples:
    - "fix CI"
    - "PR checks failing"
    - "red CI on my PR"
    - "debug failing GitHub Actions"
    - "CI broken, fix it"
    - "failing checks on PR 123"
---
# fix-ci

1. Verify auth: `gh auth status` -- если не authenticated, попросить `gh auth login` (repo + workflow scopes)
2. Resolve PR: `gh pr view --json number,url` (текущая ветка) или использовать предоставленный номер/URL
3. Inspect failing checks:
   - `gh pr checks <pr> --json name,state,link,workflow`
   - Для каждого failing: `gh run view <run_id> --log`
   - Если in progress: `gh api /repos/owner/repo/actions/jobs/<job_id>/logs`
4. Scope: GitHub Actions only. External providers (Buildkite и т.д.) -- только report details URL, не парсить
5. Summarize: check name + run URL + concise log snippet. Call out missing logs
6. Draft fix plan, request explicit approval before implementing
7. Implement approved plan, summarize diffs
8. Recheck: `gh pr checks` после изменений. Предложить re-run если нужно
9. Запись в `wiki/log.md`: `core log fix-ci "кратко" --project "<name>" --PR "<number>" --failed "список" --fix "описание" --result "pass/fail"`
