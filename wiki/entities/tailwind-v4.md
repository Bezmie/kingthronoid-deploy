---
type: entity
tags: [tech, css, utility-first, tailwind]
date: 2026-05-29
url: https://tailwindcss.com/
---

# Tailwind CSS v4

## Why

Utility-first CSS — стили через классы в HTML, без написания CSS-файлов. Альтернатива: CSS Modules, Styled Components, BEM.

## Why v4

- **Новый движок** (Oxide, Rust) — в 10x быстрее v3
- **CSS-first конфиг** — `@theme` в CSS вместо `tailwind.config.js`
- **Авто-detection** — сканирует исходники, не нужен `content: []`
- **Нет конфиг-файла** — всё в `main.css` через `@import "tailwindcss"`

## Documentation

- https://tailwindcss.com/docs — полный справочник
- https://tailwindcss.com/docs/upgrade-guide — миграция v3→v4

## Typed Edges

- uses::[[vite]]

## Related

- [[vite]] — подключён через Vite-плагин
