---
type: concept
tags: [idle, game-design, economy, currency]
date: 2026-05-29
sources: [2026-04-27-machinations-idle-game-design, 2026-05-16-reddit-growth-functions]
---

# Idle Game Economy

Модель экономики idle-игр: primary/secondary валюта, баланс генерации и дефицита.

## Two-Level Currency Model

### Primary Currency (High-Frequency)

- **Источник**: клики + авто-генераторы
- **Назначение**: базовые апгрейды (увеличение генерации, усиление клика)
- **Характеристика**: abundance, растущий поток
- **Положительная обратная связь**: покупка → больше генерации → больше покупок

### Secondary Currency (Low-Frequency)

- **Источник**: боссы, конец стадий, prestige-сбросы
- **Назначение**: апгрейды за пределами базовых (новые механики, престижные бонусы)
- **Характеристика**: scarcity, всегда pinch point
- **Назначение для монетизации**: дефицит стимулирует real-world покупки

## Resource Generation Formula

```
total_rate = click_rate × click_value + Σ(generator_i × generator_value_i)

resource_after_idle = resource_before + total_rate × offline_time
```

**Баланс:** каждый новый генератор должен быть достижим за разумное время с текущей скоростью генерации, но не мгновенно.

## Upgrade Cost Curve

Иерархия от медленного к быстрому (согласно [[2026-05-16-reddit-growth-functions]]):

| Модель | Формула | Ощущение игрока | Применение |
|--------|---------|-----------------|------------|
| Log | log(n) | Почти не растёт, быстро упирается | Diminishing returns на апгрейды |
| Sublinear | sqrt(n), n^(1/k) | Растёт, но медленнее линейного | Штраф на перепроизводство |
| Linear | base × n | Стабильный темп, предсказуемо | Генерация ресурса |
| Superlinear-subquadratic | n × log(n) | Чуть быстрее,ного | Бонус к генерации от текущего ресурса |
| Quadratic | base × n^2 | Умеренное ускорение | "Здание создаёт здания" (Derivative Clicker) |
| Polynomial | base × n^k (k>=2) | Ускоряющееся отставание | Цены с мягкой стеной |
| Superpolynomial-subexponential | n^log(n) | Как exponential, но стена дальше | Цены без резкой остановки |
| Exponential | base × growth^n | Устойчивый рост, стена = prestige триггер | **Стандарт idle-игр** (growth 1.07-1.15) |
| Exponential-polynomial | 2^(n^2) | Резкая стена | Цены при exponential генерации |
| Doubly-exponential | 2^(2^n) | Практически unusable | За пределами числовых библиотек |
| Factorial | base × n! | Экстремальное замедление | Крайние случаи |

**Ключевой принцип**: production growth < price growth = замедление = стена = prestige триггер. = = стабильный темп. production > price = тривиализация.

**Polynomial vs exponential -- интуитивное отличие**: у polynomial 2-я разность постоянна (3,5,7,9 -> разность 2), у exponential 2-я разность растёт. Exponential не просто быстрее -- она ускоряюще быстрее.

**Стандарт индустрии:** exponential growth (коэффициент growth обычно 1.07–1.15).

## Generation vs Scarcity Balance

- **Достаточно ресурсов** → игроку интересно, прогресс ощущается
- **Достаточный дефицит** secondary валюты → стимул к engagement и монетизации
- **Мало наград** → нет мотивации продолжать
- **Много наград** → обесценивание, потеря ощущения достижения

## Monetization Through Economy

Согласно [[2026-04-27-machinations-idle-game-design]]:
- Long-tail earnings > немедленная монетизация
- Overt монетизация → отток игроков
- Pinch point на secondary валюте — естественная точка для RV (rewarded video) или in-app покупки

Для [[yandex-games]]: RV за буст генерации на время — соответствует требованиям (награда = бонус, не блокирует геймплей).

## Return Reward

При возвращении игрока:
1. Рассчитать `offline_earnings = total_rate × offline_duration`
2. Показать модальное окно с заработанной суммой
3. Добавить ресурс к балансу

**Визуализация:** achievement counter (ресурс/мин, ресурс/час) — ключевой элемент ощущения прогресса.

## Related

- derived::[[2026-04-27-machinations-idle-game-design]]
- derived::[[2026-05-16-reddit-growth-functions]]
- [[idle-game-core-loop]] -- архитектура core/meta loop
