---
type: concept
tags: [pattern, dependency-injection, architecture, decoupling]
date: 2026-05-08
sources: [2026-05-08-martin-fowler-dependency-injection]
---

# Dependency Injection

Паттерн развязки: внешний объект (assembler) внедряет реализацию в компонент, вместо того чтобы компонент сам искал реализацию. Ключевая статья: Fowler, 2004.

## Problem

Компонент A зависит от интерфейса B. Кто-то должен подставить конкретную реализацию B. Если A сам создаёт B (`new ConcreteB()`) -- нет плагинности, нет развязки.

## DI vs Service Locator

| | Dependency Injection | Service Locator |
|---|---|---|
| Как получает зависимость | Внедряется извне (constructor/setter/interface) | Явный запрос к локатору |
| Зависимость от инфраструктуры | Нет (компонент не знает про контейнер) | Да (зависимость от locator API) |
| Видимость зависимостей | В сигнатуре constructor/setter | Скрыта в теле кода |
| Для классов в одном приложении | ~= эквивалентно | Проще, прямолинейнее |
| Для компонентов в разных приложениях | Лучше -- нет привязки к конкретному локатору | Хуже -- каждый потребитель со своим локатором |
| Тестирование | Оба работают при правильном дизайне | Оба работают при правильном дизайне |

## Three Forms of DI

1. **Constructor injection** -- зависимости через параметры конструктора. Предпочтителен: валидный объект с рождения, immutable поля, явные зависимости
2. **Setter injection** -- зависимости через setter-методы. Опциональные зависимости, много параметров, несколько путей конструирования
3. **Interface injection** -- компонент реализует injection-интерфейс. Наиболее инвазивный, требует отдельные интерфейсы

Рекомендация: начинать с constructor, переключаться на setter при необходимости.

## Fundamental Principle

**Separating configuration from use** -- важнее выбора между DI и Locator. Аналог разделения интерфейса и реализации. Конфигурация решает какой класс инстанцировать; использование опирается на полиморфизм. Если условная логика выбора реализации дублируется -- принцип нарушен.

## Code vs Config Files

Всегда предоставлять программный интерфейс для wiring. Конфиг-файл -- опциональная надстройка. Over-eagerness для XML-конфигов -- антипаттерн.

## In Project

Manual wiring в assembly-слой: init-функции систем получают game как параметр (constructor injection style). WidgetRegistry = service locator для виджетов. EventBus = observer-развязка (ортогональна DI).

## Typed Edges

- derived::[[2026-05-08-martin-fowler-dependency-injection]]
- uses::[[ecs-lite-architecture]]

## Related

- [[2026-05-08-martin-fowler-dependency-injection]] -- источник: Fowler, 2004
- [[ecs-lite-architecture]] -- архитектура проекта, ручной wiring
- [[observer-pattern]] -- событийная развязка (дополняет DI)
