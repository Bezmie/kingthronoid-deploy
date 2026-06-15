---
type: concept
tags: [architecture, ecs, game-pattern]
date: 2026-05-01
sources: []
---

# ECS-Lite Architecture

Упрощённая адаптация Entity-Component-System для браузерных игр: какие концепции ECS сохраняются, какие отбрасываются, и почему.

## Ключевые концепции ECS

Источники: [ECS FAQ](https://github.com/SanderMertens/ecs-faq), [Flecs](https://github.com/SanderMertens/flecs), [EnTT](https://github.com/skypjack/entt).

### Entity (Сущность)
Уникальный идентификатор игрового объекта. В Flecs/EnTT — integer. В простых реализациях — индекс в массиве. Сущность не содержит логики, только данные.

### Component (Компонент)
Чистые данные (POD/plain data), без поведения. В классическом ECS — добавляются/удаляются динамически. В упрощённых реализациях — поля стейт-объекта.

### System (Система)
Функция, работающая со всеми сущностями, подходящими под query. В ECS-lite — `initXxxSystem()` + подписки на события. Система мутирует state, не знает про DOM.

### Query (Запрос)
Механизм поиска сущностей по набору компонентов. При малом числе сущностей (<100) — **отсутствует**, заменяется EventBus'ом: вместо "найди все с Position+Velocity" эмитим событие, и нужные системы реагируют. Overhead query не оправдан.

### Observer (Наблюдатель)
Реакция на изменение компонентов. В EnTT — `emitter`, в Flecs — `observer`. В ECS-lite — `EventBus.on("entity.changed", ...)`.

### World/Registry (Мир/Реестр)
Контейнер всех данных ECS. GameState (данные) + WidgetRegistry (UI-контейнер).

## Расширенные концепции (при росте проекта)

### Prefab (Префаб)
Шаблон сущности. В Flecs — нативная поддержка. Определяет структуру (baseCost, baseOutput, upgrades). При размещении строений на сетке — префаб = тип строения, сущность = экземпляр на клетке.

### Hierarchy (Иерархия)
Связь parent/child между сущностями. В Flecs — нативная. Нужна для: строение → улучшения, зона → строения в зоне.

### Pipeline (Конвейер)
Порядок выполнения систем. В Flecs — явный. При росте числа систем требуется явный порядок (Economy → Milestones → UI).

### Archetype (Архетип)
Хранилище: таблица где компоненты = столбцы, сущности = строки. Cache-friendly, быстрый iterate. Используется в Flecs, Unity DOTS, Bevy. При <100 сущностей — избыточно.

### Sparse Set
Альтернативное хранилище (EnTT): каждый компонент в своём sparse set. Быстрый add/remove. При малом числе сущностей — избыточно.

## Что упрощается и почему

| Концепция | Классический ECS | ECS-Lite | Причина |
|-----------|-----------------|----------|---------|
| Query | archetype query / sparse set view | EventBus | <100 сущностей |
| Entity ID | uint64, генерируется | индекс массива | Фиксированный набор |
| Component storage | SoA arrays / sparse sets | Поля стейт-объекта | Мало типов |
| Multi-world | Несколько миров | Один state | Не нужно |
| SIMD/vectorization | Batch-обработка | Простой loop | JS не даёт контроля |
| Threading | Lockless scheduler | rAF + throttle | Один поток в браузере |

## Архетипичная структура ECS-lite

| Слой | Ответственность |
|------|----------------|
| **Core** | Типы (Def + State), EventBus, WidgetRegistry, форматирование, чистые вычисления (compute), данные (GameDef), save, утилиты |
| **Systems** | Подписки на events, мутации state. Не экспортируют вычисления |
| **Widgets** | Рендер + bind DOM, вычисления через core/compute |
| **Assembly** | Инициализация систем, слоты, виджеты, старт tick |

### Связь: EventBus

```
Action → emit("entity.action") → System → emit("entity.changed") → Widgets
Tick   → emit("state.check")    → System    → emit("state.unlocked")
```

Системы не ссылаются друг на друга. Виджеты не мутируют state. EventBus -- единственный канал.

### Lazy cache для hot-path вычислений

Обёртка `Lazy<T>` для дорогих вычислений (multipliers, production). Invalidate-on-change, не на каждый тик. Критично когда production зависит от 30+ источников (affixes, upgrades, glyphs). Каждый тик = 4 invalidate + 1 recompute вместо 4 полных пересчёта. Аналог dirty flag, но с ленивым recomputation. Подробнее -> [[dirty-flag]].

### Currency abstraction

Типизированные аксессоры над player-полями: `.add()`, `.subtract()`, `.purchase()`, `.bumpTo()`, `.dropTo()`. Side effects: `Currency.infinityPoints.set` также обновляет `maxIP` tracking. Предотвращает забытые dependent-обновления. Для проектов с множителями от affixes/glyphs -- ценная indirection. Источник: [[antimatter-dimensions]]

## Путь к полной ECS (когда понадобится)

1. **Сетка строений**: Entity = клетка (x,y), Component = BuildingData, System = PlacementSystem, IncomeSystem
2. **Иерархии**: BuildingEntity → UpgradesComponent (children)
3. **Prefabs**: BuildingDef → несколько BuildingEntity на разных клетках
4. **Pipeline**: явный порядок систем
5. **Query**: когда сущностей >100 — понадобится для поиска по компонентам

## Cross-references

- [[component-pattern]] — Composition over inheritance
- [[observer-pattern]] — EventBus как observer
- [[dependency-injection]] — wiring стратегия: DI vs Service Locator, separating configuration from use
- [[type-object]] — Def/State = Type Object (Breed/Monster)
- [[event-queue]] — EventBus = синхронный Observer; для async -- Event Queue
- [[command-pattern]] — Event как команда
- [[idle-game-core-loop]] — Core loop + meta loop
- [[wuselfaktor]] — Микро-анимации = ощущение жизни
- [[functional-programming-in-js]] — Чистые функции в ECS
- [[strategy-pattern]] — compute-функции как стратегии (Game → number)
- [[decorator-pattern]] — Modifier breakdown как decorator-цепочка
- [[composite-pattern]] — Grid/Cell/Building иерархия
- [[sources/2026-05-13-js-design-patterns]] -- источник для strategy/composite/decorator
- [[antimatter-dimensions]] -- Lazy cache, Currency abstraction, EventHub, BitUpgradeState