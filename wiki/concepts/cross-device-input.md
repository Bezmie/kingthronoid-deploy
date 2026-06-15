---
type: concept
tags: [input, controls, web, architecture]
date: 2026-05-16
sources: [2026-05-16-mdn-games]
---

# Cross-Device Input: адаптивные контролы

HTML5 = мультиплатформа. Разные устройства = разные контролы. Адаптация ввода -- ключевой вызов.

## Touch (Mobile First)

Touch events: `touchstart`, `touchmove`, `touchend`. Multi-touch через `event.touches[]`.

Паттерны:
- **Virtual joystick** -- touch-drag = направление/сила
- **Tap** = действие
- **Swipe** = жест
- **Pinch** = zoom

**Gotcha**: `preventDefault()` для избежания scroll/zoom при game touch.

## Mouse + Keyboard (Desktop)

- **Keyboard**: `keydown`/`keyup`, `event.key`. WASD + стрелки. Проверять `isDown`-флаги в update(), не в event handler (плавное движение).
- **Mouse**: `click`, `mousemove`, `mousedown`/`mouseup`. `game.input.mousePointer.isDown` (Phaser).

## Gamepad API

```js
window.addEventListener('gamepadconnected', (e) => {
  console.log('Gamepad connected:', e.gamepad.id);
});

// В game loop:
const gamepads = navigator.getGamepads();
const gp = gamepads[0];
if (gp.buttons[0].pressed) { /* action */ }
const axisX = gp.axes[0]; // -1..1
```

**Polling**: Gamepad state читается в game loop (не через events). Button mapping varies (Chrome vs Firefox).

## Pointer Lock API

Для FPS/3D: захват мыши внутри game canvas. Получать delta-движение вместо absolute position.

```js
canvas.requestPointerLock();
document.addEventListener('pointerlockchange', () => { ... });
// В handler:
event.movementX; // delta
event.movementY;
```

## Device Orientation

`deviceorientation` event: alpha/beta/gamma = вращение. Для maze-игр, управления наклоном.

## Стратегия адаптации

| Устройство | Primary | Secondary |
|------------|---------|-----------|
| Mobile | Touch | Orientation |
| Desktop | Keyboard+Mouse | Gamepad |
| Smart TV | Remote/D-pad | - |

**Паттерн**: абстракция ввода -> input mapper -> game actions. Один game code, разные input bindings.

```js
const input = {
  left: false, right: false, up: false, down: false, action: false
};

// Touch mapper
joystick.onMove((dir) => { input.left = dir.x < -0.5; ... });

// Keyboard mapper
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') input.left = true;
});

// Game loop читает input.*
```

## Связанные страницы

- [[game-loop-pattern]] -- processInput() фаза
- [[web-game-audio]] -- user gesture = prime audio + unlock autoplay
- [[yandex-games-sdk]] -- платформенные требования к контролям
- [[2026-05-16-mdn-games]] -- источник
