import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { diagnostics, type Hyp } from "@/lib/diagnostics";
import { cn, int, num } from "@/lib/utils";

export const Route = createFileRoute("/diagnostics")({ component: DiagnosticsPage });

const CLASS_TONE: Record<string, "good" | "bad" | "warn" | "neutral"> = {
  promising: "good",
  interesting_uneconomic: "warn",
  weak: "neutral",
  rejected: "bad",
};

const CLASS_LABEL: Record<string, string> = {
  promising: "Potentially promising",
  interesting_uneconomic: "Interesting, not tradable",
  weak: "Weak / inconclusive",
  rejected: "Rejected",
};

const tooltipStyle = {
  background: "#141518",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  fontSize: 12,
  color: "#ecece8",
};

function pip(v: number | null | undefined, d = 2) {
  if (v == null || !Number.isFinite(v)) return "—";
  const s = v.toFixed(d);
  return v > 0 ? `+${s}` : s;
}

function HypTable({ rows, showHoldout = false }: { rows: Hyp[]; showHoldout?: boolean }) {
  return (
    <div className="min-w-0 max-w-full overflow-x-auto">
      <table className="w-full min-w-[48rem] text-left text-sm">
        <thead className="text-xs uppercase tracking-wider text-subtle">
          <tr>
            <th className="pb-2 font-medium">Condition</th>
            <th className="pb-2 font-medium">h</th>
            <th className="pb-2 font-medium">IS n</th>
            <th className="pb-2 font-medium">IS gross</th>
            <th className="pb-2 font-medium">IS net</th>
            <th className="pb-2 font-medium">t HAC</th>
            <th className="pb-2 font-medium">VAL gross</th>
            <th className="pb-2 font-medium">OOS</th>
            {showHoldout ? <th className="pb-2 font-medium">Holdout</th> : null}
            <th className="pb-2 font-medium">Class</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border">
              <td className="py-2 pr-3">
                <div className="text-fg">{r.description}</div>
                <div className="font-mono text-[11px] text-subtle">{r.id}</div>
              </td>
              <td className="py-2 font-mono tabular-nums">{r.horizon_bars}</td>
              <td className="py-2 font-mono tabular-nums">{int(r.is.n)}</td>
              <td className={cn("py-2 font-mono tabular-nums", (r.is.mean ?? 0) >= 0 ? "text-positive" : "text-negative")}>
                {pip(r.is.mean)}
              </td>
              <td className="py-2 font-mono tabular-nums text-negative">{pip(r.is.net_base)}</td>
              <td className="py-2 font-mono tabular-nums">{r.is.t_hac == null ? "—" : num(r.is.t_hac, 2)}</td>
              <td className="py-2 font-mono tabular-nums">{pip(r.val.mean)}</td>
              <td className="py-2 font-mono tabular-nums">{pip(r.oos.mean)}</td>
              {showHoldout ? <td className="py-2 font-mono tabular-nums">{pip(r.holdout.mean)}</td> : null}
              <td className="py-2">
                <Badge tone={CLASS_TONE[r.class] ?? "neutral"}>{CLASS_LABEL[r.class] ?? r.class}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DiagnosticsPage() {
  const d = diagnostics;
  const acf = d.market.return_acf.map((r) => ({ lag: String(r.lag), is: r.acf_is, val: r.acf_val, oos: r.acf_oos }));
  const buckets = [...new Set(d.z_buckets_all_horizons_is_mean.map((x) => x.bucket))];
  const horiz = [...new Set(d.z_buckets_all_horizons_is_mean.map((x) => x.horizon))].sort((a, b) => a - b);
  const hours = [...d.hours].sort((a, b) => Number(a.id.split("|")[1]) - Number(b.id.split("|")[1]));
  const caseStudy = d.z_buckets_h6.find((x) => x.id.includes("2–2.5")) ?? d.z_buckets_h6[3];
  const familyCounts = d.hypothesis_index.reduce<Record<string, number>>((acc, h) => {
    acc[h.family] = (acc[h.family] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <header className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">Phase 2 · frozen splits</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Conditional diagnostics</h1>
        <p className="mt-3 text-muted">
          Not a second attempt to fit the 1:2 EA. This phase asks whether EURUSD M5 has any
          condition-dependent mean-reversion effect large enough to live after 2.5 pips of friction.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="bad">{d.meta.verdict.replaceAll("_", " ")}</Badge>
          <Badge>{d.meta.n_hypotheses} hypotheses</Badge>
          <Badge>FDR 10% · {d.meta.n_fdr_is} IS flags</Badge>
          <Badge>Promoted {d.counts.promising}</Badge>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-xs uppercase tracking-wider text-subtle">Lag-1 ACF (IS)</p>
          <p className="mt-1 font-mono text-2xl tabular-nums text-fg">{num(d.market.return_acf[0].acf_is, 4)}</p>
          <p className="mt-1 text-xs text-muted">VAL {num(d.market.return_acf[0].acf_val, 4)} · OOS {num(d.market.return_acf[0].acf_oos, 4)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-subtle">Z AR(1) half-life</p>
          <p className="mt-1 font-mono text-2xl tabular-nums">{d.market.z_ar1.half_life_bars} bars</p>
          <p className="mt-1 text-xs text-muted">≈ {d.market.z_ar1.half_life_bars ? Math.round(d.market.z_ar1.half_life_bars * 5) : "—"} minutes</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-subtle">M5 ATR (IS)</p>
          <p className="mt-1 font-mono text-2xl tabular-nums">{num(d.market.atr_pips_mean_is, 2)} pips</p>
          <p className="mt-1 text-xs text-muted">1-bar σ {num(d.market.ret1_std_pips_is, 2)} pips</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-subtle">Cost hurdle</p>
          <p className="mt-1 font-mono text-2xl tabular-nums">{num(d.meta.cost_pips.base, 1)} pips</p>
          <p className="mt-1 text-xs text-muted">opt {d.meta.cost_pips.optimistic} · stress {d.meta.cost_pips.adverse}</p>
        </Card>
      </div>

      <Card>
        <CardHeader kicker="Executive summary" title="Mild reversion is real. It is not a business." />
        <ol className="space-y-3">
          {d.meta.key_findings.map((f, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed sm:text-base">
              <span className="mt-0.5 font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-fg">{f}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">{d.meta.tradable_definition}</p>
        <p className="mt-2 text-sm text-muted">{d.meta.hac_note} Lookback {d.meta.lookback} on typical price, pre-declared.</p>
        <p className="mt-2 text-sm text-muted">
          Holdout used for selection: {d.meta.holdout_used_for_selection ? "yes" : "no"}. OOS used for
          selection: {d.meta.oos_used_for_selection ? "yes" : "no"}.
        </p>
      </Card>

      <Card>
        <CardHeader kicker="Classification (IS + validation only)" title="Nothing promoted" />
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["promising", "Must be net>0 after 2.5 pips, FDR, VAL same sign, yearly breadth"],
            ["interesting_uneconomic", "Often statistically nonzero. Gross move < cost"],
            ["weak", "Mixed signs, small n, or no IS edge"],
            ["rejected", "Wrong sign vs reversion, or indistinguishable from zero"],
          ].map(([k, hint]) => (
            <div key={k} className="rounded-lg bg-elevated p-3">
              <p className="font-mono text-2xl tabular-nums">{d.counts[k]}</p>
              <p className="mt-1 text-sm text-fg">{CLASS_LABEL[k]}</p>
              <p className="mt-1 text-xs text-muted">{hint}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-5 text-sm font-medium text-fg">Every comparison was recorded</h3>
        <ul className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(familyCounts).map(([fam, n]) => (
            <li key={fam} className="flex justify-between rounded-lg bg-elevated px-3 py-2 text-sm">
              <span className="text-muted">{fam}</span>
              <span className="font-mono tabular-nums">{n}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardHeader kicker="Market structure" title="Autocorrelation decays in a few bars" />
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={acf} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="lag" tick={{ fill: "#9a9aa3", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#9a9aa3", fontSize: 11 }} tickLine={false} axisLine={false} width={44} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="is" name="IS" fill="#c5ccd6" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm text-muted">
          ATR autocorrelation at lag 1 is {num(d.market.atr_acf_is[0].acf_is, 3)} — volatility clusters hard.
          Price itself has AR(1) φ ≈ 1 (half-life tens of thousands of bars). The Z-score mean-reverts with
          half-life {d.market.z_ar1.half_life_bars} bars, too slow for a 15-pip / 30-minute scalp and too
          small versus 2.5 pips. {d.market.vwap}.
        </p>
      </Card>

      <Card>
        <CardHeader kicker="Deviation magnitude × horizon" title="IS gross pips, signed reversion" />
        <div className="min-w-0 max-w-full overflow-x-auto">
          <table className="w-full min-w-[32rem] border-separate border-spacing-1 text-center">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-subtle">|Z| \ h</th>
                {horiz.map((h) => (
                  <th key={h} className="text-xs font-medium text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buckets.map((b) => (
                <tr key={b}>
                  <td className="pr-2 text-left font-mono text-xs text-muted">{b}</td>
                  {horiz.map((h) => {
                    const cell = d.z_buckets_all_horizons_is_mean.find((x) => x.bucket === b && x.horizon === h);
                    const v = cell?.is_mean;
                    const t = v == null ? 0 : Math.max(0, Math.min(1, (v + 0.1) / 0.7));
                    const bg = `rgba(107, 143, 113, ${0.08 + t * 0.45})`;
                    return (
                      <td key={h}>
                        <div
                          className="rounded-md px-1 py-2 font-mono text-[11px] tabular-nums"
                          style={{ background: v != null && v < 0 ? "rgba(180,90,78,0.25)" : bg }}
                          title={`n=${cell?.is_n} t=${cell?.is_t} net=${cell?.net_base}`}
                        >
                          {pip(v)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">
          Peak IS cells are still ~0.3 pips. Net after 2.5 is about −2.2. Larger |Z| is not monotonically
          better at h=12: the 3+ bucket fades. Do not read the green tint as profitability — it is gross
          only, and every net is negative.
        </p>
      </Card>

      <Card>
        <CardHeader title="Z-score buckets at 6 and 12 bars" kicker="Primary economic horizons" />
        <h3 className="mb-2 text-sm text-muted">6 bars (30 minutes)</h3>
        <HypTable rows={d.z_buckets_h6} />
        <h3 className="mb-2 mt-6 text-sm text-muted">12 bars (60 minutes)</h3>
        <HypTable rows={d.z_buckets_h12} />
      </Card>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader
            kicker="Worked example · not a candidate"
            title={`${caseStudy.description}, h=${caseStudy.horizon_bars}`}
          />
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            {[
              ["IS n", int(caseStudy.is.n)],
              ["Gross pips", pip(caseStudy.is.mean)],
              ["Base cost", `−${num(d.meta.cost_pips.base, 1)}`],
              ["Net pips", pip(caseStudy.is.net_base)],
              ["HAC t", caseStudy.is.t_hac == null ? "—" : num(caseStudy.is.t_hac, 2)],
              ["95% CI", `${pip(caseStudy.is.ci95_lo)} … ${pip(caseStudy.is.ci95_hi)}`],
              ["Cohen's d", caseStudy.is.cohens_d == null ? "—" : num(caseStudy.is.cohens_d, 3)],
              ["Win rate", caseStudy.is.win_rate == null ? "—" : `${num(caseStudy.is.win_rate * 100, 1)}%`],
              ["VAL gross", pip(caseStudy.val.mean)],
              ["OOS gross", pip(caseStudy.oos.mean)],
              ["Optimistic net", pip(caseStudy.is.net_opt)],
              ["Adverse net", pip(caseStudy.is.net_adv)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 rounded-lg bg-elevated px-3 py-2">
                <dt className="text-muted">{k}</dt>
                <dd className="font-mono tabular-nums text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-muted">
            Statistically nonzero on overlapping 30-minute forwards. Economically, the entire gross move is
            about one-twelfth of round-turn cost. Optimistic 1.4 pip costs still leave it negative.
          </p>
        </Card>
        <Card>
          <CardHeader kicker="IS years only" title="Yearly stability of that cell" />
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={(caseStudy.yearly_is ?? []).map((y) => ({ year: String(y.year), mean: y.mean, n: y.n }))}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: "#9a9aa3", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#9a9aa3", fontSize: 11 }} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="mean" radius={[3, 3, 0, 0]}>
                  {(caseStudy.yearly_is ?? []).map((y) => (
                    <Cell key={y.year} fill={y.mean >= 0 ? "#6b8f71" : "#b45a4e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm text-muted">
            Sign is not uniform across IS years. A cell that cannot pay 2.5 pips even in its better years is
            not a candidate, regardless of a large t-statistic on the pooled sample.
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader title="Distance from the rolling mean, in pips" kicker="h = 6" />
        <HypTable rows={d.pip_distance.filter((x) => x.horizon_bars === 6)} />
      </Card>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Sessions, |Z|≥2" kicker="Validation is allowed to veto folklore" />
          <HypTable rows={d.sessions.filter((x) => x.horizon_bars === 6)} />
          <p className="mt-3 text-sm text-muted">
            London IS gross +0.26 pips flips negative on validation. Asia keeps sign and still cannot pay
            the spread. Session transitions (London/NY open) look better on IS and fail VAL — small-n
            mining, not an edge.
          </p>
        </Card>
        <Card>
          <CardHeader title="Weekday, |Z|≥2, h=6" kicker="Exploratory only" />
          <HypTable rows={d.weekdays.filter((x) => x.is.n > 0)} />
        </Card>
      </div>

      <Card>
        <CardHeader title="Hour of day (Eastern wall clock), |Z|≥2, h=6" />
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={hours.map((h) => ({
                hr: h.id.split("|")[1],
                mean: h.is.mean ?? 0,
                n: h.is.n,
              }))}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="hr" tick={{ fill: "#9a9aa3", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#9a9aa3", fontSize: 11 }} tickLine={false} axisLine={false} width={40} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="mean" radius={[3, 3, 0, 0]}>
                {hours.map((h) => (
                  <Cell key={h.id} fill={(h.is.mean ?? 0) >= 0 ? "#6b8f71" : "#b45a4e"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm text-muted">
          Hours 17–18 ET print ~1.5 pips gross (n≈400–500) and still net about −1 pip. That window is
          broker rollover — the study already treats it as untradeable, and the cost model of 2.5 pips is
          optimistic there. Hour 08 (NY open) is +0.94 IS and −0.54 VAL.
        </p>
      </Card>

      <Card>
        <CardHeader title="Volatility, trend, and efficiency, |Z|≥2, h=6" />
        <h3 className="mb-2 text-sm text-muted">Vol terciles (cut on IS only, applied forward)</h3>
        <HypTable rows={d.vol_regimes.filter((x) => x.horizon_bars === 6 && x.id.includes("|z2|"))} />
        <h3 className="mb-2 mt-6 text-sm text-muted">H1 ADX and |slope|</h3>
        <HypTable rows={d.trend.filter((x) => x.horizon_bars === 6)} />
        <h3 className="mb-2 mt-6 text-sm text-muted">Kaufman efficiency ratio</h3>
        <HypTable rows={d.efficiency.filter((x) => x.horizon_bars === 6)} />
        <p className="mt-3 text-sm text-muted">
          The ranging / low-vol overlay does not help. High-vol and strong-ADX states produce larger pip
          reversions because the tape is moving more — still far below cost. Mean-reversion folklore that
          says “only fade when ADX is low” is not supported on this sample. Choppy ER does not rescue it.
        </p>
      </Card>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Momentum state" kicker="Extended vs already fading" />
          <HypTable rows={d.momentum_state} />
          <p className="mt-3 text-sm text-muted">
            If the last six bars already faded, buying the dip is late: IS mean −0.33 pips. Extremes that
            are still extending revert a bit more (+0.27) — still −2.2 net.
          </p>
        </Card>
        <Card>
          <CardHeader title="Raw momentum (not flipped)" kicker="h = 6 subsequent pips" />
          <HypTable rows={d.momentum} />
        </Card>
      </div>

      <Card>
        <CardHeader title="Pre-declared interactions" kicker="Seven economic stories, not a search" />
        <HypTable rows={d.interactions} />
      </Card>

      <Card>
        <CardHeader title="Time since the extreme, streaks, expansion" />
        <HypTable rows={[...d.time_since.filter((x) => x.horizon_bars === 6), ...d.streaks.filter((x) => x.horizon_bars === 6), ...d.range_expand.filter((x) => x.horizon_bars === 6)]} />
      </Card>

      <Card>
        <CardHeader title="Largest IS gross effects that still fail the cost test" kicker="Not a ranking of 'best strategies'" />
        <HypTable rows={d.interesting_uneconomic.slice(0, 12)} />
        <p className="mt-3 text-sm text-muted">
          Even the top IS hours would need round-turn costs under ~1.5 pips in the worst spread window of
          the day. That is not a live ECN. Optimistic 1.4 pip costs still leave most of this list negative.
        </p>
      </Card>

      <Card>
        <CardHeader title="Final research decision" kicker="Seven questions, answered from IS+VAL" />
        <dl className="space-y-3 text-sm">
          {[
            ["Is there evidence of conditional M5 mean reversion?", String(d.decision.has_conditional_mr)],
            ["Large enough to survive realistic costs?", d.decision.survives_costs ? "Yes" : "No"],
            ["Stable across time?", d.decision.stable_across_time ? "Yes" : "No — ACF and several session effects shrink or flip after 2021"],
            ["Frequent enough?", d.decision.frequent_enough ? "Yes — |Z|≥2 is common. Frequency is not the bottleneck." : "No"],
            ["Simple enough to trade?", d.decision.simple_enough ? "Yes, the rules are simple. Simplicity does not create edge." : "No"],
            ["Build a candidate strategy?", d.decision.build_candidate_strategy ? "Yes" : "No"],
          ].map(([q, a]) => (
            <div key={q} className="grid gap-1 border-b border-border py-2 sm:grid-cols-[minmax(0,16rem)_1fr]">
              <dt className="text-muted">{q}</dt>
              <dd className="text-fg">{a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-fg">{d.decision.reason}</p>
        <h3 className="mt-5 text-sm font-medium text-fg">What to investigate next</h3>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted">
          {d.decision.next.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/research/diagnostics.json" download className={cn(buttonVariants())}>
            diagnostics.json
          </a>
          <Link to="/baseline" className={cn(buttonVariants({ variant: "secondary" }))}>
            Phase 1 baseline
          </Link>
        </div>
      </Card>
    </div>
  );
}
