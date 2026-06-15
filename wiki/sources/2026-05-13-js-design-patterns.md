---
type: source
tags: [design-patterns, javascript, architecture]
date: 2026-05-13
url: https://vivmagarwal.github.io/js-design-patterns/
author: Vivek M Agarwal
---

# JS Design Patterns (Agarwal)

Конспект GoF-паттернов на JS. Ключевые для проекта: Strategy (runtime-выбор алгоритма), Composite (иерархия part-whole), Decorator (динамическое обёртывание).

## Strategy

- Семейство алгоритмов, инкапсулированных в interchangeable объектах
- Context композициирует стратегию, не наследует
- Интерфейс стратегий единый — context не знает реализацию
- Open/Closed через composition over inheritance
- Примеры: сортировка, dynamic pricing, superHero powers, soldier refill/repair

## Composite

- Иерархия part-whole, единый интерфейс для leaf и container
- Операция на группе → рекурсивно на всех дочерних
- Component → Leaf (простой) + Composite (содержит children[])
- Примеры: файловая система, графические группы фигур

## Decorator

- Динамическое добавление поведения, альтернатива subclassing
- Decorator зеркалирует тип декорируемого (тот же интерфейс)
- Стекирование: любое количество декораторов друг на друга
- Mixin = добавляет новое, Decorator = модифицирует существующее
- Downsides: много мелких классов, сложность инстанциации
- Примеры: java.io streams, beverage + condiments

## Related

- [[strategy-pattern]] — runtime-выбор алгоритма
- [[composite-pattern]] — иерархия part-whole
- [[decorator-pattern]] — динамическое обёртывание
