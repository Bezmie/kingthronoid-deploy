---
type: source
tags: [incremental, math, balance, growth, progression]
date: 2026-05-16
url: https://www.reddit.com/r/incremental_games/comments/2ztcfk/linear_polynomial_exponential_and_more_growth/
author: '[deleted]' (r/incremental_games)
---

# Growth Functions for Incremental Games (Reddit tutorial)

Туториал по типам роста: от логарифмического до тетрации. Человекопонятное объяснение эффектов каждой функции + применение в incremental играх. 2015, r/incremental_games.

## Ключевые тезисы

1. **Bound**: B bounds A = B растёт быстрее A и навсегда обгоняет. Конкретные значения не важны, важна скорость роста.
2. **Баланс production vs price**: price < production = тривиализация; = = стабильный темп; price > production = замедление = стена = prestige триггер.
3. **Polynomial vs Exponential**: у polynomial 2-я разность постоянна (3,5,7,9 -> разность=2), у exponential 2-я разность растёт. Это ключевое интуитивное отличие.
4. **Промежуточные типы**: sublinear (sqrt -- diminishing returns), superlinear-subquadratic (x*logx -- лёгкий буст), superpolynomial-subexponential (x^logx -- замедление без резкой стены) -- практически полезны для fine-tuning.
5. **За пределами exponential**: doubly-exponential и tetration -- на грани/за пределами числовых библиотек.

## Иерархия роста (от медленного к быстрому)

log* < log < sqrt(x) < x < x*logx < x^2 < x^logx < 2^x < 2^(x^2) < 2^(2^x) < tetration < Busy Beaver

## Связанные страницы

- [[idle-game-economy]] -- кривые стоимости
- [[math-of-idle-games]] -- формулы генерации/стоимости/престижа
- [[balance-methodology]] -- константы, прогрессии
