---
type: concept
tags: [pattern, observer, events, decoupling]
date: 2026-05-29
sources: [2026-04-28-game-programming-patterns]
---

# Observer Pattern

Объект (Subject) объявляет о событиях, не зная кто их получит. Наблюдатели регистрируются и получают `onNotify()`.

## Implementation

```js
class Subject {
    observers = [];

    addObserver(observer) { this.observers.push(observer); }
    removeObserver(observer) { this.observers = this.observers.filter(o => o !== observer); }

    notify(entity, event) {
        for (const observer of this.observers) {
            observer.onNotify(entity, event);
        }
    }
}

class AchievementSystem {
    onNotify(entity, event) {
        if (event === 'GOLD_THRESHOLD' && entity.gold >= 1000000) {
            this.unlock('millionaire');
        }
    }
}
```

## Problems and Solutions

| Проблема | Решение |
|----------|---------|
| «Слишком медленно» | На самом деле = обход списка + вызов, без аллокаций |
| Аллокации при add/remove | Интрузивный связанный список (Observer.next_), без динамической памяти |
| Висячие указатели | Отмена регистрации при удалении наблюдателя |
| Непонятно, что происходит | Не использовать Observer если нужна двусторонняя понятность |

## For Incremental Games

Observer — естественный способ связать логику и UI:

```js
class GameModel extends Subject {
    addGold(amount) {
        this.gold += amount;
        this.notify(this, 'GOLD_CHANGED');
    }
}

class GoldDisplay {
    onNotify(entity, event) {
        if (event === 'GOLD_CHANGED') this.updateDisplay(entity.gold);
    }
}

class AchievementSystem {
    onNotify(entity, event) {
        if (event === 'GOLD_CHANGED' && entity.gold >= 1000000) this.unlock('millionaire');
    }
}
```

**Типичные события:**
- `GOLD_CHANGED` → обновить UI счётчика
- `GENERATOR_BOUGHT` → обновить магазин, проверить ачивки
- `PRESTIGE_TRIGGERED` → сбросить UI, начать новую сессию
- `BOOST_EXPIRED` → убрать визуальный индикатор
- `OFFLINE_EARNINGS` → показать return reward модалку

**Связь с [[yandex-games-sdk]]**: SDK-события (реклама показана, авторизация) — тоже наблюдатели.

## Related

- caused::[[state-pattern]] — events cause state transitions
- [[command-pattern]] — commands vs events
- [[component-pattern]] — component communication via messages
