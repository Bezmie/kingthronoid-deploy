---
type: concept
tags: [game-design, incremental, idle, taxonomy]
date: 2026-05-29
sources: [2026-05-29-playing-to-wait-idle-games-taxonomy, 2026-04-27-machinations-idle-game-design, 2026-04-28-pdg-replayable-games]
---

# Incremental Games

Incremental -- подмножество idle-игр. Idle: прогресс без взаимодействия, ожидание = игра, нет game over. Incremental: idle + сложная внутренняя экономика + генераторы ресурсов + монотонное накопление. Различие: idle фокусируется на ожидании, incremental -- на построении экономики и планировании.

## Taxonomy

4 подкатегории incremental-игр (по [[2026-05-29-playing-to-wait-idle-games-taxonomy]]):

| Подкатегория | Признаки | Примеры |
|---|---|---|
| Micromanagement (A) | Множество ресурсов, высокая интерактивность, текстовые интерфейсы, NG+, медленный прогресс | Kittens, CivClicker |
| Single-resource (B) | Один ресурс, высокая интерактивность, быстрый прогресс, стабильныйпаттерн | Cookie Clicker, Clicker Heroes |
| Derivative (X) | Генераторы производят генераторы, все вкладываются в основной ресурс | Derivative Clicker, Swarm Simulator |
| Multi-player (Y) | Общий пул ресурсов, несколько игроков | Idle Online Universe, ClickClickClick |

**Спектр интерактивности**: Clicker -> Minimalist -> Zero-Player. Игры сдвигаются вдоль спектра в разных фазах: старт = Clicker, поздняя игра = Minimalist/Zero-Player.

## Central Poetics -- Playing to Wait

Прогрессия от тактического кликинга к стратегическому планированию. Экспертные игроки взаимодействуют реже, но вовлекаются глубже.

- **Self-obviating play**: геймплей устраняет необходимость прямого взаимодействия. Автоматизация -- не баг, а целевое состояние жанра
- **Calm technology**: периферийное внимание, вовлечение по желанию, нет штрафа за невнимание. Долгое отсутствие = больше опций при возвращении
- **Against playbour**: больше наград за меньшее взаимодействие по мере прогресса. Правила принуждают к idle-состоянию, стоимость взаимодействия растёт
- **"Never not playing"**: idle = игра, подрывает границы magic circle

## Design Principles

- **Cognitive offloading**: механики очередей (Trimps), тултипы с оценкой реального времени до цели (Kittens). Снижение когнитивной нагрузки через информацию о реальном времени ожидания
- **Ludic efficiency**: zero-player = максимальная эффективность. Эффективные интерфейсы = норма жанра, не упрощение
- **Shifting interaction**: босс-бои как спецсобытия (возврат к высокой интерактивности), случайные события (golden cookies) как опциональные хуки внимания
- **Unlocking as progressive disclosure**: постепенное предъявление фич, скрытие/показ опций по мере роста. Снижение начальной сложности без потери глубины
- **NG+ as design**: сброс = бонус, не штраф. Prestige-механика = формализованный возврат к началу спектра интерактивности с накопленным стратегическим преимуществом

## Related

- derived::[[2026-05-29-playing-to-wait-idle-games-taxonomy]]
- derived::[[2026-04-28-pdg-replayable-games]]
- uses::[[idle-game-core-loop]]
