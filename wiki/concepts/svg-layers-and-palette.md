---
type: concept
tags: [svg, css, animation, visual, theming]
date: 2026-05-29
---

# SVG Layers and Palette

Паттерн создания SVG-объектов с именованными слоями для програмного перекрашивания через CSS custom properties.

## SVG Structure

Каждый объект разбит на слои: тень, базовый цвет, рефлекс, блик, обводка.

```svg
<svg viewBox="0 0 100 100">
  <g class="apple">
    <path class="shadow" d="..."/>
    <path class="base" d="..."/>
    <path class="reflex" d="..."/>
    <path class="highlight" d="..."/>
    <path class="outline" fill="none" d="..."/>
  </g>
</svg>
```

## CSS Custom Properties

```css
.apple .shadow    { fill: var(--apple-shadow);    }
.apple .base      { fill: var(--apple-base);       }
.apple .reflex    { fill: var(--apple-reflex);      }
.apple .highlight { fill: var(--apple-highlight);   }
.apple .outline   { stroke: var(--apple-outline);   fill: none; }
```

## JS: Palette Switching

```js
// Смена одного слоя
element.style.setProperty('--apple-base', '#ff4444');

// Смена схемы целиком
const themes = {
  red:    { base: '#ff4444', shadow: '#aa2222', reflex: '#cc3333', highlight: '#ffaaaa', outline: '#881111' },
  golden: { base: '#ffcc00', shadow: '#aa8800', reflex: '#ddaa00', highlight: '#ffeeaa', outline: '#886600' },
};

function applyTheme(el, theme) {
  for (const [key, value] of Object.entries(theme)) {
    el.style.setProperty(`--apple-${key}`, value);
  }
}
```

## Advantages

- **Палитры = JS-объекты** — легко менять, генерировать, A/B-тестировать
- **CSS transitions на fill** — плавная смена цвета (`transition: fill 0.3s`)
- **SVG inline** — один HTML-файл, нет HTTP-запросов, вписывается в ≤100 МБ
- **Классы вместо ID** — один шаблон, много экземпляров с разными палитрами
- **Динамические палитры** — можно генерировать HSL-сдвигом из одной базы

## Combination With Animations

Слои отлично комбинируются с CSS-анимациями и Web Animations API:

- **Шейкер**: `@keyframes shake` на всю группу `<g class="apple">`
- **Партиклы**: анимированные `<circle>` с rAF
- **Летящие ресурсы**: `element.animate()` от позиции клика до счётчика
- **Плавающие фигуры на фоне**: CSS `@keyframes float` + `transform: translate()`
- **Переливающаяся палитра**: `@keyframes hue-shift` + `filter: hue-rotate()`

## Inkscape Workflow

Редактор: [[inkscape]] 1.4.3. Процесс создания ассета:

1. Нарисовать объект в Inkscape, разбить на именованные слои (shadow/base/reflex/highlight/outline)
2. Заменить inline `fill`/`stroke` на CSS классы в XML Editor (`Edit → XML Editor`)
3. Сохранить как **Optimized SVG** (удаляет inkscape/sodipodi namespace, метаданные)
4. При необходимости — дополнительно прогнать через SVGO для минификации
5. В HTML: подключить через `<template>` или inline, перекрасить через JS `setProperty()`

## Related

- uses::[[inkscape]]
- uses::[[animejs]]
- [[css-framework-and-themes]]
