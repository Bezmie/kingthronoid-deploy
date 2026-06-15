---
type: concept
tags: [development-process, project-management, best-practice]
date: 2026-05-04
sources: []
---

# Artifact (Software Development)

Осязаемый побочный продукт разработки — не сам программный продукт, а то, что возникает в процессе его создания: документы, модели, скрипты, скомпилированный код, тестовые отчёты. Артефакты служат дорожной картой проекта и позволяют ретроспективно понять решения.

Термин не стандартизирован — разные организации определяют по-своему. LeanIX: «independently deployable piece of software developed by an engineer» (отличает от «asset» — управленческого термина). OMG UML 2.5.1: «specification of a physical piece of information used or produced by a software development process».

## Метафора

Как археологические артефакты позволяют реконструировать прошлое, software artifacts позволяют будущим разработчикам понять контекст, решения и историю проекта. Не все артефакты одинаково ценны: user story для уже работающей фичи менее полезен, чем комментарии в коде и тестовые логи.

## Практический vs Символический (Wikipedia)

| Роль | Описание | Поддерживаемость |
|---|---|---|
| **Практический** | Служит реальной цели весь lifecycle: документация, код, тесты | Высокая — обновляется постоянно |
| **Символический** | «Illuminated scrolls» — впечатляет спонсора, но не информативен | Низкая — после одобрения заменяется практическим |

Вывод: стремиться к практическим артефактам, минимизировать символические.

## Типология

Три категории (Per Pluralsight / LeanIX, с дополнениями):

### Код (Code artifacts)

Создаются разработчиками и SRE. Фундамент программы.

- **Compiled code** — код, готовый к выполнению
- **Test suites** — набор тестов для проверки
- **Test output / logs** — результаты тестирования
- **Setup scripts** — подготовка окружения
- **Microservices** — независимо деплоимые компоненты

### Управление (Project management artifacts)

Создаются после/во время разработки. Ориентированы на конечного пользователя и процесс.

- **User stories / Use cases** — требования к поведению
- **Acceptance criteria** — базовые требования клиента
- **Risk assessments** — потенциальные риски и способы обхода
- **UML diagrams** — визуализация архитектуры и процессов
- **Class diagrams** — статическая структура системы

### Документация (Documentation artifacts)

Создаются ближе к концу разработки. Запись для воспроизводимости.

- **End-user documentation** — для клиентов/пользователей
- **Internal documentation** — для команды поддержки/разработки
- **Walkthroughs** — пошаговые проводки по приложению
- **End-user agreements** — условия использования

## Репозитории артефактов (LeanIX)

| Тип | Описание |
|---|---|
| **Remote** | Внешний URL, можно читать, нельзя добавлять |
| **Local** | On-premise сервер, полный контроль |
| **Virtual** | Единый URL для remote + local |

## Преимущества артефактов (LeanIX)

1. **Roadmap** — карта проекта от начала до конца, отслеживание прогресса
2. **Time efficiency** — сокращение работы через реuse известных решений
3. **Reusability** — артефакты прошлых проектов → идеи для новых
4. **Maintainability** — артефакты адресуют потенциальные проблемы → продлевают жизнь ПО
5. **Prototypes** — ранние артефакты, связывающие идею с реализацией
6. **Ownership** — авторство + версионность → accountability
7. **Knowledge** — информационный банк для новых членов команды и AI

## Deliverables vs Artifacts

Deliverables ≈ артефакты + сам программный продукт. Артефакты — побочные продукты; deliverables — то, что доставляется клиенту.

## CI/CD контекст

Build artifact = скомпилированный/собранный код, готовый к тестированию или деплою. В pipeline: source → build artifact → test → deploy artifact.

## Связь с wiki

Wiki-страницы — **практические артефакты** проекта: накапливают контекст, решения, знания. По [[llm-wiki-pattern]] (Karpathy) — wiki = **compounding artifact**: каждый инжест обогащает все существующие страницы через cross-references.

## Источники

- [Wikipedia: Artifact (software development)](https://en.wikipedia.org/wiki/Artifact_(software_development)) — определение, практический vs символический
- [Pluralsight: Development Artifacts](https://www.pluralsight.com/resources/blog/cloud/development-artifacts) — 3 категории, метафора археологии
- [LeanIX: Software Artifacts](https://www.leanix.net/en/wiki/trm/software-artifacts) — типология, репозитории, 7 преимуществ, artifact vs asset

## Связанные страницы

- [[llm-wiki-pattern]] — wiki как compounding artifact
- [[diataxis]] — структурирование документации (артефакты-документы)
- [[incremental-games]] — жанр: артефакты инкрементальной игры
