---
type: concept
tags: [pattern, service-locator, decoupling, architecture]
date: 2026-05-08
sources: [2026-04-28-game-programming-patterns]
---

# Service Locator

Глобальный доступ к сервису без привязки к конкретному классу реализации. Более гибкий cousin Singleton.

## Проблема

Код по всему проекту обращается к сервису (audio, logging, memory). Прямая ссылка на конкретный класс = жёсткая связность. Singleton = глобальный + фиксированная реализация.

## Решение

Три роли: **Service** (абстрактный интерфейс), **Service Provider** (конкретная реализация), **Service Locator** (предоставляет доступ, скрывая тип и процесс поиска).

```js
class Locator {
    static service = null;
    static getAudio() { return Locator.service; }
    static provide(audio) { Locator.service = audio; }
}

// Инициализация
Locator.provide(new ConsoleAudio());

// Использование -- не знает про ConsoleAudio
Locator.getAudio().playSound(id);
```

## Null Service

Если сервис не найден -- вернуть NullAudio (noop реализация). Код-потребитель не проверяет null. Удобно для отключения систем в деве.

## Decorator

LoggedAudio оборачивает реальный сервис + логирует вызовы. Locator.provide(new LoggedAudio(Locator.getAudio())). Вкл/выкл логирования без изменения потребителей.

## Service Locator vs Dependency Injection

| | Service Locator | Dependency Injection |
|---|---|---|
| Кто запрашивает | Код-потребитель явно | Контейнер внедряет |
| Зависимость от инфраструктуры | На locator | На контейнер (скрыта) |
| Видимость зависимостей | Скрыта в теле кода | В сигнатуре constructor/setter |
| Для классов в одном приложении | Проще | Избыточно |
| Для компонентов в разных приложениях | Хуже -- привязка к конкретному locator | Лучше -- нет привязки |

Оба решают одну задачу: separating configuration from use. Выбор вторичен -- принцип важнее. (См. [[dependency-injection]])

## Service Locator vs Singleton

Locator гибче: можно сменить реализацию в рантайме, включить null service, добавить decorator. Singleton = фиксированный глобальный экземпляр.

## Когда использовать

Сначала -- передать объект через параметры. Locator -- когда plumbing через 10 слоёв методов добавляет сложности без пользы (logging, audio, memory -- фундаментально единичные сервисы). Использовать редко.

## В проекте

WidgetRegistry = частичный Service Locator (виджеты регистрируются/находятся по имени).

## Связанные страницы

- [[dependency-injection]] -- альтернативная стратегия wiring (Fowler: DI vs Locator)
- [[ecs-lite-architecture]] -- WidgetRegistry как частичный locator
- [[component-pattern]] -- GetComponent() в Unity = Service Locator + Component
- [[observer-pattern]] -- ортогональная развязка: Locator = подстановка реализаций, Observer = уведомления
