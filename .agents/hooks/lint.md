---
trigger:
  intent: Проверить здоровье/качество wiki
  signals: [lint, проверь wiki, здоровье, проблемы, gaps, broken, orphans, покрытие, целостность / check wiki, health, issues, gaps, coverage, integrity]
  examples:
    - "проверь wiki"
    - "lint wiki"
    - "как здоровье wiki"
    - "есть ли проблемы в базе знаний"
    - "проверь целостность wiki"
    - "check wiki health"
    - "any wiki issues?"
    - "lint the knowledge base"
---
# lint

1. `node wiki/bin/wiki.js lint` -- комплексная проверка (orphans + broken + gaps + coverage + tagVariants + stale)
2. `node wiki/bin/wiki.js gaps` -- упомянутые но не созданные страницы
3. Противоречия: факты помеченные !! на разных страницах
4. Устаревшие: TODO или неполные страницы
5. **Stale knowledge**: concept/entity страницы без входящих ссылок (orphans). Предложить архивацию: "Эта страница не используется -- удалить или слить?"
6. Предложить источники для заполнения пробелов
7. Запись в `wiki/log.md`: `core log lint "кратко" --проблем "N" --orphans "список" --противоречия "список" --пробелы "список" --рекомендации "список"` (или вручную)
