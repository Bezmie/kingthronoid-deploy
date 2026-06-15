---
type: source
tags: [economy, balance, monetization, analytics, liveops]
date: 2026-05-29
url: https://www.gamedeveloper.com/production/i-designed-economies-for-150m-games-here-s-my-ultimate-handbook
---

# Ultimate Game Economy Handbook (Alex Wiserax, 2024)

7-главный гайд от Alex Karpenko (Wiserax), 5+ лет designing economies для проектов с $150M+ revenue. 7 глав: три столпа экономики, resource flow, психология, баланс, монетизация, аналитика, тренды.

## Chapter 1: Three Pillars

1. **Стабильность валюты**: medium of exchange + unit of account + store of value. Без этого → Diablo 2 (золото обесценилось, игроки перешли на Stone of Jordan)
2. **Рациональность цен**: отражают value, адаптируются к спросу/предложению. Бесконечные NPC-торговцы убивают торговлю
3. **Правильное распределение**: все стартуют равно → больше усилий = больше награда. Маг не должен получать броню воина

## Chapter 2: Resource Flow

- **Sources** (9 типов): mission rewards, events, loot, achievements, passive income, battle pass, social, mechanics, ads
- **Spend points**: куда валюта тратится
- **Resource Flowchart** — визуальная карта all sources → sinks. Инструменты: Machinations.io, Miro, Excel
- Баланс: слишком много sources → инфляция, слишком мало → скука
- Кейс Dreamdale: игроки копили валюту → добавили spend points → баланс

### Emotional Swings

- Дофамин = anticipation → мотивация продолжать
- Эндорфины = reward → удовлетворение → желание вернуться
- 2-3 разные эмоции за сессию. Фрустрация несколько раз подряд → отток
- Контент: сначала щедро → потом замедлять → создавать дефицит

## Chapter 3: Psychology

- **Сложность + реклама**: Dardis et al. (2019) — сложные игры → негатив → реклама менее эффективна. Почему реклама доминирует в casual, IAP — в competitive
- **Trial effect**: Lee & Shin (2017), 1.4M транзакций — бесплатные trial items ↑ вероятность IAP
- **Факторы LTV** (Jiao et al. 2022, 100K игроков, 3 года):
  - Achievements: U-shaped — слишком хорошо ИЛИ слишком плохо → меньше играют/покупают
  - IAP покупки → больше играют + покупают дальше
  - Социальное взаимодействие (кланы, друзья) → больше играют + покупают

## Chapter 4: Balance (Key Chapter)

### Root Values

- **Время = первичный ресурс**. Все ценности → единицы времени
- Пример: 300 уровней, 10/день = 1 месяц. Каждая ценность = время на достижение
- Расчёты для **идеализированного игрока** (максимальная эффективность)

### 7 Balance Zones

Frustration → Hardcore Fun → Challenging Fun → **Balanced Fun** → Casual Fun → Mindless Fun → Boring

### Paywall

- Ситуация когда нужен значительный ресурс для продвижения
- **~60% выручки мобильных игр** от paywall-миссий
- Порог оттока: **не более 4%** уходят из-за сложности (целевой ориентир)
- Сложность миссий: волнообразная (пик → спад → рост)

### Spreadsheet Balancing

- Цветовое кодирование: зелёный = константы, синий = вычисляемые, фиолетовый = финальные
- Топ-3 функции: VLOOKUP (бандлы), SUMPRODUCT (уровни×стоимость), QUERY (SQL-фильтрация)
- Не хардкодить числа в формулы → именованные диапазоны

### Game Balance Guru

- Бесплатный GPT-бот: https://chatgpt.com/g/g-M5YWlXD0B-game-balance-guru
- Анализ экономики, баланс механик, расчёт цен, LiveOps рекомендации, предсказание поведения

### DOOM DPS Analysis

| Оружие | DPS |
|--------|-----|
| Кулаки | 22.64 (Berserk ×10) |
| Пистолет | 25 |
| Shotgun | 66.27 |
| Chaingun | 87.5 |
| Бензопила | 96.25 |
| Plasma Gun | 262.5 |
| Rocket Launcher | 287 |
| BFG 9000 | 2773.75 |

DPS = (min+max)/2 × rate/60

## Chapter 5: Monetization

### Models

| Модель | Данные |
|--------|--------|
| IAP | 79% мобильных игр. Потребляемые + непотребляемые |
| IAD (реклама) | Interstitial, RV, Banner. Минимальная реклама → **+20% выручки**. CPI вырос $0.05→$1-20 |
| Подписки | Battle Pass, Remove Ads (**до 80% выручки** в casual), VIP |

### Revenue Growth Strategies

1. **Бонус на первую покупку**: до **600% бонус** — мощнейший конвертер
2. **Сегментация** (кейс Florescence): магазин под нужды → **+41% магазин, +26% общая**
3. **Offer Sequences**: $2→$10→$20→$50 (купил). Отказал → $1 / промежуточные
4. **ML для монетизации**: score 0-100 → tier-офферы ($1→$50). Риск: ML давал слишком привлекательные → **−30% выручки** за 2 недели

### Problems

- **Каннибализация**: новый предмет ↓ продажи старых без роста ARPU
- **Гиперинфляция**: idle → 1→1K→1M→1B→1aa→1ba→1AA → новая валюта
- **Читеры**: ложный рост аналитики → разработчик повышает цены → честные уходят

## Chapter 6: Analytics

### Metrics

| Метрика | Конкретика |
|---------|-----------|
| LTV | Гиперказуал: центы. Lineage M: **$448**. Правило: LTV > CPI = прибыль |
| ARPDAU | Revenue / DAU |
| Conversion | Конверсия во 2-ю, 3-ю покупку — работа не прекращается |
| Retention | D1/D7/D30 |
| Churn Rate | Отток |

### Whales

- **<0.001% игроков** → **>50% выручки**
- Раннее выявление китов ↑↑ предсказание LTV
- Не заходит >2 дней → вероятность ухода резко растёт

### Supercell Segmentation (Hay Day)

- Non-spenders до ур.10 → «Night at the Movies» (до 4 реклам/день за реварды)
- После первой покупки → реклама отключается, раздел = бесплатный ревард
- Результат: монетизируются ВСЕ типы игроков

### 3 Rules of Analytics

1. Тестируй экономику до запуска (софт-лонч)
2. Определи контрольные точки (параметры, малое изменение → рушит баланс)
3. Мониторинг post-launch (цены, сложность, отток)

## Chapter 7: Trends

- **LiveOps**: событие → **до 3× выручки**. FOMO + эксклюзив + временно
- **Loot boxes/gacha**: Honor of Kings $12.3B, PUBG $8.5B, Genshin $4.4B. 15 исследований → корреляция с problem gambling. Запрещены в Бельгии/Нидерландах
- **Анимация магазина**: Hunt Royale → **+52% конверсия** от анимации premium pass
- **4X + Genre Blending**: Rise of Kingdoms, Lords Mobile ($1B+). Top War = merge+4X, Puzzles & Survival = match3+4X
- **Pay-to-Win**: избегать. Покупки = бонус, не требование

## Related

- derived::[[idle-game-economy]]
- [[value-chains]]
- [[balance-methodology]]
