---
type: concept
tags: [balance, formula, prestige, incremental, math]
date: 2026-05-24
sources: [antimatter-dimensions]
---

# Prestige Formulas

Универсальные формулы конверсии между prestige-слоями в incremental-играх. Как сжимать экспоненциальный рост нижнего слоя в управляемый рост верхнего.

## Logarithmic Conversion

Базовый паттерн: `higherCurrency = base^(log10(lowerCurrency) / threshold)`

- `base` = множитель за каждый пороговый шаг (типично 5-10)
- `threshold` = порядков нижнего слоя на единицу верхнего (типично 308 = Number.MAX_VALUE log10)
- Результат: ~308 порядков нижнего слоя -> ~1 порядок верхнего

Примеры из Antimatter Dimensions:

| Конверсия | Формула | Что сжимает |
|-----------|---------|-------------|
| AM -> IP | `10^(log10(maxAM) / 308 - 0.75)` | 1e308 AM -> ~1 IP |
| IP -> EP | `5^(log10(maxIP) / 308 - 0.7)` | 1e308 IP -> ~1 EP |
| EP -> RM | `1000^(glyphLevel / 1e6)` | Зависит от glyph level |

**Ключевой инсайт**: делитель `threshold` = естественная граница (1e308 для JS, или произвольный порог). Смещение (`-0.75`, `-0.7`) определяет начальную награду при минимальном сбросе.

## Two-Phase Cost Scaling

ExponentialCostScaling: линейная фаза -> супер-экспоненциальная фаза.

```
cost = baseCost * baseIncrease^purchases * costScale^(excess*(excess+1)/2)
```

Где `excess = purchases - purchasesBeforeScaling`.

- **Фаза 1** (purchases <= threshold): стоимость растёт экспоненциально (base^N)
- **Фаза 2** (purchases > threshold): экспонента экспоненты (quadratic в показателе)

Это позволяет:
- Ранний геймплей: предсказуемый темп покупок
- Поздний геймплей: естественная стена -> триггер для prestige/новой механики
- **Аналитический bulk buy**: quadratic formula даёт max-purchases без итеративного цикла

```
maxBuy = floor((-1 + sqrt(1 + 8 * budget / costScale)) / 2)
```

## Order Compression

Многослойная prestige-система = каскад логарифмических сжатий:

```
Layer 1: 10^0 ... 10^308  (AM)
Layer 2: 10^0 ... 10^308  (IP) -- каждый порядок IP = 308 порядков AM
Layer 3: 10^0 ... 10^308  (EP) -- каждый порядок EP = 308 порядков IP
Layer 4: 10^0 ... 10^4000 (RM) -- порог выше, т.к. EP-слой глубже
```

Каждый слой превращает экспоненциальный рост предыдущего в "почти линейный" по порядкам. Это позволяет игре охватывать от 10 до 1e1000000+ без потери ощущения прогресса.

## Hybrid Scaling

`getHybridCostScaling()` комбинирует два режима роста: до prestige-порога один множитель, после -- другой. Плавный переход между фазами без ручной точки переключения.

## Nerf Patterns for Sub-Content

Внутри prestige-слоёв (челленджи, celestials) множители nerf-ятся:

| Тип nerf | Формула | Эффект |
|----------|---------|--------|
| Power nerf | `currency.pow(0.55)` | Радикальное замедление |
| Log cap | `mult.pow(log10(mult) / threshold)` | Пропорциональное ограничение |
| Time decay | `factor.pow(clampMax(realTime/600, 1))` | Degradation со временем |

## Related

- uses::[[math-of-idle-games]]
- derived::[[antimatter-dimensions]]
- [[idle-game-economy]] -- экономика, валюты
