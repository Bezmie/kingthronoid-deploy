---
type: concept
tags: [economy, balance, design-theory, idle]
date: 2026-05-29
sources: [2026-04-28-value-chains-game-economies, 2026-04-28-game-economy-handbook]
---

# Value Chains

Метод моделирования игровых экономик как линейных цепочек: действие → ресурс → следующее действие → ... → психологический якорь. Автор — Daniel Cook (Lostgarden).

## Essence

**Цепочка ценности** = последовательность узлов, где каждый узел «тянет» ресурсы из предыдущих. Обрыв = потеря смысла.

**Якорь** = терминальный узел, реальная психологическая потребность (autonomy, competence, relatedness, completion, power, fantasy...). Ценность всего — производна от якоря.

**Faucet-and-drain** = ресурсы генерируются → трансформируются → уничтожаются. Без циркуляции, без петель обратной связи — упрощённая, легко балансируемая модель.

## Source/Drain Types

| | Мощность | Источник | Сток |
|---|---|---|---|
| Постоянная | x⁰ | Capped (фиксированное количество) | Fixed (однократный расход) |
| Линейная | x¹ | Trickle/Grind (скорость/неограниченный) | Repeatable (повторяемый расход) |
| Экспоненциальная | x¹⁺ | Investment (положительная петля) | Exponential (стоимость растёт) |
| Адаптивная | — | — | Competitive (кто больше вложил) |

## Balancing Rule

**Источник мощности xⁿ → сток мощности ≥ xⁿ**. Иначе — переполнение.

Для idle-игры (ongoing): **Investment source → только Exponential sink**. Fixed/Repeatable гарантированно переполняются при t→∞.

**Натяжение**: стоки чуть больше источников — цепочка «слегка натянута». Провисание = pooling = потеря мотива.

## Application to Incremental Games

Incremental game = Investment↔Exponential спаривание + overflow→prestige (ascension). Energy/capped pools = натяжение цепи. Lock-and-key = дерево апгрейдов.

### Anchors for Incremental Games
- **Competence** — рост чисел, мастерство оптимизации
- **Completion** — заполнить все milestones, открыть все генераторы
- **Power fantasy** — «я произвожу миллиарды в секунду»
- **Autonomy** — выбор, какие генераторы/апгрейды покупать (lock-and-key)

## Related

- derived::[[2026-04-28-value-chains-game-economies]] — primary source (Daniel Cook)
- uses::[[idle-game-economy]] — applies economy model
- [[math-of-idle-games]] — bulk buy, prestige, derivative generators
