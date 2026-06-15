---
type: concept
tags: [agent, llm, principles, karpathy]
date: 2026-05-23
sources: [sources/2026-05-23-karpathy-llm-coding-principles]
---

# LLM Coding Principles

4 поведенческих принципа для LLM-агентов. Производные из наблюдений Andrej Karpathy о типичных ошибках. Источник -> [[sources/2026-05-23-karpathy-llm-coding-principles]]

## Think Before Coding

Не предполагать молча. Не прятать непонимание. Показывать tradeoffs.

Перед реализацией:
1. Явно формулировать assumptions; не уверен -- спросить
2. Несколько интерпретаций -- предъявить все, не выбирать молча
3. Есть проще -- сказать. Push back когда обосновано
4. Стоп при непонятке: назвать что непонятно, задать вопрос

В CORE: [[agent-workflow]] Goal Quality Bar усиливает это -- "если missing detail меняет outcome, одно уточняющее question, не assuming". Принцип добавляет: multiple interpretations + push back.

## Simplicity First

Минимальный код решающий задачу. Ничего спекулятивного.

Правила:
- Нет фич сверх запрошенного
- Нет абстракций для single-use кода
- Нет "гибкости" без запроса
- Нет error handling для невозможных сценариев
- 200 строк могут быть 50 -- перепиши

Тест: "Senior engineer скажет что это overcomplicated?" -> упрости.

В CORE: DECISIONS.md фиксирует этот паттерн в конкретных случаях -- drag-pan копипаст дешевле преждевременной абстракции, tooltip декомпозиция B (3 файла) вместо A (8 файлов), stub'ы не пересоздавать.

## Surgical Changes

Трогать только необходимое. Чистить только свои orphan'ы.

При редактировании:
- Не "улучшать" соседний код/комментарии/форматирование
- Не рефакторить то что не сломано
- Match существующий стиль, даже если сделал бы иначе
- Dead code -- упомянуть, не удалять без запроса
- Свои orphan'ы -- удалить; чужие -- не трогать

Тест: каждая изменённая строка трассируется к запросу пользователя.

В CORE: wiki/raw/ immutable ([[llm-wiki-conventions]]) -- аналогичное правило на уровне wiki. Проектные конвенции стиля (code-conventions) -- match existing.

## Goal-Driven Execution

Определить success criteria. Циклить пока не проверено.

Трансформация:
- "Добавь X" -> "Напиши тест, потом сделай pass"
- "Исправь баг" -> "Тест воспроизводящий баг -> fix -> pass"
- "Отрефактори" -> "Тесты pass до и после"

Multi-step план:
```
1. [Шаг] -> verify: [проверка]
2. [Шаг] -> verify: [проверка]
```

Сильные criteria = независимый loop. Слабые = постоянные уточнения.

В CORE: [[agent-workflow]] Goal Quality Bar -- что станет true, evidence, порог, boundaries, stop condition. Принцип добавляет: step->verify pattern + test-first emphasis.

## Anti-Patterns

| Принцип | Anti-Pattern | Fix |
|---------|-------------|-----|
| Think Before Coding | Молча предполагает формат/поля/scope | Явно перечислить assumptions, спросить |
| Simplicity First | Strategy pattern для единственного расчёта | Одна функция пока сложность реально нужна |
| Surgical Changes | Переформатирует/добавляет type hints при багфиксе | Менять только строки решающие проблему |
| Goal-Driven | "Поревью и улучшу код" | "Тест для бага X -> pass -> нет регрессии" |

## Key Insight

LLMs хорошо циклят к конкретным целям -- дай success criteria, не императив. Overcomplicated код не очевидно wrong -- он следует паттернам и best practices. Проблема в timing: сложность добавляется до того как реально нужна.

## Связанные

- [[agent-workflow]] -- операционные процедуры агента (Goal Quality Bar)
- [[llm-wiki-pattern]] -- паттерн Karpathy LLM Wiki
- [[llm-wiki-conventions]] -- конвенции wiki (raw immutable, стиль)
