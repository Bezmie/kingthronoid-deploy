---
type: concept
tags: [pattern, prototype, cloning, data-modeling]
date: 2026-05-29
sources: [2026-04-28-game-programming-patterns]
---

# Prototype Pattern

Объект, способный порождать копии самого себя через `clone()`. Позволяет создавать вариации без иерархий классов.

## Basic Pattern

```js
class Monster {
    clone() { throw new Error('override'); }
}

class Ghost {
    constructor(health, speed) { this.health = health; this.speed = speed; }
    clone() { return new Ghost(this.health, this.speed); }
}

class Spawner {
    constructor(prototype) { this.prototype = prototype; }
    spawn() { return this.prototype.clone(); }
}
```

Один Spawner с прототипом заменяет иерархию классов-спаунеров. Прототип клонирует не только тип, но и **состояние** (быстрый призрак, слабый демон).

## Prototype Data Modeling

Поле `"prototype"` в JSON позволяет делегировать отсутствующие свойства базовому объекту — устраняет дублирование:

```json
{
    "name": "goblin grunt",
    "health": 50,
    "resistance": { "fire": 0.3, "ice": 0.8 }
},
{
    "name": "goblin wizard",
    "prototype": "goblin grunt",
    "health": 30,
    "spells": ["fireball"]
}
```

Wizard наследует `resistance` от grunt, переопределяя только `health` и добавляя `spells`.

## In JavaScript

JavaScript использует прототипную модель нативно: `Object.create(prototype)`. Клонирование через spread:

```js
const baseGenerator = { baseCost: 15, baseOutput: 0.1, growthRate: 1.15, icon: 'cursor.svg' };

// Вариация: ускоренный курсор
const fastCursor = { ...baseGenerator, baseOutput: 0.2, name: 'Fast Cursor' };

// Глубокое клонирование с переопределением
const premiumCursor = JSON.parse(JSON.stringify(baseGenerator));
premiumCursor.growthRate = 1.10;
```

## For Incremental Games

### Content Description via Prototypes

```js
const generatorDefs = {
    base: { baseCost: 15, baseOutput: 0.1, growthRate: 1.15 },
    cursor:    { prototype: 'base', name: 'Курсор',    icon: 'cursor.svg' },
    grandma:   { prototype: 'base', name: 'Бабушка',   baseCost: 100, baseOutput: 1, icon: 'grandma.svg' },
    farm:      { prototype: 'base', name: 'Ферма',      baseCost: 1100, baseOutput: 8, growthRate: 1.12 },
};

function resolveDef(key) {
    const def = generatorDefs[key];
    if (def.prototype) {
        const parent = resolveDef(def.prototype);
        return { ...parent, ...def };
    }
    return { ...def };
}
```

### Palette Cloning

См. [[svg-layers-and-palette]] — палитры как объекты, клонирование с HSL-сдвигом для вариаций:

```js
const redTheme = { base: '#ff4444', shadow: '#aa2222', ... };
const goldenTheme = { ...redTheme, base: '#ffcc00', shadow: '#aa8800' };
```

## Related

- uses::[[component-pattern]] — prototypes + components for entity description
- contradicts::[[type-object]] — type as object vs cloning for variations
- [[flyweight-and-object-pool-patterns]] — shared data vs cloning
