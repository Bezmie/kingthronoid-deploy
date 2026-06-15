---
type: entity
tags: [tech, config, serialization, data-format]
date: 2026-05-04
---

# YAML

YAML Ain't Markup Language — человекочитаемый язык сериализации данных. JSON-суперсет начиная с версии 1.2. Кросс-языковой, Unicode-based.

Спецификация: [yaml.org/spec/1.2.2/](https://yaml.org/spec/1.2.2/) (ревизия 1.2.2, 2021-10-01; нормативных изменений от 1.2 нет, только уточнения)

## Ключевые фичи

### Примитивы

- **Mapping** (ключ: значение) — неупорядоченные пары, ключи уникальны
- **Sequence** (− элемент) — упорядоченный список
- **Scalar** — строка/число/bool/null

### Стили

- **Block** — структура через отступы (читаемость)
- **Flow** — структура через `[`, `{`, `,` (компактность)

### Документы

- `---` — начало документа
- `...` — конец документа (без начала нового)

### Anchors & Aliases

```yaml
ship-to: &id001
  given: Chris
  family: Dumars
bill-to: *id001
```

### Типы (Tags)

- Неявные (auto-resolve по Core Schema)
- Явные: `!!str`, `!!int`, `!!seq`, `!local-tag`
- Глобальные: `tag:yaml.org,2002:int`

## Core Schema (auto-resolve)

Подводные камни неявного разрешения типов:

| Значение | Тип | Примечание |
|---|---|---|
| `null`, `~`, `` | null | Пустое значение = null |
| `true`, `false` | bool | Только нижний регистр |
| `0o7` | int (7) | Восьмеричный — неожиданно |
| `0xC` | int (12) | Шестнадцатеричный |
| `1.23015e+3` | float | Экспоненциальная запись |
| `.NaN` | float | Not a Number |
| `yes`, `no`, `on`, `off` | **строка** в 1.2 Core | Но в 1.1 было bool! Парсеры могут отличаться |
| `1_000` | строка в Core | Разделители _ не в Core Schema |

## Связь с wiki

Frontmatter wiki-страниц — простейший YAML (mapping + scalars):

```yaml
---
type: concept
tags: [tag1, tag2]
date: 2026-05-04
---
```

Рекомендация: использовать только `type`, `tags`, `date`, `project`, `sources`. Избегать неявных типов — явно кавычить строки, если они похожи на bool/null/number.

## Подводные камни

1. **Indentation-sensitive** — табы запрещены, только пробелы. Ошибка в отступе = молчаливый баг
2. **Implicit typing** — `no` может стать `false` (1.1) или строкой (1.2). Всегда кавычить ambiguous значения
3. **Multiline strings** — `|` (literal, переносы сохраняются), `>` (folded, переносы → пробелы), `|-` / `>-` (strip trailing newline)
4. **Mapping key order** — не гарантируется. Если порядок важен — используй sequence of mappings
5. **Anchors** — только в пределах одного документа, не кросс-документные

## Связанные страницы

- [[llm-wiki-conventions]] — frontmatter конвенции
- [[biome]] — конфиг biome.json (YAML-подобный JSON)
