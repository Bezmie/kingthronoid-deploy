---
guard: project-context
trigger:
  intent: Запрос security review/report/аудит кода на уязвимости
  signals: [security review, security report, security audit, уязвимости, безопасность кода, security best practices, vulnerability, security check]
  examples:
    - "сделай security review"
    - "проверь код на уязвимости"
    - "security audit проекта"
    - "есть ли security проблемы?"
    - "security best practices check"
    - "найди уязвимости"
---
# security-review

1. Identify stack: определить все языки и фреймворки проекта. Проверить фронтенд + бэкенд отдельно
2. Load context: `node wiki/bin/wiki.js context "security" -n 5` + `node wiki/bin/wiki.js context "security" -n 5 --root <project>` -- существующие знания
3. **3 режима** -- уточнить у пользователя:
   - **Secure-by-default**: писать новый код с security-best-practices (пассивный, default)
   - **Passive detection**: при работе флагать critical/high уязвимости, не шуметь на мелочь
   - **Full report**: полный аудит с отчётом (по явному запросу)
4. Для full report:
   - Executive summary
   - Severity sections (critical/high/medium/low)
   - Numeric ID для каждого finding
   - Line numbers для кода
   - One-sentence impact statement для critical findings
   - Write report to `security_report.md` (или путь от пользователя)
5. Fixes: single finding at a time, regression awareness, separate commits per finding, follow project test flow
6. Override policy: если project-specific bypass -- документировать в AGENTS.md/wiki почему
7. Общие проверки для web-game проектов:
   - Public IDs: UUID4/random hex, не incrementing
   - XSS: DOM-based, postMessage без origin check, SDK inject surface
   - Save data: не доверять localStorage при чтении
    - TLS: не флагать отсутствие в dev, secure cookies только при реальном TLS, HSTS опасен
8. Запись в `wiki/log.md`: `core log security-review "кратко" --проект "<name>" --режим "secure-by-default/passive/full" --findings "critical N, high N, medium N, low N" --отчёт "путь"` (или вручную)
