---
type: entity
tags: [game, reference, idle, incremental]
date: 2026-05-24
url: https://github.com/IvarK/AntimatterDimensionsSourceCode
---

# Antimatter Dimensions

Референcная idle-игра с 7+ prestige-слоями. Открытый исходник на Vue 2 + break_infinity.js. 12k+ коммитов, 337 stars.

## Ключевые архитектурные паттерны

- **Single player object** -- `window.player` = весь стейт, сериализуется напрямую. deepmerge с дефолтом для миграций
- **Data-driven config** -- `secret-formula/` содержит формулы апгрейдов/ачивок/челленджей как данные. GameMechanicState базовый класс
- **Class hierarchy**: Effect -> GameMechanicState -> Purchasable/Rebuyable/BitUpgradeState
- **Currency abstraction** -- типизированные аксессоры (.add/.subtract/.purchase) с автотрекингом max values и триггерами ачивок
- **EventHub** -- pub/sub с GAME_EVENT константами. Отдельно .logic и .ui экземпляры
- **Lazy cache** -- Lazy<T> для дорогих вычислений (multipliers). Invalidate-on-change, не на каждый тик
- **Bitfield storage** -- достижения и boolean-апгрейды упакованы в битовые поля (17 чисел = 544 слота ачивок)
- **NaN guard** -- в dev-режиме setter на player валидирует NaN/undefined/infinite

## Формулы баланса

- **ExponentialCostScaling**: двухфазная кривая (linear exponential -> super-exponential через quadratic excess). Аналитический bulk buy через квадратичную формулу
- **Logarithmic prestige conversion**: `higherCurrency = base^(log10(lowerCurrency) / threshold)`. Сжимает ~308 порядков нижнего слоя в ~1 порядок верхнего
- **Game speed как diff multiplier**: один тик при 1000x скорости = 1000 тиков при 1x. Фиксированный + переменный рендер

## Prestige-слои

AM -> Dim Boost -> Galaxy -> Infinity (IP) -> Eternity (EP) -> Reality (RM + Glyphs) -> Pelle (Armageddon). Каждый слой экспоненцирует предыдущий. Sub-layers: Replicanti, Time Studies, Dilation, Alchemy.

## Save system

25 версий миграций (последовательные patch-функции). JSON + pako + base64 сериализация. 3 слота + 8 auto-backups + Firebase cloud sync.

## Применимость к проекту

Для Kingthronoid: ExponentialCostScaling для стоимости строений, логарифмическая конверсия для prestige-слоёв, Lazy cache для production-вычислений с аффиксами, Currency abstraction для множителей, bitfield для компактных saves.

## Связанные страницы

- [[prestige-formulas]] -- извлечённые универсальные формулы престижа
- [[math-of-idle-games]] -- формулы стоимости и генерации
- [[break-infinity]] -- Decimal-библиотека (создана автором AD)
- [[incremental-games]] -- жанр
- [[idle-game-core-loop]] -- core/meta loop
- [[game-loop-pattern]] -- game speed как diff multiplier
- [[ecs-lite-architecture]] -- Lazy cache, Currency abstraction
