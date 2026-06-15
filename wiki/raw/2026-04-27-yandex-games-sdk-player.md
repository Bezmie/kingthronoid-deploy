# SDK Яндекс Игр — Данные игрока

Источник: https://yandex.ru/dev/games/doc/ru/sdk/sdk-player

## Инициализация Player

```js
const ysdk = await YaGames.init();
const player = await ysdk.getPlayer();
```

С подписью для серверной верификации:
```js
const player = await ysdk.getPlayer({ signed: true });
// player.signature для авторизации на своём сервере
```

## Авторизация

### Проверка
```js
player.isAuthorized() // true | false
```

### Вызов диалога авторизации
```js
if (!player.isAuthorized()) {
    await ysdk.auth.openAuthDialog();
    const authorizedPlayer = await ysdk.getPlayer();
}
```

## Внутриигровые данные

### player.setData(data, flush) — произвольные данные
- Макс. 200 КБ на игрока
- `flush: true` — немедленная отправка на сервер
- `flush: false` (по умолчанию) — в очередь
- Лимит: 100 запросов за 5 минут

```js
await player.setData({ achievements: ['trophy1', 'trophy2'] });
```

### player.getData(keys) — чтение произвольных данных
- `keys` — массив ключей (опционально, без = все данные)
- Лимит: 100 запросов за 5 минут

### player.setStats(stats) — численные данные
- Макс. 10 КБ на игрока
- Для часто изменяемых числовых значений (баллы, валюта, опыт)
- Лимит: 60 запросов за 1 минуту

### player.incrementStats(increments) — инкремент численных данных
- Возвращает изменённые значения
- Лимит: 60 запросов за 1 минуту

### player.getStats(keys) — чтение численных данных
- Лимит: 60 запросов за 1 минуту

## Данные профиля

| Метод | Возвращает |
|-------|-----------|
| `player.getUniqueID()` | Постоянный уникальный ID (строка) |
| `player.getName()` | Имя пользователя |
| `player.getPhoto(size)` | URL аватара ('small','medium','large') |
| `player.getPayingStatus()` | 'paying','partially_paying','not_paying','unknown' |
| `player.getIDsPerGame()` | Массив {appID, userID} по всем играм разработчика |

## Ограничения методов

| Метод | Лимит |
|-------|-------|
| `ysdk.getPlayer()` | 20 / 5 мин |
| `player.setData()` | 100 / 5 мин |
| `player.getData()` | 100 / 5 мин |
| `player.setStats()` | 60 / 1 мин |
| `player.getStats()` | 60 / 1 мин |
| `player.incrementStats()` | 60 / 1 мин |

## safeStorage (для iOS)

Если интеграция через свой домен, localStorage может сбрасываться на iOS. Использовать:
```js
const safeStorage = await ysdk.getStorage();
safeStorage.setItem('key', 'value');
```
Или переопределить глобально:
```js
Object.defineProperty(window, 'localStorage', { get: () => safeStorage });
```
При загрузке архива на сервер Яндекса — localStorage уже надёжен автоматически.
