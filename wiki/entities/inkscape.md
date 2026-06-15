---
type: entity
tags: [tech, svg, vector, editor, inkscape, visual, asset]
date: 2026-05-03
---

# Inkscape 1.4.3

Свободный векторный редактор. Используется для создания SVG-ассетов.

## Типичное применение

- Создание и редактирование SVG-иконок и UI-элементов
- Подготовка именованных слоёв (`shadow`, `base`, `reflex`, `highlight`, `outline`) для программируемой палитры (см. [[svg-layers-and-palette]])
- Оптимизация SVG (удаление метаданных, упрощение путей)
- Импорт внешних SVG-источников, адаптация под конвенцию

Project-specific configuration -> project wiki tech-stack

## Как работает

### Именованные слои под конвенцию

1. Создать объект в Inkscape
2. Разбить на слои с именами: `shadow`, `base`, `reflex`, `highlight`, `outline`
3. Каждый слой → `<path>` с `class="layer-name"` (не `id`, чтобы работало для множества экземпляров)
4. Убрать inline `fill`/`stroke` → заменить на CSS custom properties через внешний CSS
5. Сохранить как Optimized SVG

### Optimized SVG output

Inkscape → Save As → Optimized SVG (`*.svg`):
- Удаляет Inkscape-специфичные атрибуты (`inkscape:`, `sodipodi:`)
- Удаляет метаданные, неиспользуемые defs
- Группирует пути, сокращает точность координат
- Результат: компактный SVG без зависимости от Inkscape

### Ключевые возможности 1.4.3

- **Многослойность**: слои с человекочитаемыми именами, toggle visibility
- **Boolean operations**: union, difference, intersection — для комбинирования форм
- **Path simplification**: `Path → Simplify` (Ctrl+L) — уменьшение узлов без потери формы
- **XML Editor**: `Edit → XML Editor` — прямой доступ к SVG-структуре, правка классов/атрибутов
- **Export**: PNG rasterization, Optimized SVG, Plain SVG
- **Фильтры**: blur, glow, shadow — но предпочтительнее CSS-фильтры (см. [[svg-layers-and-palette]])
- **Batch export**: через CLI `inkscape --export-type=svg --export-filename=out.svg input.svg`

### CLI-автоматизация

```bash
# Оптимизация SVG
inkscape --export-type=svg --export-filename=output.svg input.svg

# Экспорт в PNG (иконки)
inkscape --export-type=png --export-filename=icon.png -w 64 -h 64 icon.svg

# Batch: все SVG в папке
for f in assets/*.svg; do inkscape --export-type=svg --export-filename="$f" "$f"; done
```

## Почему не альтернативы

| Альтернатива | Почему нет |
|---|---|
| Figma | Облако, не владеешь файлами, экспорт SVG с артефактами |
| Adobe Illustrator | Платный, избыточный для простых иконок |
| Boxy SVG | Минимальный, нет слоям как в конвенции |
| SVGO (post-process) | Не редактор, только оптимизация. Дополняет Inkscape, не заменяет |
| Hand-coded SVG | Не подходит для сложных форм, но OK для простых геометрических |

## Ссылки

- Официальный сайт: https://inkscape.org/
- Документация: https://inkscape.org/learn/
- SVG specification: https://www.w3.org/TR/SVG2/

## Связанные страницы

- [[svg-layers-and-palette]] — конвенция слоёв и CSS custom properties
- [[css-framework-and-themes]] — палитры и темы
- [[yandex-games-technical-requirements]] — ≤100 МБ
