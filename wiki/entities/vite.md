---
type: entity
tags: [tech, bundler, dev-server, vite]
date: 2026-05-29
url: https://vite.dev/
---

# Vite

## Why

Vite — сборщик + dev-сервер. Замена Webpack. Два ключевых преимущества:

1. **Мгновенный dev-сервер** — использует native ES modules в браузере, не бандлит при запросе → старт за мс, не минуты
2. **Быстрый билд** — использует Rolldown (Rust) для production → в разы быстрее Webpack/TSC

## How It Works

```
Исходный код → Vite dev server → браузер (ESM, on-demand)
Исходный код → Vite build → dist/ (bundled, tree-shaken, minified)
```

- **Dev**: браузер запрашивает `main.ts` → Vite трансформирует на лету → отдаёт как ESM. Зависимости (node_modules) пре-бандлятся один раз через esbuild
- **Build**: Rolldown собирает всё в `dist/` — HTML, JS, CSS, ассеты
- **HMR**: при изменении файла — перезагружается только изменённый модуль, не вся страница


## Key Commands

| Команда           | Что делает                                      |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Запуск dev-сервера (HMR, http://localhost:5173) |
| `npm run build`   | Production билд → `dist/`                       |
| `npm run preview` | Превью production билда                         |

## Why Not Webpack/TSC

- Webpack: медленный старт, сложный конфиг, медленный HMR на больших проектах
- TSC: только компиляция, нет dev-сервера, нет бандлинга, нет HMR
- Vite: всё из коробки + экосистема плагинов

## Related

- uses::[[tailwind-v4]] — CSS-фреймворк, подключён через плагин Vite
- uses::[[typescript]] — TS-конфиг
