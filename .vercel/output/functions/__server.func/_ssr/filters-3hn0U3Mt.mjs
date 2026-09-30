import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as pct, i as num, r as int } from "./router-GA0KNnSl.mjs";
import { n as CardHeader, t as Card } from "./card-W5_0_Dl3.mjs";
import { i as research } from "./research-CvxjS7vv.mjs";
import { t as Badge } from "./badge-C0UO17SE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/filters-3hn0U3Mt.js
var import_jsx_runtime = require_jsx_runtime();
function Filters() {
	const f = research.filters;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: "Stage 3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Filter comparison"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							"Core parameters frozen at the least-bad IS set. Each filter is toggled alone. Retention was judged on ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "validation" }),
							", not OOS. ",
							f.retention_rule
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Chosen stack",
					kicker: "Simplest thing that survived"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-lg text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						children: f.chosen
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "no additive filter" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: f.chosen_note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Mean-reversion folklore says “only trade when ADX is low / ER is choppy / session is London.” On this tape those rules change the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "size" }),
						" of the loss. They do not flip the sign of expectancy on validation."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Every filter, same parameters",
				kicker: "VAL used to retain · OOS reported cold"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[56rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs uppercase tracking-wider text-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Filter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Family"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "VAL n"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "VAL E"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Δ VAL E"
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
								children: "Δ OOS E"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "OOS WR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Keep?"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: f.table.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-xs text-fg",
									children: row.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-w-[16rem] text-xs text-subtle",
									children: row.note
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-muted",
								children: row.family
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums",
								children: int(row.val.trades)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums text-negative",
								children: num(row.val.expectancy_r, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums",
								children: num(row.val_delta_e ?? 0, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums",
								children: int(row.oos.trades)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums text-negative",
								children: num(row.oos.expectancy_r, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums",
								children: num(row.oos_delta_e, 3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono tabular-nums",
								children: pct(row.oos.win_rate)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: row.retained ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "good",
									children: "yes"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "no" })
							})
						]
					}, row.name)) })]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "News filter",
				kicker: "Mandatory module, historically untested"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: [
					"High-impact EUR/USD event blackouts are implemented in the EA (MT5 economic calendar + CSV fallback). They were ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "font-medium text-fg",
						children: "not"
					}),
					" validated on 2016–2026 because no reliable dated event tape was available in this environment. Pretending otherwise would be a methodology failure. Enable the filter on demo if you want operational caution; do not credit it with historical edge."
				]
			})] })
		]
	});
}
//#endregion
export { Filters as component };
