# SDK Яндекс Игр — Загрузка игры и разметка геймплея

Источник: https://yandex.ru/dev/games/doc/ru/sdk/sdk-game-events

## LoadingAPI.ready()

Вызвать когда игра загрузила все ресурсы и готова к взаимодействию.

Условия в момент вызова:
- Все элементы готовы к взаимодействию
- Нет экранов загрузки

```js
// С await
const ysdk = await YaGames.init();
ysdk.features.LoadingAPI?.ready()

// Без await
YaGames.init().then((ysdk) => {
    ysdk.features.LoadingAPI?.ready()
}).catch(console.error);
```

## GameplayAPI.start()

Вызвать когда игрок начинает/возобновляет игровой процесс:
- Запуск уровня
- Закрытие меню
- Снятие с паузы
- Возобновление после рекламы
- Возвращение в текущую вкладку

```js
ysdk.features.GameplayAPI?.start()
```

## GameplayAPI.stop()

Вызвать когда игрок приостанавливает/завершает процесс:
- Прохождение уровня или проигрыш
- Вызов меню
- Пауза
- Показ полноэкранной/RV рекламы
- Уход в другую вкладку

```js
ysdk.features.GameplayAPI?.stop()
```

После возобновления — снова вызвать start().
