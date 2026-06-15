---
type: concept
tags: [pattern, collision, 3d, architecture]
date: 2026-05-16
sources: [2026-05-16-mdn-games]
---

# 3D Collision Detection

Bounding volume техники для 3D. Аналог 2D, но с осью Z. То же разделение broad/narrow phase.

## AABB (Axis-Aligned Bounding Box)

Быстрейший 3D-тест. Non-rotated box. Сравнение границ по каждой оси.

### Point vs AABB

```js
isPointInsideAABB(point, box) {
  return point.x >= box.minX && point.x <= box.maxX &&
         point.y >= box.minY && point.y <= box.maxY &&
         point.z >= box.minZ && point.z <= box.maxZ;
}
```

### AABB vs AABB

```js
intersect(a, b) {
  return a.minX <= b.maxX && a.maxX >= b.minX &&
         a.minY <= b.maxY && a.maxY >= b.minY &&
         a.minZ <= b.maxZ && a.maxZ >= b.minZ;
}
```

**Вращение**: AABB не вращается. Для вращающихся объектов -- пересчитывать размеры AABB (теряется tightness) или использовать spheres.

## Bounding Spheres

Инвариантны к вращению -- главное преимущество. Хуже fit для некруглых объектов (много false positives).

### Point vs Sphere

```js
isPointInsideSphere(point, sphere) {
  const distance = Math.sqrt(
    (point.x - sphere.x) ** 2 +
    (point.y - sphere.y) ** 2 +
    (point.z - sphere.z) ** 2
  );
  return distance < sphere.radius;
}
```

**Оптимизация**: сравнивать squared distance с squared radius (без sqrt).

### Sphere vs Sphere

```js
intersect(a, b) {
  const distance = Math.sqrt(
    (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2
  );
  return distance < a.radius + b.radius;
}
```

### Sphere vs AABB

Clamp центр сферы к границам AABB = ближайшая точка. Если расстояние от ближайшей точки до центра < radius = коллизия.

```js
intersect(sphere, box) {
  const x = Math.max(box.minX, Math.min(sphere.x, box.maxX));
  const y = Math.max(box.minY, Math.min(sphere.y, box.maxY));
  const z = Math.max(box.minZ, Math.min(sphere.z, box.maxZ));
  const distance = Math.sqrt(
    (x - sphere.x) ** 2 + (y - sphere.y) ** 2 + (z - sphere.z) ** 2
  );
  return distance < sphere.radius;
}
```

## OBB (Oriented Bounding Box)

AABB с вращением. Точнее fit, но требует trigonometric операций. Используется в narrow phase после broad phase с AABB/sphere.

## Physics Engine

3D physics engines (cannon.js, ammo.js) предоставляют collision detection из коробки. Physical body = visual + shape + velocity/rotation/torque. Рекомендуется для сложных сцен.

## Typed Edges

- derived::[[2026-05-16-mdn-games]]
- uses::[[collision-detection-2d]]

## Related

- [[collision-detection-2d]] -- 2D алгоритмы (AABB, Circle, SAT)
- [[game-loop-pattern]] -- коллизии в update()
- [[2026-05-16-mdn-games]] -- источник
