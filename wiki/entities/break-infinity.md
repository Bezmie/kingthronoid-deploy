---
type: entity
tags: [tech, big-numbers, decimal, math]
date: 2026-05-29
url: https://github.com/patashish/break_infinity.js
---

# break_infinity.js

## Why

В idle-играх числа растут до 1e308 и выше. JavaScript `Number` (64-bit float) теряет точность после 2^53 ≈ 9e15. `break_infinity.js` — Decimal-библиотека, созданная специально для idle-игр.

## How It Works

- Хранит число как `{sign, mantissa, exponent}` → мантисса + экспонента
- Макс: `1.7976931348623157e308` (как Number), но точность сохраняется на всём диапазоне
- Быстрее `decimal.js` / `bignumber.js` — оптимизирована для idle (нет тригонометрии, лишних функций)

## Typical Pattern

```ts
import Decimal from "break_infinity.js";
const D = (n: number | string) => new Decimal(n);

const cost = baseCost.times(Decimal.pow(growth, owned));
const rate = baseOutput.times(count).times(multiplier);
```

## Key Methods

| Метод | Что делает |
|-------|-----------|
| `D(n)` | Создать Decimal |
| `.plus(n)` / `.minus(n)` | Сложение/вычитание |
| `.times(n)` / `.div(n)` | Умножение/деление |
| `.pow(n)` | Степень |
| `.gte(n)` / `.lte(n)` | Сравнение |
| `.sqrt()` | Квадратный корень |
| `.floor()` | Округление вниз |
| `.toNumber()` | В JS Number (если помещается) |
| `.e` | Экспонента (10^e) |
| `.toFixed(d)` | Строковое представление |

## Why Not decimal.js / bignumber.js

- `decimal.js` — полный Scientific-калькулятор, тяжёлая, медленная для idle
- `bignumber.js` — та же автор, фокус на финансы, нет оптимизаций для игровых вычислений
- `break_infinity.js` -- легче, быстрее, API совместим с `decimal.js` -- создана автором Antimatter Dimensions

## Паттерны из Antimatter Dimensions

- **DC (Decimal Constants)**: ~150 предвычисленных deep-frozen констант (`DC.D0`, `DC.E308`, `DC.E1E15`). Избегает создания новых Decimal на каждый тик для сравнений. Именование: `D`=mantissa, `E`=exponent
- **NaN guard**: в dev-режиме `guardFromNaNValues()` оборачивает каждое number/Decimal свойство player в setter, бросающий на NaN/undefined/infinite. Ловит corruption сразу, не молча

## Typed Edges

- uses::[[math-of-idle-games]]

## Related

- [[math-of-idle-games]] -- формулы баланса
- [[prestige-formulas]] -- формулы конверсии престижа
- [[antimatter-dimensions]] -- референсная реализация с DC constants и NaN guard
