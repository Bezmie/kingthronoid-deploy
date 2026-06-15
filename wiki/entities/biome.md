---
type: entity
tags: [tech, lint, format, biome]
date: 2026-05-29
url: https://biomejs.dev/
---

# Biome

## Why

Единый инструмент: линтер + форматтер + проверка импортов. Замена ESLint + Prettier.

## Why Not ESLint + Prettier

- ESLint + Prettier = 2 инструмента, нужен eslint-config-prettier для устранения конфликтов
- Biome = 1 инструмент, 0 конфликтов, на Rust → мгновенный
- Конфиг: 1 файл `biome.json` вместо цепочки `.eslintrc` + `.prettierrc` + плагинов

## Project Config

```json
{
  "formatter": {
    "indentStyle": "tab",
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

## Key Commands

| Команда | Что делает |
|---------|-----------|
| `npx @biomejs/biome check src/` | Линт + формат (без фикса) |
| `npx @biomejs/biome check --write src/` | Линт + автофикс |
| `npx @biomejs/biome format src/` | Только формат |
| `npx @biomejs/biome lint src/` | Только линт |

## What It Catches

- Неиспользуемые переменные / импорты
- Отсутствие точек с запятой (если не в конфиге)
- Длинные строки (> lineWidth)
- Неконсистентные кавычки
- Проблемы с доступностью (a11y)
- Опасные паттерны (`==` вместо `===`)

## Husky + lint-staged

Pre-commit hook: `biome check --write` на каждом staged `.ts/.js` файле.

```json
"lint-staged": {
  "*.{ts,js}": ["biome check --write"]
}
```

- **Husky** — менеджер git hooks. `npx husky init` создаёт `.husky/pre-commit`
- **lint-staged** — запускает линтер только на staged файлах (не на всей кодовой базе)
- Pre-commit: мгновенный feedback, баг не попадает в историю
- CI (`tsc --noEmit`) — медленная полная проверка типов, отдельно от pre-commit

## VCS интеграция

```json
"vcs": {
  "enabled": true,
  "clientKind": "git",
  "useIgnoreFile": true
}
```

Biome фильтрует файлы по `.gitignore` — не проверяет `dist/`, `node_modules/`.

## npm script

```json
"check": "biome check src/ && tsc -noEmit"
```

Полная проверка: стиль + типы за секунды.

## Documentation

- https://biomejs.dev/guides/getting-started/ — начало работы
- https://biomejs.dev/reference/rules/ — все правила

## Typed Edges

- uses::[[vite]]
- uses::[[typescript]]

## Related

- [[vite]] — сборка
- [[typescript]] — типы
- [[github-actions]] — CI (biome check в Actions)
