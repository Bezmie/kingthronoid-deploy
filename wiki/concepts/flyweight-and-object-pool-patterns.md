---
type: concept
tags: [pattern, flyweight, object-pool, optimization]
date: 2026-05-29
sources: [2026-04-28-game-programming-patterns]
---

# Flyweight and Object Pool

Два паттерна оптимизации: Flyweight — разделяемые данные, Object Pool — переиспользование объектов.

## Flyweight

Разделяет данные на **внутреннее** (контекстно-независимое, разделяемое) и **внешнее** (уникальное для экземпляра).

```js
class GeneratorType {
    constructor(name, baseCost, baseOutput, growthRate, icon) {
        this.name = name;         // внутреннее — одинаковое для всех экземпляров
        this.baseCost = baseCost; // внутреннее
        this.baseOutput = baseOutput; // внутреннее
        this.growthRate = growthRate; // внутреннее
        this.icon = icon;         // внутреннее
    }
}

class GeneratorInstance {
    constructor(type, level) {
        this.type = type;   // ссылка на разделяемые данные
        this.level = level;  // внешнее — уникально
    }

    get cost() { return this.type.baseCost * Math.pow(this.type.growthRate, this.level); }
    get output() { return this.type.baseOutput * this.level; }
}

const cursorType = new GeneratorType('Курсор', 15, 0.1, 1.15, 'cursor.svg');
const myCursor = new GeneratorInstance(cursorType, 5);
```

Flyweight практически всегда **immutable** — изменение разделяемого объекта затронет всех владельцев.

### For Incremental Games

- Типы генераторов, апгрейдов, бонусов — Flyweight (общие данные)
- Экземпляры генераторов (уровень, прогресс) — внешнее состояние
- Палитры SVG — тоже Flyweight: одна палитра → много объектов. См. [[svg-layers-and-palette]]

## Object Pool

Повторное использование объектов из фиксированного пула вместо аллокации/деаллокации. Устраняет фрагментацию памяти и GC-паузы.

### Free List — O(1) create/destroy

```js
class ParticlePool {
    constructor(size) {
        this.particles = Array.from({ length: size }, () => ({ active: false, next: null, ...props }));
        for (let i = 0; i < size - 1; i++) this.particles[i].next = this.particles[i + 1];
        this.firstAvailable = this.particles[0];
    }

    create(x, y, vx, vy, life) {
        if (!this.firstAvailable) return null; // пул полон
        const p = this.firstAvailable;
        this.firstAvailable = p.next;
        p.active = true;
        p.x = x; p.y = y; p.vx = vx; p.vy = vy; p.life = life;
        return p;
    }

    destroy(p) {
        p.active = false;
        p.next = this.firstAvailable;
        this.firstAvailable = p;
    }
}
```

### Overflow Strategies

| Стратегия | Поведение |
|-----------|-----------|
| Не создавать | Возвращать null, пропускать эффект |
| Убить старейший | Заменить самую старую частицу |
| Увеличить пул | Динамическое расширение (риск фрагментации) |

### For Incremental Games

- Пул частиц при кликах/покупках (сотни частиц в секунду)
- Пул всплывающих чисел дохода («+100» над генератором)
- Пул звуковых объектов
- Критично на **мобильных платформах** — GC-паузы = фризы

## Typed Edges

- derived::[[2026-04-28-game-programming-patterns]]
- uses::[[svg-layers-and-palette]]
- uses::[[game-loop-pattern]]

## Related

- [[svg-layers-and-palette]] — Flyweight для палитр
- [[game-loop-pattern]] — update для частиц из пула
- [[type-object]] — Flyweight vs Type Object: акцент на память vs организацию
