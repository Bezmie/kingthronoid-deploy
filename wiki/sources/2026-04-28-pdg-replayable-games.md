---
type: source
tags: [replayability, pdg, dilemmas, game-design, mechanics]
date: 2026-05-29
url: https://www.gamedeveloper.com/design/replayable-games---game-mechanics-as-periodic-dilemma-generators-pdg-
---

# Replayable Games — Periodic Dilemma Generators (Narek Aghekyan, 2021)

PDG — абстрактная концепция для анализа и создания игр с высокой replayability. Гипотеза: **PDG — необходимое и достаточное условие replayability**.

## PDG: определение

Система, периодически предлагающая выбор для достижения цели. Три условия:

1. **Meaningful choices**: informed (известны cost+benefit) + с последствиями (влияют на достижение цели)
2. **Dilemmatic choices**: конфликтующие, нет оптимального ответа
3. **Unpredictable outcome**: нет выбора, гарантирующего цель; нет ситуации, где цель невозможна

## Triangularity — основной инструмент дилемм

Jesse Schell: "8 из 10 прототипов 'просто не весёлых' — отсутствует meaningful choice вида triangularity"

Triangularity = low risk/low reward vs high risk/high reward.

Но triangularity — НЕ единственный способ. Примеры без triangularity:
- Шахматы: взять фигуру (материальное преимущество) vs взять другую (тактическое преимущество)
- Шутер: быстрая слабая пушка vs медленная мощная

## PDG в жанрах

| Жанр | Дилемма | Triangularity |
|------|---------|--------------|
| **Fighter** (Street Fighter) | Атака: попасть vs быть заблокированным. Лёгкая атака (быстро, мало dmg) vs тяжёлая (долго, много dmg) | Да |
| **Shooter** | Атака: попасть vs подставиться. Headshot (высокий риск/награда) vs body shot | Да |
| **Racing** | Скорость vs контроль. Rubber banding для непредсказуемости | Да |
| **Economy/Idle** | Куда инвестировать ресурс? Дизайнер прячет оптимальный выбор через shifting priorities (множители) | Нет |
| **Helix Jump** | Спуск через несколько шагов (быстрее/рискованнее) vs шаг за шагом. Инвиз при проходе нескольких шагов подряд | Да |
| **Aquapark.io** | Атака NPC vs риск вылететь. Shortcut через прыжок | Да |
| **AdVenture Capitalist** | Дизайнер скрывает оптимальный генератор через shifting multipliers (Pecorella) | Нет |
| **Super Mario Bros** | Раш (быстрее/сложнее контролировать) vs осторожный проход (проще/давит таймер) | Да |
| **Pac-Man** | Использовать power pill сейчас vs экономить на более сложные времена | Нет |

## Применение к idle/incremental

**Economy Management Games** — категория, включающая idle:

1. Meaningful: каждое улучшение имеет ясную стоимость и benefit
2. Dilemmatic: куда инвестировать — конфликтующие варианты. Shifting priorities (генератор A доминирует → потом B → потом снова A) создают perception of dilemma
3. Unpredictable: игрок не знает, какое улучшение позволит пройти уровень/престиж

**Ключевой вывод**: если в idle-игре есть очевидный оптимальный выбор на каждом шаге → низкая replayability. Нужны shifting priorities + синергии + престиж-механики для создания дилемм.

## Восприятие игрока

Даже если технически PDG есть, но игрок не воспринимает дилемму → интерес теряется.

1. **Meaningful goals**: дизайнер создаёт конфликт → игрок сам определяет под-цели
2. **Achievable + clear goal**: ясная цель + вера в достижимость → Flow
3. **Informed choice**: навык расширяет воспринимаемые варианты
4. **Consequence feedback**: быстрый и ясный фидбек — иначе choice не ощущается meaningful
5. **Perceived dilemma**: если технически есть оптимум, но игрок не знает → всё равно интересно
6. **Unpredictable outcome**: слабый шахматист продолжает играть, т.к. для него исход непредсказуем
7. **Skill growth**: игрок находит паттерны → чувствует компетентность → хорошо, но если станет слишком предсказуемо → интерес пропадает
8. **Safe to fail**: при дилемме можно оправдать неудачу ("другие варианты тоже имели минусы") → снижает фрустрацию
9. **Puzzles ≠ PDG**: пазлы имеют оптимальное решение → низкая replayability. Наука = пазл → поэтому образовательные игры скучные
10. **Self-expression**: нет оптимального выбора → игрок выражает свою личность (осторожный vs рисковый) → автономия

## Связанные страницы

- [[math-of-idle-games]] — shifting priorities через множители
- [[idle-game-core-loop]] — core/meta loop
- [[idle-game-economy]] — баланс генерации vs стоимости
