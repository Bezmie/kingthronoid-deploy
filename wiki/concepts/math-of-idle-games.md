---
type: concept
tags: [idle, math, balance, prestige, derivatives, game-design, growth]
date: 2026-05-29
sources: [2026-04-28-math-of-idle-games, 2026-05-16-reddit-growth-functions]
---

# Math of Idle Games

Ключевые формулы и принципы балансировки incremental игр. Источник: Anthony Pecorella (Kongregate), 3-частная серия 2016-2017.

## Cost and Generation

```
cost_next = base × growth^owned
production = (base_output × owned) × multipliers
```

**Экспоненциальная стоимость (n^x) всегда обгоняет полиномиальную генерацию (x^k).** Это фундамент idle-игр: производство растёт, но стоимость обгоняет, создавая необходимость престижа.

Стандарт: growth = 1.07–1.15.

## Bulk Buy Formulas

```
cost_bulk(n) = b × r^k × (r^n - 1) / (r - 1)
max_buy(c)   = floor(log_r(c×(r-1)/(b×r^k) + 1))
```

n=купить, b=base_price, r=growth, k=owned, c=currency. Экономит for-loops.

### Analytical Bulk Buy for Two-Phase Scaling

ExponentialCostScaling (linear exponential -> super-exponential через quadratic excess):

```
cost = baseCost * baseIncrease^n * costScale^(excess*(excess+1)/2)
```

Где `excess = n - purchasesBeforeScaling`. Quadratic formula для max-buy без итерации:

```
maxBuy = floor((-1 + sqrt(1 + 8 * budget / costScale)) / 2)
```

Критично для offline-симуляции (тысячи тиков). Детали -> [[prestige-formulas]].

## Generator Balance

Проблема: без настройки множителей новейший генератор всегда доминирует → старые нерелевантны.

Решение: **индивидуальные пороги множителей**. Разные x2/x3/x5 на разных порогах owned (25, 50, 100 и т.д.) для каждого генератора создают shifting priorities → игроку интереснее выбирать.

## Derivative Generators (Cascade)

Gen1→currency, Gen2→Gen1, Gen3→Gen2... Каждый уровень — производная предыдущего.

Ряд интегралов: `1, x, x²/2, x³/6, ..., x^n/n!`

При n→∞ → e^x (экспонента). При конечных n — суб-экспоненциальный, т.е. экспоненциальные затраты всегда обгонят.

**Tier boost:** каждая ручная покупка Gen1 даёт +0.05% ко всем Gen1 — сохраняет ценность покупок при миллиардах юнитов.

## Prestige Formulas

### Cross-Layer Conversion (Logarithmic)

Универсальный паттерн: `higherCurrency = base^(log10(lowerCurrency) / threshold)`. Сжимает ~308 порядков в ~1 порядок. Детали и nerf-паттерны -> [[prestige-formulas]].

### Lifetime (Diminishing Returns on Reset)

| Игра | Формула | Удвоение требует |
|------|---------|-----------------|
| Realm Grinder | p = (√(1+8×c_M/10¹²)-1)/2 | 4× от предыдущего |
| AdCap | p = 150×√(c_L/10¹⁵) | ~3-4× |
| Cookie Clicker | p = ∛(c_L/10¹²) | ~8× |

### Since-Reset (History-Independent)

| Игра | Формула | Удвоение требует |
|------|---------|-----------------|
| Egg, Inc. | Δp = (c_R/10⁶)^0.14 | 128× (!) |
| Clicker Heroes | upgrades count (~log) | ≈ log роста |

### Formula Choice

| Формула | Характер | Уместно когда |
|---------|----------|--------------|
| `floor(√(x/K))` | Лестничный, каждое удвоение всё дороже | Игры с offline progress (Realm Grinder) |
| `floor(log10(x))` | Крайне медленный рост, почти линейный по порядкам | Короткие сессии, частый prestige |
| `x^0.14` | Очень быстрое удвоение (~128x) | Длинные циклы prestige |
| Since-reset + steep exponent | Резкий рост от текущего цикла | Offline-limited, фарм в одной точке |

## Growth Type Comparison

Ключевой принцип баланса: **production growth vs price growth** определяет ощущение игрока:

| Production vs Price | Эффект | Когда уместно |
|---------------------|--------|--------------|
| production > price | Тривиализация, покупки не имеют значения | Не уместно |
| production = price | Стабильный темп (1 покупка/10мин) | Ранний геймплей |
| price чуть быстрее | Замедление, ощущение роста сложности | Основной цикл |
| price значительно быстрее | Стена = триггер для prestige/новой механики | Поздний геймплей |

**Иерархия**: log < sqrt(x) < x < x*logx < x^2 < x^logx < 2^x < 2^(x^2) < 2^(2^x) < tetration

Подробная таблица с применениями -- [[idle-game-economy]].

## Balancing Principles

1. Прогресс внутри престижа — «bumpy»: медленно→быстро(множитель)→медленно
2. Множители на milestone-порогах (25/50/100 owned) создают скачки
3. Spreadsheet для симуляции, но точное prediction невозможно
4. Определить где «fun» и фокусироваться: unfold features? collect achievements? optimize prestige?

## Related

- derived::[[2026-04-28-math-of-idle-games]]
- uses::[[prestige-formulas]]
- [[idle-game-economy]] -- экономика, валюты, полная таблица growth-типов
- [[break-infinity]] -- библиотека Decimal для больших чисел
