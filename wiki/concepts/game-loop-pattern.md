---
type: concept
tags: [pattern, game-loop, architecture, core]
date: 2026-05-29
sources: [2026-04-28-game-programming-patterns]
---

# Game Loop + Update Method

Два связанных паттерна: Game Loop — основной цикл игры, Update Method — делегирование обновления объектам.

## Game Loop

Квинтэссенция игрового паттерна: игра работает независимо от ввода. Три фазы: `processInput() → update() → render()`.

### Варианты реализации

| Вариант | Плюсы | Минусы |
|---------|-------|--------|
| Без синхронизации | Простота | Скорость зависит от железа |
| Sleep (фиксированный FPS) | Стабильный FPS | Не помогает при медленных кадрах |
| Переменный временной шаг | Плавность | Недетерминированность, нестабильность |
| **Фиксированный шаг + переменный рендер** | Стабильность + плавность | Сложнее реализация |

### Оптимальный вариант: фиксированный шаг + переменный рендер

```js
let previous = performance.now();
let lag = 0;
const MS_PER_UPDATE = 1000 / 60; // 60 тиков/сек

function loop() {
    const current = performance.now();
    const elapsed = current - previous;
    previous = current;
    lag += elapsed;

    processInput();

    while (lag >= MS_PER_UPDATE) {
        update();
        lag -= MS_PER_UPDATE;
    }

    render(lag / MS_PER_UPDATE); // интерполяция для плавности
    requestAnimationFrame(loop);
}
```

**Ключевое**: `while (lag >= MS_PER_UPDATE)` — update может вызываться несколько раз за кадр при отставании, обеспечивая стабильность симуляции. `render()` получает остаток лага для интерполяции.

### For Incremental Games

- `update()` — генерация ресурсов (каждый тик = фиксированный шаг), офлайн-расчёт при возврате
- `processInput()` — клики, покупки
- `render()` — обновление чисел, анимации
- Фиксированный шаг гарантирует детерминированность: `offline_earnings = rate × offline_seconds`
- **Game speed как diff multiplier**: вместо выполнения N тиков при ускорении, умножить `diff` на speed factor. Один тик при 1000x = 1000 тиков при 1x. Производство непрерывное, не дискретное. Фактор скорости = произведение всех бустов (black holes, glyphs, milestones), clamp [1e-300, 1e300]. Источник: [[antimatter-dimensions]]
- **Async offline simulation**: при offlineTime > threshold -- modal с прогресс-баром, batched execution. Кнопки "Speed up" / "SKIP". Позволяет обрабатывать минуты->месяцы offline без фриза

## Update Method

Каждый объект имеет `update()`, цикл обходит коллекцию. Решает проблему «месива» в game loop.

```js
class Entity {
    update() {} // переопределяется в наследниках/компонентах
}

class World {
    entities = [];

    update() {
        for (const entity of this.entities) {
            entity.update();
        }
    }
}
```

### Решения

- **Спящие объекты**: проверять флаг `active` или вести отдельную коллекцию активных
- **Удаление при итерации**: помечать «мёртвым» и удалять после прохода
- **Порядок обновления**: может влиять на поведение (A обновился до B → A видит старое состояние B)

### For Incremental Games

Каждый генератор, автокликер, бонус, таймер — объект с `update()`. Легко добавлять механики без изменения основного цикла.

```js
class Generator {
    constructor(rate) { this.rate = rate; }

    update() {
        this.produce(); // генерация ресурса
    }
}

class Boost {
    constructor(multiplier, duration) { this.multiplier = multiplier; this.remaining = duration; }

    update() {
        this.remaining -= MS_PER_UPDATE;
        if (this.remaining <= 0) this.expire();
    }
}
```

## Web-специфика: rAF, Web Worker, Visibility

### requestAnimationFrame = browser main loop

На web ваш loop встроен в browser main loop. `requestAnimationFrame()` -- запрос контроля над следующим кадром. Browser решает когда вызвать callback (обычно перед VSync).

```js
;(() => {
  function main(tFrame) {
    MyGame.stopMain = window.requestAnimationFrame(main);
    update(tFrame);
    render();
  }
  main();
})();
```

**Best practice**: вызывать следующий `requestAnimationFrame` в начале main, не в конце -- browser получает запрос вовремя даже если текущий кадр пропустил VSync.

### DOMHighResTimeStamp

`Date` неточен. `performance.now()` = миллисекунды с точностью до 0.001ms. rAF передаёт `DOMHighResTimeStamp` как аргумент callback -- используйте для delta time.

### Web Worker для off-thread update

Fixed update rate + variable render:
- Render: `requestAnimationFrame()`
- Update: `setInterval()`/`setTimeout()` в Web Worker (не блокирует main thread)
- Или: rAF poke Web Worker с числом тиков для вычисления

```js
// Main thread
function main(tFrame) {
  MyGame.stopMain = window.requestAnimationFrame(main);
  const nextTick = MyGame.lastTick + MyGame.tickLength;
  let numTicks = 0;
  if (tFrame > nextTick) {
    numTicks = Math.floor((tFrame - MyGame.lastTick) / MyGame.tickLength);
  }
  queueUpdates(numTicks);
  render(tFrame);
  MyGame.lastRender = tFrame;
}
```

### Tab visibility

При переключении вкладки browser замедляет/останавливает rAF. Варианты:
- **Pause** -- считать gap паузой, skip время
- **Simulate** -- догнать при возврате (опасно при длинных gaps)
- **Restore** -- восстановить state от server/peer

## Related

- uses::[[idle-game-core-loop]] — core/meta loop архитектура
- derived::[[2026-04-28-game-programming-patterns]] — source pattern
- [[observer-pattern]] — события при изменении ресурсов
