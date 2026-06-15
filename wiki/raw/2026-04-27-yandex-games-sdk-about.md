# SDK Яндекс Игр — Подключение и использование

Источник: https://yandex.ru/dev/games/doc/ru/sdk/sdk-about

## Подключение SDK

Для загрузки архива на сервер Яндекса (рекомендуется): относительный путь `/sdk.js`.
Для своего домена: абсолютный `https://sdk.games.s3.yandex.net/sdk.js`.

### Через тег script
```html
<script src="/sdk.js"></script>
```
С async и onload:
```html
<script async src="/sdk.js" onload="initSDK()"></script>
```

### Динамическая загрузка
```js
const script = document.createElement('script');
script.src = '/sdk.js';
script.async = true;
script.onload = initSDK;
document.body.append(script);
```

## Инициализация

```js
const ysdk = await YaGames.init();
```

Опциональный параметр `signed: boolean` для защиты от накруток:
- `signed: false` (по умолчанию) — данные в открытом виде (клиентская обработка)
- `signed: true` — данные зашифрованы в signature (серверная обработка)

## Проверка подключения

Запустить с debug-панелью: добавить `?debug-mode=16` к URL.
Индикатор лоадера:
- `W` — ожидает инициализации
- `IT` — SDK инициализирован верно
- `IF` — старый лоадер

## Частые ошибки

- `YaGames is not defined` — sdk.js не подключён до YaGames.init()
- `ysdk is not defined` — методы SDK вызваны до инициализации

## Полный пример

```html
<script async src="/sdk.js" onload="initSDK()"></script>
<script>
    async function initSDK() {
        const ysdk = await YaGames.init();
        ...
    }
</script>
```

## Прокси для локальной разработки

Использовать локальный сервер для проксирования `/sdk.js`. Скачивать файл sdk.js не нужно.
