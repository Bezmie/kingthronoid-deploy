---
guard: project-context
trigger:
  intent: Добавить новую технологию в проект
  signals: [добавь, установи, настрой, интегрируй X / add X, install X, setup X, integrate X]
  examples:
    - "add Tailwind"
    - "добавь anime.js"
    - "setup GitHub Actions"
    - "настрой vitest"
---
# tech-add

1. Создать wiki-страницу в CORE wiki `wiki/entities/<tech-name>.md` -- формат: зачем / как / ключевые команды / почему не альтернативы / ссылки на доки. type: entity, tags: [tech, ...]. Без проект-специфичных секций -- они в проектную wiki
2. Добавить запись о технологии в проектную wiki tech-stack (строка таблицы + заметки конфигурации). Ссылка через [[sys:<tech-name>]]
3. Добавить cross-references: ссылки на релевантные concept/source wiki-страницы
4. Установить и настроить технологию в проекте: `npm install <package>`. Создать минимальный конфиг если требуется. Не менять существующий конфиг без согласия
5. Запись в `wiki/log.md` (core wiki): `core log tech-add "<tech-name>" --создано "wiki/entities/<tech-name>.md" --обновлено "проектная wiki tech-stack"` (или вручную)
