---
type: concept
tags: [pattern, command, input, undo]
date: 2026-05-29
sources: [2026-04-28-game-programming-patterns]
---

# Command Pattern

Материализация вызова метода: вызов оборачивается в объект, который можно хранить, передавать, ставить в очередь, отменять.

## Basic Interface

```js
class Command {
    execute() {}
    undo() {} // опционально
}
```

## Three Applications

### 1. Input Remapping

```js
class JumpCommand extends Command {
    execute(actor) { actor.jump(); }
}

const button = { command: new JumpCommand() };
// Ремаппинг: button.command = new DashCommand();
```

### 2. Actor Directives

Команда принимает объект-исполнитель — один класс команды управляет любым объектом (игрок, AI).

### 3. Undo/Redo

```js
class BuyGeneratorCommand extends Command {
    constructor(generator, cost) {
        this.generator = generator;
        this.cost = cost;
    }

    execute() {
        this.generator.buy();
        currency.subtract(this.cost);
    }

    undo() {
        this.generator.sell();
        currency.add(this.cost);
    }
}

const undoStack = [];

function executeCommand(cmd) {
    cmd.execute();
    undoStack.push(cmd);
}

function undo() {
    const cmd = undoStack.pop();
    cmd?.undo();
}
```

## For Incremental Games

- **Покупки с отменой** — revert покупки генератора (продажа за 50% стоимости)
- **Лог действий** — сериализация команд для replay или мультиплеера
- **Ремаппинг ввода** — разные управления для мобильных и десктопа
- **Очередь команд** — batch-сохранения: накапливать команды, выполнять при flush

## Related

- uses::[[game-loop-pattern]] — input processing in game loop
- uses::[[state-pattern]] — commands for state transitions
- [[observer-pattern]] — events vs commands
