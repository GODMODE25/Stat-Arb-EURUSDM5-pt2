import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as pct, i as num, r as int } from "./router-GA0KNnSl.mjs";
import { n as CardHeader, t as Card } from "./card-W5_0_Dl3.mjs";
import { a as slLabel, i as research, o as splits, r as priceLabel, t as confirmLabel } from "./research-CvxjS7vv.mjs";
import { n as Heatmap, r as YearlyChart, t as EquityChart } from "./charts-CJKTwQmX.mjs";
import { r as MetricsGrid, t as ExitMix } from "./metrics-CDos1Jyr.mjs";
import { t as Badge } from "./badge-C0UO17SE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/candidate-CmvCV5PX.js
var import_jsx_runtime = require_jsx_runtime();
function Candidate() {
	const c = research.candidate;
	const cfg = c.cfg;
	const mc = research.monte_carlo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "Stages 4–5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Least-bad candidate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: "Not a validated system. This is the configuration that lost the least in-sample after costs, with validation and OOS reported honestly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "bad",
								children: "Not validated"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Filter: ", c.filter] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Win-rate ≥45% OOS: ", c.win_rate_target_45_met ? "yes" : "no"] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Exact parameter set",
				kicker: c.id
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-4",
				children: [
					["Price", priceLabel(cfg.price)],
					["Lookback", String(cfg.lookback)],
					["Z entry", String(cfg.z_entry)],
					["Confirm", confirmLabel(cfg.confirm)],
					["SL", slLabel(cfg)],
					["TP", `${cfg.tp_rr} × SL`],
					["Max hold", `${cfg.max_hold} bars`],
					["Cooldown", `${cfg.cooldown} bars`],
					["Z-exit", cfg.z_exit === 0 ? "off" : String(cfg.z_exit)],
					["Risk", "1% current equity"],
					["Magic", String(research.ea.magic)]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-elevated px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-subtle",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 font-mono text-fg",
						children: v
					})]
				}, k))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: splits.map((s) => {
					const m = s.key === "extra_2026" ? c.extra_2026 : c[s.key];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						kicker: s.hint,
						title: `${s.label} · ${s.range}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricsGrid, {
						m,
						compact: true
					})] }, s.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Compounded 1% equity",
				kicker: "Full tape, base costs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquityChart, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						title: "Year by year",
						kicker: "No rescue year"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearlyChart, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-xs uppercase tracking-wider text-subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "Year"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "n"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "WR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "E"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "PF"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: c.yearly.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1.5 font-mono",
										children: y.year
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1.5 font-mono tabular-nums",
										children: int(y.trades)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1.5 font-mono tabular-nums",
										children: pct(y.win_rate)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1.5 font-mono tabular-nums text-negative",
										children: num(y.expectancy_r, 3)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1.5 font-mono tabular-nums",
										children: num(y.profit_factor, 2)
									})
								]
							}, y.year)) })]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "Exit mix · full sample" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExitMix, { m: c.full })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Lookback × Z heatmap",
				kicker: "OOS expectancy (all negative)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heatmap, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Stop distance",
				kicker: "Monotone in the wrong direction"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[36rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs uppercase tracking-wider text-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "SL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "IS n"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "IS E"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "OOS n"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "OOS E"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "OOS PF"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: research.stability.stops.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums",
								children: int(s.is.trades)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums text-negative",
								children: num(s.is.expectancy_r, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums",
								children: int(s.oos.trades)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums text-negative",
								children: num(s.oos.expectancy_r, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums",
								children: num(s.oos.profit_factor, 2)
							})
						]
					}, s.label)) })]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Walk-forward",
					kicker: "12-month train / 3-month test, step 3 months"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: research.walk_forward.design
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricsGrid, {
					m: research.walk_forward.aggregate,
					compact: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Train windows with E>0:",
						" 0 / ",
						research.walk_forward.windows.length,
						". ",
						"Test windows with E>0:",
						" ",
						research.walk_forward.windows.filter((w) => w.test.expectancy_r > 0).length,
						" /",
						" ",
						research.walk_forward.windows.length,
						" (noise, not a system). Lookbacks used:",
						" ",
						research.walk_forward.param_drift.lookback_unique.join(", "),
						". Z mode",
						" ",
						research.walk_forward.param_drift.z_mode,
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Monte Carlo",
					kicker: mc.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McBlock, {
							title: "OOS IID bootstrap (1,000 paths)",
							data: mc.oos_iid
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McBlock, {
							title: "Full-sample IID",
							data: mc.full_iid
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McBlock, {
							title: "OOS haircut winners −15% / fatten losses +15%",
							data: mc.oos_haircut_winners_15_fatten_losses_15
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(McBlock, {
							title: "OOS block bootstrap (block=8)",
							data: mc.oos_block_bootstrap
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "At 1% risk, the probability of a 20% drawdown on the OOS trade list is 100%, and the probability of halving the account is 99.8%. Monte Carlo is not a way to rescue a negative stream."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "Limitations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "list-disc space-y-1 pl-4 text-sm text-muted",
				children: research.limitations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l }, l))
			})] })
		]
	});
}
function McBlock({ title, data }) {
	if (!data || data.paths === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-elevated p-3 text-sm text-muted",
		children: [title, ": insufficient trades"]
	});
	const rows = [
		["Median end equity", data.median_end_equity],
		["5th pct end equity", data.p05_end_equity],
		["Median max DD", data.median_max_dd_pct != null ? `${data.median_max_dd_pct}%` : data.median_max_dd_pct],
		["95th pct max DD", data.p95_max_dd_pct != null ? `${data.p95_max_dd_pct}%` : data.p95_max_dd_pct],
		["P(DD ≥ 20%)", data.prob_dd_ge_20pct],
		["P(equity < 50%)", data.prob_equity_below_50pct]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-elevated p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-medium text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-2 space-y-1 text-sm",
			children: rows.filter(([, v]) => v !== void 0).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "font-mono tabular-nums text-fg",
					children: String(v)
				})]
			}, k))
		})]
	});
}
//#endregion
export { Candidate as component };
