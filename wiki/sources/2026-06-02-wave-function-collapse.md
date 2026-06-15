---
type: source
tags: [pattern, procedural-generation, constraint-satisfaction, game-design, texture-synthesis]
date: 2026-06-02
sources: []
---
# WaveFunctionCollapse

GitHub-репо mxgmn/WaveFunctionCollapse (25k+ stars). Алгоритм генерации битмап и тайлмапов из одного примера, вдохновлённый квантовой механикой.

## Суть

Генерация выходного изображения, **локально подобного** входному:
- **(C1)** Выход содержит только NxN-паттерны, присутствующие во входе
- **(C2, weak)** Распределение паттернов в выходе примерно совпадает с входным

Типичный N = 3. Варьирование N: больше N = больше похоже на вход, меньше N = больше вариативность.

## Алгоритм

1. Считать NxN-паттерны из входа (опционально: rotations + reflections)
2. Создать массив "wave" -- каждая ячейка = суперпозиция возможных паттернов (boolean coefficients: true = не запрещён, false = запрещён)
3. Инициализация: все коэффициенты = true (полная неопределённость)
4. Цикл observation-propagation:
   - **Observation**: выбрать ячейку с минимальной ненулевой энтропией -> коллапс в определённое состояние (по коэффициентам + распределению паттернов)
   - **Propagation**: распространить ограничения от коллапсированной ячейки (AC-4 алгоритм)
5. Результат: все ячейки либо определены, либо в противоречии (все коэффициенты = 0). Противоречие = неудача

**Минимальная энтропия**: эвристика выбора ячейки. Устраняет directional bias, работает на нерегулярных сетках, подходит для pre-constrained задач. Аналог поведения человека при рисовании.

## Две модели

### Overlapping Model
Один пример-битмапа -> извлечение NxN-паттернов -> генерация. Связь с tiled model = связь высших порядков цепей Маркова с порядком 1.

### Simple Tiled Model
Тайлы + handcrafted adjacency data. Propagation = adjacency constraint propagation. Система симметрий (dihedral group D4) сокращает перечисление adjacency. Non-Wang тайлсеты (Circuit, Summer, Rooms) = adjacency не выводима из edge labels.

## Ключевые свойства

- **NP-hard**: проверка существования решения -- NP-трудна. На практике противоречия редки
- **Constrained synthesis**: поддержка ограничений. Автозаполнение уровня, начатого человеком. Комбинирование с другими генеративными алгоритмами
- **Higher dimensions**: та же логика для 3D. Perf = проблема. 3D voxel модели (MarkovJunior)
- **Одно измерение = время**: d-мерный WFC моделирует любой (d-1)-мерный клеточный автомат

## Связь с другими алгоритмами

| Алгоритм | Связь |
|----------|-------|
| ConvChain | Удовлетворяет сильный C2, но не C1. Стратегия: ConvChain -> WFC (как MC -> gradient descent) |
| Paul Harrison texture synthesis | Быстрее, но плохо с длинными корреляциями. Стратегия: WFC blueprint -> constrained synthesis |
| Model Synthesis (Merrell, 2009) | Предшественник: adjacency constraints + AC-3. WFC обобщает до NxN overlapping patterns |
| Loopy belief propagation | Propagation WFC похожа на BP, но constraint propagation с сохранённым stationary distribution быстрее на CPU |

## Истоки

1. Efros & Leung, Texture Synthesis by Non-parametric Sampling, 1999
2. Merrell, Model Synthesis, 2009
3. Mackworth, Consistency in Networks of Relations, 1977 (CSP)
4. Harrison, Image Texture Tools, 2005 (adjacency via border labels)

## Порты и использование в играх

Порты: C++, Python, Kotlin, Rust, Julia, Go, Haxe, Java, Clojure, Dart, JavaScript. Движки: Unity, UE5, Godot 4, Houdini.

Игры: Bad North, Caves of Qud, Townscaper, Matrix Awakens, Dead Static Drive.

## Применение к проектам

Потенциальный кандидат для terrain-gen в Kingthronoid. Ограничение: классический WFC генерирует весь уровень сразу, а Kingthronoid = пошаговое расширение сетки. Требуется **incremental WFC** (constraint propagation при добавлении ячейки, не полный пересчёт). Также применим для когерентного ландшафта в будущих проектах с tile-based мирами.

## Typed Edges

- uses::[[tilemaps]]
- uses::[[component-pattern]]

## Related

- [[tilemaps]] -- WFC генерирует tilemaps из примеров
- [[component-pattern]] -- constraint propagation = декомпозиция ограничений
