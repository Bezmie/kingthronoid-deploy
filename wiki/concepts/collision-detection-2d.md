---
type: concept
tags: [pattern, collision, 2d, architecture]
date: 2026-05-16
sources: [2026-05-16-mdn-games]
---

# 2D Collision Detection

Алгоритмы обнаружения столкновений в 2D. Hitbox = упрощённая форма поверх сущности. Не попиксельно, но достаточно и performant.

## AABB (Axis-Aligned Bounding Box)

Два прямоугольника без вращения. Нет зазора между 4 сторонами = коллизия.

```js
isColliding(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}
```

**Ограничение**: только axis-aligned. Для вращающихся объектов -- пересчитывать размеры AABB или использовать сферы.

## Circle vs Circle

Расстояние между центрами < сумма радиусов.

```js
isColliding(a, b) {
  const dx = (a.x + a.radius) - (b.x + b.radius);
  const dy = (a.y + a.radius) - (b.y + b.radius);
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist < a.radius + b.radius;
}
```

## SAT (Separating Axis Theorem)

Любые два **выпуклых** многоугольника. Сложнее, но мощнее. Проверка: если существует ось, где проекции не пересекаются -- коллизии нет. Для выпуклых: если нет разделяющей оси -- коллизия есть.

Референсы: [sevenson.com.au/blog/sat](https://www.sevenson.com.au/blog/sat/), [dyn4j.org/2010/01/sat](https://dyn4j.org/2010/01/sat/)

## Broad Phase / Narrow Phase

O(N^2) проверка всех пар -- waste. Разделение на две фазы:

| Фаза | Задача | Методы |
|------|--------|--------|
| **Broad** | Отсеять заведомо далёкие | Quad Tree, R-Tree, Spatial Hash |
| **Narrow** | Точная проверка | AABB, Circle, SAT |

Для инкременталок: обычно entities мало -- broad phase не нужен. Для action-игр -- обязателен.

## Typed Edges

- derived::[[2026-05-16-mdn-games]]
- uses::[[tilemaps]]

## Related

- [[collision-detection-3d]] -- 3D bounding volumes
- [[tilemaps]] -- logic grid для tile-based коллизий
- [[2026-05-16-mdn-games]] -- источник
