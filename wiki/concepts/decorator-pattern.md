---
type: concept
tags: [pattern, decorator, wrapping, extension, open-closed]
date: 2026-05-13
sources: [2026-05-13-js-design-patterns]
---

# Decorator Pattern

Динамическое добавление поведения объекту через обёртывание. Альтернатива subclassing: стекируемые декораторы зеркалируют тип декорируемого.

## Essence

- Decorator реализует тот же интерфейс, что и декорируемый объект
- Оборачивает объект, добавляет поведение, делегирует остальное
- Любое количество декораторов стекируется
- Decorator ≠ Mixin: mixin добавляет новое, decorator модифицирует существующее

## Implementation

```js
class Beverage {
  cost() { /* abstract */ }
  getDescription() { /* abstract */ }
}

class Espresso extends Beverage {
  cost() { return 1.99; }
  getDescription() { return "Espresso"; }
}

class Mocha extends Beverage {
  constructor(beverage) { this.beverage = beverage; }
  cost() { return this.beverage.cost() + 0.20; }
  getDescription() { return this.beverage.getDescription() + " + Mocha"; }
}

// Стекирование
const drink = new Mocha(new Mocha(new Espresso()));
```

## Drawbacks

- Много мелких классов
- Сложность инстанциации (надо знать какой набор декораторов)
- Порядок обёртывания важен

## Game Application

- Modifier breakdown: каждый источник множителя = decorator
- Строение + эффекты соседства = base + decorators
- Save migration: v1→v2 как decorator поверх старого формата

## Typed Edges

- derived::[[2026-05-13-js-design-patterns]]
- uses::[[ecs-lite-architecture]]

## Related

- [[ecs-lite-architecture]] — Modifier как decorator-цепочка
- [[flyweight-and-object-pool-patterns]] — shared state vs decorator state
- [[strategy-pattern]] — strategy заменяет алгоритм, decorator оборачивает
