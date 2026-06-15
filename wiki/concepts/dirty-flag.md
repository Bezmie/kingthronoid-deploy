---
type: concept
tags: [pattern, dirty-flag, optimization, caching]
date: 2026-05-08
sources: [2026-04-28-game-programming-patterns]
---

# Dirty Flag

Отложить дорогую работу до момента, когда результат действительно нужен. Флаг "грязный" = производные данные устарели относительно первичных.

## Проблема

Первичные данные меняются -> производные (дорогое вычисление) нужно пересчитать. Если пересчитывать сразу при каждом изменении -- много лишней работы (несколько изменений за кадр = несколько пересчётов, нужен только последний).

## Решение

При изменении первичных данных -- установить флаг. При запросе производных -- если флаг установлен, пересчитать и сбросить. Иначе -- использовать кэш.

```js
class GraphNode {
    setTransform(local) {
        this.local = local;
        this.dirty = true;
    }

    render(parentWorld) {
        if (this.dirty) {
            this.world = this.local.combine(parentWorld);
            this.dirty = false;
        }
        renderMesh(this.mesh, this.world);
    }
}
```

Иерархия: dirty propagates вниз при render через параметр. Родитель грязный -> дети тоже пересчитывают. Не нужно рекурсивно помечать детей при setTransform.

## Условия применимости

1. Первичные данные меняются чаще, чем производные используются
2. Производные дорого пересчитывать инкрементально (если можно держать running total -- dirty flag не нужен)

## Риски

- Откладывание слишком долго = заметная пауза при запросе
- Забыли установить флаг при изменении = stale данные, трудноотлавливаемый баг
- Кэш производных данных = расход памяти

## Когда очищать флаг

| Стратегия | Плюсы | Минусы |
|-----------|-------|--------|
| При запросе результата | Нет работы если результат не нужен | Пауза в неожиданный момент |
| На чекпоинтах (save, loading screen) | Не влияет на UX | Потеря данных при краше |
| Фоновый таймер | Настраиваемая частота | Избыточная работа, нужна concurrency |

## Гранулярность

Fine-grained (флаг на каждую планку) = меньше лишней обработки, больше памяти на флаги. Coarse-grained (флаг на палубу) = больше лишней обработки, меньше флагов.

## В проекте

UI throttle = coarse dirty flag: state обновляется 60fps, UI перерисовывается 10fps. Fine-grained per-entity dirty flag = future optimization. Prestige reset = массовое изменение -> один пересчёт производных (без dirty flag = лишние промежуточные перерисовки).

## Lazy cache как расширение

`Lazy<T>` = dirty flag + кэшированный результат. Invalidate при изменении, recompute при первом запросе. Отличие от чистого dirty flag: dirty flag = "пересчитай когда понадобится", Lazy = "пересчитай и сохрани когда понадобится". Критично для hot-path (dimension multipliers, production с affixes). Invalidate-on-change вместо invalidate-on-tick: 4 invalidate + 1 recompute vs 4 полных пересчёта. Источник: [[antimatter-dimensions]].

## Связанные страницы

- [[observer-pattern]] -- Observer уведомляет об изменении (триггер для установки dirty flag)
- [[game-loop-pattern]] -- game loop = естественное место для проверки dirty flags (render phase)
- [[flyweight-and-object-pool-patterns]] -- Object Pool + dirty flag для переиспользуемых объектов (reset при возврате в pool)
- [[ecs-lite-architecture]] -- при росте сущностей dirty flag на compute = ключ к производительности
- [[antimatter-dimensions]] -- Lazy cache (invalidate-on-change + cached result)
