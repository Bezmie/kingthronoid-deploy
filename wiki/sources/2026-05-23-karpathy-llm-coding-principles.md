---
type: source
tags: [agent, llm, principles, karpathy]
date: 2026-05-23
sources: [raw/2026-05-23-karpathy-llm-coding-principles]
---

# Karpathy LLM Coding Principles (multica-ai)

Суммаризация [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) -- 4 поведенческих принципа для LLM-агентов, производных из наблюдений Andrej Karpathy о типичных ошибках LLM при кодинге.

## Исходные проблемы

Karpathy формулирует 3 класса ошибок LLM:
1. **Неверные assumptions** -- молча выбирают интерпретацию и идут дальше, не управляют непониманием, не просят уточнений, не показывают tradeoffs
2. **Overcomplication** -- раздувание абстракций, спекулятивные фичи, 1000 строк когда нужно 100, не чистят dead code
3. **Побочные правки** -- меняют/удаляют код и комментарии которые не понимают, даже если они ортогональны задаче

## Четыре принципа

### Think Before Coding

Не предполагать молча. Не прятать непонимание. Показывать tradeoffs.

- Явно формулировать assumptions; если не уверен -- спросить
- Несколько интерпретаций -- предъявить, не выбирать молча
- Если есть проще -- сказать, push back
- Стоп при непонятке: назвать что непонятно, спросить

### Simplicity First

Минимальный код решающий задачу. Ничего спекулятивного.

- Нет фич сверх запрошенного
- Нет абстракций для single-use кода
- Нет "гибкости"/"конфигурируемости" без запроса
- Нет error handling для невозможных сценариев
- Если 200 строк могут быть 50 -- перепиши

Тест: "Скажет ли senior engineer что это overcomplicated?" Если да -- упрости.

### Surgical Changes

Трогать только необходимое. Чистить только свои orphan'ы.

- Не "улучшать" соседний код, комментарии, форматирование
- Не рефакторить то что не сломано
- Match существующий стиль, даже если сделал бы иначе
- Заметил dead code -- упомянуть, не удалять без запроса
- Свои orphan'ы (imports/vars/functions) -- удалить
- Чужой dead code -- не трогать без запроса

Тест: каждая изменённая строка трассируется к запросу пользователя.

### Goal-Driven Execution

Определить success criteria. Циклить пока не проверено.

Трансформация задач:
- "Добавь валидацию" -> "Напиши тесты для невалидных входов, потом сделай их pass"
- "Исправь баг" -> "Напиши тест воспроизводящий баг, потом сделай pass"
- "Отрефактори X" -> "Убедись что тесты pass до и после"

Для multi-step: план с verify-точками:
```
1. [Шаг] -> verify: [проверка]
2. [Шаг] -> verify: [проверка]
3. [Шаг] -> verify: [проверка]
```

Сильные success criteria = независимый loop. Слабые ("сделай чтоб работало") = постоянные уточнения.

## Key Insight

> "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria and watch it go."

## Anti-Patterns

| Принцип | Anti-Pattern | Fix |
|---------|-------------|-----|
| Think Before Coding | Молча предполагает формат/поля/scope | Явно перечислить assumptions, спросить |
| Simplicity First | Strategy pattern для единственного расчёта скидки | Одна функция пока сложность реально не нужна |
| Surgical Changes | Переформатирует кавычки, добавляет type hints при багфиксе | Менять только строки решающие проблему |
| Goal-Driven | "Я поревью и улучшу код" | "Напишу тест для бага X -> сделаю pass -> проверю регрессию" |

## Применение к CORE

- Think Before Coding -> [[agent-workflow]] Goal Quality Bar (дополнение: assumptions + push back)
- Simplicity First -> DECISIONS.md паттерн (копипаст дешевле преждевременной абстракции, stub'ы не пересоздавать)
- Surgical Changes -> [[llm-wiki-conventions]] wiki/raw/ immutable + code-conventions match existing style
- Goal-Driven -> [[agent-workflow]] Goal Quality Bar (step->verify pattern)

## Связанные

- [[agent-workflow]] -- операционные процедуры агента
- [[llm-wiki-pattern]] -- паттерн Karpathy LLM Wiki
