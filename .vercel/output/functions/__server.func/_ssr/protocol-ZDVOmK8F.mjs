import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardHeader, t as Card } from "./card-W5_0_Dl3.mjs";
import { i as research } from "./research-CvxjS7vv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/protocol-ZDVOmK8F.js
var import_jsx_runtime = require_jsx_runtime();
function Protocol() {
	const g = research.forward_test_gate;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "Reproduction"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Test protocol"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: g.recommendation
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "MetaTrader 5 Strategy Tester",
					kicker: "How to reproduce, not how to optimize a peak"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "space-y-3 text-sm",
					children: [
						["Symbol", "EURUSD (suffixes allowed; EA reads symbol properties)"],
						["Timeframe", "M5"],
						["Dates", "2016.01.01 – 2026.09.24, or as far as your broker history goes"],
						["Model", "Every tick based on real ticks if you have them; otherwise 1-minute OHLC"],
						["Spread", "Variable if possible. Else ~1.2 pips. Base study assumed 2.5 pip round-turn all-in"],
						["Commission", "~$7 / lot round-turn (0.7 pip) for the base case"],
						["Deposit", "10,000 USD (percent risk makes the starting capital a scale factor)"],
						["Leverage", "Your demo, typically 1:100"],
						["Forward in tester", "Do not use tester ‘forward’ to pick params — the study already split OOS"],
						["Inputs", "Leave defaults, set InpMode = RESEARCH"],
						["Optimization", "Do not. The 600-config grid is the search. Hunting a live peak is the failure mode."]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 border-b border-border py-2 sm:grid-cols-[10rem_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-subtle",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-fg",
							children: v
						})]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Broker M5 history is not HistData. Expect different trade counts. If a tester run is suddenly profitable, treat it as a data-mismatch investigation, not a discovery."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "What the Python engine did",
				kicker: `Runtime ${research.meta.engine_runtime_sec}s`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-1 pl-4 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Resample M1 bid OHLC to M5; signal on closed bar; fill next open." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Same-bar SL and TP conflict → SL first. Gap through SL → fill at open if worse." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Round-turn pips converted to R and subtracted from every trade." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"H1 ADX and slope use the last ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "completed" }),
						" H1 bar only (no intra-bar lookahead)."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Walk-forward re-fits lookback, Z, and SL family every 3 months on the prior 12 months." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Monte Carlo bootstraps realized R-multiples — not a Bernoulli +2/−1 toy." })
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Demo / paper forward gate",
					kicker: "Declared before any live decision"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Minimum ",
							g.min_period_weeks,
							" weeks and ",
							g.min_trades,
							" trades."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Average slippage ≤ ",
							g.max_avg_slippage_pips,
							" pips; average spread ≤ ",
							g.max_avg_spread_pips,
							" pips."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: g.expectancy_floor_vs_oos }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: g.drawdown_kill }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: g.error_kill })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-fg",
					children: "Given OOS Monte Carlo already implies near-certain 20%+ drawdown at 1% risk, a demo that “looks fine for two weeks” is not evidence. The prior is negative. The gate exists to stop, not to promote."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Phase 2 diagnostics",
					kicker: "Strategy-independent, recorded hypotheses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc space-y-1 pl-4 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Same frozen splits. Holdout never used to select a condition, threshold, or family." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Signed tradable pips = −sign(Z_t) × (Close[t+h] − Open[t+1]) / pip. Signal on closed bar t." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Horizons 1, 2, 3, 6, 12, 24, 48 bars. Primary economic windows 6 and 12 (30–60 minutes)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "HAC t-stats with lags = horizon because forward returns overlap. BH-FDR 10% on IS." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Promotion: FDR + IS net ",
							">",
							" 0 after 2.5 pips + validation same sign + yearly breadth."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "179 recorded comparisons. 0 promoted. 111 statistically interesting and below cost." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "VWAP skipped: HistData volume is zero. Do not invent a volume series." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-fg",
					children: "Phase 2 is not an optimizer. It is the test of whether a genuine conditional M5 mean-reversion edge exists at all. It does not, under these costs."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "If you still want to iterate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Do not spend another cycle retuning M5 1:2 Z-score stops, lookbacks, or overlay filters. Phase 2 already asked whether any economically sensible condition rescues the residual. None cleared the cost hurdle. If you continue, change the question: raw hour-of-day seasonality as its own family, range-break continuation on M15–H1 where 2.5 pips is a smaller fraction of the move, or a cross-asset residual if a second series can be aligned without lookahead."
			})] })
		]
	});
}
//#endregion
export { Protocol as component };
