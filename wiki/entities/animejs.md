---
type: entity
tags: [tech, animation, svg, dom, timeline]
date: 2026-05-29
url: https://animejs.com/documentation/
---

# anime.js v4

## Why

Анимационный движок для DOM/SVG. Даёт то, что CSS не может:

1. **Stagger** — каскадная анимация (апгрейды появляются по очереди)
2. **Spring easing** — физичная «отдача» при покупке
3. **Timeline** — последовательные анимации (prestige-переход)
4. **Layout** — анимация при перестановке DOM-элементов
5. **SVG morphTo** — плавная трансформация иконок

## Why Not Pure CSS

CSS @keyframes + transitions покрывают партиклы и hover. Но:
- Stagger (каскад) — только через JS-задержки или `animation-delay` вручную
- Spring/физичные easings — CSS не поддерживает
- Timeline (последовательность) — CSS только через `animation-delay`, хрупко
- Layout transitions — CSS не анимирует перестановку DOM

## Why Not GSAP

- GSAP — коммерческая лицензия (бесплатен только для некоммерческих)
- anime.js — MIT
- GSAP мощнее, но для типичных задач anime.js достаточно

## How to Use

```ts
import { animate, stagger, timeline } from "animejs";

animate(".upgrade-btn", {
  opacity: [0, 1],
  translateY: [10, 0],
  delay: stagger(50),
  duration: 300,
  ease: "out(3)"
});
```

> anime.js works with SVG + DOM. Canvas is not supported.

## Related

- uses::[[wuselfaktor]] — visual immersion
- uses::[[svg-layers-and-palette]] — SVG animation
