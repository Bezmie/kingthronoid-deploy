---
type: entity
tags: [yandex, sdk, api, saves, tech]
date: 2026-05-29
sources: [2026-04-27-yandex-games-sdk-player]
---

# Yandex Games SDK: Saves

Конкретные API-методы для сохранения прогресса через SDK. Критично для инкременталки.

## Player Initialization

```js
const ysdk = await YaGames.init();
const player = await ysdk.getPlayer();
```

Гостевой вход работает автоматически — `getPlayer()` возвращает объект даже для неавторизованных.

## Two Storage Types

### player.setData / getData — Arbitrary Data

Для состояния игры: купленные генераторы, настройки, достижения.

```js
// Запись (flush: true = немедленно, false = в очередь)
await player.setData({
    generators: { cursor: 5, grandma: 3 },
    settings: { sound: true },
}, true); // flush: true — важно для сохранений при выходе

// Чтение
const data = await player.getData(['generators', 'settings']);
```

- **Лимит**: 200 КБ на игрока, 100 запросов / 5 мин

### player.setStats / getStats / incrementStats — Numeric Data

Для часто меняющихся чисел: валюта, очки, рекорды.

```js
// Установка
await player.setStats({ gold: 1500, gems: 3 });

// Инкремент (атомарный — безопасно для конкурентных запросов)
const result = await player.incrementStats({ gold: 100 });

// Чтение
const stats = await player.getStats(['gold', 'gems']);
```

- **Лимит**: 10 КБ на игрока, 60 запросов / 1 мин

## Save Strategy for Incremental

| Данные | Метод | Причина |
|--------|-------|---------|
| Валюта, рекорды | `setStats` / `incrementStats` | Атомарный инкремент, защита от потери |
| Купленные генераторы, апгрейды | `setData` | Структурированные данные |
| Настройки, язык | `setData` | Редко меняются |

**Частота сохранений**: инкременталка генерирует много изменений — соблюдать лимиты!
- incrementStats: до 60/мин — ОК для кликов
- setData: до 100/5мин — батчить изменения, не на каждый клик

## safeStorage (localStorage for iOS)

При загрузке архива на сервер Яндекса — `localStorage` уже надёжен (SDK обёртка).
При интеграции через свой домен — использовать:

```js
const safeStorage = await ysdk.getStorage();
Object.defineProperty(window, 'localStorage', { get: () => safeStorage });
```

## Authorization

```js
if (!player.isAuthorized()) {
    await ysdk.auth.openAuthDialog();
    const player = await ysdk.getPlayer(); // переинициализация
}
```

Гостевой прогресс сохраняется и без авторизации. После авторизации — можно синхронизировать.

## Related

- uses::[[yandex-games-sdk]]
- uses::[[idle-game-core-loop]]
