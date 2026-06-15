---
type: concept
tags: [architecture, pattern, storage, optimization, caching]
date: 2026-05-10
sources: []
---

# LSM-Slab Architecture

Архитектура хранения данных: Log-Structured Merge tree + slab-модель (иммутабельные self-contained единицы) + адаптивный выбор алгоритмов по размеру. Применима к БД, файловым системам, базе знаний.

Источник: Pinecone serverless architecture ([how-pinecone-works](https://www.pinecone.io/how-pinecone-works/))

## LSM-Tree: принцип

Записи всегда аппендятся (sequential write), не модифицируют существующие файлы. Данные проходят уровни компакции: L0 (мелкие, свежие) → L1 → L2 → L3 (крупные, оптимизированные). Каждый уровень = merge нескольких нижних + оптимизация (выбор алгоритма, сжатие, удаление мёртвых записей).

Ключевые свойства:
- **Write-оптимизирован**: append-only = sequential I/O, нет random write
- **Иммутабельность**: каждый уровень неизменяем после записи → параллельные чтения без конфликтов
- **Фоновая компакция**: асинхронная, не блокирует чтение/запись
- **Freshness**: memtable (in-memory) = мгновенная доступность новых данных, flush = persist

## Slab: self-contained unit

Slab = иммутабельный набор файлов со всем необходимым для обслуживания запросов:
- Данные (векторы, метаданные, текст)
- Индекс (алгоритм выбирается по размеру slab)
- Manifest (описание содержимого)
- Bitmap-индексы для метаданных (быстрый pre-filter)

Slab иммутабелен → индекс не деградирует, не нужен rebuild.

## Адаптивный алгоритм по размеру

| Размер | Алгоритм | Причина |
|--------|----------|---------|
| <10K записей | Linear scan | Точно, быстро, дёшево |
| ~100K | PQFS (product quantization) | Баланс скорости/точности |
| >1M | IVF (inverted file) | Кластеризация, сканируются только релевантные |

Обобщение: размер данных определяет оптимальный алгоритм. Малые данные = brute force точен. Большие = нужна структура (индекс, кластеризация). Переключение прозрачное — пользователь не выбирает алгоритм.

## Pre-filter vs Post-filter

Post-filter: поиск по всем данным → потом отсеять по метаданным. Проблема: может вернуть меньше top-k, если релевантные не прошли фильтр.

Pre-filter: сначала отсеять по метаданным (bitmap) → потом искать только в matching subset. Преимущества:
- Селективный фильтр = меньше данных сканируется = быстрее
- Гарантированный top-k из matching subset
- BM25/IDF пересчитывается по subset → ранжирование точнее

## Применение в нашей wiki

Wiki CLI реализует LSM-подобную архитектуру:

| Pinecone | Наша wiki |
|----------|-----------|
| Raw vectors (object storage) | `raw/` immutable source files |
| L0 slabs (parsed, small) | Parsed pages (in-memory index) |
| L1+ slabs (compacted) | `.cache/index.json` (cached index) |
| Memtable (fresh data) | Новые .md-файлы до rebuild кэша |
| Pre-filter (metadata bitmaps) | `--tags` pre-filter → BM25 по subset |
| Adaptive algorithm | Не нужен при 55 страницах (BM25 достаточно) |
| Brief as L2 slab | `__brief` в кэше = O(1), не пересчитывается |

Реализовано: `loadOrBuild()` с mtime-hash инвалидицией кэша, pre-filter в `cmdSearch`, `__brief` в индексе.

## Связанные страницы

- [[llm-wiki-pattern]] — wiki как LSM-подобная система (raw/wiki/schema = уровни компакции)
- [[functional-programming-in-js]] — иммутабельность как фундамент LSM
- [[command-pattern]] — event sourcing / WAL как альтернатива state-snapshot для save-систем
