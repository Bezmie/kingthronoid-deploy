---
type: source
tags: [resource, game-design, algorithm, tilemap, procedural-generation, pathfinding]
date: 2026-06-05
url: https://www.redblobgames.com/
author: Amit Patel
---

# Red Blob Games — Topic Index (Amit Patel)

Каталог интерактивных руководств по алгоритмам и math для game dev. Автор — Amit Patel (ex-Stanford), автор Solar Realms Elite и contributor к AI: A Modern Approach (Norvig). Сайт активен с 1995, interactive explanations с 2004.

## Что покрыто

- **Pathfinding** — A*, Dijkstra, BFS, Tower Defense flow field, all-pairs, circular obstacles (bitangents), graph theory для grids
- **Map generation** — noise (Simplex/Perlin), polygonal (Voronoi/Delaunay, blue noise), Mapgen2/4 (playable generators), organic caves (Voronoi percolation), resource placement, water flow
- **Grids** — hexagonal (reference + implementation), square/triangle tiles/edges/vertices, line drawing (lerp, supercover), circle drawing, sphere tiling (hex/squares/Voronoi), Goldberg-Coxeter, hex railroads
- **Visibility & geometry** — 2D visibility (sweep), curved roads (Bezier, biarcs)
- **Probability** — RPG damage rolls, distributions, nonparametric, reshaping distributions
- **Procedural content** — face generator, name generation (phonemes + neural networks), spelling modification, SDF fonts
- **Interactive tutorial making-of** — Vue.js/d3.js/React/lit-html/vanilla/Preact starters, drag event handlers, scrubbable numbers, diagram+text highlighting (10 строк JS)

## Почему ценно для wiki

1. **Working code, не pseudocode** — каждое руководство = интерактивные diagram + реализация. Можно копировать подход (MIT/Apache v2 license)
2. **Глубина и связность** — статьи cross-linked по темам (напр. grids ↔ pathfinding ↔ visibility ↔ map gen), не isolated snippets
3. **Алгоритмическая корректность** — автор = ex-Stanford CS, контрибьютор AIMA (Norvig). Канонические формулировки
4. **Визуальная интерактивность** — обучение через manipulation, не чтение. Особенно для grid-топологии и pathfinding, где визуализация = основной debugging tool
5. **Long-term maintenance** — статьи обновляются (с 1995), современный web stack (Vue 3, pointer events), не устаревший tutorial

## Фильтрация "знание vs реализация"

В wiki берём:
- **Паттерны**: hex grid topology, dual graph (tiles→edges→vertices), sweep algorithm для visibility, A* с эвристиками
- **Библиотеки/инструменты**: Delaunator (Voronoi+mesh), SDF fonts approach
- **Архитектурные идеи**: separation tiles/edges/vertices, generic grid abstraction (square/hex/triangle через общий API)
- **Methodology**: interactive explanation style, making-of pages — процесс обучения через manipulation

Не берём:
- **Конкретные API hooks** (Vue 2 vs Vue 3, d3 v3 vs v7) — платформо-зависимая реализация
- **CSS/SVG micro-решения** для конкретных diagrams
- **Solar Realms Elite / BlobCity / конкретные shipped games** автора — not transferable

## Связь с существующими wiki-страницами

- `tilemaps` (concept) — общий подход tile-based игр; redblobgames = канонический reference для grid geometry, особенно hex
- `wave-function-collapse` (concept) — alternative procgen подход; Voronoi/polygonal maps = redblobgames' signature territory
- `gacha-probability` (concept) — RPG damage probability на redblobgames = базовый reference для не-гача вероятностей
- `frontend-design-principles` (concept) — making-of секция redblobgames = пример interactive tutorial design
- `collision-detection-2d/3d` (concepts) — visibility algorithm = graph-of-visible-regions, related

## Ingested Into Wiki

- [[redblobgames]] — entity-страница (external resource description)
- (обновлён) [[tilemaps]] — добавлена reference на hex grid reference

## Research Zones (по запросу)

Отдельные статьи могут быть ingested как самостоятельные sources при запросе:
- `/pathfinding/a-star/introduction.html` + `implementation.html` — каноническое A* руководство
- `/grids/hexagons/` — hex grid reference + implementation
- `/maps/terrain-from-noise/` — noise-based map gen
- `/articles/visibility/` — 2D visibility sweep
- `/articles/probability/damage-rolls.html` — RPG damage

## Related

- uses::[[tilemaps]]
- uses::[[wave-function-collapse]]
- uses::[[gacha-probability]]
- uses::[[frontend-design-principles]]
- uses::[[collision-detection-2d]]
- [[redblobgames]]
