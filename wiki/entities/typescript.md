---
type: entity
tags: [tech, typescript, typecheck, strict]
date: 2026-05-29
url: https://www.typescriptlang.org/
---

# TypeScript (strict)

## Why

Статическая типизация поверх JavaScript. Ловит ошибки до запуска, даёт автодополнение в IDE.

## Why Not Plain JS

- JS: ошибка в типе → падает в рантайме (в проде)
- TS: ошибка в типе → красное подчёркивание до запуска
- В проекте с Decimal-вычислениями и сложным состоянием — типы спасают от `undefined is not a function`

## Strict Mode

В `tsconfig.json`: `"strict": true` — включает все проверки:

| Проверка | Что ловит |
|----------|-----------|
| strictNullChecks | `null`/`undefined` не являются `T` |
| noImplicitAny | Нельзя `function(x)` без типа |
| strictFunctionTypes | Контравариантность параметров |
| noImplicitThis | `this` должен быть типизирован |

## Project Config

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,        // Только проверка, бандлит Vite
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "isolatedModules": true  // Vite: каждый файл — модуль
  }
}
```

## Key Patterns

```ts
// Decimal — не number, отдельный тип
import Decimal from "break_infinity.js";
const D = (n: number | string) => new Decimal(n);

// Состояние — интерфейс, не any
interface GameState {
  resource: Decimal;
  counts: number[];
  // ...
}

// Type guards для SDK (может быть null)
if (ysdk) { /* ysdk: YandexSDK */ }
```

## Commands

| Команда | Что делает |
|---------|-----------|
| `npx tsc --noEmit` | Проверка типов без билда |
| `npx tsc -b` | Билд типов (для `vite build`) |

## Documentation

- https://www.typescriptlang.org/docs/handbook — учебник
- https://www.typescriptlang.org/tsconfig — справочник опций

## Related

- uses::[[vite]] — бандлит TS через Rolldown
- uses::[[biome]] — lint + format
