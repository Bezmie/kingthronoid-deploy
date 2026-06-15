---
type: concept
tags: [pattern, type-object, data-modeling, architecture]
date: 2026-05-08
sources: [2026-04-28-game-programming-patterns]
---

# Type Object

Один класс, каждый экземпляр которого представляет разные типы объектов. Поднимает часть системы типов из hardcoded иерархии классов в данные, определяемые в рантайме.

## Проблема

Сотни типов (монстров, генераторов, предметов). Каждый тип -- подкласс. Добавление нового типа = новый код + перекомпиляция. Тюнинг чисел = изменение кода.

## Решение

Два класса: **Type Object** (Breed) и **Typed Object** (Monster). Typed Object хранит ссылку на Type Object. Данные/поведение, общие для типа -- в Type Object. Уникальные данные экземпляра -- в Typed Object.

```js
class Breed {
    constructor(health, attack) { this.health = health; this.attack = attack; }
}

class Monster {
    constructor(breed) { this.health = breed.health; this.breed = breed; }
    getAttack() { return this.breed.attack; }
}
```

## Наследование в Type Object

Type Object может иметь parent -- делегирование (runtime) или copy-down (construction time). Copy-down быстрее (нет цепочки при каждом запросе), но не реагирует на изменения parent в рантайме.

```json
{
    "Troll": { "health": 25, "attack": "The troll hits you!" },
    "Troll Archer": { "parent": "Troll", "attack": "Fires an arrow!" }
}
```

## Type Object vs подклассы

| | Подклассы | Type Object |
|---|---|---|
| Новые типы | Новый код | Данные (JSON/конфиг) |
| Поведение по типу | Override методов | Данные (ограниченно) |
| Тюнинг | Рекомпиляция | Рантайм |
| Type-specific behavior | Полная свобода | Ограничен: фиксированный набор стратегий или bytecode-скрипты |

## В проекте

Def/State = Type Object. Def = Breed (статическое описание типа), State = Monster (runtime-экземпляр). Compute-функции = логика поверх обоих.

## Связанные страницы

- [[prototype-pattern]] -- альтернативный способ создания вариаций (clone vs тип)
- [[flyweight-and-object-pool-patterns]] -- Flyweight = разделяемые данные (близок к Type Object, но акцент на память, а не на организацию)
- [[component-pattern]] -- композиция вместо наследования (ортогонален Type Object)
- [[ecs-lite-architecture]] -- Def/State как Type Object
- [[dependency-injection]] -- wiring Type Object в Typed Object
