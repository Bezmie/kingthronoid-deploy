---
guard: project-context
trigger:
  intent: Интегрировать идеи из IDEAS.md в проектный документ (GDD/spec)
  signals: [интегрируй идеи, перенеси в GDD, формализуй / integrate ideas, formalize, GDD]
  examples:
    - "integrate ideas"
    - "интегрируй идеи"
    - "move ideas to GDD"
    - "формализуй идеи из IDEAS"
---
# integrate

1. Прочитать `<project>/IDEAS.md` -- слой автора, свободная форма
2. Классифицировать: entity / mechanic / fix / question / reject / new-project
   - **new-project**: если большинство идей секции не подходят GDD -- предложить отдельный GDD/ROADMAP
   - **question**: спросить автора, не формализовать
   - **granularity**: в большом тексте -- классифицировать по пунктам, не по секциям
3. Формализовать в проектном документе (GDD / spec):
   - Перевести в язык проекта (имена, сеттинг, термины)
   - Конкретные решения -> тело GDD (релевантная секция)
   - Открытые вопросы -> секция "Backlog" в конце GDD
4. Проверить: нужна ли wiki-страница для новой механики/концепции? -- предложить создание в проектной wiki
5. Если идея требует кода -- добавить в `<project>/ROADMAP.md`
6. Запись в wiki/log.md (проектная wiki): `core log integrate "<project>" --интегрировано "N" --GDD "список" --ROADMAP "список" --root <project>` (или вручную)
