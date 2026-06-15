---
type: source
tags: [idle, math, balance, prestige, derivatives]
date: 2026-05-29
url: https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i
---

# The Math of Idle Games (Anthony Pecorella, 2016-2017)

Три статьи от Anthony Pecorella (Kongregate), GDC Europe 2016 talk. Spreadsheet модели: http://kon.gg/idle-math-spreadsheets

## Part I: Cost, Generation, Balance

### Basic Formulas

- `cost_next = base_cost × growth_rate^owned`
- `production_total = (base_output × owned) × multipliers`

### Key Principle

Экспоненциальный рост стоимости (n^x) всегда обгоняет полиномиальный рост продукции (x^k), независимо от k и n. Это основа idle-игр: производство растёт, но стоимость обгоняет.

### Standard Values (AdVenture Capitalist)

- growth_rate = 1.07 (лимонады) до 1.15
- x2 множители при 25 и 50 owned (stacking)
- Без множителей: новейший генератор всегда доминирует → скучно

### Generator Balance

Чтобы все генераторы оставались релевантными — варьируйте множители по каждому генератору индивидуально. Пример: разные пороги множителей (25/50 для Gen1, 10/25/50 для Gen3 и т.д.) создают «пики» приоритетов.

### Bulk Buy Formulas

- `cost_bulk = b × r^k × (r^n - 1) / (r - 1)`
- `max_buy = floor(log_r(c×(r-1)/(b×r^k) + 1))`

где n = купить, b = base_price, r = growth_rate, k = currently_owned, c = currency

## Part II: Derivative Generators

### Model

Генераторы производят другие генераторы (каскад): Gen1→currency, Gen2→Gen1, Gen3→Gen2...

### Mathematics

Ряд интегралов: `1, x, x²/2, x³/6, x⁴/24, ..., x^n/n!`

При n→∞ ряд сходится к e^x (экспонента). Но при конечных n рост суб-экспоненциальный → экспоненциальные затраты всегда обгонят.

### Examples

- Derivative Clicker (gzgreg): каскадная модель + exponential costs
- Shark Game (cirrial): Nurse Sharks→Sharks→fish

### Relevance Problem

При каскаде нижние генераторы генерируются автоматически → зачем покупать? Решение: **tier boost** — каждая купленная единица Gen1 усиливает ВСЕ Gen1 на +0.05%. Это сохраняет ценность ручных покупок даже при миллиардах единиц.

### Две валюты + зависимости

Derivative Clicker использует два ресурса с перекрёстными зависимостями генераторов → создаёт interesting interplay.

## Часть III: Формулы престижа

### Две категории

| Категория | Формула из | Сброс в той же точке | Прогресс для удвоения |
|-----------|-----------|---------------------|----------------------|
| **Lifetime** | Cookie Clicker, AdCap | Убывающая отдача | ~3-8× предыдущего |
| **Since-reset** | Egg Inc, Clicker Heroes | Та же награда | ~128× (Egg) |

### Конкретные формулы

| Игра | Формула | База | Степень |
|------|---------|------|---------|
| Realm Grinder | p = (√(1+8×c_M/10¹²)-1)/2 | max earnings | √ (квадратная формула из треугольных чисел) |
| AdVenture Capitalist | p = 150×√(c_L/10¹⁵) | lifetime earnings | √ |
| Cookie Clicker | p = ∛(c_L/10¹²) | lifetime earnings | ∛ |
| Egg, Inc. | Δp = (c_R/10⁶)^0.14 | since-reset earnings | ~1/7 |
| Clicker Heroes | upgrades count | since-reset upgrades | ≈ log |

### Realm Grinder деталь

p²+p-2c_M/10¹²=0 → квадратное уравнение → формула через дискриминант. Удвоение prestige требует 4× earnings от предыдущего run.

### Следствия для дизайна

- Lifetime: нужно прогрессировать каждый раз дальше → естественный «лестничный» эффект
- Since-reset: можно фармить в одной точке → подходит для offline-limited игр (Egg Inc: 2ч offline)
- Clicker Heroes: since-reset + steep difficulty → даёт прогресс через стену

### Баланс престижей

- Прогресс внутри престижа тоже должен быть «bumpy» (медленно-быстро-медленно)
- Множители на milestone-порогах создают скачки покупок (как 25/50/100 owned)
- Spreadsheet модели для симуляции, но точное предсказание player behaviour невозможно

### Мета-выводы

1. Гораздо больше разнообразия чем Cookie Clicker / Clicker Heroes модели
2. Генераторы могут взаимодействовать — рисуйте flowchart, экспериментируйте
3. Определите где «fun» и фокусируйтесь на этом

## Связанные страницы

- [[math-of-idle-games]] — синтез: формулы, баланс, производные модели
- [[idle-game-economy]] — двухуровневая модель, кривые стоимости
- [[idle-game-core-loop]] — архитектура core/meta loop
- [[break-infinity]] — библиотека Decimal для больших чисел
