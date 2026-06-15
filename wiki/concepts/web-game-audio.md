---
type: concept
tags: [audio, web, game-design]
date: 2026-05-16
sources: [2026-05-16-mdn-games]
---

# Web Game Audio

Аудио в веб-играх: зрелое, но с browser caveats. Стратегия: essential vs nice-to-have + progressive enhancement.

## Mobile caveats

### Autoplay policy

Браузеры (desktop + mobile) блокируют автоплей со звуком. Разблокировка:
- Пользователь interacted с доменом
- PWA установлена (mobile)

**Паттерн**: prime audio на user gesture (Start button -> play+pause silence -> готово к произвольному playback). Включить момент тишины в конец каждого файла.

### Volume control

Программный контроль громкости может быть отключён на mobile (OS-level volume). Проверять `HTMLMediaElement.volume` support.

### Buffering/preloading

Может быть отключено до user-initiated playback. `HTMLMediaElement.readyState` для проверки.

## Audio Sprites

Аналог CSS sprites: один большой файл со всеми звуками + start/stop times. Преимущества:
- Один prime вместо N
- Меньше HTTP-запросов
- Silence компрессится хорошо

```js
const audio = document.getElementById('sprite');
audio.currentTime = startTimes[soundId];
audio.play();
// timeupdate event -> pause при stopTime
```

**Gotcha**: низкий bitrate = неточное seeking. Интервал 500ms между спрайтами.

## `<audio>` vs Web Audio API

| Аспект | `<audio>` | Web Audio API |
|--------|-----------|---------------|
| Сложность | Простая | Продвинутая |
| Точность тайминга | Низкая | Высокая |
| Генерация звука | Нет | Да |
| Positional audio | Нет | PannerNode |
| Эффекты/фильтры | Нет | Да |
| Кросс-браузерность | Широкая | Все современные, кроме Opera Mini |

**Стратегия**: basic audio через `<audio>`, enhance через Web Audio API где поддерживается.

## Web Audio API for Games

- **Точный тайминг**: взрыв = звук одновременно, не после
- **Динамическая музыка**: отдельные треки/loops, синхронизация через AudioContext.currentTime + offset
- **Beat sync**: BPM-расчёт задержки до следующего бита перед стартом нового трека
- **Positional audio**: PannerNode -- позиция объектов, направление, среда (cave echo, underwater muffle)
- **Фильтры**: BiquadFilterNode для средовых эффектов

## Background Music

- `<audio>`: линейный BGM, playbackRate для скорости без pitch
- Web Audio API: multi-track (каждый инструмент отдельно), bring in/out tracks, эффекты по контексту (cave = echo)

## Typed Edges

- derived::[[2026-05-16-mdn-games]]
- uses::[[cross-device-input]]

## Related

- [[game-loop-pattern]] -- аудио sync с update/render
- [[cross-device-input]] -- user gesture = prime audio
- [[2026-05-16-mdn-games]] -- источник
