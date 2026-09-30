import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as pct, i as num, n as cn, o as rUnit, r as int } from "./router-GA0KNnSl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/metrics-CDos1Jyr.js
var import_jsx_runtime = require_jsx_runtime();
function Metric({ label, value, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.12em] text-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 font-mono text-lg tabular-nums sm:text-xl", tone === "good" && "text-positive", tone === "bad" && "text-negative", (!tone || tone === "neutral") && "text-fg"),
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
function eTone(x) {
	if (x > .005) return "good";
	if (x < -.005) return "bad";
	return "neutral";
}
function MetricsGrid({ m, compact }) {
	const items = [
		{
			label: "Trades",
			value: int(m.trades)
		},
		{
			label: "Win rate",
			value: pct(m.win_rate),
			tone: m.win_rate >= .45 ? "good" : "bad"
		},
		{
			label: "Expectancy",
			value: rUnit(m.expectancy_r),
			tone: eTone(m.expectancy_r)
		},
		{
			label: "Profit factor",
			value: num(m.profit_factor, 2),
			tone: eTone(m.profit_factor - 1)
		},
		{
			label: "Avg win",
			value: rUnit(m.avg_win_r, 2)
		},
		{
			label: "Avg loss",
			value: rUnit(m.avg_loss_r, 2)
		},
		{
			label: "Payoff",
			value: num(m.payoff, 2)
		},
		{
			label: "Max DD (1% risk)",
			value: `${num(m.max_dd_pct_1pct_risk, 1)}%`,
			tone: "bad"
		}
	];
	const shown = compact ? items.slice(0, 4) : items;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-4", compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"),
		children: shown.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, { ...it }, it.label))
	});
}
function ExitMix({ m }) {
	const rows = [
		{
			k: "Stop-loss",
			v: m.sl_share
		},
		{
			k: "Take-profit",
			v: m.tp_share
		},
		{
			k: "Time stop",
			v: m.time_stop_share
		},
		{
			k: "Z-exit",
			v: m.z_exit_share
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: r.k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono tabular-nums text-fg",
				children: pct(r.v)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-accent/80",
				style: { width: `${Math.max(0, Math.min(100, r.v * 100))}%` }
			})
		})] }, r.k))
	});
}
//#endregion
export { eTone as i, Metric as n, MetricsGrid as r, ExitMix as t };
