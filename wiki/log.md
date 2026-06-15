---
type: log
tags: [meta]
date: 2026-04-27
---

## [2026-06-14] session | kingthronoid fastwin: TS/test fix + deploy v0.10.1 + dead code integration
- TS errors fixed: grid.ts, modal-meta.ts, report.ts, sim-engine.test.ts, tooltip-content.test.ts
- 7 failing tests fixed (data refactoring + terrain design change)
- effect-collector.ts integrated into output-calc.ts (buildMultiplierChain)
- collectCardEffects() stub removed from card-entity.ts
- deploy: v0.10.1 pushed to gh-pages + main

# Wiki Log

## [2026-06-11] session | Audit + fix CORE conventions for agent enforceability
- done: 20 fixes across 14 files

## [2026-06-05] ingest | Red Blob Games (Amit Patel) — overview
- created: sources/2026-06-05-redblobgames, entities/redblobgames
- updated: tilemaps (добавлена Hexagonal Grids секция + redblobgames reference)
- thesis: Канонический reference по алгоритмам (A*, BFS, hex grids, Voronoi/Delaunay, probability). Working code (MIT/Apache v2). Ingested на overview-уровне: entity + source-обзор; deep-ингест отдельных статей по запросу
- relevance: 2 direct tag matches (tilemap, procedural-generation); no override needed
- scope: 1 (overview) per user choice; main page + topic index fetched

## [2026-06-05] session | redblobgames ingest + kingthronoid hex-grid analysis
- done: CORE ingest (sources/entities/raw redblobgames + tilemaps hex ref), kingthronoid concept page hex-grid-candidate + integrate log
- in-progress: nothing
- next: hex-grid spike prototype (1 день) для подтверждения orientation + visual fit → Phase 1 или отказ. CORE: deep-ингест отдельных статей redblobgames (A*, hex implementation, visibility) по запросу

## [2026-06-04] session | CORE unlogged cleanup: start.md project extension steps 5-6 (refactor), WFC ingest (3 файла) уже записан в wiki/log.md 2026-06-02 но не закоммичен. Continue: kingthronoid dev-сервер
- files: .agents/hooks/start.md,wiki/concepts/tilemaps.md,wiki/concepts/wave-function-collapse.md,wiki/sources/2026-06-02-wave-function-collapse.md

## [2026-06-02] ingest | WaveFunctionCollapse
- создано: wave-function-collapse (source+concept)
- обновлено: tilemaps
- тезисы: WFC: constraint propagation + entropy heuristic для procedural generation. Кандидат для terrain-gen

## [2026-05-29] session | CORE system test: session persistence, tag indexing, deploy hook, AGENTS.md update
- done: fix session persistence (.core-session.json), fix tag indexing (index.js), fix session clear logic, log session-aware, deploy hook: cleanup kingthronoid-deploy after push, AGENTS.md: session + guard info
- next: commit project changes (AGENTS.md + deploy.md)

## [2026-05-29] session | проверка CORE системы: найдены и пофикшены 2 бага + 2 regressions
- done: bug1: session persistence (.core-session.json), bug2: tag indexing (index.js), fix3: session clear on start w/o --root, fix4: log session-aware
- next: commit fixes, проверить кэш-инвалидацию при изменении index.js

## [2026-05-29] test | session-aware log test

## [2026-05-29] test | test entry

## [2026-05-29] session | проверка CORE системы

## [2026-05-29] session | Wiki audit + lint extension session ended

## [2026-05-29] refactor | Extended lint with convention checks: nonEnglishTitles, nonEnglishHeaders, pathPrefixLinks, overlinked (>3 Related), emptySources, missingTags, untyped (no typed edges). Added headings/body to page index.

## [2026-05-29] session | Wiki audit session ended

## [2026-05-29] session | Wiki audit complete: dates updated (39 pages), 3 unlinked sources linked (pdg→incremental-games, emergent→wuselfaktor). Lint: 0 orphans, 0 broken, 0 stale, 0 lowXref

## [2026-05-29] session | Batch 4 stale fix: math-of-idle-games source, pdg-replayable-games, value-chains-game-economies, emergent-game-design-unity, emergent-gameplay-guide, wuselfaktor-pagonia — all source pages now convention-compliant

## [2026-05-29] session | Batch 3 stale fix: math-of-idle-games, svg-layers-and-palette (removed project convention), llm-wiki-conventions, machinations, yandex-quick-start, yandex-requirements, game-economy-handbook, game-programming-patterns

## [2026-05-29] session | Batch 2 stale fix: idle-game-core-loop, value-chains, wuselfaktor (removed project sections), typescript, animejs

## [2026-05-29] ingest | Playing to Wait: A Taxonomy of Idle Games (Alharthi et al., CHI 2018) — source + incremental-games concept rewrite 2
- key: pages

## [2026-05-29] session | Wiki audit: 35 pages fixed — type reclassification (6 concept→entity), Russian headers→English, typed edges added, cross-refs trimmed to 1-3, path prefixes removed wiki-wide 35
- key: pages

## [2026-05-28] docs | current-project detection: explicit naming prioritized, ambiguous activity -> ask user

## [2026-05-28] fix | crystallize guard: pass real context (hasLogEntry=unlogged==0, hasGitDiff=uncommitted>0) instead of hardcoded {projectLoaded:true}

## [2026-05-28] docs | CORE system audit: P0+P1 fixes for agent understandability
- P0: skill caveman inline def, after-edit+commands in Wiki CLI table, work hooks→Hook routing ref fix
- P1: fix-ci numbering 1,3,4→1,2,3; deploy+feature log steps; log.md [[]]→plain text; lint skips ROOT_PAGES in broken checks; guard failure protocol + core log types in start.md; ASCII-only→no emoji/dangerous Unicode rule

## [2026-05-28] session | CORE refactor v2
- done: Phase 1: kingthronoid guards fix, lint.js DEFAULT_WIKI_DIR, pageToResult+basename shared, basenameMap O(1), cmdLinks fix, dead parseFrontmatter, AGENTS.md update. Phase 2: public-api.js, formatOutput dispatch, evaluateGuard registry-only, ingest.js reorder. Phase 3: 5 new test suites (10 total, ~50 assertions). Bugfix: cmdLinks index.meta.sources TypeError.
- next: commit 23 files, cache clear for reindex

## [2026-05-28] refactor | CORE system 3-phase refactor v2: shared helpers, public API, format dispatch, guard cleanup, tests
- dedup: pageToResult+basename extracted, 6+15 sites
- perf: basenameMap O(1) resolveLink, cmdLinks redundant scan removed
- architecture: public-api.js stable export, formatOutput dispatch, substring fallback removed
- guards: kingthronoid 5 hooks: free-text→project-context, lint.js DEFAULT_WIKI_DIR import fix
- code: ingest.js function-after-exports fixed, parseFrontmatter wrapper removed
- tests: 5 new: result, projects, route, hooks, log. Total: 10 suites ~50 assertions
- bugfix: cmdLinks index.meta.sources TypeError

## [2026-05-28] test | unit test entry

## [2026-05-28] session | test entry

## [2026-05-28] refactor | CORE system 3-phase refactor: shared modules, responsibility split, guard registry
1. Phase 1: extracted 6 shared modules (bm25, tokenize, frontmatter, walk, projects, markdown-table) — eliminated 6 critical code duplicates across 8 consumer files
2. Phase 2: wiki.js 660→220 lines (thin router + format.js), index.js split (path-resolver + cache), status.js replaced wikiCmd execSync with direct library calls, lint.js extracted computeIncomingCounts
3. Phase 3: guard registry (project-context, suggest-lint, work-completed) replacing hardcoded substring matching, `core hooks --json`, 5 test suites (bm25, tokenize, frontmatter, markdown-table, guard-registry)
- in-progress: kingthronoid hooks not updated to structured guard names, AGENTS.md not updated for new file structure

## [2026-05-28] session | Named edges + promotion + crystallize: три фичи из agentmemory LLM Wiki v2
- done: Реальная typed edge: derived::lsm-slab-architecture в llm-wiki-pattern
- next: Удалить .cache/ из untracked (добавить в .gitignore если нужно)

## [2026-05-27] session | Unified landscape layout: scale-based, overlay panels, sidebar-as-overlay
- project: kingthronoid
- done: Unified 16:9 landscape layout (scale for all devices), rotate overlay for portrait, sidebar absolute overlay on grid, resource-bar as compact nav-style buttons, tooltip unified panel style, cards show GPS (rate/s), draw-slots 1fr fill, GRID_OFFSET_X/Y computed, removed GRID_W/GRID_H/DESKTOP_BREAK/MOBILE_HAND_H/SIDEBAR_W
- next: Test on device, update AGENTS.md architecture table, update GDD layout section, consider letterbox option for portrait

## [2026-05-27] session | UI animation patterns (anime.js) + layout bugfixes
- project: kingthronoid
- done: animations.ts (7 helpers), glowPulse/purchaseBounce/cardSelectBounce/staggerRevealEls/numberPop/modalEnter-Exit, mobile dynamic handH, draw-btn btnState guard, modal force-close, applyBuilding stopGlow
- next: visual polish, build-highlight, icon-morph, SVG border for large cards

## [2026-05-27] session | 3-slot draw + hand size upgrades
- project: kingthronoid
- done: draw-slot widget, 3-card draw+pick flow, cost scaling (baseCount*countScaling*levelMult), handSize=4+4upgrades, pending-card tooltips, hand always-visible slots, save v10, prestige reset
- next: update GDD.md draw section, balance-test scaling values

## [2026-05-27] session | bin/core.js implementation + docs actualization
- проект: kingthronoid
- сделано: core.js (6 команд: start/status/route/hooks/guard/log), 5 lib модулей, start.md/end.md/AGENTS.md/khooks обновлены, 3 wiki страницы актуализированы
- in-progress: core task-context отложен
- next: закоммитить, vitest для route.js

## [2026-05-23] ingest | Karpathy LLM Coding Principles
2. Обновлено: concepts/agent-workflow (cross-ref)
3. Ключевые тезисы: 4 принципа (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution) против типичных LLM-ошибок. Override: user-requested при <2 tag match

## [2026-05-23] update | Cross-reference fix: webapp-automation-strategy orphan resolved
- Added backlink iterative-ui-qa -> webapp-automation-strategy

## [2026-05-19] refactor | Kingthronoid: GDD/AGENTS реструктуризация + wiki cleanup
1. GDD v0.15: убраны ложные synergy-ссылки (synergyWith/synergyBonus/getSynergyMultiplier не существуют в коде — заменены на аффикс neighbourType). Формула output исправлена. Зависимости отмечены как реализовано. Удалены дублирующие Architecture/Performance/UI Widgets секции (→ AGENTS.md). Visual Style расширен. Добавлена T2 таблица
2. AGENTS.md реструктуризация: GDD = спецификация (ЧТО), AGENTS = конвенции (КАК). Убраны пп.9-21 (спецификации механик/UI → GDD). Добавлены секции Performance, Паттерн-маппинг. Events: ~40 → 43
3. Код: удалён мёртвый `prestige.restart` из EventMap (events.ts)
4. WIKI-MAP.md: переписан с актуальными именами файлов (tooltip.ts вместо info-panel.ts, modal-*.ts вместо meta-upg.ts, +nav/modal/constants). Убрана несуществующая css-framework-and-themes
5. Wiki concept-страницы: почищена project-specific конкретика (12 страниц). math-of-idle-games: убрана конкретная формула проекта, добавлен log10 как самостоятельный паттерн prestige. value-chains: обрезана секция "Применение к нашему проекту" до универсальной. ecs-lite-architecture: "data.ts = Type Object" → "Def/State = Type Object". idle-game-core-loop: обобщено "Применение к проекту". type-object: убраны file names, "Stage 2.5", "GENERATORS". event-queue/dependency-injection/service-locator/dirty-flag: обрезаны "В проекте" до 1-2 строк. wuselfaktor: "counts[i]" → "count per entity". decorator-pattern: "getGenModifiers" → "modifier breakdown". functional-programming-in-js: таблица с file/function names → 2 строки
6. Ключевой тезис: концепция "concepts без project-specific конкретики" применена последовательно — конкретика перенесена в GDD/AGENTS, wiki вернулась к чистым концепциям

## [2026-05-18] ingest | Gacha Probability Algorithms -- Kyle Chen
1. Создано: raw/2026-05-18-gacha-probability-algorithms.md, concepts/gacha-probability.md
2. Ключевые тезисы: базовая формула p=1-(1-r*s)^n для независимых пуллов; pity mechanic -- нарастающий шанс после промахов, reset при hit; Monte Carlo vs DP -- приближение vs точный расчёт; DP state=(target_count, pity_count) -- probability matrix итерация; PMF/CDF как инструменты баланса (mean>median при skew); subrate = условная вероятность внутри tier'a; применимо к kingthronoid draw (weighted random = одоуровневая модель, pity TBD)

## [2026-05-17] update | CORE: актуализация системы
1. Удалено: koid/ (фантомная папка с мусорным файлом), .gitignore updated
2. Обновлено: ROADMAP.md (завершённые секции свёрнуты, Kingthronoid: фаза 2), AGENTS.md CORE (wiki rule п.5: concepts = универсальное знание), wiki/concepts/llm-wiki-conventions.md (граница типов страниц)
3. Ключевые тезисы: формализовано правило "concepts без project-specific конкретики" — было устным соглашением, стало записанным; koid/ = артефакт Windows nul device на Git Bash

## [2026-05-17] update | Kingthronoid: актуализация состояния (AGENTS.md + ROADMAP + WIKI-MAP + wiki pages)
1. Обновлено: kingthronoid/AGENTS.md (9→18 affixes, save v5→v8, 1→3 metaUpg, 3→5 hover sources, T2 buildings), kingthronoid/ROADMAP.md (+фаза 1/2 в Готово, T2 зачёркнут в бэклог), kingthronoid/WIKI-MAP.md (переписан: убраны 7 мёртвых ссылок, добавлены текущие файлы + wiki-маппинг)
2. Обновлено wiki: concepts/wuselfaktor.md (генераторы → текущие имена farm/mill/quarry/sawmill/forge/mine/kiln), concepts/dependency-injection.md (Stage 2.5 прогноз → факт: ручной wiring достаточен), concepts/ecs-lite-architecture.md (Core details: 33 fn, 34 events, 18 affixes; Systems: конкретные файлы; Widgets: конкретные виджеты), concepts/event-queue.md (убрано сокращение koid, +34 events)
3. Ключевые тезисы: расхождения AGENTS.md vs код накапливались с фазы 2; WIKI-MAP содержал 7 дорефакторингных имён файлов; wiki concept pages ссылались на устаревшие имена генераторов и прогнозы

## [2026-05-16] ingest | MDN Games -- web gamedev reference
1. Создано: sources/2026-05-16-mdn-games.md, concepts/collision-detection-2d.md, concepts/collision-detection-3d.md, concepts/tilemaps.md, concepts/web-game-audio.md, concepts/cross-device-input.md
2. Обновлено: concepts/game-loop-pattern.md (+web-specific секция: rAF, Web Worker, visibility, DOMHighResTimeStamp), concepts/yandex-games-publishing.md (+MDN publishing cross-ref)
3. Ключевые тезисы: MDN Games -- веб-ориентированный справочник gamedev. Извлечены 6 тем: 2D/3D коллизии (AABB/sphere/SAT, broad/narrow phase), tilemaps (atlas, static/scrolling, logic grid, изометрия), web-аудио (autoplay policy, audio sprites, `<audio>`+Web Audio API стратегия, positional audio), кросс-девайс ввод (touch/mouse/keyboard/gamepad/Pointer Lock, input abstraction), game loop web-специфика (rAF, Web Worker update, tab visibility)

## [2026-05-16] ingest | Игровой баланс с нуля -- Туменко (gdcuffs, 7 статей)
1. Создано: sources/2026-05-16-gdcuffs-balance-series.md, concepts/balance-methodology.md, concepts/combat-effectiveness.md, concepts/game-economy-modeling.md
2. Обновлено: concepts/idle-game-economy.md (+2 cross-refs), sources/2026-04-28-game-economy-handbook.md (+4 cross-refs)
3. Ключевые тезисы: баланс-методология -- константы (что важно) -> формульные прогрессии (level^X*Y) -> эффективность -> экономика; PW=HP*DMG сведение всех параметров к одному числу + рейтинги вместо % (Armor/(Armor+Penetration)); экономика = поведение игрока + базовый цикл, "ресурсы служат циклу, не наоборот"

## [2026-05-16] ingest | Reddit growth functions -- enrichment idle-game-economy + math-of-idle-games
1. Создано: sources/2026-05-16-reddit-growth-functions.md
2. Обновлено: concepts/idle-game-economy.md (таблица 4->11 строк + принцип production vs price + polynomial vs exponential отличие), concepts/math-of-idle-games.md (+секция сравнения growth-типов)
3. Ключевые тезисы: иерархия log < sqrt < x < xlogx < x^2 < x^logx < 2^x < 2^(x^2) < 2^(2^x); производство vs цена определяет ощущение (тривиализация/стабильность/замедление/стена); polynomial 2-я разность = const, exponential -- растёт

## [2026-05-16] ingest | gdcuffs: баланс с нуля + core loop + entity ресурса
1. Создано: entities/gdcuffs.md, concepts/core-loop-design.md, concepts/balance-methodology.md, concepts/combat-effectiveness.md, concepts/game-economy-modeling.md, sources/2026-05-16-gdcuffs-balance-series.md, sources/2026-05-16-gdcuffs-core-loop-design.md
2. Обновлено: concepts/idle-game-economy.md (+2 ref), sources/2026-04-28-game-economy-handbook.md (+4 ref), concepts/idle-game-core-loop.md (+1 ref), sources/2026-05-16-gdcuffs-balance-series.md (+1 ref)
3. Ключевые тезисы: баланс-методология -- константы -> прогрессии(level^X*Y) -> эффективность(PW=HP*DMG) -> экономика; core loop -- 4 временных масштаба(момент/минута/час/день) + 7 столпов + прогрессия=спираль(вертикальная/горизонтальная); gdcuffs -- ру-портал GD-контента, 14 разделов Библии ГД, зоны ресерча: баланс/тервер/экономика/удержание

## [2026-05-13] ingest | JS Design Patterns (Agarwal) — Strategy, Composite, Decorator
1. Создано: sources/2026-05-13-js-design-patterns.md, concepts/strategy-pattern.md, concepts/composite-pattern.md, concepts/decorator-pattern.md
2. Обновлено: concepts/component-pattern.md (+3 cross-refs), concepts/ecs-lite-architecture.md (+3 cross-refs)
3. Ключевые тезисы: Strategy — runtime-выбор алгоритма через composition, актуально для типов строений/adjacency; Composite — иерархия part-whole (Grid→Cell→Building); Decorator — стекируемое обёртывание, Modifier breakdown уже decorator-паттерн

## [2026-05-13] artifact | Protocoroid — концепт-артефакт из integrate-теста
- Источник: IDEAS kingthronoid (7 пунктов «новый-проект» из integrate v2 теста)
- GDD: 8 строений T1 с наброском, сетка 5x5, энтропия, энергия, reborn, 10 open questions
- ROADMAP: Stage -1 (артефакт) → 0-5, уроки по tick/render
- CORE: +protocoroid/ в .gitignore, +Проекты в ROADMAP

## [2026-05-13] integrate-test | findings v2 (улучшенный integrate.md)
- 7 правок к integrate.md валидированы: +новый-проект, +вопрос, +granularity по пунктам, +перевод на язык проекта, +Backlog, +wiki-проверка, +архивация
- Ключевой паттерн: >60% IDEAS не интегрируется → отдельный проект, не впихивать в текущий GDD

## [2026-05-09] update | Kingthronoid: формализация сущностей (Stage 2.5 тестовая итерация)
1. Рефакторинг: GameDef (статика) + GameState (runtime) разделены, Record<string, State> вместо параллельных массивов
2. Новые сущности: ResourceDef/State, GeneratorDef (id+produces), GenState, GlobalUpgDef (scope/target/effectType), Modifier, Game = {def, state}
3. compute.ts: getGenModifiers() — breakdown множителя генератора, getGenFinalMultiplier() — product. Кросс-референсы: peasantBoost = GlobalUpgDef{scope:"gen", target:"peasant"}, if(genIdx===0) устранён
4. save.ts: v1→v2 миграция (параллельные массивы → Record). events.ts: ID-based события
5. ROADMAP: Stage 0-2 свёрнуты, шаги 2-3 отмечены, CORE ROADMAP подчищен

## [2026-05-08] update | Nystrom: 4 новых концепции из Game Programming Patterns
1. Создано: concepts/type-object.md, concepts/event-queue.md, concepts/service-locator.md, concepts/dirty-flag.md
2. Обновлено: sources/2026-04-28-game-programming-patterns.md (9->13 глав), concepts/ecs-lite-architecture.md (+3 cross-refs), concepts/prototype-pattern.md (+type-object), concepts/flyweight-and-object-pool-patterns.md (+type-object)
3. Ключевые тезисы: Type Object -- data.ts = Breed, GameState = Monster; Event Queue = async Observer для развязки во времени; Service Locator -- дополнение к DI из Fowler; Dirty Flag -- отложенный пересчёт, актуален при Stage 2.5

## [2026-05-08] ingest | Dependency Injection -- Martin Fowler
1. Создано: raw/2026-05-08-martin-fowler-dependency-injection.md, sources/2026-05-08-martin-fowler-dependency-injection.md, concepts/dependency-injection.md
2. Обновлено: concepts/ecs-lite-architecture.md (+DI cross-ref), concepts/component-pattern.md (+DI cross-ref), concepts/observer-pattern.md (+DI cross-ref)
3. Ключевые тезисы: DI vs Service Locator -- две стратегии wiring, separating configuration from use -- фундаментальный принцип важнее выбора паттерна, constructor injection предпочтителен, проект использует ручной wiring (constructor injection style)

## [2026-05-08] update | AGENTS.md: caveman по умолчанию + ASCII-only правило
1. Секция 1: добавлен шаг 3 -- `skill caveman` при старте сессии (full по умолчанию)
2. Секция 2: п.1 сокращён -- "Русский язык", добавлен п.2 -- "ASCII-only в ответах -- юникод не рендерится в CLI"
3. Секция 2: нумерация сдвинута 2->3..8->9, юникод-тире/стрелки заменены на -- и ->

## [2026-05-07] refactor | Wiki refactoring — coverage fix, tag aliases, enforcement
1. Исправлено: coverage bug — считал только type=source, теперь проверяет sources frontmatter на всех типах. 30% → 100%
2. Исправлено: index.js auto-strip `.md` в sources frontmatter при парсинге
3. Добавлено: TAG_ALIASES в search.js — `patterns`→`pattern`, `balancing`→`balance`. Normalize при поиске, страницы не тронуты
4. Добавлено: входящие ссылки на 2 orphan sources (game-economy-handbook, math-of-idle-games) + low-xref страницы (break-infinity, tailwind-v4, wuselfaktor source)
5. Добавлено: enforcement — AGENTS.md правило lint при работе + pre-commit hook в CORE
6. 42 файла модифицированы (2026-05-04..2026-05-07) без записи в log — форматирование frontmatter, cross-references normalization, шаблоны. Контент не затронут

## [2026-05-08] refactor | Wiki cross-references + lint bug fixes
1. Добавлены входящие ссылки из concept → source (math-of-idle-games, value-chains, idle-game-economy, incremental-games, wuselfaktor)
2. Добавлена ссылка на break-infinity из math-of-idle-games, tailwind-v4 из css-framework-and-themes
3. orphans: 2 → 0, lowXref: 43 ложных → 6 реальных

## [2026-05-08] refactor | Remove overview.md — wiki.js is the navigator
1. Удалён overview.md — единственная навигационная роль → wiki.js `brief`/`tags`/`context`
2. Obsidian search + graph + tags panel = навигация для человека
3. Убраны overview исключения из lint.js, search.js, analytics.js, AGENTS.md
4. Нет файла для обслуживания → нет stale MOC

## [2026-05-08] update | ROADMAP актуализация + wiki traceability
1. CORE ROADMAP: отмечены выполненные пункты (wiki рефакторинг, скрипты поиска, MOC, origin/master)
2. Kingthronoid ROADMAP: README.md отмечен
3. log.md: добавлен type: log в frontmatter (убран ? в brief)
4. 7 concept-страниц: добавлен sources field (6 синтезированных = `sources: []`, value-chains = 2 source refs)
5. Все 27 concept-страниц теперь имеют sources field — traceability полная

## [2026-05-08] update | Source connectivity + list improvements + cleanup
1. 2 source-страницы (game-economy-handbook, math-of-idle-games) получили исходящие ссылки на concepts
2. `list` команда: добавлен sources field в JSON output, добавлен `--type` фильтр
3. AGENTS.md: добавлено правило "предпочитай существующие теги", убрана dead ссылка llm-wiki-cli
4. ROADMAP: Obsidian vault вопрос отмечен [x]

## [2026-05-08] refactor | Relax xref threshold + broken link fix
1. Cross-references правило: 2-3 → 1-3 ссылки на страницу
2. lowXref lint threshold: <2 → <1 incoming (помечать только orphan)
3. Убран broken link llm-wiki-cli из log.md

## [2026-05-08] update | AGENTS.md refactor + wiki workflows sync
1. AGENTS.md: 100→88 строк, стартовый ritual через after-edit, нумерация 1-6, убраны дубли, формализованы типы log
2. llm-wiki-workflows: убраны ссылки на overview.md (TECH-ADD, INGEST), cross-refs 2-3→1-3, frontmatter типы обновлены, нумерация починена

## [2026-05-06] tech-add | GitHub Actions + Husky + lint-staged
1. Создано: wiki/tech/github-actions.md (CI/CD: check + deploy, 2-репо схема, PAT, gh-pages, conditional base)
2. Обновлено: wiki/tech/biome.md (+Husky +lint-staged секция, +VCS интеграция, +github-actions cross-ref)
3. Обновлено: wiki/projects/incremental-game/overview.md (+деплой-флоу секция)
4. Обновлено: kingthronoid/TECH.md (+GitHub Actions, Husky, lint-staged)
5. Обновлено: wiki/overview.md (+github-actions в технологии)

## [2026-05-04] ingest | Diátaxis, YAML, Artifact
1. Создано: concepts/diataxis.md, tech/yaml.md, concepts/artifact.md
2. Обновлено: overview.md
3. Ключевые тезисы: Diátaxis — фреймворк 4 видов документации (tutorial/how-to/reference/explanation), две оси (действие↔познание, study↔work), маппинг на wiki-типологию (concept→Explanation, entity/tech→Reference), применим к пользовательской документации kingthronoid; YAML — краткий справочник + spec 1.2.2, Core Schema подводные камни; Artifact — побочный продукт разработки, практический vs символический, 3 источника (Wikipedia, Pluralsight, LeanIX), wiki-страницы = практические артефакты (compounding)

## [2026-05-03] lint | Устранение противоречий wiki↔код
1. math-of-idle-games.md: PRESTIGE_UNIT 1M → 100K (устаревшее значение)
2. ecs-lite-architecture.md: +6 core-файлов, shifting → удалён
3. GDD.md: 16→17 званий, +data.ts в архитектуре
4. ROADMAP.md: 16→17 званий
5. Source-страницы (emergent): shifting помечен как удалённый
6. Wikilinks: raw-ссылки → markdown links, шаблоны (page-name, ссылки) → plain text, пути в ссылках → basename
7. kingthronoid/AGENTS.md: raw → rawMult

## [2026-05-03] refactor | AGENTS.md: глобальный → проектные конфиги
- Создано: kingthronoid/AGENTS.md (архитектура, договорённости, принцип кода, ссылки на GDD/ROADMAP/TECH)
- Обновлено: AGENTS.md (секция 0.5 → список проектов вместо деталей kingthronoid)
- Ключевые тезисы: глобальный AGENTS = общие инструкции + wiki, проектный AGENTS = навигация по коду + ссылки. GDD — диздок игры, AGENTS — как агент работает с проектом
- Создано: raw/2026-05-03-fp-in-js.md, concepts/functional-programming-in-js.md
- Обновлено: overview.md
- Ключевые тезисы: «приземлённое ФП» — чистые функции где уместно, но не против природы платформы. Проект уже применяет ФП прагматично (compute.ts = чистые функции, systems/ = контролируемые мутации через bus). Дальнейшее усиление ФП нецелесообразно.

## [2026-05-03] tech-add | Inkscape 1.4.3
- Создано: wiki/tech/inkscape.md
- Обновлено: kingthronoid/TECH.md, wiki/concepts/svg-layers-and-palette.md, wiki/overview.md
- Ключевые тезисы: Inkscape для SVG-ассетов, именованные слои под конвенцию, Optimized SVG export, CLI-автоматизация
- Создано: raw/2026-05-03-karpathy-llm-wiki.md, concepts/llm-wiki-pattern.md
- Обновлено: overview.md, concepts/llm-wiki-workflows.md
- Ключевые тезисы: wiki = persistent compounding artifact (не RAG), три слоя raw/wiki/schema, операции Ingest/Query/Lint, index.md заменён на CLI brief/context (осознанное решение), gaps: synthesis-слой, git-версионирование

## [2026-05-01] refactor | Compute-слой + развязка widgets↔systems + иерархия множителей + click redesign + UI unification
- Создано: core/compute.ts — все чистые функции + константы извлечены из systems
- Переписано: все systems (generators, globals, prestige, milestones, tick) — только init* + мутации
- Обновлено: все widgets — импорт из core/compute, не из systems
- Удалено: модульный _state из globals.ts — state через параметры
- Перенесено: visualCounts, pendingUpgradeAnims из модульных vars → class instances
- Заменено: addResource() → resource.click event (widget emits, system handles)
- Исправлено: floating-pool использует общий formatNum
- Удалено: shifting multipliers (ShiftingTier, getShiftingMultiplier, shifting field, UI, CSS)
- Иерархия множителей: Generators × (per-gen upgrades) → Σ output × (global: prestige × milestones × tribute)
- Клик-система редизайн: computeClickGain = clickPower × baseGenRate (минимум 1), уровни: [2%, 5%, 10%, 18%, 30%, 50%, 80%]
- Автоклик редизайн: autoClickerCount (число кликеров) + autoClickSpeedLevel (интервал), каждый кликер = 1 клик/интервал
- Переименовано: clickMultiplier→clickPowerLevel, clickUpgLevel→clickPowerLevel, autoClickPowerLevel→autoClickerCount
- Prestige diminishing: effectiveGainMult = 1 + (rawMult-1)/(1+PP×0.03)
- Prestige bar: fast mode при ≥1 PP/s (100% fill + pulse + rate display)
- Добавлено: peasantBoost (wheat icon) — +50%/level к множителю Крестьянина
- Header: 3-колоночный cascade (Dev | PP | Coins), row2 модификаторы, скрытие неактивных
- Milestones: сгруппированы (Клик→Генератор→Престиж) + sticky sub-headers + sum multipliers
- Upgrades: сгруппированы (Клик/Генерация) + sticky sub-headers + gen-like layout + everSeen
- Генераторы: genEverSeen (сброс при престиже), скрыты до первой доступности
- MAX buy: toggle ×1↔MAX в заголовках, массовая покупка getMaxBuyGen/getMaxBuyGlobal
- holdRepeat на всех кнопках покупки (генераторы + апгрейды)
- Кнопки покупки: единый стиль .can-buy (bg-indigo-600 без рамок, bg-gray-800 text-gray-400 недоступные), hover-lift + shadow
- Цвет цены: убран text-green-300, теперь белый/серый как у улучшений
- Рамки убраны: border → box-shadow → финально без рамок (inset bg-highlight вместо border)
- Обновлено: GDD.md v0.6
- Объединено: TODO.md + ROADMAP.md → ROADMAP.md, TODO.md удалён

## [2026-04-30] refactor | globals в GameState + save/load + баланс + GDD v0.3
- Перенесено: clickUpgLevel, tributeUpgLevel, autoClickPowerLevel, autoClickSpeedLevel → GameState (из модульных переменных)
- Добавлено: полный сброс при престиже (globals + clickMultiplier)
- Создано: core/save.ts — serialize/deserialize/load/auto-save/hard-reset (localStorage, 30с auto-save, beforeunload)
- Добавлено: Hard Reset кнопка в dev-панели (confirm → localStorage.removeItem → reload)
- Исправлено: hard reset перезаписывал сохранение при beforeunload → добавлен saveBlocked флаг
- Исправлено: баланс генераторов — окупаемость монотонная (30→67→125→200→250→444→750→1333с), Замок 600K, Трон 8M, Дракон 150M, Робот 4B
- Изменено: PRESTIGE_UNIT 1M → 100K (первый престиж ~5-15 мин вместо ~55 мин)
- Обновлено: GDD.md v0.3 (8 генераторов, 16 званий, 4 globals, save/load, ECS-lite, autoclick, Perlin, floating pool)
- Обновлено: TODO.md, ROADMAP.md проекта

## [2026-04-30] feature | Autoclick + holdRepeat + Perlin + tier-подкраска + locked gens
- Добавлено: автоклик — Рука (power = level × prestigeMult × milestoneMult) + Маятник (interval 5→0.25с)
- Добавлено: holdRepeat (core/hold.ts) — pointerdown → немедленный вызов → через 250мс повтор каждые 80мс
- Добавлено: Perlin-фон — SVG feTurbulence (fractalNoise, 3 октавы) + CSS noise-drift (120s)
- Добавлено: tier-подкраска entity — data-gen + data-tier на иконках, CSS sepia() + hue-rotate() + saturate()
- Добавлено: locked генераторы — заглушки с ? + стоимость + прогресс-бар (resource/baseCost × 100%)
- Добавлено: everBought[] — однажды купленный генератор всегда виден через престиж
- Создано: core/floating-pool.ts — Object Pool (8 <span>) + throttle 100ms + агрегация суммы, rAF-анимация
- Исправлено: Perlin-фон — margin:% (считается от ширины) → position:absolute left/top (считается от высоты)
- Добавлено: множитель дани в отображение генератора + подсветка текстом (не фоном) при hover
- Добавлено: 4 кликовых звания (Первая подать, Сборщик, Молотильщик, Кликер-бог), kind:"clicks"
- Добавлено: 8-й генератор Робот (baseCost 4B, baseOutput 3M/s, tiers: Шестерёнка→Сингулярность)
- Добавлено: Milestone.kind: "totalEarned" | "clicks" — разные типы проверки
- Заменено: "Скорость +10%" → "Дань +25%" (реальный бонус к доходу генераторов через getTotalMultiplier)

## [2026-04-30] refactor | ECS-lite архитектура + dev speed getter
- Рефакторинг: main.ts (~988 строк монолит) → 17 файлов (4 директории: core/systems/widgets + assembly)
- Создано: core/state.ts, core/events.ts (EventBus), core/registry.ts (WidgetRegistry), core/format.ts, core/tokens.ts
- Создано: systems/generators.ts, systems/tick.ts, systems/prestige.ts, systems/milestones.ts, systems/globals.ts
- Создано: widgets/resource-bar.ts, widgets/prestige-bar.ts, widgets/milestones.ts, widgets/generators.ts, widgets/global-upgrades.ts, widgets/visual-zone.ts
- Исправлено: dev speed передавался по значению → getter () => devSpeed во все системы и виджеты
- Создано: wiki/concepts/ecs-lite-architecture.md — ECS concepts → наша реализация
- Обновлено: GDD.md v0.2

## [2026-04-29] feature | UI: Живой интерфейс — микро-анимации
- Добавлено: anime.js animate + spring (всплывашка, spring-отдача кнопок, пульсация уровня, fade-in апгрейдов, fade-out сущностей при prestige)
- Добавлено: CSS @keyframes (gen-glow, fade-slide-in, prestige-flash, floating-number, hover-lift)
- Исправлено: дублирующийся click handler на «Собрать подать» (addResource вызывался дважды)
- Исправлено: prestige не очищал визуальную зону (вызывал updateVisualZone вместо clearVisualZone)
- ROADMAP: 8/10 пунктов «Живой интерфейс» выполнено, 2 отложено (lerp, smooth format)

## [2026-04-27] ingest | Требования к игре — Яндекс Игры
- Создано: sources/2026-04-27-yandex-games-requirements.md, concepts/yandex-games-sdk.md, concepts/yandex-games-technical-requirements.md, concepts/yandex-games-publishing.md
- Обновлено: entities/yandex-games.md, concepts/incremental-games.md, projects/incremental-game/overview.md, overview.md, index.md
- Ключевые тезисы: SDK обязателен, размер ≤ 100 МБ, гостевой вход обязательный, облачные сохранения критичны для инкременталки, RV за буст — естественная монетизация жанра

## [2026-04-27] ingest | How to Design Idle Games — Machinations
- Создано: sources/2026-04-27-machinations-idle-game-design.md, concepts/idle-game-core-loop.md, concepts/idle-game-economy.md
- Обновлено: concepts/incremental-games.md, projects/incremental-game/overview.md, overview.md, index.md
- Ключевые тезисы: двухуровневая архитектура core/meta loop, primary/secondary валюта, exponential cost curve (1.07–1.15), offline прогресс = rate × time, pinch point на secondary валюте для монетизации

## [2026-04-27] ingest | Быстрый старт — Яндекс Игры
- Создано: sources/2026-04-27-yandex-games-quick-start.md
- Обновлено: concepts/yandex-games-publishing.md, concepts/yandex-games-sdk.md, entities/yandex-games.md, projects/incremental-game/overview.md, index.md
- Ключевые тезисы: 6 шагов публикации, частые причины отказа (8 пунктов), подключение SDK через плагины, монетизация через РСЯ + покупки через email, метрики: рейтинг 80+ и ARPDAU > 2₽ = доход

## [2026-04-27] ingest | SDK Яндекс Игр — API документация
- Создано: concepts/yandex-games-sdk-saves.md, concepts/yandex-games-sdk-ads.md, concepts/yandex-games-monetization.md
- Обновлено: concepts/yandex-games-sdk.md (конкретные API-сигнатуры), index.md
- Raw-файлы: sdk-about, sdk-player, sdk-adv, sdk-game-events, monetization
- Ключевые тезисы: SDK init через YaGames.init(), сохранения: setData (200КБ) + setStats/incrementStats (10КБ), реклама: showRewardedVideo (награда в onRewarded!), showFullscreenAdv (частота платформой), стики-баннеры через API, safeStorage для iOS

## [2026-04-27] update | SVG: слои и программируемая палитра
- Создано: concepts/svg-layers-and-palette.md
- Обновлено: index.md
- Ключевые тезисы: SVG-объекты с именованными слоями (shadow, base, reflex, highlight, outline), перекрашивание через CSS custom properties, палитры как JS-объекты, комбинация с CSS/WAAPI анимациями, конвенция проекта

## [2026-04-28] ingest | Шаблоны игрового программирования — Найстром
- Создано: sources/2026-04-28-game-programming-patterns.md, concepts/game-loop-pattern.md, concepts/command-pattern.md, concepts/observer-pattern.md, concepts/state-pattern.md, concepts/flyweight-and-object-pool-patterns.md, concepts/component-pattern.md, concepts/prototype-pattern.md
- Обновлено: concepts/incremental-games.md, concepts/idle-game-core-loop.md, projects/incremental-game/overview.md, index.md
- Ключевые тезисы: Game Loop (фиксированный шаг + переменный рендер), Update Method (каждый объект с update()), Command (undo/redo покупок), Observer (события → UI + ачивки), State (FSM для idle/active/menu), Flyweight (разделяемые данные генераторов), Object Pool (частицы без GC), Component (контейнер компонентов), Prototype (описание контента через прототипы)

## [2026-04-28] update | Оптимизация AGENTS.md + search.js
- Создано: concepts/llm-wiki-workflows.md (вынесены workflows, конвенции, CLI reference)
- Обновлено: AGENTS.md (3086→552 токенов, -82%), overview.md, удалён index.md (заменён brief)
- Обновлено: search.js (context, brief, summary, compact JSON, tag boost, type priority)
- Ключевые тезисы: AGENTS.md сокращён с 3086 до 552 токенов, workflows вынесены в wiki-страницу, index.md удалён (brief заменяет), search.js оптимизирован для минимума токенов

## [2026-04-28] update | CSS-фреймворк и система тем
- Создано: concepts/css-framework-and-themes.md
- Обновлено: overview.md
- Ключевые тезисы: Tailwind (MIT) для лейаута/адаптивности + CSS custom properties для палитр, темы как JS-объекты для A/B тестирования визуала, альтернативы: UnoCSS, Open Props, Vanilla Extract

## [2026-04-28] ingest | Value Chains — Daniel Cook (Lostgarden)
- Создано: sources/2026-04-28-value-chains-game-economies.md, concepts/value-chains.md
- Обновлено: overview.md
- Ключевые тезисы: цепочки ценности (действие→ресурс→якорь), 5 типов источников (Capped/Trickle/Grind/Investment/Random) + 4 типа стоков (Fixed/Repeatable/Exponential/Competitive), правило балансировки мощность_стока ≥ мощность_источника, для idle: Investment↔Exponential + prestige как ascension, overflow-паттерн для нескольких аудиторий, lock-and-key для meaningful choices, якоря: competence/completion/power fantasy/autonomy
- Создано: sources/2026-04-28-math-of-idle-games.md, concepts/math-of-idle-games.md
- Обновлено: overview.md
- Ключевые тезисы: bulk buy формулы (экономят for-loops), баланс генераторов через индивидуальные пороги множителей (shifting priorities), производные генераторы (каскад → e^x при n→∞, суб-экспоненциальный при конечных n), tier boost +0.05% за покупку, формулы престижа: lifetime (√ — Realm Grinder, AdCap; ∛ — Cookie Clicker) vs since-reset (~1/7 — Egg Inc; log — Clicker Heroes), выбор для проекта: lifetime+√ (лестничный эффект)

## [2026-05-22] refactor | Project wiki system
1. Создано: wiki/concepts/agent-workflow.md, kingthronoid/wiki/ (8 seed-страниц)
2. Обновлено: wiki/bin/wiki.js (wiki.js --root/--all/auto-detect, sys:name prefix), wiki/bin/lib/index.js (parameterized WIKI_DIR, findCoreRoot, findProjectWikis, loadAllWikis), wiki/bin/lib/lint.js (sys: link validation), wiki/bin/lib/analytics.js (parameterized wikiDir), wiki/bin/lib/ingest.js (parameterized RAW_DIR), wiki/concepts/llm-wiki-conventions.md (два уровня wiki, entity+tech, язык)
3. Обновлено: AGENTS.md (62→28 строк, workflow→wiki), kingthronoid/AGENTS.md (97→56 строк, pattern-mapping→wiki, rationale→wiki), .agents/hooks/ (start-code, start-wiki, start-project-init, integrate, tech-add)
4. Удалено: kingthronoid/WIKI-MAP.md (поглощён sys: prefix-links)
5. Изменено: wiki/tech/*.md — type: tech→entity, tag +tech
- Ключевые тезисы: проектная wiki инициализируется внутри каждого проекта, обслуживается core wiki.js через --root/--all, sys:name = cross-wiki ссылка, tech=entity (type=entity, tag=tech), AGENTS.md компактный -- только операционные правила + пути, wiki = knowledge (rationale, эволюция, gotchas)

## [2026-05-23] update | ROADMAP + AGENTS.md + conventions cleanup
- Updated: ROADMAP.md (Kingthronoid phase 3, project wiki system in Done)
- Updated: wiki/concepts/llm-wiki-conventions.md (sources: qualitative bridge, not specifics)
- Updated: AGENTS.md (removed duplicate rule 5)

## [2026-05-23] ingest | OpenAI Security Best Practices
- Hook security-review.md добавлен в work hooks table
- Ключевые тезисы: 3 режима security review (secure-by-default/passive detection/full report); report format = severity sections + numeric IDs + line numbers; fix discipline = single finding + regression awareness + separate commits; UUID4 вместо incrementing IDs; TLS caveats; override policy = допустим + документировать
- Hook guard: процедура платформо-независима, триггер однозначен -> hook создан
- Wiki context "security vulnerability review" -> web-security-basics(30.21), security-review-workflow(29.03)

## [2026-05-23] reject | Нерелевантный источник (pre-check)
- Raw НЕ сохранён, source НЕ создан -- rejection на шаге 1 протокола
- Pre-check работает: экономия контекста на нерелевантном источнике

## [2026-05-23] update | Lint hook + cross-wiki auto-detect
- Обновлено: .agents/hooks/lint.md (шаг 5: stale knowledge detection)
- Обновлено: wiki/bin/lib/lint.js (cross-wiki link auto-detect: broken link без sys: prefix + exists в project wiki -> hint)
- Обновлено: wiki/bin/wiki.js (loadProjectIndexes, crossWikiHints output)
- Ключевые тезисы: 3 уязвимости протокола исправлены -- pre-check, hook guard, cross-wiki hint. Устранены 6 противоречий между hooks/conventions и новой моделью

## [2026-05-23] ingest | OpenAI GitHub CI Failure Debugging
- Hook fix-ci.md добавлен в work hooks table, wiki/tech/github-actions.md (+ci-failure-debugging cross-ref)
- Ключевые тезисы: workflow отладки CI = inspect -> summarize -> plan -> fix -> recheck; GitHub Actions only scope; log extraction fallback chain; approval gate; recheck after fix
- Hook guard: процедура частично платформо-зависима (gh CLI) но gh = часть стека проекта, триггер однозначен -> hook создан

## [2026-05-23] extract | Goal Quality Bar -> agent-workflow
- Mini-extract: Goal Quality Bar паттерн добавлен в concepts/agent-workflow.md. Ключевые принципы: reject vague activity goals, цель = результат + evidence + scope bounds + stop condition, квантификация по домену
- Raw НЕ сохранён, source НЕ создан -- rejection + направленный extract в существующую страницу

## [2026-05-23] update | Hook composition формализован + Anthropic skills ingest
- Ключевые тезисы: hook composition формализован -- sequential dependency, includes = реальная dependency, ceiling=2 уровня, synthesized hook. Pre-check override: <2 tag match + user request = разрешить с пометкой
- Создано: raw + sources + concepts/webapp-automation-strategy.md (reconnaissance-then-action, networkidle pitfall, server lifecycle, selector strategy)
- Создано: raw + sources + concepts/frontend-design-principles.md (design thinking 4 вопроса, intentionality over intensity, anti-AI-slop, typography/color/motion/spatial/backgrounds)
- Обновлено: concepts/css-framework-and-themes.md (+frontend-design-principles cross-ref)
- Hook guard: оба Anthropic skill = декларативные паттерны, hooks не созданы

## [2026-05-23] ingest | OpenAI Playwright Interactive Skill
- Обновлено: concepts/agent-workflow.md (+cross-ref), kingthronoid/wiki/concepts/ui-update-protocol.md (+sys:iterative-ui-qa cross-ref)
- Ключевые тезисы: QA Inventory (claims x controls x states); Functional QA != Visual QA; Signoff = 3 независимых проверки; Persistent session; Viewport fit обязателен; Exploratory pass после scripted checks
- Тест гипотезы: agent skill -> ingest -> wiki knowledge. Знание доступно через wiki CLI. Hook не создан -- паттерн декларативный

## [2026-05-23] refactor | Hook system consistency fix + wiki tech/ migration
- start.md: convention->includes (факт), добавлен trigger frontmatter
- start-code.md: шаг 2.5 перенумерован в 3
- security-review.md + fix-ci.md: includes: [start-code] + log.md шаги
- refactor.md: includes: [lint], убран дублирующий шаг
- start-wiki.md: документирован выбор 3 wiki-level hooks
- wiki/tech/ -> wiki/entities/: 9 файлов перемещено, ссылки обновлены, tech/ удалена
- kingthronoid: save-migration v6/v7 добавлены

## [2026-05-24] session
- Проект: CORE (hooks refactor)
- Сделано: hook system refactor -- includes->guard (5 work hooks), удалён start-continue, убраны дубли шагов в session hooks, формализованы категории (session/work) + принципы
- In-progress: нет
- Next: CORE git commit (11 файлов)

## [2026-05-24] ingest | Antimatter Dimensions source
- Raw не сохранён -- открытый репо, данные доступны по URL
- Создано: entities/antimatter-dimensions.md (entity, tags: game/reference/idle/incremental), concepts/prestige-formulas.md (concept, tags: balance/formula/prestige/incremental)
- Обновлено: concepts/math-of-idle-games.md (+prestige cross-ref, +bulk buy analytical formula), concepts/incremental-games.md (+prestige as value chain), concepts/idle-game-core-loop.md (+game speed diff multiplier, +async offline sim), concepts/game-loop-pattern.md (+speed multiplier, +async offline), concepts/ecs-lite-architecture.md (+Lazy cache, +Currency abstraction), entities/break-infinity.md (+DC constants, +NaN guard), concepts/dirty-flag.md (+Lazy cache как расширение)
- Ключевые тезисы: логарифмическая конверсия престижа (base^(log10(lower)/threshold)), двухфазное скалирование стоимости, Lazy cache invalidate-on-change, Currency abstraction с side effects, bitfield storage, NaN guard dev mode
- Hook guard: паттерны декларативные, hooks не созданы

## [2026-05-26] update | Hook system simplification
1. Удалено: start-wiki.md (redundant -- base block покрывает), start-project-init.md -> init-project.md (work hook, без includes)
2. Удалено: includes: [] из всех hooks (9 CORE + 5 project). Единственный механизм -- guard (precondition)
3. Удалено: Session hooks категория из start.md. Один тип -- work hooks (по intent/signals)
4. Починено: нумерация в integrate.md (1->3->4 -> 1->2->3), init-project.md (1->3->4 -> 1->2->3)
5. Добавлено: guard в balance.md, deploy.md, wiki.md (kingthronoid -- проектный контекст)
6. Добавлено: init-project.md в work hooks таблицу
- Ключевой тезис: упрощение модели -- session/work -> единые work hooks, includes -> только guard, routing = неявный (агент сопоставляет signals с вводом)

## [2026-05-26] extract | Validation Gate -> start.md
- Mini-extract: Validation Gate добавлен в .agents/hooks/start.md (после Goal quality bar)
- Источник: SkillOpt (Microsoft, 2026) -- text-space optimizer для agent skills
- Ключевой тезис: изменение hook/wiki/AGENTS.md принимается только при проверяемом улучшении на held-out задачах, без improvement -- откат

## [2026-05-25] ingest | Anthropic Agent Skills Specification
1. Создано: raw/2026-05-25-anthropic-agent-skills-spec.md, sources/2026-05-25-anthropic-agent-skills-spec.md, concepts/agent-skills-architecture.md
2. Обновлено: concepts/agent-workflow.md (+cross-ref), concepts/llm-wiki-conventions.md (+cross-ref), concepts/llm-wiki-pattern.md (+cross-ref), sources/2026-05-23-anthropic-webapp-testing-skill.md (+cross-ref)
3. Ключевые тезисы: progressive disclosure (3 уровня: metadata→instructions→resources), description-based triggering vs signal-based, eval-driven creation (draft→test→benchmark→improve), black-box scripts, CORE hooks = параллельная реализация с компиляцией вместо strict progressive

## [2026-05-24] refactor | Hook system: includes -> guard
1. Удалено: start-continue.md (неиспользуемый hook)
2. Изменено: integrate, tech-add, security-review, fix-ci -- includes:[start-code] -> guard в frontmatter
3. Изменено: refactor.md -- includes:[lint] -> guard
4. Изменено: start-code, start-wiki, start-project-init -- убран дубль шага (from start)
5. Изменено: start.md -- убран continue из таблицы + добавлены секции Hook categories, Guard, принципы
6. Изменено: end.md -- убрано "для continue" из Next поля
7. Обновлено: wiki/concepts/agent-workflow.md -- Hook Composition переписана (session vs work, guard vs includes)
- Ключевой тезис: низкая связность -- work hooks самостоятельны, guard (precondition check) вместо includes (formal chain). Includes только для session hooks (обоснованная dependency). Новый hook = формализация повторяющегося паттерна
