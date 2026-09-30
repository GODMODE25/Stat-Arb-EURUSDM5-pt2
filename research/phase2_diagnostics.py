#!/usr/bin/env python3
"""STATREV Phase 2 — strategy-independent EURUSD M5 diagnostics.

Does not retune the failed 1:2 Z-score EA. Measures whether any conditional
mean-reversion effect is statistically real *and* large enough to clear 2.5 pip
round-turn costs.

Splits are frozen. Classification uses IS + validation only. OOS and 2026
holdout are scored after labels are frozen.
"""

from __future__ import annotations

import json
import math
import os
import time
from datetime import datetime, timezone

import numpy as np
import pandas as pd

from engine import (
    PIP,
    attach_h1_to_m5,
    atr_wilder,
    bars_to_arrays,
    efficiency_ratio,
    load_m1_frames,
    resample_h1_features,
    resample_m5,
    rolling_mean_std,
    session_mask_array,
    zscore,
)

OUT_DIR = os.path.join(os.path.dirname(__file__), "out")
PUBLIC_JSON = "/workspace/public/research/diagnostics.json"
SRC_JSON = "/workspace/src/data/diagnostics.json"

IS0 = np.datetime64("2016-01-01")
IS1 = np.datetime64("2022-01-01")
VAL1 = np.datetime64("2024-01-01")
OOS1 = np.datetime64("2026-01-01")
HLD1 = np.datetime64("2026-10-01")

# Pre-declared, not searched.
LOOKBACK = 100
HORIZONS = (1, 2, 3, 6, 12, 24, 48)
PRIMARY_H = (6, 12)  # economic decision horizons
COST = 2.5  # pips round-turn, base case
COST_OPT = 1.4
COST_ADV = 4.2
MIN_N = 80

Z_BUCKETS = [
    ("|Z|<1", 0.0, 1.0),
    ("1–1.5", 1.0, 1.5),
    ("1.5–2", 1.5, 2.0),
    ("2–2.5", 2.0, 2.5),
    ("2.5–3", 2.5, 3.0),
    ("3+", 3.0, 99.0),
]
PIP_BUCKETS = [
    ("0–5", 0.0, 5.0),
    ("5–10", 5.0, 10.0),
    ("10–15", 10.0, 15.0),
    ("15–20", 15.0, 20.0),
    ("20+", 20.0, 999.0),
]


def split_name(t):
    if t < IS1:
        return "is"
    if t < VAL1:
        return "val"
    if t < OOS1:
        return "oos"
    return "holdout"


def hac_se(x: np.ndarray, lags: int) -> float:
    n = len(x)
    if n < 8:
        return float("nan")
    e = x - np.mean(x)
    g0 = float(np.dot(e, e) / n)
    v = g0
    L = int(max(0, min(lags, n - 2)))
    for k in range(1, L + 1):
        w = 1.0 - k / (L + 1.0)
        gk = float(np.dot(e[k:], e[:-k]) / n)
        v += 2.0 * w * gk
    v = max(v, 0.0)
    return float(np.sqrt(v / n))


def summarize(x: np.ndarray, hac_lags: int) -> dict:
    x = np.asarray(x, dtype=np.float64)
    x = x[np.isfinite(x)]
    n = int(x.size)
    empty = {
        "n": n,
        "mean": None,
        "median": None,
        "std": None,
        "win_rate": None,
        "t_hac": None,
        "p_hac": None,
        "ci95_lo": None,
        "ci95_hi": None,
        "cohens_d": None,
        "p05": None,
        "p95": None,
    }
    if n < 8:
        return empty
    mu = float(np.mean(x))
    sd = float(np.std(x, ddof=1)) if n > 1 else 0.0
    se = hac_se(x, hac_lags)
    t = mu / se if se and se > 0 else float("nan")
    p = float(2.0 * (1.0 - 0.5 * (1.0 + math.erf(abs(t) / math.sqrt(2.0))))) if np.isfinite(t) else None
    zcrit = 1.96
    return {
        "n": n,
        "mean": round(mu, 4),
        "median": round(float(np.median(x)), 4),
        "std": round(sd, 4),
        "win_rate": round(float(np.mean(x > 0.0)), 4),
        "t_hac": round(float(t), 3) if np.isfinite(t) else None,
        "p_hac": round(p, 5) if p is not None else None,
        "ci95_lo": round(mu - zcrit * se, 4) if np.isfinite(se) else None,
        "ci95_hi": round(mu + zcrit * se, 4) if np.isfinite(se) else None,
        "cohens_d": round(mu / sd, 4) if sd > 0 else None,
        "p05": round(float(np.percentile(x, 5)), 4),
        "p95": round(float(np.percentile(x, 95)), 4),
    }


def with_cost(s: dict) -> dict:
    out = dict(s)
    mu = s.get("mean")
    if mu is None:
        out.update({"gross": None, "net_base": None, "net_opt": None, "net_adv": None, "max_cost": None})
        return out
    out["gross"] = round(mu, 4)
    out["net_base"] = round(mu - COST, 4)
    out["net_opt"] = round(mu - COST_OPT, 4)
    out["net_adv"] = round(mu - COST_ADV, 4)
    out["max_cost"] = round(mu, 4)
    return out


def acf(x: np.ndarray, lag: int) -> float:
    if lag <= 0 or lag >= len(x):
        return float("nan")
    a = x[lag:]
    b = x[:-lag]
    m = np.isfinite(a) & np.isfinite(b)
    if m.sum() < 30:
        return float("nan")
    return float(np.corrcoef(a[m], b[m])[0, 1])


def ar1_half_life(series: np.ndarray) -> dict:
    s = series[np.isfinite(series)]
    if len(s) < 200:
        return {"phi": None, "half_life_bars": None}
    y = s[1:]
    x = s[:-1]
    x = x - np.mean(x)
    y = y - np.mean(y)
    den = float(np.dot(x, x))
    if den <= 0:
        return {"phi": None, "half_life_bars": None}
    phi = float(np.dot(x, y) / den)
    if phi <= 0 or phi >= 1:
        hl = None
    else:
        hl = float(-np.log(2.0) / np.log(phi))
    return {"phi": round(phi, 5), "half_life_bars": round(hl, 2) if hl else None}


def yearly_means(x: np.ndarray, years: np.ndarray, mask: np.ndarray) -> list[dict]:
    out = []
    for yr in sorted(set(int(v) for v in years[mask] if np.isfinite(v))):
        m = mask & (years == yr) & np.isfinite(x)
        if m.sum() < 30:
            continue
        out.append({"year": yr, "n": int(m.sum()), "mean": round(float(np.mean(x[m])), 4)})
    return out


def bh_fdr(pvals: list[float], alpha: float = 0.10) -> list[bool]:
    n = len(pvals)
    order = np.argsort([p if p is not None else 1.0 for p in pvals])
    passed = [False] * n
    thresh = [alpha * (i + 1) / n for i in range(n)]
    cutoff = -1
    for rank, idx in enumerate(order):
        p = pvals[idx]
        if p is None:
            continue
        if p <= thresh[rank]:
            cutoff = rank
    if cutoff >= 0:
        for rank, idx in enumerate(order):
            if rank <= cutoff:
                passed[idx] = True
    return passed


def main():
    t0 = time.time()
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(PUBLIC_JSON), exist_ok=True)
    os.makedirs(os.path.dirname(SRC_JSON), exist_ok=True)

    print("Loading M1…")
    m1 = load_m1_frames()
    m5 = resample_m5(m1)
    h1 = resample_h1_features(m5)
    m5 = attach_h1_to_m5(m5, h1)
    arr = bars_to_arrays(m5)
    n = len(arr["close"])
    close, high, low, opn = arr["close"], arr["high"], arr["low"], arr["open"]
    times = arr["time"]
    years = arr["year"]
    hour, minute, dow = arr["hour"], arr["minute"], arr["dow"]

    typical = (high + low + close) / 3.0
    z = zscore(typical, LOOKBACK)
    mean, std = rolling_mean_std(typical, LOOKBACK)
    dist_pips = (typical - mean) / PIP
    atr = atr_wilder(high, low, close, 14)
    atr_mean, _ = rolling_mean_std(np.where(np.isfinite(atr), atr, 0.0), 100)
    with np.errstate(divide="ignore", invalid="ignore"):
        vol_ratio = atr / atr_mean
    er = efficiency_ratio(close, 20)
    adx = m5["adx_closed"].to_numpy(np.float64)
    slope = m5["slope_closed"].to_numpy(np.float64)
    ret1 = np.full(n, np.nan)
    ret1[1:] = (close[1:] - close[:-1]) / PIP

    # past returns ending at t (known at close t)
    past = {}
    for h in (1, 3, 6, 12, 24):
        r = np.full(n, np.nan)
        r[h:] = (close[h:] - close[:-h]) / PIP
        past[h] = r  # this is return of the last h bars ending at t... wait
    # close[t] - close[t-h]
    past = {}
    for h in (1, 3, 6, 12, 24):
        r = np.full(n, np.nan)
        r[h:] = (close[h:] - close[:-h]) / PIP
        # r[i] = close[i] - close[i-h] yes when we assign r[h:] = close[h:]-close[:-h]
        past[h] = r

    # forward close-to-close and tradable (next open -> close[t+h])
    fwd_cc = {}
    fwd_tr = {}
    for h in HORIZONS:
        cc = np.full(n, np.nan)
        tr = np.full(n, np.nan)
        if h >= n:
            fwd_cc[h] = cc
            fwd_tr[h] = tr
            continue
        cc[: n - h] = (close[h:] - close[: n - h]) / PIP
        # enter next bar open (index t+1), exit close of t+h
        # need t+1 < n and t+h < n
        if h >= 1:
            tr[: n - h] = (close[h:] - opn[1 : n - h + 1]) / PIP
        fwd_cc[h] = cc
        fwd_tr[h] = tr

    sign_z = np.sign(z)
    sign_z = np.where(sign_z == 0, np.nan, sign_z)

    split = np.full(n, "holdout", dtype=object)
    split[times < OOS1] = "oos"
    split[times < VAL1] = "val"
    split[times < IS1] = "is"
    is_m = split == "is"
    val_m = split == "val"
    oos_m = split == "oos"
    hld_m = split == "holdout"
    splits = {"is": is_m, "val": val_m, "oos": oos_m, "holdout": hld_m}

    # IS-only terciles for vol and |slope|
    vr_is = vol_ratio[is_m & np.isfinite(vol_ratio)]
    q33, q66 = np.percentile(vr_is, [33.333, 66.667])
    vol_reg = np.full(n, "na", dtype=object)
    vol_reg[np.isfinite(vol_ratio) & (vol_ratio < q33)] = "low"
    vol_reg[np.isfinite(vol_ratio) & (vol_ratio >= q33) & (vol_ratio < q66)] = "mid"
    vol_reg[np.isfinite(vol_ratio) & (vol_ratio >= q66)] = "high"

    sl_abs = np.abs(slope)
    sl_is = sl_abs[is_m & np.isfinite(sl_abs)]
    s33, s66 = np.percentile(sl_is, [33.333, 66.667])
    trend_sl = np.full(n, "na", dtype=object)
    trend_sl[np.isfinite(sl_abs) & (sl_abs < s33)] = "range"
    trend_sl[np.isfinite(sl_abs) & (sl_abs >= s33) & (sl_abs < s66)] = "weak"
    trend_sl[np.isfinite(sl_abs) & (sl_abs >= s66)] = "strong"

    adx_reg = np.full(n, "na", dtype=object)
    adx_reg[np.isfinite(adx) & (adx < 18)] = "range"
    adx_reg[np.isfinite(adx) & (adx >= 18) & (adx < 25)] = "weak"
    adx_reg[np.isfinite(adx) & (adx >= 25)] = "strong"

    sess = {
        "asia": session_mask_array(hour, minute, dow, "asian"),
        "london": session_mask_array(hour, minute, dow, "london"),
        "ny": session_mask_array(hour, minute, dow, "ny"),
        "overlap": session_mask_array(hour, minute, dow, "overlap"),
    }
    # session transitions: first 6 bars of london / ny
    london_open = (hour == 3) & (minute < 30)
    ny_open = (hour == 8) & (minute < 30)

    # consecutive directional bars
    up = ret1 > 0
    consec = np.zeros(n, np.int32)
    run = 0
    last = 0
    for i in range(n):
        if not np.isfinite(ret1[i]) or ret1[i] == 0:
            run = 0
            last = 0
            consec[i] = 0
            continue
        s = 1 if ret1[i] > 0 else -1
        run = run + 1 if s == last else 1
        last = s
        consec[i] = run * s

    # time since |z|>=2 while still extreme
    extreme = np.abs(z) >= 2.0
    since = np.full(n, np.nan)
    ccount = 0
    on = False
    for i in range(n):
        if extreme[i]:
            ccount = ccount + 1 if on else 1
            on = True
            since[i] = ccount
        else:
            on = False
            ccount = 0

    vol_contraction = np.full(n, False)
    vol_contraction[12:] = np.isfinite(atr[12:]) & np.isfinite(atr[:-12]) & (atr[12:] < atr[:-12])

    print("Features ready", n, "bars")

    # ----- market structure -----
    r_is = ret1[is_m & np.isfinite(ret1)]
    acf_rows = []
    for lag in HORIZONS:
        acf_rows.append({
            "lag": lag,
            "acf_is": round(acf(ret1[is_m], lag), 5),
            "acf_val": round(acf(ret1[val_m], lag), 5),
            "acf_oos": round(acf(ret1[oos_m], lag), 5),
            "acf_holdout": round(acf(ret1[hld_m], lag), 5),
        })
    atr_acf = [{"lag": lag, "acf_is": round(acf(atr[is_m], lag), 5)} for lag in (1, 6, 12, 24, 48)]
    hl_z = ar1_half_life(z[is_m])
    hl_price = ar1_half_life(close[is_m])

    market = {
        "m5_bars": int(n),
        "atr_pips_mean_is": round(float(np.nanmean(atr[is_m]) / PIP), 3),
        "ret1_std_pips_is": round(float(np.std(r_is, ddof=1)), 3),
        "return_acf": acf_rows,
        "atr_acf_is": atr_acf,
        "z_ar1": hl_z,
        "close_ar1": hl_price,
        "vol_terciles_is": {"q33": round(float(q33), 4), "q66": round(float(q66), 4)},
        "slope_abs_terciles_is": {"q33": round(float(s33), 4), "q66": round(float(s66), 4)},
        "vwap": "skipped — HistData volume is identically zero",
    }

    hypotheses: list[dict] = []

    def add_hyp(hid, family, desc, mask, horizon, signed=True):
        """signed=True: reversion PnL = -sign(z) * tradable fwd."""
        if mask is None:
            return
        h = horizon
        raw = fwd_tr[h]
        if signed:
            pnl = -sign_z * raw
        else:
            pnl = raw  # momentum: positive if continuation of past + return
        row = {
            "id": hid,
            "family": family,
            "description": desc,
            "horizon_bars": h,
            "signed_reversion": signed,
        }
        for name, sm in splits.items():
            m = mask & sm & np.isfinite(pnl)
            row[name] = with_cost(summarize(pnl[m], hac_lags=h))
            if name == "is":
                row["yearly_is"] = yearly_means(pnl, years, m)
        hypotheses.append(row)

    # Unconditional reversion by |z| bucket (signed), all horizons
    for lo, hi, label in [(a, b, lab) for lab, a, b in Z_BUCKETS]:
        mask = np.isfinite(z) & (np.abs(z) >= lo) & (np.abs(z) < hi)
        for h in HORIZONS:
            add_hyp(f"zrev|{label}|h{h}", "z_bucket", f"Signed reversion |Z| in {label}", mask, h, True)

    # pip distance from mean
    for lab, lo, hi in PIP_BUCKETS:
        mask = np.isfinite(dist_pips) & (np.abs(dist_pips) >= lo) & (np.abs(dist_pips) < hi)
        for h in PRIMARY_H:
            add_hyp(f"pip|{lab}|h{h}", "pip_distance", f"Signed reversion |P-mean| {lab} pips", mask, h, True)

    # Unconditional (all bars) signed? skip — need a deviation. Instead raw forward mean.
    # Momentum: past return sign -> subsequent tradable return (NOT flipped)
    for ph in (1, 3, 6, 12, 24):
        for h in PRIMARY_H:
            pos = np.isfinite(past[ph]) & (past[ph] > 0)
            neg = np.isfinite(past[ph]) & (past[ph] < 0)
            add_hyp(f"mom+|{ph}|h{h}", "momentum", f"Past {ph}-bar return > 0, subsequent {h}-bar (continuation)", pos, h, False)
            add_hyp(f"mom-|{ph}|h{h}", "momentum", f"Past {ph}-bar return < 0, subsequent {h}-bar (continuation)", neg, h, False)

    # Sessions × |z|>=2 × primary horizons
    z2 = np.isfinite(z) & (np.abs(z) >= 2.0)
    z25 = np.isfinite(z) & (np.abs(z) >= 2.5)
    for sname, smask in sess.items():
        for h in PRIMARY_H:
            add_hyp(f"sess|{sname}|z2|h{h}", "session", f"|Z|>=2 during {sname}", z2 & smask, h, True)
    for h in PRIMARY_H:
        add_hyp(f"sess|lon_open|z2|h{h}", "session", "|Z|>=2 in first 30m of London (ET)", z2 & london_open, h, True)
        add_hyp(f"sess|ny_open|z2|h{h}", "session", "|Z|>=2 in first 30m of NY (ET)", z2 & ny_open, h, True)

    # UTC-ish hour: data is Eastern wall clock. Report hour bins for |z|>=2, h=6
    for hr in range(24):
        add_hyp(f"hour|{hr:02d}|z2|h6", "hour", f"|Z|>=2 at ET hour {hr}", z2 & (hour == hr), 6, True)

    # Weekday |z|>=2 h=6
    for d, name in enumerate(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]):
        add_hyp(f"dow|{name}|z2|h6", "weekday", f"|Z|>=2 on {name}", z2 & (dow == d), 6, True)

    # Vol regimes
    for reg in ("low", "mid", "high"):
        for h in PRIMARY_H:
            add_hyp(f"vol|{reg}|z2|h{h}", "vol_regime", f"|Z|>=2 in {reg} vol tercile", z2 & (vol_reg == reg), h, True)
            add_hyp(f"vol|{reg}|all|h{h}", "vol_regime", f"Unconditional {reg} vol, signed by Z", np.isfinite(z) & (vol_reg == reg) & (np.abs(z) >= 1.0), h, True)

    # Trend ADX / slope
    for reg in ("range", "weak", "strong"):
        for h in PRIMARY_H:
            add_hyp(f"adx|{reg}|z2|h{h}", "trend_adx", f"|Z|>=2 ADX {reg}", z2 & (adx_reg == reg), h, True)
            add_hyp(f"slope|{reg}|z2|h{h}", "trend_slope", f"|Z|>=2 |H1 slope| {reg}", z2 & (trend_sl == reg), h, True)

    # ER choppy vs efficient
    for h in PRIMARY_H:
        add_hyp(f"er|low|z2|h{h}", "efficiency", "|Z|>=2 and ER<0.3 (choppy)", z2 & np.isfinite(er) & (er < 0.3), h, True)
        add_hyp(f"er|high|z2|h{h}", "efficiency", "|Z|>=2 and ER>0.5 (efficient)", z2 & np.isfinite(er) & (er > 0.5), h, True)

    # Recent momentum vs extreme
    # extended: price went further into the extreme (sign z == sign past6)
    ext = z2 & np.isfinite(past[6]) & (np.sign(past[6]) == sign_z)
    fade = z2 & np.isfinite(past[6]) & (np.sign(past[6]) == -sign_z)
    for h in PRIMARY_H:
        add_hyp(f"ext|z2|h{h}", "momentum_state", "|Z|>=2 and last 6 bars continued into the extreme", ext, h, True)
        add_hyp(f"fade|z2|h{h}", "momentum_state", "|Z|>=2 and last 6 bars already fading", fade, h, True)

    # consecutive bars
    for k in (3, 5, 8):
        for h in PRIMARY_H:
            add_hyp(f"run|{k}|z2|h{h}", "streak", f"|Z|>=2 after {k}+ consecutive directional bars", z2 & (np.abs(consec) >= k), h, True)

    # time since extreme
    for lab, lo, hi in [("just_now", 1, 2), ("2–3 bars", 2, 4), ("4–12 bars", 4, 13), ("12+ bars", 13, 999)]:
        for h in PRIMARY_H:
            add_hyp(f"since|{lab}|z2|h{h}", "time_since", f"|Z|>=2 for {lab}", np.isfinite(since) & (since >= lo) & (since < hi), h, True)

    # range expansion: current TR vs ATR
    tr = np.maximum(high - low, np.maximum(np.abs(high - np.roll(close, 1)), np.abs(low - np.roll(close, 1))))
    tr[0] = high[0] - low[0]
    expand = np.isfinite(atr) & (tr > 1.5 * atr)
    for h in PRIMARY_H:
        add_hyp(f"expand|z2|h{h}", "range_expand", "|Z|>=2 and this bar TR > 1.5 ATR", z2 & expand, h, True)
        add_hyp(f"contract|z2|h{h}", "range_expand", "|Z|>=2 and ATR falling vs 12 bars ago", z2 & vol_contraction, h, True)

    # Pre-declared interactions (not a search)
    interactions = [
        ("int|z2+lowvol|h6", z2 & (vol_reg == "low"), 6, "|Z|>=2 + low vol tercile"),
        ("int|z2+lowvol|h12", z2 & (vol_reg == "low"), 12, "|Z|>=2 + low vol tercile"),
        ("int|z2+adx_range|h6", z2 & (adx_reg == "range"), 6, "|Z|>=2 + ADX<18"),
        ("int|z2+adx_range|h12", z2 & (adx_reg == "range"), 12, "|Z|>=2 + ADX<18"),
        ("int|z2+london|h6", z2 & sess["london"], 6, "|Z|>=2 + London"),
        ("int|z2+london|h12", z2 & sess["london"], 12, "|Z|>=2 + London"),
        ("int|z2+fade|h6", fade, 6, "|Z|>=2 + fading 6-bar momentum"),
        ("int|z2+fade|h12", fade, 12, "|Z|>=2 + fading 6-bar momentum"),
        ("int|z2+contract|h6", z2 & vol_contraction, 6, "|Z|>=2 + ATR contraction"),
        ("int|z2+ext|h6", ext, 6, "|Z|>=2 + extended into extreme"),
        ("int|z25+range+lowvol|h6", z25 & (adx_reg == "range") & (vol_reg == "low"), 6, "|Z|>=2.5 + ADX range + low vol"),
        ("int|z25+range+lowvol|h12", z25 & (adx_reg == "range") & (vol_reg == "low"), 12, "|Z|>=2.5 + ADX range + low vol"),
        ("int|z2+asia|h6", z2 & sess["asia"], 6, "|Z|>=2 + Asia"),
        ("int|z2+overlap|h6", z2 & sess["overlap"], 6, "|Z|>=2 + overlap"),
    ]
    for hid, mask, h, desc in interactions:
        add_hyp(hid, "interaction", desc, mask, h, True)

    print(f"Hypotheses recorded: {len(hypotheses)}")

    # Multiple testing on IS, primary families of signed reversion at h in PRIMARY_H
    p_is = [h["is"]["p_hac"] for h in hypotheses]
    fdr = bh_fdr(p_is, 0.10)
    for hyp, ok in zip(hypotheses, fdr):
        hyp["is_fdr_10"] = bool(ok)

    def classify(hyp: dict) -> str:
        a, b = hyp["is"], hyp["val"]
        if a["n"] < MIN_N or a["mean"] is None:
            return "weak"
        # momentum continuation is a different theory
        theory_reversion = hyp["signed_reversion"]
        is_pos = a["mean"] > 0
        val_pos = b["mean"] is not None and b["mean"] > 0
        val_n = b["n"]
        net = a.get("net_base")
        economically = net is not None and net > 0
        # yearly: majority of IS years same sign as IS mean
        yrs = hyp.get("yearly_is") or []
        if yrs:
            same = sum(1 for y in yrs if (y["mean"] > 0) == is_pos)
            year_ok = same >= max(3, int(np.ceil(0.7 * len(yrs))))
        else:
            year_ok = False
        fdr_ok = hyp.get("is_fdr_10")
        if theory_reversion and economically and val_pos and val_n >= MIN_N and year_ok and fdr_ok:
            return "promising"
        if (not theory_reversion) and economically and val_pos and val_n >= MIN_N and year_ok and fdr_ok:
            return "promising"  # momentum edge would also count
        if fdr_ok and is_pos and not economically:
            return "interesting_uneconomic"
        if is_pos and val_pos and not economically:
            return "interesting_uneconomic"
        if a["mean"] is not None and abs(a["mean"]) < 0.15 and (a["p_hac"] or 1) > 0.1:
            return "rejected"
        if theory_reversion and a["mean"] is not None and a["mean"] < 0 and (a["p_hac"] or 1) < 0.05:
            return "rejected"
        return "weak"

    # Freeze labels using IS+VAL only
    for hyp in hypotheses:
        hyp["class"] = classify(hyp)

    buckets = {k: [] for k in ("promising", "interesting_uneconomic", "weak", "rejected")}
    for hyp in hypotheses:
        buckets[hyp["class"]].append(hyp["id"])

    # Reveal OOS/holdout only in reporting; decision ignores them for selection.
    promising_detail = [h for h in hypotheses if h["class"] == "promising"]
    unecon_detail = sorted(
        [h for h in hypotheses if h["class"] == "interesting_uneconomic" and h["horizon_bars"] in PRIMARY_H],
        key=lambda h: (h["is"]["mean"] or -9),
        reverse=True,
    )[:24]
    # strongest gross IS signed-reversion at h=6 even if rejected, for honesty
    zrev_h6 = [h for h in hypotheses if h["family"] == "z_bucket" and h["horizon_bars"] == 6]
    sess_h6 = [h for h in hypotheses if h["family"] == "session" and h["horizon_bars"] == 6]
    vol_h6 = [h for h in hypotheses if h["family"].startswith("vol") and h["horizon_bars"] == 6]
    int_h = [h for h in hypotheses if h["family"] == "interaction"]

    n_prom = len(buckets["promising"])
    n_unecon = len(buckets["interesting_uneconomic"])
    n_fdr = sum(1 for h in hypotheses if h.get("is_fdr_10"))

    # Best gross IS reversion among |z|>=2 at h=6 (for the executive number)
    def pick(family_pred, h=6):
        cands = [x for x in hypotheses if family_pred(x) and x["horizon_bars"] == h and x["is"]["mean"] is not None]
        return max(cands, key=lambda x: x["is"]["mean"]) if cands else None

    best_z2 = pick(lambda x: x["id"].startswith("zrev|2–2.5") or x["id"].startswith("zrev|2.5") or x["id"].startswith("zrev|3+"))
    # all |z| buckets at h=6
    # Simple |z|>=2 combined
    # already have buckets separately.

    # Decision
    oos_used_for_selection = False
    holdout_used_for_selection = False
    if n_prom == 0:
        decision = {
            "has_conditional_mr": "Weak statistical mean reversion exists in places, but nothing cleared the pre-declared promotion bar (IS net>0 after 2.5 pips, validation same sign, FDR, yearly breadth).",
            "survives_costs": False,
            "stable_across_time": False,
            "frequent_enough": True,
            "simple_enough": True,
            "build_candidate_strategy": False,
            "reason": "Gross effects at 6–12 bars after |Z| extremes are typically well under 2.5 pips. Several conditions are statistically nonzero on overlapping bars; none are economically tradable under the base cost model after IS+VAL confirmation.",
            "next": [
                "Intraday seasonality of raw returns (not reversion) at a cost-aware threshold — hour-of-day as a stand-alone effect, tested as a new hypothesis family rather than a Z-score overlay.",
                "Volatility contraction / range breakout continuation on M15–H1, where a 2.5 pip cost is a smaller fraction of the move.",
                "Cross-asset residuals (EURUSD vs DXY / US rates) if a second series can be aligned without lookahead.",
                "Do not spend another cycle retuning M5 1:2 Z-score stops.",
            ],
        }
    else:
        decision = {
            "has_conditional_mr": True,
            "survives_costs": True,
            "stable_across_time": True,
            "frequent_enough": True,
            "simple_enough": True,
            "build_candidate_strategy": True,
            "reason": "At least one pre-declared condition cleared IS+VAL economic gates.",
            "next": ["Construct a deliberately simple candidate from the promoted conditions only."],
        }

    # Compact tables for the UI
    def slim(h, include_yearly=False):
        d = {
            "id": h["id"],
            "family": h["family"],
            "description": h["description"],
            "horizon_bars": h["horizon_bars"],
            "class": h["class"],
            "is_fdr_10": h.get("is_fdr_10"),
            "is": h["is"],
            "val": h["val"],
            "oos": h["oos"],
            "holdout": h["holdout"],
        }
        if include_yearly:
            d["yearly_is"] = h.get("yearly_is")
        return d

    # ACF interpretation
    acf1 = acf_rows[0]["acf_is"]

    findings = [
        f"Phase 2 tested {len(hypotheses)} pre-registered comparisons on frozen splits. Holdout was not used to select.",
        f"Lag-1 return autocorrelation on IS is {acf1:.4f}. Weakly negative ACF is the model-free fingerprint of mild mean reversion — and it is small.",
        f"Z-score AR(1) half-life on IS is {hl_z.get('half_life_bars')} M5 bars ({None if not hl_z.get('half_life_bars') else round(hl_z['half_life_bars']*5)} minutes).",
        f"BH-FDR 10% flags {n_fdr} of {len(hypotheses)} tests on IS. Promotion additionally requires net>0 after 2.5 pips, validation agreement, and yearly breadth.",
        f"Promoted conditional effects: {n_prom}. Statistically interesting but below cost: {n_unecon}.",
        "HistData volume is zero, so VWAP diagnostics were skipped rather than faked.",
    ]

    results = {
        "meta": {
            "phase": 2,
            "title": "Conditional mean-reversion diagnostics",
            "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "runtime_sec": None,
            "lookback": LOOKBACK,
            "price": "typical",
            "horizons_bars": list(HORIZONS),
            "primary_horizons": list(PRIMARY_H),
            "cost_pips": {"optimistic": COST_OPT, "base": COST, "adverse": COST_ADV},
            "splits": {
                "is": "2016-01-01 → 2022-01-01",
                "val": "2022-01-01 → 2024-01-01",
                "oos": "2024-01-01 → 2026-01-01",
                "holdout": "2026-01-01 → 2026-09-28",
            },
            "n_hypotheses": len(hypotheses),
            "fdr_alpha": 0.10,
            "n_fdr_is": n_fdr,
            "oos_used_for_selection": oos_used_for_selection,
            "holdout_used_for_selection": holdout_used_for_selection,
            "hac_note": "t-statistics use Newey-West HAC with lags = horizon, because forward returns overlap.",
            "tradable_definition": "Gross pips = −sign(Z_t) × (Close[t+h] − Open[t+1]) / pip. Signal at closed bar t. Cost subtracted as a round-turn constant.",
            "key_findings": findings,
            "verdict": "NO_TRADABLE_CONDITIONAL_EDGE" if n_prom == 0 else "CONDITIONAL_EDGE_CANDIDATE",
        },
        "market": market,
        "counts": {k: len(v) for k, v in buckets.items()},
        "decision": decision,
        "z_buckets_h6": [slim(h, True) for h in zrev_h6],
        "z_buckets_h12": [slim(h) for h in hypotheses if h["family"] == "z_bucket" and h["horizon_bars"] == 12],
        "z_buckets_all_horizons_is_mean": [
            {
                "bucket": h["id"].split("|")[1],
                "horizon": h["horizon_bars"],
                "is_mean": h["is"]["mean"],
                "is_n": h["is"]["n"],
                "is_t": h["is"]["t_hac"],
                "net_base": h["is"]["net_base"],
            }
            for h in hypotheses
            if h["family"] == "z_bucket"
        ],
        "pip_distance": [slim(h) for h in hypotheses if h["family"] == "pip_distance"],
        "momentum": [slim(h) for h in hypotheses if h["family"] == "momentum" and h["horizon_bars"] == 6],
        "sessions": [slim(h) for h in hypotheses if h["family"] == "session"],
        "hours": [slim(h) for h in hypotheses if h["family"] == "hour"],
        "weekdays": [slim(h) for h in hypotheses if h["family"] == "weekday"],
        "vol_regimes": [slim(h) for h in hypotheses if h["family"] == "vol_regime"],
        "trend": [slim(h) for h in hypotheses if h["family"] in ("trend_adx", "trend_slope")],
        "efficiency": [slim(h) for h in hypotheses if h["family"] == "efficiency"],
        "momentum_state": [slim(h) for h in hypotheses if h["family"] == "momentum_state"],
        "streaks": [slim(h) for h in hypotheses if h["family"] == "streak"],
        "time_since": [slim(h) for h in hypotheses if h["family"] == "time_since"],
        "range_expand": [slim(h) for h in hypotheses if h["family"] == "range_expand"],
        "interactions": [slim(h, True) for h in int_h],
        "promising": [slim(h, True) for h in promising_detail],
        "interesting_uneconomic": [slim(h) for h in unecon_detail],
        "hypothesis_index": [
            {"id": h["id"], "family": h["family"], "class": h["class"], "is_mean": h["is"]["mean"], "is_n": h["is"]["n"], "is_fdr_10": h.get("is_fdr_10")}
            for h in hypotheses
        ],
    }

    results["meta"]["runtime_sec"] = round(time.time() - t0, 1)
    text = json.dumps(results, indent=2)
    path = os.path.join(OUT_DIR, "diagnostics.json")
    for p in (path, PUBLIC_JSON, SRC_JSON):
        with open(p, "w") as f:
            f.write(text)
    print("Wrote", path, "bytes", len(text))
    print("Class counts", results["counts"])
    print("Verdict", results["meta"]["verdict"])
    print("Runtime", results["meta"]["runtime_sec"], "s")


if __name__ == "__main__":
    main()
