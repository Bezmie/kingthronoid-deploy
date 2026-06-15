---
trigger:
  intent: Завершить сессию агента
  signals: [завершить, конец, всё, пока, закончил / end, done, bye, finish, wrap]
  examples:
    - "end"
    - "завершить"
    - "всё"
    - "пока"
    - "done"
---
# end

1. `node wiki/bin/wiki.js after-edit` -- проверить core wiki + незалогированные изменения (если > 0 -> предложить запись в log.md)
2. Если работа в проекте: `node wiki/bin/wiki.js after-edit --root <project>` -- проверить проектную wiki
3. `node bin/core.js status [--root <project>]` -- git status + unlogged (объединяет шаги 3-4 ниже)
4. Context update check:
   - Рефакторинг был? -> предложить обновить список файлов в проектном AGENTS.md
   - Логика изменилась? -> предложить добавить/убрать конвенцию в AGENTS.md; обновить проектный документ
   - Приоритеты сменились? -> предложить обновить ROADMAP
   - Значимые знания извлечены из работы? -> предложить crystallize (если >2 файлов изменено или найдены неочевидные решения/gotchas)
5. **Обязательный** лог в wiki/log.md: `node bin/core.js log session "summary" --project <name> --done "список" --in-progress "что не завершено" --next "что дальше"` (или вручную). Минимум: тип сессии + что сделано (1-3 строки). Пустые логи запрещены -- даже при минимальной сессии описать что происходило (например "review only", "discussed design", "no code changes")
6. Отчёт: summary сессии + что незавершено + что закоммитить
