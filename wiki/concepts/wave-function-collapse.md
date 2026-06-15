---
type: concept
tags: [pattern, procedural-generation, constraint-satisfaction, game-design]
date: 2026-06-02
sources: [2026-06-02-wave-function-collapse]
---
# Wave Function Collapse

Алгоритм процедурной генерации: из одного примера (битмапы/тайлсета) создаёт выход, локально подобный входу. Вдохновлён квантовой механикой (суперпозиция -> наблюдение -> коллапс).

## Суть

Каждая ячейка выхода = суперпозиция возможных состояний. Цикл:
1. **Observation**: выбрать ячейку с минимальной энтропией -> коллапс в одно состояние
2. **Propagation**: распространить ограничения (AC-4)

Результат: полностью определённый выход, либо противоречие (NP-hard, но редко).

## Две модели

| Модель | Вход | Механика |
|--------|------|----------|
| **Overlapping** | Одна битмапа | Извлечение NxN-паттернов -> constraint propagation |
| **Tiled** | Тайлы + adjacency | Adjacency constraint propagation + система симметрий (D4) |

Overlapping : Tiled = цепь Маркова высшего порядка : порядок 1.

## Когда применять

- Нужен **когерентный мир** из маленького примера (леса кластерами, горы хребтами)
- **Constrained synthesis**: автозаполнение с ограничениями (частично заполненный уровень, ручные правки)
- **Tile-based уровень**: adjacency constraints вместо случайного размещения
- Комбинация с другими алгоритмами: WFC для blueprint, затем texture synthesis для деталей

## Gotchas

- **NP-hard**: противоречие = нет выхода. Решение: backtracking, retry, или ограничение входных данных
- **Easy tilesets**: все тайлы всегда совместимы -> корреляции быстро затухают -> скучный выход. Нужны несовместимости для интересных структур
- **Non-Wang tilesets**: adjacency не выводима из edge labels -- сложнее описывать, но гибче
- **Incremental adaptation**: классический WFC генерирует весь уровень сразу. Пошаговое расширение требует модификации (constraint propagation на новую ячейку, не полный пересчёт)
- **Perf в 3D**: та же логика, но производительность падает. 3D требует эвристик

## Эвристика минимальной энтропии

Выбор ячейки с минимальной Shannon entropy:
- Устраняет directional bias (в отличие от left-to-right scan)
- Работает на нерегулярных сетках
- Подходит для pre-constrained задач (частично заполненные уровни)
- Аналог поведения человека при рисовании

## Constraint Propagation (AC-4)

WFC формулирует генерацию как CSP (constraint satisfaction problem). Propagation = AC-4 (Mohr & Henderson, 1986). Альтернатива: loopy belief propagation -- точнее, но медленнее на CPU без массивного параллелизма.

## Комбинирование алгоритмов

| Стратегия | Когда |
|-----------|-------|
| ConvChain -> WFC | Нужна хорошая выборка + точные локальные паттерны |
| WFC -> texture synthesis | Blueprint с длинными корреляциями + детализация текстур |
| Ручной старт -> WFC autocomplete | Mixed-initiative: человек задаёт структуру, WFC заполняет |

## Typed Edges

- derived::[[2026-06-02-wave-function-collapse]]
- uses::[[tilemaps]]
- uses::[[component-pattern]]

## Related

- [[tilemaps]] -- WFC генерирует tilemaps
- [[component-pattern]] -- constraint propagation = декомпозиция
- [[2026-06-02-wave-function-collapse]] -- источник
