---
type: concept
tags: [pattern, strategy, composition, runtime-selection]
date: 2026-05-13
sources: [2026-05-13-js-design-patterns]
---

# Strategy Pattern

Семейство алгоритмов, инкапсулированных в объекты с единым интерфейсом. Context выбирает стратегию runtime, не наследует.

## Essence

- Определить семейство алгоритмов → инкапсулировать каждый → сделать interchangeable
- Context композиционирует стратегию (composition over inheritance)
- Open/Closed: новые стратегии без изменения context

## Implementation

```js
class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }
  execute(data) {
    return this.strategy.run(data);
  }
  setStrategy(strategy) {
    this.strategy = strategy;
  }
}

const strategies = {
  bubbleSort: { run: (arr) => { /* ... */ } },
  quickSort:  { run: (arr) => { /* ... */ } },
};
```

## Game Application

- Типы строений = разные стратегии расчёта бонуса (adjacency, synergy, base rate)
- AI: выбор стратегии поведения в зависимости от состояния
- Pricing: разные формулы цены в зависимости от условий

## Related

- uses::[[component-pattern]] — composition over inheritance
- [[ecs-lite-architecture]] — compute functions as strategies
- [[decorator-pattern]] — decorator modifies, strategy replaces
