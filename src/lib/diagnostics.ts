import raw from "@/data/diagnostics.json";

export type Cell = {
  n: number;
  mean: number | null;
  median: number | null;
  std: number | null;
  win_rate: number | null;
  t_hac: number | null;
  p_hac: number | null;
  ci95_lo: number | null;
  ci95_hi: number | null;
  cohens_d: number | null;
  p05: number | null;
  p95: number | null;
  gross?: number | null;
  net_base?: number | null;
  net_opt?: number | null;
  net_adv?: number | null;
  max_cost?: number | null;
};

export type Hyp = {
  id: string;
  family: string;
  description: string;
  horizon_bars: number;
  class: string;
  is_fdr_10?: boolean;
  is: Cell;
  val: Cell;
  oos: Cell;
  holdout: Cell;
  yearly_is?: Array<{ year: number; n: number; mean: number }>;
};

export type Diagnostics = {
  meta: {
    phase: number;
    title: string;
    generated_at: string;
    runtime_sec: number;
    lookback: number;
    price: string;
    horizons_bars: number[];
    primary_horizons: number[];
    cost_pips: { optimistic: number; base: number; adverse: number };
    splits: Record<string, string>;
    n_hypotheses: number;
    fdr_alpha: number;
    n_fdr_is: number;
    oos_used_for_selection: boolean;
    holdout_used_for_selection: boolean;
    hac_note: string;
    tradable_definition: string;
    key_findings: string[];
    verdict: string;
  };
  market: {
    m5_bars: number;
    atr_pips_mean_is: number;
    ret1_std_pips_is: number;
    return_acf: Array<{ lag: number; acf_is: number; acf_val: number; acf_oos: number; acf_holdout: number }>;
    atr_acf_is: Array<{ lag: number; acf_is: number }>;
    z_ar1: { phi: number | null; half_life_bars: number | null };
    close_ar1: { phi: number | null; half_life_bars: number | null };
    vol_terciles_is: { q33: number; q66: number };
    slope_abs_terciles_is: { q33: number; q66: number };
    vwap: string;
  };
  counts: Record<string, number>;
  decision: {
    has_conditional_mr: string | boolean;
    survives_costs: boolean;
    stable_across_time: boolean;
    frequent_enough: boolean;
    simple_enough: boolean;
    build_candidate_strategy: boolean;
    reason: string;
    next: string[];
  };
  z_buckets_h6: Hyp[];
  z_buckets_h12: Hyp[];
  z_buckets_all_horizons_is_mean: Array<{
    bucket: string;
    horizon: number;
    is_mean: number | null;
    is_n: number;
    is_t: number | null;
    net_base: number | null;
  }>;
  pip_distance: Hyp[];
  momentum: Hyp[];
  sessions: Hyp[];
  hours: Hyp[];
  weekdays: Hyp[];
  vol_regimes: Hyp[];
  trend: Hyp[];
  efficiency: Hyp[];
  momentum_state: Hyp[];
  streaks: Hyp[];
  time_since: Hyp[];
  range_expand: Hyp[];
  interactions: Hyp[];
  promising: Hyp[];
  interesting_uneconomic: Hyp[];
  hypothesis_index: Array<{
    id: string;
    family: string;
    class: string;
    is_mean: number | null;
    is_n: number;
    is_fdr_10: boolean;
  }>;
};

export const diagnostics = raw as unknown as Diagnostics;
