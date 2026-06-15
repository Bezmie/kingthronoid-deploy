---
type: concept
tags: [css, tailwind, theming, visual, design-system]
date: 2026-05-29
---

# CSS Framework and Themes

Выбор CSS-инструмента для инкрементальной игры. Ключевая задача: **быстрая смена тем и визуальных наборов** на этапе дизайна.

## Tailwind CSS (MIT) — основной кандидат

### Usage

- **Лейаут**: `flex`, `grid`, `gap-*`, контейнеры — адаптивность из коробки
- **Адаптивность**: `md:`, `lg:` breakpoints — покрывает требование Яндекс Игр (мобильные + десктоп)
- **Типографика**: `text-*`, `font-*` — числа, подписи, кнопки
- **Отступы/размеры**: `p-*`, `m-*`, `w-*`, `h-*` — консистентная система spacing
- **Интерактив**: `hover:`, `active:`, `focus:` — стили кнопок/генераторов
- **Dark/темы**: `dark:` variant — легко переключать темы

### Not For

- **Анимации**: `@keyframes` в plain CSS (или плагин `tailwindcss-animate`)
- **SVG-палитры**: CSS custom properties напрямую (см. [[svg-layers-and-palette]])
- **Динамические стили из game loop**: `element.style.setProperty()` — не через классы

### Theme Configuration via Tailwind

Tailwind конфигурация расширяет `theme.colors` через CSS custom properties:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        palette: {
          base: 'var(--palette-base)',
          shadow: 'var(--palette-shadow)',
          // ...
        },
      },
    },
  },
}
```

Смена темы = обновление CSS custom properties на `document.documentElement`. Конкретные палитры и конфигурация -> проектная wiki.

### Theme Switching

```js
const themes = { /* name -> { '--var': 'value' } */ };
function applyTheme(name) {
  const root = document.documentElement;
  for (const [key, val] of Object.entries(themes[name])) {
    root.style.setProperty(key, val);
  }
}
```

### Tailwind + SVG Palettes

```html
<svg class="fill-apple-base stroke-apple-outline">
  <path class="shadow" .../>
  <path class="base" .../>
</svg>
```

### Bundle

PurgeCSS встроен — только используемые классы. Для проекта: ~10-30 КБ. Запас до лимита 100 МБ огромный.

## Alternatives (опенсорс)

### UnoCSS (MIT)

- **Плюсы**: быстрее Tailwind, компактнее, совместим с Tailwind-синтаксисом, атрибутный режим (`class="flex"` → `<div flex>`)
- **Минусы**: меньше экосистема, реже используется в индустрии
- **Когда рассмотреть**: если бандл-размер критичен или нужен режим атрибутов

### Open Props (MIT)

- **Плюсы**: набор CSS custom properties (colors, shadows, gradients, animations) — НЕ фреймворк, а набор переменных. Идеально для тем
- **Минусы**: нет утилити-классов — нужен свой CSS или комбинация с Tailwind
- **Когда рассмотреть**: как дополнение к Tailwind для расширенной палитры тем

### Vanilla Extract (MIT)

- **Плюсы**: CSS-in-JS с типизацией (TypeScript), zero-runtime, themes через CSS variables
- **Минусы**: сложнее setup, другая парадигма (не utility-first)
- **Когда рассмотреть**: если нужна строгая типизация стилей

### Твоя текущая палитра CSS custom properties

Уже реализовано (см. [[svg-layers-and-palette]]) — **не зависит от фреймворка**. Работает с Tailwind, UnoCSS, Open Props и без фреймворка вообще.

## Decision: Tailwind CSS v4 → UnoCSS при необходимости

**Старт:** Tailwind CSS v4 (MIT) — стандарт индустрии, максимум учебных материалов, навык переносится. v4 на Rust — быстрый.

**Миграция на UnoCSS если:**
- Понадобится runtime-смена тем без пересборки (A/B тесты визуала)
- Захочется атрибутный режим (`<div flex p-4>`)
- Бандл станет критичным (при 100 МБ лимите — маловероятно)

**Миграция простая:** синтаксис 90% совместим, основная работа — заменить `tailwind.config.js` → `uno.config.ts` и сменить плагин в Vite.

### Comparison

| | Tailwind v4 | UnoCSS |
|---|---|---|
| Скорость | Быстрый (Rust) | 5x быстрее (no AST) |
| Размер ядра | ~30 КБ (purged) | ~6 КБ (brotli) |
| Синтаксис | Стандарт | 90% совместим с Tailwind |
| Runtime-темы | Нет (только build-time) | Да (CDN runtime) |
| Атрибутный режим | Нет | Да |
| Иконки как CSS | Нет | Да: `class="i-mdi-home"` |
| Экосистема | Огромная | Растущая |
| Обучаемость | Максимальная | Высокая (переносимый навык) |

## Recommendation

1. **Tailwind** для лейаута, адаптивности, типографики, интерактива
2. **CSS custom properties** для палитр (уже есть паттерн)
3. **@keyframes** для анимаций (в `styles/main.css`)
4. **Темы как JS-объекты** — легко A/B-тестировать визуал
5. При необходимости — переключиться на UnoCSS (совместимый синтаксис, миграция простая)

## Related

- uses::[[tailwind-v4]] — Tailwind CSS v4 справка
- uses::[[svg-layers-and-palette]] — SVG-слои и программируемая палитра
- [[yandex-games-technical-requirements]] — адаптивность, ≤100 МБ
