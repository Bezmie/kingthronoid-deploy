---
type: concept
tags: [pattern, component, ecs, architecture]
date: 2026-05-29
sources: [2026-04-28-game-programming-patterns]
---

# Component Pattern

Сущность охватывает множество доменов (ввод, физика, рендер), но код каждого изолирован в компоненте. Сущность = простой контейнер компонентов.

## Problem: Gordian Knot

Монолитный класс `GameObject` знает про ввод, физику, рендер, звук, AI — всё связано со всем. Изменение физики ломает рендер.

## Solution: Components

```js
class GameObject {
    constructor(components) {
        this.components = components;
    }

    update(world, graphics) {
        for (const comp of this.components) {
            comp.update(this, world, graphics);
        }
    }
}

class ProductionComponent {
    constructor(baseRate) { this.baseRate = baseRate; this.level = 0; }

    update(gameObject, world) {
        world.addGold(this.baseRate * this.level);
    }
}

class VisualComponent {
    update(gameObject, world, graphics) {
        graphics.draw(gameObject.x, gameObject.y, gameObject.type.icon);
    }
}

class UpgradeComponent {
    constructor(costGrowth) { this.costGrowth = costGrowth; }

    upgrade(gameObject) {
        this.level++;
        gameObject.getComponent(ProductionComponent).level = this.level;
    }

    get cost() { return this.baseCost * Math.pow(this.costGrowth, this.level); }
}
```

## Component Communication

| Способ | Плюсы | Минусы |
|--------|-------|--------|
| Через общее состояние контейнера | Просто | Загрязняет объект |
| Прямые ссылки друг на друга | Быстро | Связность |
| Сообщения/события (Observer) | Максимальная развязка | Сложнее отладка |

Рекомендация для инкременталки: **прямые ссылки** для тесно связанных компонентов (Production + Upgrade), **Observer** для слабо связанных (Production → UI).

## For Incremental Games

| Компонент | Ответственность |
|-----------|----------------|
| `ProductionComponent` | Генерация ресурса (rate × level) |
| `UpgradeComponent` | Стоимость, покупка, уровень |
| `VisualComponent` | SVG-рендеринг, анимации |
| `BoostComponent` | Временные множители (RV-буст) |
| `SaveComponent` | Сериализация для SDK-сохранений |

Генератор = `ProductionComponent + UpgradeComponent + VisualComponent + SaveComponent`
Декорация = `VisualComponent` (только рендер)
Бонус = `BoostComponent + VisualComponent`

Переиспользование компонентов без иерархий наследования. См. также [[flyweight-and-object-pool-patterns]] — типы компонентов как Flyweight.

## Related

- uses::[[observer-pattern]] — communication between components
- uses::[[strategy-pattern]] — composition over inheritance
- [[composite-pattern]] — hierarchy of component containers
