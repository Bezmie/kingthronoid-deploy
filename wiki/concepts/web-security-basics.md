---
type: concept
tags: [security, code-review, best-practices, web]
date: 2026-05-23
sources: [2026-05-23-openai-security-best-practices-skill]
---

# Web Security Basics

Универсальные принципы web security для JS/TS проектов. Извлечено из OpenAI security-best-practices skill.

## Public Resource IDs

Incrementing IDs (1, 2, 3...) для public resources = vulnerability. Позволяют enumeration (узнать количество, угадать ID других ресурсов). Решение: UUID4 или random hex string.

Исключение: internal-only IDs (не exposed наружу) -- incrementing допустим.

## TLS Caveats

- Не флагать отсутствие TLS в dev-окружении -- норма
- Secure cookies: ставить только при реальном TLS. На non-TLS (dev/test) -- сломает приложение
- HSTS: не рекомендовать без полного понимания lasting impacts. Может вызвать major outages и user lockout. Не для scope мелких проектов

## XSS Surface в Web Games

Web-игры в iframe (Yandex Games и аналоги):
- SDK inject = потенциальный XSS вектор
- DOM-based XSS через динамический контент (player name, leaderboard entries)
- localStorage save data = не доверять при чтении (врежденосный save)
- postMessage без origin check = уязвимость

## Passive Detection

При повседневной работе: флагать только critical/high impact уязвимости. Не шуметь на каждый potential issue. Фокус на largest impact + secure defaults.

## Override Policy

Project-specific bypass допустим. Обязательное условие: документировать почему bypass применяется (в AGENTS.md или проектной wiki), чтобы будущий ревьюер понимал контекст.

## Связанные

- [[security-review-workflow]] -- процедура security review
- [[entities/typescript]] -- TypeScript (strict)
- tech-stack -- стек технологий (kingthronoid)
