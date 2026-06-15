# SDK Яндекс Игр — Реклама

Источник: https://yandex.ru/dev/games/doc/ru/sdk/sdk-adv

## Рекомендации

- Пользователь должен понимать, что это реклама, а не часть игры
- Показывать после действия пользователя или по таймеру (если уровень > 5 мин)
- Частота RV не ограничена; частота interstitial управляется платформой
- НЕ вызывать рекламу во время активного взаимодействия (фрод → снижение дохода)
- НЕ использовать setInterval для показа рекламы

## Полноэкранная реклама (interstitial)

```js
ysdk.adv.showFullscreenAdv({
    callbacks: {
        onOpen: () => { /* реклама открыта */ },
        onClose: (wasShown) => { /* wasShown: была ли показана */ },
        onError: (error) => { /* ошибка */ },
    }
})
```

Полностью закрывает приложение. Показывается между уровнями/действиями.

## Rewarded Video (RV)

```js
ysdk.adv.showRewardedVideo({
    callbacks: {
        onOpen: () => { /* видео открыто */ },
        onRewarded: () => { /* засчитан просмотр — выдать награду */ },
        onClose: (wasShown) => { /* закрыто */ },
        onError: (error) => { /* ошибка */ },
    }
})
```

Важное: награда выдаётся в `onRewarded`, а не в `onClose`.

## Стики-баннер

Показывается во время игры. Настраивается в Консоли:
- Мобильные: внизу/вверху (портрет), внизу/вверху/справа (альбом)
- Десктоп: справа

По умолчанию показывается всю сессию. Для управления через SDK — включить "Использовать API для показа sticky-баннера".

### API стики-баннера

```js
// Получить статус
const { stickyAdvIsShowing, reason } = await ysdk.adv.getBannerAdvStatus();

// Показать
await ysdk.adv.showBannerAdv();

// Скрыть
await ysdk.adv.hideBannerAdv();
```

reason: 'ADV_IS_NOT_CONNECTED' | 'UNKNOWN'
