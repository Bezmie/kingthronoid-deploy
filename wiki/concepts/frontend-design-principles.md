---
type: concept
tags: [design, ui, frontend, aesthetics]
date: 2026-05-23
sources: [2026-05-23-anthropic-frontend-design-skill]
---

# Frontend Design Principles

Принципы дизайна frontend-интерфейсов: design thinking, anti-AI-slop, intentionality. Извлечено из Anthropic frontend-design skill.

## Design Thinking

Перед кодированием -- 4 вопроса:
1. **Purpose**: зачем этот интерфейс? Кто использует?
2. **Tone**: экстремальный выбор aesthetic direction -- brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian. Не "neutral" -- всегда конкретный
3. **Constraints**: фреймворк, перформанс, accessibility
4. **Differentiation**: что запомнится? Что one thing кто-то вспомнит?

## Intentionality Over Intensity

Bold maximalism AND refined minimalism оба работают. Ключ = intentionality (осознанность выбора), не intensity. Чёткое conceptual direction + precision execution. Half-hearted = failure.

## Anti-AI-Slop

Избегать generic AI-generated aesthetics:
- Запрещены: Inter, Roboto, Arial, system fonts, purple gradients on white, predictable layouts, cookie-cutter design
- Каждый дизайн = context-specific character
- Интерпретировать творчески, делать unexpected choices
- Не converge на common choices между генерациями

## Принципы по аспектам

### Typography
- Distinctive + unexpected font choices
- Pair: display font (characterful) + body font (refined)
- Не generic

### Color
- Cohesive через CSS variables
- Dominant colors + sharp accents
- Timid evenly-distributed palettes = слабо

### Motion
- CSS-only приоритет (для HTML)
- High-impact moments > scattered micro-interactions
- Один orchestrated page load с staggered reveals (animation-delay) > много мелких
- Scroll-triggering + hover surprises

### Spatial Composition
- Unexpected layouts
- Asymmetry, overlap, diagonal flow, grid-breaking
- Generous negative space OR controlled density (не среднее)

### Backgrounds
- Atmosphere + depth вместо solid colors
- Gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, grain overlays

## Complexity Matching

Implementation complexity = aesthetic vision. Maximalist = elaborate code (animations, effects). Minimalist = restraint, precision, spacing, subtle details. Elegance = executing the vision well.

## Связанные

- [[css-framework-and-themes]] -- CSS-фреймворк и система тем
- [[iterative-ui-qa]] -- QA process (ЧТО проверять)
