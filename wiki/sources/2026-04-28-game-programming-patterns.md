---
type: source
tags: [game-design, pattern, architecture, oop]
date: 2026-05-29
sources: [raw/Найстром Р. - Шаблоны игрового программирования - 2016.pdf]
---

# Game Programming Patterns — Nystrom

Роберт Найстром, «Game Programming Patterns», 2016. Русский перевод: github.com/jabocrack1/game-programming-patterns

## Ingested Chapters (13 of ~20)

### Sequential Patterns

- **Game Loop** → [[game-loop-pattern]] — `processInput → update → render`, фиксированный шаг + переменный рендер
- **Update Method** → [[game-loop-pattern]] — каждый объект имеет `update()`, цикл обходит коллекцию

### Behavioral Patterns

- **Command** → [[command-pattern]] — материализация вызова, undo/redo, ремаппинг ввода
- **State** → [[state-pattern]] — FSM вместо флагового ада, классы-состояния, pushdown-автомат

### Decoupling Patterns

- **Observer** → [[observer-pattern]] — Subject → Observer, события без связности

### Optimization Patterns

- **Flyweight** → [[flyweight-and-object-pool-patterns]] — разделяемые неизменяемые данные vs уникальное состояние
- **Object Pool** → [[flyweight-and-object-pool-patterns]] — переиспользование объектов, O(1) create/destroy
- **Component** → [[component-pattern]] — сущность = контейнер компонентов, развязка доменов
- **Prototype** → [[prototype-pattern]] — клонирование объектов, прототипное моделирование данных

### Data Modeling Patterns

- **Type Object** → [[type-object]] — тип как объект, определение новых типов через данные, не код

### Decoupling Patterns (Additional)

- **Event Queue** → [[event-queue]] — асинхронный Observer, FIFO очередь, развязка во времени
- **Service Locator** → [[service-locator]] — глобальный доступ к сервису без привязки к реализации

### Optimization Patterns (Additional)

- **Dirty Flag** → [[dirty-flag]] — отложить дорогой пересчёт до момента необходимости

## Not Ingested Chapters (7)

Bytecode, Subclass Sandbox, Spatial Partition, Double Buffer, Singleton, Pimpl, Update Method (объединён с Game Loop) -- менее релевантны для инкременталки на HTML5.

## Related

- derived::[[game-loop-pattern]]
- [[command-pattern]]
