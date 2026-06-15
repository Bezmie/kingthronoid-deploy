# Algorithms for Calculating Gacha Probabilities

Source: https://kylechen.net/writing/gacha-probability/
Author: Kyle Chen
Date: 2025-01-30 (updated 2026-02-03)

## Summary

How to calculate exact and approximate probabilities of obtaining specific rewards from gacha/chance-based reward systems. Uses Arknights as example, but ideas apply universally.

### Key Concepts

**Rates and subrates**: Each pull has base probability per rarity tier (rate). Within a rarity, a "rate-up" character has conditional probability (subrate). P(target) = rate * subrate.

**Pity mechanic**: After N pulls without hitting a rarity, its rate increases incrementally. Resets on hit. Arknights: after 50 pulls without 6-star, rate increases by +0.02 per subsequent pull.

**Basic formula** (no pity, single target copy):
`p = 1 - (1 - rate * subrate)^n`

Probability of obtaining target within n pulls. Breaks down after pity threshold.

**Monte Carlo method**: Simulate many runs of pulling until target. Observed distribution converges to true distribution (Glivenko-Cantelli). Trade-off: accuracy vs computational cost. RNG quality matters.

**Dynamic Programming (approach 1)**: State = (target_count, pity_count). Each pull transitions between states with known probabilities. Iterate over pull count, update probability matrix. Exact PMF/CDF. Matrix: (target+1) x 100 (pity max 99).

**Dynamic Programming (approach 2)**: State = (target_count, pull_count) at pity=0. Precompute probability of hitting next 6-star exactly x pulls later. Smaller matrix, only two rows needed at a time. More efficient.

**Multiple banners**: DP extends naturally. Pity resets at banner boundaries. Concatenate PMFs via convolution (FFT).

**PMF and CDF**: PMF = probability of achieving target ON pull n. CDF = probability by pull n. CDF = cumulative sum of PMF. Both are key balance tools.

**Subrate by banner type**: Different banner types have different subrates and number of rate-ups. Standard: 2 rate-ups at 25% each. Event: 1 rate-up at 50%. Limited: 2 rate-ups at 35% each.

### Relevance to Project

- Kingthronoid card draw = gacha: weighted random from pool, tierWeights = conditional probabilities per tier
- Pity mechanic applicable: guarantee T2 building after N draws without T2
- DP approach for balance: exact probability of "at least 1 T2 in N draws" at each draw level
- Monte Carlo for playtesting: simulate 100K sessions to validate progression curve
- drawLevel system = analogous to banner types with different rate structures

### Cross-references

- [[gacha-probability]] -- extracted concept page
- [[idle-game-economy]] -- two-level economy, faucet-drain balance
- [[balance-methodology]] -- balance tools and methods

### Not Relevant

- Arknights-specific numbers (6-star rate 0.02, pity threshold 50)
- Convolution/FFT for multiple banners (optimization detail, not concept)
