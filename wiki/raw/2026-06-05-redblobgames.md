# Red Blob Games — Topic Index

Источник: https://www.redblobgames.com/

Автор: Amit Patel (https://www-cs-students.stanford.edu/~amitp/). Сайт активен с 1995. Контент curated game dev articles с 1990, interactive explanations с 2004. Стиль interactive visual explanations of math/algorithms через game examples.

## Topics covered (snapshot 2026-06-05)

### Pathfinding

- Introduction to A* + implementation guide (https://www.redblobgames.com/pathfinding/a-star/introduction.html, /implementation.html)
- Dijkstra's Algorithm, Breadth First Search
- Tower Defense pathfinding (BFS, Dijkstra Maps, Flow Field)
- Pathfinding Algorithms (http://theory.stanford.edu/~amitp/GameProgramming/) — старая но каноническая страница
- All pairs shortest paths для map analysis
- Pathfinding with circular obstacles (https://redblobgames.github.io/circular-obstacle-pathfinding/) — bitangents
- Intro to graph theory — grids как graphs
- Distance to seed points (BFS)

### Map generation

- Map generation from noise + noise function concepts (Simplex/Perlin, signal processing)
- Polygonal Map Generation (Voronoi, Delaunay, blue noise, water flow) — http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation/
- Implementation guide: /x/2022-voronoi-maps-tutorial/
- Guide to Delaunator library (https://mapbox.github.io/delaunator/) — mesh data structures, half-edges
- Mapgen2, Mapgen4 — playable map generators
- Organic cave maps (Voronoi percolation)
- Procedural planet generation on sphere
- Noisy edges (area-constrained noisy paths)
- Map generation with no code (SVG filters)
- Terrain shader experiments
- Resource placement on maps
- Map homunculus (stretching/shrinking)
- Game map design (what to show/hide) — http://www-cs-students.stanford.edu/~amitp/game-programming/skyrim-maps/

### Grids

- Hexagonal grid reference + implementation guide (https://www.redblobgames.com/grids/hexagons/)
- Non-orthogonal bases, relation to cubes
- Grid parts: tiles, edges, vertices для squares, hexagons, triangles (/grids/parts/)
- Grid edges для square grids (/grids/edges/)
- Line drawing (lerp, supercover)
- Drawing circles on grid
- Tiling a sphere with hexagons / squares / diagonal squares / Voronoi
- Goldberg-Coxeter (cube tiling with squares)
- Hexagon on Saturn
- Railroads on hex grid

### Probability

- Probability for RPG Damage (https://www.redblobgames.com/articles/probability/damage-rolls.html)
- Probability distributions, nonparametric distributions
- Reshaping distributions (https://observablehq.com/@redblobgames/reshaping-distributions)

### Visibility & geometry

- 2D Visibility algorithm (sweep algorithms)
- Curved roads (Bezier curves, circular arcs, biarcs)
- Line drawing (lerp, supercover)

### Procedural content

- Procedural face generator (/x/1845-face-generator/, по мотивам Scott McCloud)
- Procedurally generating names через phonemes + neural networks
- Modifying spelling через pronunciations + letter-phoneme alignment
- Procedural bacteria animation
- Signed Distance Field (SDF) fonts

### Interactive tutorial making-of

- Tutorial about making interactive tutorials (Vue.js с 2015)
- Older version (d3.js, 2011-2015)
- Starter code (React, Vue, lit-html, vanilla, Preact)
- Event handlers for dragging objects (mouse/touch, 2023)
- How I implement my interactive diagrams (part 1, part 2)
- Little design elements (colors, shapes, controls)
- Drag handles with constraints
- Arrows outside diagrams
- Responsive design для interactive diagrams (canvas, svg, webgl)
- Notes on A* pages + graph editing tool
- Scrubbable numbers в ObservableHQ
- Vue + Canvas / Vue + D3 / Vue + KaTeX / Vue + pointerevents / Vue text modification
- Highlighting diagrams + text together (10 строк JS)

## Licensing

Accompanying code: MIT или Apache v2 — оба допускают commercial use. Other projects на github.com/amitp и github.com/redblobgames.

## Projects by author

- Solar Realms Elite (BBS-игра, 1990s)
- BlobCity (environmental simulation)
- Realm of the Mad God (Wild Shadow Studios)
- AI: A Modern Approach (interactive diagrams с Norvig)
- A Chronicle of Misdeeds (Nonagon Games)
- Galactic Assault Squad (Jetbolt Games, текущий)

## Audience

Independent, student, hobbyist game developers. Free, no signup, no ads. Английский язык.
