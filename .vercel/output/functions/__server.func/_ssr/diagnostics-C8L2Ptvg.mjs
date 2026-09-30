import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as num, n as cn, r as int } from "./router-GA0KNnSl.mjs";
import { n as CardHeader, t as Card } from "./card-W5_0_Dl3.mjs";
import { c as Cell, i as XAxis, l as ResponsiveContainer, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, u as Tooltip } from "../_libs/recharts+[...].mjs";
import { t as Badge } from "./badge-C0UO17SE.mjs";
import { t as buttonVariants } from "./button-CZS0G1HI.mjs";
import { t as diagnostics } from "./diagnostics-CftAWU7D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnostics-C8L2Ptvg.js
var import_jsx_runtime = require_jsx_runtime();
var CLASS_TONE = {
	promising: "good",
	interesting_uneconomic: "warn",
	weak: "neutral",
	rejected: "bad"
};
var CLASS_LABEL = {
	promising: "Potentially promising",
	interesting_uneconomic: "Interesting, not tradable",
	weak: "Weak / inconclusive",
	rejected: "Rejected"
};
var tooltipStyle = {
	background: "#141518",
	border: "1px solid rgba(255,255,255,0.08)",
	borderRadius: 8,
	fontSize: 12,
	color: "#ecece8"
};
function pip(v, d = 2) {
	if (v == null || !Number.isFinite(v)) return "—";
	const s = v.toFixed(d);
	return v > 0 ? `+${s}` : s;
}
function HypTable({ rows, showHoldout = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 max-w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[48rem] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "text-xs uppercase tracking-wider text-subtle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "Condition"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "h"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "IS n"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "IS gross"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "IS net"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "t HAC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "VAL gross"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "OOS"
					}),
					showHoldout ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "Holdout"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 font-medium",
						children: "Class"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-2 pr-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-fg",
							children: r.description
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[11px] text-subtle",
							children: r.id
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 font-mono tabular-nums",
						children: r.horizon_bars
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 font-mono tabular-nums",
						children: int(r.is.n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("py-2 font-mono tabular-nums", (r.is.mean ?? 0) >= 0 ? "text-positive" : "text-negative"),
						children: pip(r.is.mean)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 font-mono tabular-nums text-negative",
						children: pip(r.is.net_base)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 font-mono tabular-nums",
						children: r.is.t_hac == null ? "—" : num(r.is.t_hac, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 font-mono tabular-nums",
						children: pip(r.val.mean)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 font-mono tabular-nums",
						children: pip(r.oos.mean)
					}),
					showHoldout ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 font-mono tabular-nums",
						children: pip(r.holdout.mean)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: CLASS_TONE[r.class] ?? "neutral",
							children: CLASS_LABEL[r.class] ?? r.class
						})
					})
				]
			}, r.id)) })]
		})
	});
}
function DiagnosticsPage() {
	const d = diagnostics;
	const acf = d.market.return_acf.map((r) => ({
		lag: String(r.lag),
		is: r.acf_is,
		val: r.acf_val,
		oos: r.acf_oos
	}));
	const buckets = [...new Set(d.z_buckets_all_horizons_is_mean.map((x) => x.bucket))];
	const horiz = [...new Set(d.z_buckets_all_horizons_is_mean.map((x) => x.horizon))].sort((a, b) => a - b);
	const hours = [...d.hours].sort((a, b) => Number(a.id.split("|")[1]) - Number(b.id.split("|")[1]));
	const caseStudy = d.z_buckets_h6.find((x) => x.id.includes("2–2.5")) ?? d.z_buckets_h6[3];
	const familyCounts = d.hypothesis_index.reduce((acc, h) => {
		acc[h.family] = (acc[h.family] ?? 0) + 1;
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "Phase 2 · frozen splits"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Conditional diagnostics"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: "Not a second attempt to fit the 1:2 EA. This phase asks whether EURUSD M5 has any condition-dependent mean-reversion effect large enough to live after 2.5 pips of friction."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "bad",
								children: d.meta.verdict.replaceAll("_", " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [d.meta.n_hypotheses, " hypotheses"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
								"FDR 10% · ",
								d.meta.n_fdr_is,
								" IS flags"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Promoted ", d.counts.promising] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-subtle",
							children: "Lag-1 ACF (IS)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-2xl tabular-nums text-fg",
							children: num(d.market.return_acf[0].acf_is, 4)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								"VAL ",
								num(d.market.return_acf[0].acf_val, 4),
								" · OOS ",
								num(d.market.return_acf[0].acf_oos, 4)
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-subtle",
							children: "Z AR(1) half-life"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-2xl tabular-nums",
							children: [d.market.z_ar1.half_life_bars, " bars"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								"≈ ",
								d.market.z_ar1.half_life_bars ? Math.round(d.market.z_ar1.half_life_bars * 5) : "—",
								" minutes"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-subtle",
							children: "M5 ATR (IS)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-2xl tabular-nums",
							children: [num(d.market.atr_pips_mean_is, 2), " pips"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								"1-bar σ ",
								num(d.market.ret1_std_pips_is, 2),
								" pips"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-subtle",
							children: "Cost hurdle"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-2xl tabular-nums",
							children: [num(d.meta.cost_pips.base, 1), " pips"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								"opt ",
								d.meta.cost_pips.optimistic,
								" · stress ",
								d.meta.cost_pips.adverse
							]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					kicker: "Executive summary",
					title: "Mild reversion is real. It is not a business."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: d.meta.key_findings.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm leading-relaxed sm:text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 font-mono text-xs text-subtle",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: f
						})]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: d.meta.tradable_definition
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						d.meta.hac_note,
						" Lookback ",
						d.meta.lookback,
						" on typical price, pre-declared."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Holdout used for selection: ",
						d.meta.holdout_used_for_selection ? "yes" : "no",
						". OOS used for selection: ",
						d.meta.oos_used_for_selection ? "yes" : "no",
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					kicker: "Classification (IS + validation only)",
					title: "Nothing promoted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-4",
					children: [
						["promising", "Must be net>0 after 2.5 pips, FDR, VAL same sign, yearly breadth"],
						["interesting_uneconomic", "Often statistically nonzero. Gross move < cost"],
						["weak", "Mixed signs, small n, or no IS edge"],
						["rejected", "Wrong sign vs reversion, or indistinguishable from zero"]
					].map(([k, hint]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-elevated p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-2xl tabular-nums",
								children: d.counts[k]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-fg",
								children: CLASS_LABEL[k]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: hint
							})
						]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-5 text-sm font-medium text-fg",
					children: "Every comparison was recorded"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-4",
					children: Object.entries(familyCounts).map(([fam, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between rounded-lg bg-elevated px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: fam
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular-nums",
							children: n
						})]
					}, fam))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					kicker: "Market structure",
					title: "Autocorrelation decays in a few bars"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: acf,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "rgba(255,255,255,0.06)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "lag",
									tick: {
										fill: "#9a9aa3",
										fontSize: 11
									},
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "#9a9aa3",
										fontSize: 11
									},
									tickLine: false,
									axisLine: false,
									width: 44
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "is",
									name: "IS",
									fill: "#c5ccd6",
									radius: [
										3,
										3,
										0,
										0
									]
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"ATR autocorrelation at lag 1 is ",
						num(d.market.atr_acf_is[0].acf_is, 3),
						" — volatility clusters hard. Price itself has AR(1) φ ≈ 1 (half-life tens of thousands of bars). The Z-score mean-reverts with half-life ",
						d.market.z_ar1.half_life_bars,
						" bars, too slow for a 15-pip / 30-minute scalp and too small versus 2.5 pips. ",
						d.market.vwap,
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					kicker: "Deviation magnitude × horizon",
					title: "IS gross pips, signed reversion"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 max-w-full overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[32rem] border-separate border-spacing-1 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left text-xs font-medium text-subtle",
							children: "|Z| \\ h"
						}), horiz.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-xs font-medium text-muted",
							children: h
						}, h))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: buckets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "pr-2 text-left font-mono text-xs text-muted",
							children: b
						}), horiz.map((h) => {
							const cell = d.z_buckets_all_horizons_is_mean.find((x) => x.bucket === b && x.horizon === h);
							const v = cell?.is_mean;
							const bg = `rgba(107, 143, 113, ${.08 + (v == null ? 0 : Math.max(0, Math.min(1, (v + .1) / .7))) * .45})`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-md px-1 py-2 font-mono text-[11px] tabular-nums",
								style: { background: v != null && v < 0 ? "rgba(180,90,78,0.25)" : bg },
								title: `n=${cell?.is_n} t=${cell?.is_t} net=${cell?.net_base}`,
								children: pip(v)
							}) }, h);
						})] }, b)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Peak IS cells are still ~0.3 pips. Net after 2.5 is about −2.2. Larger |Z| is not monotonically better at h=12: the 3+ bucket fades. Do not read the green tint as profitability — it is gross only, and every net is negative."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Z-score buckets at 6 and 12 bars",
					kicker: "Primary economic horizons"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-sm text-muted",
					children: "6 bars (30 minutes)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.z_buckets_h6 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 mt-6 text-sm text-muted",
					children: "12 bars (60 minutes)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.z_buckets_h12 })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						kicker: "Worked example · not a candidate",
						title: `${caseStudy.description}, h=${caseStudy.horizon_bars}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "grid gap-2 text-sm sm:grid-cols-2",
						children: [
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
							["Adverse net", pip(caseStudy.is.net_adv)]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3 rounded-lg bg-elevated px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-mono tabular-nums text-fg",
								children: v
							})]
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Statistically nonzero on overlapping 30-minute forwards. Economically, the entire gross move is about one-twelfth of round-turn cost. Optimistic 1.4 pip costs still leave it negative."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						kicker: "IS years only",
						title: "Yearly stability of that cell"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: (caseStudy.yearly_is ?? []).map((y) => ({
									year: String(y.year),
									mean: y.mean,
									n: y.n
								})),
								margin: {
									top: 8,
									right: 8,
									left: 0,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "rgba(255,255,255,0.06)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "year",
										tick: {
											fill: "#9a9aa3",
											fontSize: 11
										},
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fill: "#9a9aa3",
											fontSize: 11
										},
										tickLine: false,
										axisLine: false,
										width: 40
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "mean",
										radius: [
											3,
											3,
											0,
											0
										],
										children: (caseStudy.yearly_is ?? []).map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: y.mean >= 0 ? "#6b8f71" : "#b45a4e" }, y.year))
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Sign is not uniform across IS years. A cell that cannot pay 2.5 pips even in its better years is not a candidate, regardless of a large t-statistic on the pooled sample."
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Distance from the rolling mean, in pips",
				kicker: "h = 6"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.pip_distance.filter((x) => x.horizon_bars === 6) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						title: "Sessions, |Z|≥2",
						kicker: "Validation is allowed to veto folklore"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.sessions.filter((x) => x.horizon_bars === 6) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "London IS gross +0.26 pips flips negative on validation. Asia keeps sign and still cannot pay the spread. Session transitions (London/NY open) look better on IS and fail VAL — small-n mining, not an edge."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Weekday, |Z|≥2, h=6",
					kicker: "Exploratory only"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.weekdays.filter((x) => x.is.n > 0) })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "Hour of day (Eastern wall clock), |Z|≥2, h=6" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: hours.map((h) => ({
								hr: h.id.split("|")[1],
								mean: h.is.mean ?? 0,
								n: h.is.n
							})),
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "rgba(255,255,255,0.06)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "hr",
									tick: {
										fill: "#9a9aa3",
										fontSize: 10
									},
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "#9a9aa3",
										fontSize: 11
									},
									tickLine: false,
									axisLine: false,
									width: 40
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "mean",
									radius: [
										3,
										3,
										0,
										0
									],
									children: hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: (h.is.mean ?? 0) >= 0 ? "#6b8f71" : "#b45a4e" }, h.id))
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Hours 17–18 ET print ~1.5 pips gross (n≈400–500) and still net about −1 pip. That window is broker rollover — the study already treats it as untradeable, and the cost model of 2.5 pips is optimistic there. Hour 08 (NY open) is +0.94 IS and −0.54 VAL."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "Volatility, trend, and efficiency, |Z|≥2, h=6" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-sm text-muted",
					children: "Vol terciles (cut on IS only, applied forward)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.vol_regimes.filter((x) => x.horizon_bars === 6 && x.id.includes("|z2|")) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 mt-6 text-sm text-muted",
					children: "H1 ADX and |slope|"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.trend.filter((x) => x.horizon_bars === 6) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 mt-6 text-sm text-muted",
					children: "Kaufman efficiency ratio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.efficiency.filter((x) => x.horizon_bars === 6) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "The ranging / low-vol overlay does not help. High-vol and strong-ADX states produce larger pip reversions because the tape is moving more — still far below cost. Mean-reversion folklore that says “only fade when ADX is low” is not supported on this sample. Choppy ER does not rescue it."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						title: "Momentum state",
						kicker: "Extended vs already fading"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.momentum_state }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "If the last six bars already faded, buying the dip is late: IS mean −0.33 pips. Extremes that are still extending revert a bit more (+0.27) — still −2.2 net."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Raw momentum (not flipped)",
					kicker: "h = 6 subsequent pips"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.momentum })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Pre-declared interactions",
				kicker: "Seven economic stories, not a search"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.interactions })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "Time since the extreme, streaks, expansion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: [
				...d.time_since.filter((x) => x.horizon_bars === 6),
				...d.streaks.filter((x) => x.horizon_bars === 6),
				...d.range_expand.filter((x) => x.horizon_bars === 6)
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Largest IS gross effects that still fail the cost test",
					kicker: "Not a ranking of 'best strategies'"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HypTable, { rows: d.interesting_uneconomic.slice(0, 12) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Even the top IS hours would need round-turn costs under ~1.5 pips in the worst spread window of the day. That is not a live ECN. Optimistic 1.4 pip costs still leave most of this list negative."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Final research decision",
					kicker: "Seven questions, answered from IS+VAL"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "space-y-3 text-sm",
					children: [
						["Is there evidence of conditional M5 mean reversion?", String(d.decision.has_conditional_mr)],
						["Large enough to survive realistic costs?", d.decision.survives_costs ? "Yes" : "No"],
						["Stable across time?", d.decision.stable_across_time ? "Yes" : "No — ACF and several session effects shrink or flip after 2021"],
						["Frequent enough?", d.decision.frequent_enough ? "Yes — |Z|≥2 is common. Frequency is not the bottleneck." : "No"],
						["Simple enough to trade?", d.decision.simple_enough ? "Yes, the rules are simple. Simplicity does not create edge." : "No"],
						["Build a candidate strategy?", d.decision.build_candidate_strategy ? "Yes" : "No"]
					].map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 border-b border-border py-2 sm:grid-cols-[minmax(0,16rem)_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-fg",
							children: a
						})]
					}, q))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-fg",
					children: d.decision.reason
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-5 text-sm font-medium text-fg",
					children: "What to investigate next"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-disc space-y-1 pl-4 text-sm text-muted",
					children: d.decision.next.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/research/diagnostics.json",
						download: true,
						className: cn(buttonVariants()),
						children: "diagnostics.json"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/baseline",
						className: cn(buttonVariants({ variant: "secondary" })),
						children: "Phase 1 baseline"
					})]
				})
			] })
		]
	});
}
//#endregion
export { DiagnosticsPage as component };
