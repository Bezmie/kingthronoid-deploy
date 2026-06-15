---
type: source
tags: [idle, taxonomy, game-design, incremental, chi]
date: 2026-05-29
url: https://doi.org/10.1145/3173574
---

# Playing to Wait: A Taxonomy of Idle Games

Суммаризация: Alharthi et al., CHI 2018. Таксономия idle/incremental игр и центральная поэтика "playing to wait" -- геймплей, который устраняет необходимость в себе.

## Taxonomy

**Idle (Id)** -- надмножество: прогресс без взаимодействия игрока, фоновая игра, ожидание = игра, временная гибкость, нет game over, играются годами.

**Incremental (Inc)** -- подмножество idle: idle + сложная внутренняя экономика + генераторы ресурсов, автоматизирующие производство + положительные скорости изменения (монотонное накопление).

4 подкатегории incremental:

| Подкатегория | Признаки | Примеры |
|---|---|---|
| Micromanagement (A) | Множество ресурсов, высокая интерактивность, текстовые интерфейсы, NG+, медленный прогресс | Kittens, CivClicker |
| Single-resource (B) | Один ресурс, высокая интерактивность, быстрый прогресс, стабильный паттерн | Cookie Clicker, Clicker Heroes |
| Derivative (X) | Генераторы производят генераторы, все вкладываются в основной ресурс | Derivative Clicker, Swarm Simulator |
| Multi-player (Y) | Общий пул ресурсов, несколько игроков кликают/автоматизируют | Idle Online Universe, ClickClickClick |

## Interactivity Spectrum

Clicker (высокая интерактивность) -> Minimalist (сокращённые действия, автоматизация/бутылочное горлышко) -> Zero-Player (только настройка или AI-игра). Игры сдвигаются между уровнями в разных фазах геймплея.

## Central Poetics -- Playing to Wait

Игры перемещают игроков от игры к планированию. Экспертные игроки взаимодействуют меньше напрямую, но вовлекаются стратегически. "Self-obviating play" -- геймплей устраняет необходимость в себе. Бросает вызов доминирующим предположениям о том, что такое геймплей.

**Почему idle-игры интересны:**

- Playful idling: правила принуждают к idle-состоянию, стоимость растёт с взаимодействием, долгое отсутствие = больше опций при возвращении
- Calm technology: периферийное внимание, вовлечение по желанию, нет штрафа за невнимание
- Rewarding waiting: NG+-сбросы дают бонусы, return-бонусы награждают последовательные дни
- Against playbour: больше наград за меньшее взаимодействие по мере прогресса, моменты microboredom
- "Never not playing": idle = игра, подрывает magic circle

## Design Implications

- Cognitive offloading: механики очередей (Trimps), тултипы с оценкой реального времени (Kittens)
- Ludic efficiency: zero-player = максимальная эффективность, эффективные интерфейсы = норма жанра
- Shifting interaction: босс-бои как спецсобытия, случайные события (golden cookies) как опциональные хуки внимания
- Unlocking as usability: постепенное предъявление фич, скрытие/показ опций
- Democratized production: инди-разработчики, низкие барьеры, long-tail нишевые игры

## Distinction Idle vs Incremental

- Idle = может прогрессировать без взаимодействия, фон, нет game over
- Incremental = idle + сложная экономика, положительные скорости изменения, генераторы ресурсов
- Экономические решения разыгрываются через дни/месяцы/годы
- Incremental поощряет планирование над игрой

## Project Application

Таксономия даёт аналитическую рамку для жанровой классификации проекта: где он на спектре Idle/Incremental, какая подкатегория (A/B/X/Y), как двигается по спектру интерактивности. Принципы calm technology и self-obviating play напрямую применимы к дизайну core/meta loop: переход от Clicker к Minimalist/Zero-Player -- это не деградация, а целевая динамика жанра. Cognitive offloading и unlocking as progressive disclosure -- конкретные паттерны для проектирования интерфейса и темпа раскрытия механик.

## Related

- derived::[[incremental-games]]
- uses::[[idle-game-core-loop]]
- [[idle-game-economy]]
