---
type: concept
tags: [pattern, 2d, tilemap, architecture]
date: 2026-05-16
sources: [2026-05-16-mdn-games]
---

# Tilemaps

Техника 2D-геймдева: карта собирается из маленьких регулярных тайлов. Память + perf: вместо огромных изображений -- маленькие фрагменты + многократное использование.

Примеры: Super Mario Bros, Pacman, Zelda, Starcraft, SimCity 2000.

## Tile Atlas (Spritesheet)

Все тайлы в одном изображении. Каждый тайл = индекс (координаты в атласе). Преимущество: один файл, один load, индекс = ID.

## Tilemap Data Structure

Объект карты содержит:
- **tileSize** -- размер тайла в px
- **atlas** -- Image (один или несколько)
- **dimensions** -- cols x rows (или px)
- **visual grid** -- 2D массив индексов тайлов (отрицательное/null = пусто)
- **logic grid** -- коллизии, path-finding, spawn points

## Square Tiles

Две перспективы: **top-down** (RPG, strategy) и **side-view** (platformers).

### Static tilemaps

Влезают на экран. Рендер: nested loop по cols/rows.

```js
for (let col = 0; col < map.columns; col++) {
  for (let row = 0; row < map.rows; row++) {
    const tile = map.getTile(col, row);
    drawTile(tile, col * map.tileSize, row * map.tileSize);
  }
}
```

### Scrolling tilemaps

Показывают часть мира. Нужен camera transform:

```js
worldToScreen(x, y) { return { x: x - camera.x, y: y - camera.y }; }
screenToWorld(x, y) { return { x: x + camera.x, y: y + camera.y }; }
```

**Оптимизация**: рендерить только видимые тайлы, не весь мир.

## Layers

Визуальная сетка = несколько слоёв. Меньше тайлов: один камень поверх разных типов terrain. Спрайты между слоями = эффект "за деревом".

## Logic Grid

Визуальная сетка -> логическая. Применения:
- **Коллизии** -- tile-based collision (стена = непроходимый тайл)
- **Path-finding** -- A* на логической сетке
- **Spawn points** -- маркеры в логическом слое
- **Match detection** -- Tetris, Bejeweled

## Isometric Tilemaps

Иллюзия 3D через изометрическую проекцию. SimCity 2000, Pharaoh, FFTactics. Более сложный рендер (diamond-shaped tiles, depth sorting).

## Hexagonal Grids

Шестиугольные тайлы: 6 соседей на одинаковом расстоянии (vs 4+диагонали у square). Устраняет диагональный bias в pathfinding и area-of-effect. Применения: Civilization VI, Battle for Wesnoth, многие 4X/strategy.

Топология: каждый hex имеет координаты (axial: q,r или offset: col,row). Соседи: 6 направлений вместо 4+4. Дистанция: hex distance = max(|dq|, |dr|, |ds|) / 2.

**Reference implementation**: [[redblobgames]] (hex grid reference + implementation guide с working code, MIT/Apache v2). Покрывает: axial/cube/offset coordinates, neighbor iteration, line drawing, range/reachable areas, conversion между системами, dual graph (tiles → edges → vertices).

## Render Optimization

| Метод | Описание |
|-------|----------|
| Только видимые | Не рендерить за экраном |
| Off-canvas pre-render | Весь тайлмап на отдельный canvas, один blit за кадр |
| 2x2 bleeding canvas | +1 тайл вокруг видимой области, перерисовка только при scroll на целый тайл |
| Чанкование | Разбить карту на секции (10x10), pre-render каждую, рендерить как "большие тайлы" |

## Procedural Generation via WFC

Wave Function Collapse генерирует тайлмапы из примера: извлекает NxN-паттерны -> constraint propagation -> когерентный выход. Две модели: overlapping (из битмапы) и tiled (из adjacency data). Эвристика минимальной энтропии устраняет directional bias. Поддерживает constrained synthesis (автозаполнение частично заполненного уровня). -> [[wave-function-collapse]]

## Typed Edges

- derived::[[2026-05-16-mdn-games]]
- uses::[[collision-detection-2d]]
- uses::[[flyweight-and-object-pool-patterns]]
- uses::[[wave-function-collapse]]
- uses::[[redblobgames]]

## Related

- [[collision-detection-2d]] -- logic grid для tile-based коллизий
- [[flyweight-and-object-pool-patterns]] -- atlas = flyweight (разделяемые данные)
- [[wave-function-collapse]] -- procedural generation tilemaps из примера
- [[redblobgames]] -- канонический reference по hex/square/triangle grid geometry
- [[2026-05-16-mdn-games]] -- источник
