# STATREV research

EURUSD M5 statistical mean-reversion. Two phases. Splits are frozen.

| Split | Window | Role |
|---|---|---|
| IS | 2016-01-01 → 2022-01-01 | Discovery / parameter and condition selection |
| Validation | 2022-01-01 → 2024-01-01 | Confirm, do not hunt |
| OOS | 2024-01-01 → 2026-01-01 | Unseen after freeze |
| Holdout | 2026-01-01 → 2026-09-28 | Locked. Not used to select. |

Data: HistData ASCII EURUSD M1 bid OHLC, resampled to M5. Eastern wall clock.

Base round-turn cost: **2.5 pips** (spread 1.2 + 2×0.3 slip + 0.7 commission).

## Phase 1 — failed baseline (`run_research.py`)

Z-score, 1:2 SL/TP, 600-config grid, filters, walk-forward, Monte Carlo.

Result: **0 / 600** IS configs with positive net expectancy. Least-bad OOS ≈ −0.18R.
Gross full-sample E ≈ +0.029R — smaller than 2.5/15 ≈ 0.17R of friction.

Do not retune this specification.

## Phase 2 — diagnostics (`phase2_diagnostics.py`)

Strategy-independent. Pre-declared lookback 100, horizons 1–48 bars, signed
tradable pips = `−sign(Z_t) × (Close[t+h] − Open[t+1]) / pip`.

179 recorded hypotheses. BH-FDR 10% on IS, then promotion requires net > 0
after 2.5 pips, validation same sign, yearly breadth. Holdout not used.

Result: **0 promoted**. Mild mean reversion is real (lag-1 ACF ≈ −0.04, |Z|≥2
gross ≈ 0.2 pips at 6 bars) and **not economically tradable** on M5.

Outputs: `out/results.json`, `out/diagnostics.json`.
