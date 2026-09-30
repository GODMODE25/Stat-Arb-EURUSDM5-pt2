import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardHeader, t as Card } from "./card-W5_0_Dl3.mjs";
import { i as research, n as formulas } from "./research-CvxjS7vv.mjs";
import { t as diagnostics } from "./diagnostics-CftAWU7D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-DSQqf1e9.js
var import_jsx_runtime = require_jsx_runtime();
function Plan() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "Stage 0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Research plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: "Written before looking at a leaderboard. The goal was to test a single-asset statistical mean-reversion hypothesis on EURUSD M5 — not to produce a profitable-looking backtest."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Hypothesis",
					kicker: "What had to be true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted sm:text-base",
					children: "Closed-bar Z-score extremes of EURUSD revert often enough that a predefined −1R stop and +2R target has positive expectancy after spread, commission, and slippage. One position at a time, 1% of current equity, no martingale or grid. Mean reversion, not trend following."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-5 grid gap-3 font-mono text-sm sm:grid-cols-2",
					children: Object.entries(formulas).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-elevated px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase tracking-wider text-subtle",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-fg",
							children: v
						})]
					}, k))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Splits",
					kicker: "Chronological, no shuffling"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-wider text-subtle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Window"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Used for"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "text-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2",
											children: "In-sample"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 font-mono",
											children: research.meta.splits.in_sample
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 text-muted",
											children: "Grid search, least-bad selection"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2",
											children: "Validation"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 font-mono",
											children: research.meta.splits.validation
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 text-muted",
											children: "Filter retention (not OOS)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2",
											children: "Out-of-sample"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 font-mono",
											children: research.meta.splits.out_of_sample
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 text-muted",
											children: "Unseen. Never used to pick params"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2",
											children: "Extra holdout"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 font-mono",
											children: research.meta.splits.extra_holdout
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 text-muted",
											children: "2026 YTD, also unseen"
										})
									]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: research.meta.selection_rule
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Assumptions vs facts",
				kicker: "Keep these apart"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium text-fg",
					children: "Facts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 list-disc space-y-1 pl-4 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "HistData ASCII EURUSD M1 bid OHLC, resampled to M5." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "791,666 M5 bars, 2016-01-03 17:00 to 2026-09-24 19:55 (Eastern wall clock)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Closed-bar signals; fill at next bar open; SL-before-TP if both in range." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "600-config baseline grid; 0 configs with IS net E > 0 after 2.5 pip costs." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium text-fg",
					children: "Assumptions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 list-disc space-y-1 pl-4 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Round-turn cost modeled, not observed tick spread." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Timestamps treated as HistData Eastern wall time (no DST correction)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Commission 0.70 pip ≈ $7 / lot RT on a USD account." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "News filter could not be historically validated (no dated event tape)." })
					]
				})] })]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "What would have counted as a candidate",
					kicker: "Gates, declared up front"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Net OOS expectancy > 0 and PF ≳ 1.15 after base costs." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "≥ 1,000 trades on the full tape; several hundred in OOS if possible." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Walk-forward aggregate still positive; parameter plateau, not a spike." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Does not collapse under adverse costs; Monte Carlo DD at 1% risk acceptable." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Win rate near 45% was desired, not forced if expectancy was better another way." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-fg",
					children: "The study did not clear those gates. The EA is still published so the test can be reproduced."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Phase 2 — do not retune the failed 1:2 spec",
					kicker: "Conditional diagnostics, same frozen splits"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed text-muted sm:text-base",
					children: [
						"After Phase 1, the next question was whether EURUSD M5 has any condition-dependent mean-reversion effect large enough to survive 2.5 pips of friction. Lookback 100, signed tradable pips, BH-FDR 10%, promotion requiring IS net ",
						">",
						" 0, validation same sign, and yearly breadth. Holdout stayed locked. ",
						diagnostics.meta.n_hypotheses,
						" pre-registered comparisons. Promoted: ",
						diagnostics.counts.promising,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-fg",
					children: [
						"Verdict: ",
						diagnostics.meta.verdict.replaceAll("_", " "),
						". A negative result is a completed study, not a cue to search harder inside the same specification."
					]
				})
			] })
		]
	});
}
//#endregion
export { Plan as component };
