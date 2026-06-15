---
type: entity
tags: [resource, game-dev, algorithm, tilemap, procedural-generation, pathfinding, interactive, open-source]
date: 2026-06-05
url: https://www.redblobgames.com/
author: Amit Patel
license: MIT или Apache v2 (accompanying code)
---

# Red Blob Games

Канонический reference по алгоритмам и math для game dev. Интерактивные visual explanations + working code. Автор: Amit Patel (ex-Stanford CS, contributor к AIMA Norvig, ex-Wild Shadow Studios / Realm of the Mad God). Сайт с 1995, interactive style с 2007. Английский.

## Structure

- **Learn** — интерактивные руководства (pathfinding, map gen, grids, probability, visibility, geometry)
- **Play** — fun demos: playable map generators (Mapgen2/4), SDF fonts, procedural faces/bacteria, sphere tiling experiments, reaction-diffusion
- **Ponder** — exploration без full guide: name generation, color theory, map homunculus, hex railroads
- **Meta** — making-of секция: как пишутся interactive tutorials (Vue.js, d3.js, React, lit-html, vanilla, Preact), drag event handlers, scrubbable numbers
- **Blog** — simblob.blogspot.com — process posts, struggles, iterations

## Ingested Into Wiki

- [[2026-06-05-redblobgames]] — topic index + ценность для wiki + фильтрация "знание vs реализация"

## Editorial Characteristics

- **Working code per article** — не pseudocode. MIT/Apache v2.
- **Interactive visual style** — drag/scroll/scrub, не статичные diagrams. Подход описан в making-of секции.
- **Cross-linked** — статьи по темам (pathfinding ↔ grids ↔ visibility ↔ map gen) образуют связную сеть, не изолированные snippets
- **Long-term maintenance** — статьи обновляются годами (упоминания 2024-10, 2026-02), не abandoned
- **No signup, no ads, free** — audience = indie/student/hobbyist developers

## Author Context

- Amit Patel — Stanford CS, работал над Realm of the Mad God, contributor к AIMA (Norvig), co-developed educational games с Root-1
- Currently with Jetbolt Games (Galactic Assault Squad)
- Проекты: github.com/amitp, github.com/redblobgames
- Notion board с project ideas — публичный

## Coverage Map (теги wiki)

| Wiki concept | Redblobgames coverage |
|--------------|----------------------|
| [[tilemaps]] | Hex grid reference, square/hex/triangle tiles/edges/vertices, sphere tiling, line drawing |
| [[wave-function-collapse]] | Альтернативный procgen: Voronoi/Delaunay polygonal maps, Mapgen2/4, organic caves (Voronoi percolation), noise terrain |
| [[gacha-probability]] | RPG damage rolls, distributions, reshaping distributions (non-gacha probability fundamentals) |
| [[collision-detection-2d]] | 2D visibility sweep (graph of visible regions) |
| [[frontend-design-principles]] | Making-of: interactive tutorial design, scrubbable numbers, diagram+text highlight (10 lines JS) |

## Use in Wiki

Этот resource используется как **external reference** при обсуждении алгоритмов grid, pathfinding, procgen, probability. В wiki заносим паттерны и методологию (universal), не конкретные implementation details (платформо-зависимое).

## Related

- derived::[[2026-06-05-redblobgames]]
- uses::[[tilemaps]]
- uses::[[wave-function-collapse]]
- uses::[[gacha-probability]]
- uses::[[frontend-design-principles]]
- uses::[[collision-detection-2d]]
