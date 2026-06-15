---
type: concept
tags: [idle, game-design, architecture, core-loop]
date: 2026-05-29
sources: [2026-04-27-machinations-idle-game-design]
---

# Idle Game: Core Loop + Meta Loop

Двухуровневая архитектура idle-игр. Core loop обеспечивает базовую вовлечённость, meta loop — долгосрочную.

## Core Loop

Минимальный игровой цикл с низким барьером входа:

```
Клик/тап → Ресурс → Покупка апгрейда → Больше ресурса/клик
     ↑                                              |
     └────────────────────────────────────────────────┘
```

**Три обязательных компонента:**

1. **Простой вход** — клик/тап → награда (валюта/ресурс)
2. **Причина тратить** — покупки увеличивают генерацию ресурса → возврат к клику
3. **Achievement counter** — видимый показатель прогресса (ресурс/мин, ресурс/час)

**Проблема:** core loop имеет **конечный срок вовлечённости**. Числа растут, но без новой механики игрок уходит.

## Meta Loop

Сложный слой поверх core loop, решающий проблему конечности:

### Пример: RPG character advancement

```
Core Loop:                     Meta Loop:
  Клик → Gold                   Boss → Secondary Currency
  Gold → Basic Upgrade           Secondary → Hero Upgrade
  Upgrade → More Gold/клик       Hero Synergy → Bonus
                                 New Hero → New Strategy
```

### Key Principles of Meta Loop

- **Множественные взаимодействующие механики** — не одна, а несколько, вводимых постепенно
- **Meaningful choices** — выборы билдов/стратегий, влияющие на игру
- **Синергии** — комбинации героев/апгрейдов дают бонус
- **Постепенное раскрытие** — новые механики появляются по мере прогресса
- **Дефицит secondary валюты** — всегда pinch point, стимулирующий engagement/монетизацию

### Idle/Active Mode Interaction

| Mode | What works | Role |
|------|-----------|------|
| **Idle** | Auto-generation of primary currency, progress without input | Warm feeling of return |
| **Active** | Optimization, strategic decisions, currency spending | Engagement and control |
| **Return** | Large batch of basic currency on return | Motivation to re-enter |

**Architectural takeaway:** optimizing before idle mode = strategic element. Active mode should not reduce to "enter-spend-leave".

## Application to Incremental Games

1. Core loop: click → resource → buy generators → rate growth
2. Meta loop: prestige layers, upgrade trees, neighbor bonuses

## Related

- [[incremental-games]] — genre taxonomy and interactivity spectrum
- [[game-loop-pattern]] — Game Loop + Update Method (implementation patterns)
- [[antimatter-dimensions]] — reference implementation of core/meta loop with 7+ layers
- derived::[[2026-04-27-machinations-idle-game-design]]
- uses::[[incremental-games]]
