---
type: entity
tags: [yandex, sdk, api, ads, monetization, tech]
date: 2026-05-29
sources: [2026-04-27-yandex-games-sdk-adv]
---

# Yandex Games SDK: Ads

Конкретные API-методы для показа рекламы через SDK.

## Interstitial (Fullscreen)

```js
ysdk.adv.showFullscreenAdv({
    callbacks: {
        onOpen: () => { /* пауза игры + звук */ },
        onClose: (wasShown) => { /* возобновить игру */ },
        onError: (error) => { /* лог ошибки */ },
    }
})
```

- Полностью закрывает приложение
- Частота показа управляется **платформой** (не разработчиком)
- Показывать между уровнями/действиями, НЕ во время активного геймплея
- **Фрод-предупреждение**: НЕ вызывать через setInterval — случайные клики = снижение дохода

## Rewarded Video (RV)

```js
ysdk.adv.showRewardedVideo({
    callbacks: {
        onOpen: () => { /* пауза игры + звук */ },
        onRewarded: () => { /* ВЫДАТЬ НАГРАДУ — только здесь! */ },
        onClose: (wasShown) => { /* возобновить игру */ },
        onError: (error) => { /* лог ошибки, награду НЕ давать */ },
    }
})
```

- Частота **не ограничена**
- Награда выдаётся **в onRewarded**, не в onClose
- Пользователь может закрыть до завершения — onRewarded не вызовется
- Требование: кнопка RV должна однозначно показывать, что пользователь посмотрит рекламу и что получит

### RV Boost — Pattern for Incremental

```js
// Пользователь нажал "2x на 30 мин за просмотр"
ysdk.adv.showRewardedVideo({
    callbacks: {
        onOpen: () => pauseGame(),
        onRewarded: () => {
            activateBoost('2x', 30 * 60 * 1000); // 30 мин в мс
        },
        onClose: () => resumeGame(),
        onError: () => resumeGame(),
    }
})
```

## Sticky Banner

Показывается во время игры. Настраивается в Консоли (расположение).
По умолчанию — вся сессия. Для управления через SDK — включить "API для показа".

```js
// Статус
const { stickyAdvIsShowing, reason } = await ysdk.adv.getBannerAdvStatus();

// Показать
await ysdk.adv.showBannerAdv();

// Скрыть
await ysdk.adv.hideBannerAdv();
```

reason: `'ADV_IS_NOT_CONNECTED'` | `'UNKNOWN'`

## Pause on Ad Show

**Обязательно** (требование 4.7): при полноэкранной рекламе — ставить игру и звук на паузу.

```js
onOpen: () => {
    ysdk.features.GameplayAPI?.stop();
    muteAudio();
},
onClose: () => {
    ysdk.features.GameplayAPI?.start();
    unmuteAudio();
}
```

## Related

- uses::[[yandex-games-sdk]]
- uses::[[yandex-games-monetization]]
