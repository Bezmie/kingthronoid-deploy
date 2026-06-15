---
type: concept
tags: [pattern, event-queue, decoupling, async, architecture]
date: 2026-05-08
sources: [2026-04-28-game-programming-patterns]
---

# Event Queue

Очередь уведомлений/запросов FIFO. Развязка отправителя и получателя **во времени**: отправитель enqueue и возвращается, получатель process когда удобно.

## Problem

Синхронный API блокирует вызывающего (загрузка ресурса), не позволяет агрегировать запросы (одинаковые звуки = слишком громко), вызывается не из того потока.

## Solution

Запрос = объект в очереди. playSound() = enqueue, update() = dequeue + process. Ring buffer для очереди без аллокаций.

```js
// Enqueue
playSound(id, volume) {
    this.pending[this.tail] = { id, volume };
    this.tail = (this.tail + 1) % MAX_PENDING;
}

// Dequeue + process
update() {
    if (this.head === this.tail) return;
    const msg = this.pending[this.head];
    this.head = (this.head + 1) % MAX_PENDING;
    startSound(loadSound(msg.id), findChannel(), msg.volume);
}
```

## Aggregation

При enqueue -- проверить есть ли уже такой запрос в очереди. Если да -- объединить (max volume). Коллапс дубликатов = меньше работы.

## Event Queue vs Observer

| | Observer | Event Queue |
|---|---|---|
| Синхронность | Синхронный (immediate) | Асинхронный (deferred) |
| Развязка | Кто получит | Кто + когда |
| Контроль у | Отправитель (push) | Получатель (pull) |
| Агрегация | Нет | Да (по очереди) |
| Многопоточность | Проблемы | Естественная |

Event Queue = асинхронный Observer. Observer достаточно когда нужна развязка только "кто". Queue -- когда нужна развязка "когда".

## Queue Types

- **Single-cast**: один получатель (API сервиса, как audio engine)
- **Broadcast**: все получатели видят событие (central event bus)
- **Work queue**: один элемент -> один из N получателей (thread pool)

## Risks

- Central event queue = глобальная переменная -- те же проблемы (скрытые зависимости)
- Состояние мира меняется между отправкой и обработкой -- событие должно нести все нужные данные
- Петли обратной связи: A событие -> B обработка -> B событие -> A обработка -> ...

## In Project

EventBus = sync Observer. Для offline progress / return reward — может понадобиться Event Queue (async). UI throttle — частичный dirty flag + queue.

## Related

- derived::[[2026-04-28-game-programming-patterns]]
- [[observer-pattern]] -- синхронная развязка (EventBus = Observer, Event Queue = async Observer)
- [[command-pattern]] -- Command = запрос как объект (Event Queue хранит команды)
