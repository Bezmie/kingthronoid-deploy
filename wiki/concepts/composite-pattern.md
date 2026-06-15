---
type: concept
tags: [pattern, composite, hierarchy, tree, part-whole]
date: 2026-05-13
sources: [2026-05-13-js-design-patterns]
---

# Composite Pattern

Иерархия part-whole с единым интерфейсом для leaf и container. Операция на группе рекурсивно применяется ко всем дочерним.

## Essence

- Component — общий интерфейс (render, move, cost...)
- Leaf — простой элемент, не содержит children
- Composite — содержит children[], операции делегируются рекурсивно
- Клиент не различает leaf и composite

## Implementation

```js
class Component {
  render() { /* abstract */ }
}

class Leaf extends Component {
  render() { /* draw single shape */ }
}

class Composite extends Component {
  children = [];
  add(c) { this.children.push(c); }
  render() { this.children.forEach(c => c.render()); }
}
```

## Game Application

- Grid = Composite из Cells, Cell = Composite из Buildings, Building = Leaf с Modifiers
- UI-виджеты: панели содержат панели содержат элементы
- Scene graph: узлы и листья

## Related

- uses::[[component-pattern]] — component in ECS ≈ composite ideologically
- [[decorator-pattern]] — decorator wraps one, composite aggregates many
- [[strategy-pattern]] — composite delegates, strategy selects algorithm
