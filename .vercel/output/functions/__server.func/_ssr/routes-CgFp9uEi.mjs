import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as pct, i as num, n as cn, o as rUnit, r as int } from "./router-GA0KNnSl.mjs";
import { n as CardHeader, t as Card } from "./card-W5_0_Dl3.mjs";
import { i as research } from "./research-CvxjS7vv.mjs";
import { r as YearlyChart, t as EquityChart } from "./charts-CJKTwQmX.mjs";
import { i as eTone, n as Metric, r as MetricsGrid, t as ExitMix } from "./metrics-CDos1Jyr.mjs";
import { t as Badge } from "./badge-C0UO17SE.mjs";
import { t as buttonVariants } from "./button-CZS0G1HI.mjs";
import { t as diagnostics } from "./diagnostics-CftAWU7D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CgFp9uEi.js
var import_jsx_runtime = require_jsx_runtime();
var GATE_LABEL = {
	oos_net_expectancy_positive: "OOS net expectancy > 0",
	oos_pf_ge_1_15: "OOS profit factor ≥ 1.15",
	full_trades_ge_1000: "Full sample ≥ 1,000 trades",
	oos_trades_ge_150: "OOS sample large enough",
	walk_forward_aggregate_positive: "Walk-forward aggregate > 0",
	base_cost_oos_positive: "Base-cost OOS > 0",
	adverse_cost_oos_positive: "Adverse-cost OOS > 0",
	win_rate_near_45: "OOS win rate near 45%"
};
function Home() {
	const m = research.meta;
	const c = research.candidate;
	const costDrag = research.costs.gross_full.expectancy_r - c.full.expectancy_r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "Statistical review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-[2.1rem] leading-[1.15] tracking-tight text-fg sm:text-5xl",
						children: "The hypothesis does not survive costs."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-base text-muted sm:text-lg",
						children: m.verdict_text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "bad",
								children: m.verdict.replaceAll("_", " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "bad",
								children: diagnostics.meta.verdict.replaceAll("_", " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "EURUSD M5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [int(research.data.m5_bars), " M5 bars"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "2016–2026" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					kicker: "Phase 2",
					title: "No tradable conditional edge either."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed text-muted sm:text-base",
					children: [
						diagnostics.meta.n_hypotheses,
						" pre-registered comparisons (sessions, vol, trend, hours, weekdays, streaks, seven interactions). BH-FDR 10% flags ",
						diagnostics.meta.n_fdr_is,
						" IS tests. Promotion additionally required net",
						" ",
						">",
						" 0 after 2.5 pips, validation agreement, and yearly breadth. Promoted: ",
						diagnostics.counts.promising,
						". Lag-1 ACF is ",
						diagnostics.market.return_acf[0].acf_is.toFixed(3),
						" — a real, tiny reversion that costs bury. Holdout was not used to select."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/diagnostics",
						className: cn(buttonVariants({ variant: "secondary" })),
						children: "Open Phase 2 diagnostics"
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "IS expectancy",
						value: rUnit(c.is.expectancy_r),
						tone: eTone(c.is.expectancy_r),
						hint: `${int(c.is.trades)} trades · 2016–21`
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "OOS expectancy",
						value: rUnit(c.oos.expectancy_r),
						tone: eTone(c.oos.expectancy_r),
						hint: `${int(c.oos.trades)} trades · 2024–25`
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Walk-forward E",
						value: rUnit(research.walk_forward.aggregate.expectancy_r),
						tone: "bad",
						hint: `${int(research.walk_forward.aggregate.trades)} test trades`
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Cost drag vs gross",
						value: rUnit(-costDrag),
						tone: "bad",
						hint: `${num(research.costs.base_round_turn_pips, 1)} pip round-turn / 15 pip SL`
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				kicker: "Pre-declared gates",
				title: "Nothing that had to be true was true — except sample size."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: Object.entries(m.gates).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3 rounded-lg bg-elevated px-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: v ? "text-positive" : "text-negative",
						children: v ? "Pass" : "Fail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-fg",
						children: GATE_LABEL[k] ?? k
					})]
				}, k))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				kicker: "What the study actually found",
				title: "Eight facts, none of them a trading edge."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-3",
				children: m.key_findings.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm leading-relaxed text-muted sm:text-base",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 font-mono text-xs text-subtle",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: f
					})]
				}, i))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					kicker: "Least-bad configuration · 1% compounded equity",
					title: "Starting $10,000 is effectively gone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-4 text-sm text-muted",
					children: [
						"Compounding 1% of equity on a negative-expectancy stream. This is not a “max DD of a good system” — it is ruin. Nominal 1:2 never showed up: TP share ",
						pct(c.full.tp_share),
						", time-stop share ",
						pct(c.full.time_stop_share),
						", average winner ",
						rUnit(c.full.avg_win_r, 2),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquityChart, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-xs text-subtle",
					children: [
						"Terminal multiple ",
						num(c.full.end_equity_multiple, 4),
						" · max DD ",
						num(c.full.max_dd_pct_1pct_risk, 1),
						"%"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					kicker: "Every calendar year",
					title: "No hidden winning regime."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearlyChart, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						kicker: "How trades actually died",
						title: "The 2R target is rare."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExitMix, { m: c.full }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "A 15-pip stop and 30-pip target on a market whose M5 ATR is about 3.8 pips is a trend-sized target hanging on a mean-reversion idea. Time stops close nearly half the book at ~1R, not 2R."
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					kicker: "Full sample after base costs",
					title: "Least-bad researched defaults"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricsGrid, { m: c.full }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/ea",
						className: cn(buttonVariants()),
						children: "Download the EA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/plan",
						className: cn(buttonVariants({ variant: "secondary" })),
						children: "Read the protocol"
					})]
				})
			] })
		]
	});
}
//#endregion
export { Home as component };
