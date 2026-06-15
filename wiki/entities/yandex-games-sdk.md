---
type: entity
tags: [yandex, sdk, api, tech]
date: 2026-05-29
sources: [2026-04-27-yandex-games-requirements, 2026-04-27-yandex-games-quick-start, 2026-04-27-yandex-games-sdk-about, 2026-04-27-yandex-games-sdk-game-events]
---

# Yandex Games SDK

SDK Яндекс Игр — обязательный компонент любой игры на платформе. Через него проходят авторизация, платежи, реклама, сохранения, языковая автоопределение и кросс-промо.

## Connection

```html
<script async src="/sdk.js" onload="initSDK()"></script>
<script>
async function initSDK() {
    const ysdk = await YaGames.init();
    ysdk.features.LoadingAPI?.ready();
}
</script>
```

- Для архива на сервер Яндекса: `/sdk.js` (относительный путь)
- Для своего домена: `https://sdk.games.s3.yandex.net/sdk.js`
- Локальная разработка: прокси `/sdk.js` через локальный сервер
- **sdk.js подключён ДО YaGames.init()** — частая ошибка

## Initialization

```js
const ysdk = await YaGames.init();              // клиентская обработка
const ysdk = await YaGames.init({ signed: true }); // серверная (signature)
```

## Required Calls

1. **`ysdk.features.LoadingAPI?.ready()`** — когда игра загружена, нет экранов загрузки
2. **`ysdk.features.GameplayAPI?.start()`** — начало/возобновление геймплея
3. **`ysdk.features.GameplayAPI?.stop()`** — пауза/остановка геймплея

GameplayAPI: start при запуске уровня / закрытии меню / снятии с паузы / возврате в вкладку. Stop при паузе / меню / показе рекламы / уходе в другую вкладку.

## SDK Functionality

| Функция | Ключевые методы | Детали |
|---------|----------------|--------|
| Авторизация | `ysdk.getPlayer()`, `ysdk.auth.openAuthDialog()` | [[yandex-games-sdk-saves]] |
| Сохранения | `player.setData()`, `player.setStats()`, `player.incrementStats()` | [[yandex-games-sdk-saves]] |
| Реклама | `ysdk.adv.showFullscreenAdv()`, `ysdk.adv.showRewardedVideo()` | [[yandex-games-sdk-ads]] |
| Покупки | `ysdk.getPayments()`, `payments.purchase()` | консумирование обязательно |
| Язык | автоопределение | обязательно (п. 2.14) |
| Кросс-промо | SDK-ссылки на свои игры | опционально |

## TypeScript SDK

Официальный TypeScript-пакет: https://yandex.ru/dev/games/doc/ru/sdk/typescript

## Connection Verification

Запустить с `?debug-mode=16`. Индикатор лоадера:
- `IT` — SDK OK
- `IF` — старый лоадер
- `W` — ожидает

## Sound and Pause

- При сворачивании страницы — звук останавливается
- При показе полноэкранной рекламы — звук и геймплей на паузе (GameplayAPI.stop + mute)

## Related

- uses::[[yandex-games]]
- uses::[[yandex-games-sdk-saves]]
- uses::[[yandex-games-sdk-ads]]
