---
guard: work-completed
trigger:
  intent: Извлечь знания из завершённой работы в wiki
  signals: [кристаллизуй, увековечь, сохрани знания, вытащи инсайты, crystallize, distill, preserve, extract insights]
  examples:
    - "кристаллизуй знания"
    - "сохрани что узнали"
    - "crystallize"
    - "distill the session"
    - "вытащи инсайты из работы"
---
# crystallize

INGEST = внешние источники → wiki. CRYSTALLIZE = собственная работа → wiki. Оба подчиняются Wiki writing guard.

0. Guard: `work-completed` guard автоматически проверяет наличие работы. Step 0 — вторичная проверка на случай stale guard context. `node wiki/bin/wiki.js diff` + `node bin/core.js status`. Если 0 изменений — отказ
1. **Собрать контекст**: `core status` -- что изменилось. `git diff --stat` -- какие файлы. Последний log entry -- что делали
2. **Идентифицировать знания**: анализ diffs + log, извлечь:
   - Паттерны (обнаруженный принцип, повторяющийся подход) → candidate concept
   - Решения (конкретное решение проблемы) → entity с `fixes::[[problem]]`
   - Gotchas (нестандартное поведение, подводный камень) → entity с tag `gotcha`
   - Баги и фиксы → entity с `caused::[[root]]` + `fixes::[[symptom]]`
   - Универсальные выводы → concept с `derived::[[source-page]]`
3. **Обсудить с автором**: предложить список извлечённых знаний. Автор выбирает что кристаллизовать, что пропустить. Фильтр "знание vs реализация": универсальные паттерны → wiki, платформо-зависимая реализация → игнорировать
4. **Записать в wiki**: создать/обновить 3-8 страниц + typed edges. Подчиняется Wiki writing guard (загрузить hook + конвенции → следовать процедуре). Использовать canonical edge types: uses, caused, fixes, supersedes, contradicts, derived
5. **Log**: `core log crystallize "кратко" --создано "pages" --обновлено "pages" --edges "list"`

## crystallize-prep CLI

`node wiki/bin/wiki.js crystallize-prep [--since YYYY-MM-DD]` — контекст перед crystallize: изменённые файлы, релевантные wiki-страницы, gaps которые могли быть заполнены
