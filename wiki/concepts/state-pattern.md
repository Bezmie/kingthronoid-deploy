---
type: concept
tags: [pattern, state, fsm]
date: 2026-05-29
sources: [2026-04-28-game-programming-patterns]
---

# State Pattern

Решает проблему «флагового ада» (куча булевых флагов). Конечный автомат (FSM): фиксированный набор состояний, объект в одном состоянии, переходы по событиям.

## Three Implementation Levels

### 1. Enum + Switch (Simplest)

```js
const State = { IDLE: 0, ACTIVE: 1, PAUSED: 2 };
let state = State.IDLE;

function handleInput(input) {
    switch (state) {
        case State.IDLE: if (input === 'START') state = State.ACTIVE; break;
        case State.ACTIVE: if (input === 'PAUSE') state = State.PAUSED; break;
    }
}
```

Проблема: данные состояния размазаны по методам.

### 2. State Classes (GOF)

```js
class GameState {
    enter() {}
    exit() {}
    handleInput() {}
    update() {}
}

class IdleState extends GameState {
    enter() { showReturnReward(); }
    update(game) { game.generateOfflineProgress(); game.changeState(new ActiveState()); }
}

class ActiveState extends GameState {
    handleInput(input) {
        if (input === 'PAUSE') game.changeState(new PausedState());
    }
}

class Game {
    state = new IdleState();

    changeState(newState) {
        this.state.exit();
        this.state = newState;
        this.state.enter(this);
    }
}
```

`enter()` / `exit()` — инкапсулируют инициализацию и очистку при переходе.

### 3. Pushdown Automaton (State Stack)

```js
class StateStack {
    stack = [];
    push(state) { this.stack.push(state); state.enter(); }
    pop() { const s = this.stack.pop(); s.exit(); return s; }
    current() { return this.stack[this.stack.length - 1]; }
}
```

Позволяет вернуться к предыдущему состоянию: открыл меню → закрыл → вернулся к игре.

## For Incremental Games

| Сущность | Состояния | Переходы |
|----------|-----------|----------|
| Игра | Idle → Active → Menu → Prestige | SDK-события, пользователь |
| Генератор | Locked → Available → Purchased → Boosted | Покупка, RV-буст |
| Буст | Inactive → Active → Expiring | RV, таймер |
| UI-экран | Main → Shop → Prestige → Settings | Кнопки навигации |

Pushdown-автомат — для вложенных экранов: Main → Shop → ConfirmPurchase → (pop) → Shop → (pop) → Main.

**Связь с [[yandex-games-sdk]]**: `GameplayAPI.start()` при переходе в Active, `stop()` при Menu/Pause. Сворачивание страницы → Paused.

## Related

- uses::[[command-pattern]] — commands for state transitions
- uses::[[observer-pattern]] — events trigger state transitions
- [[idle-game-core-loop]] — idle/active modes
