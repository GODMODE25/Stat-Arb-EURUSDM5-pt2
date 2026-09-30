import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as num } from "./router-GA0KNnSl.mjs";
import { i as research } from "./research-CvxjS7vv.mjs";
import { a as Area, c as Cell, i as XAxis, l as ResponsiveContainer, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-CJKTwQmX.js
var import_jsx_runtime = require_jsx_runtime();
var tooltipStyle = {
	background: "#141518",
	border: "1px solid rgba(255,255,255,0.08)",
	borderRadius: 8,
	fontSize: 12,
	color: "#ecece8"
};
function EquityChart() {
	const data = research.candidate.equity_curve;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full sm:h-72",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "eq",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#b45a4e",
							stopOpacity: .28
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#b45a4e",
							stopOpacity: 0
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "rgba(255,255,255,0.06)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "t",
						tick: {
							fill: "#9a9aa3",
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						minTickGap: 48
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "#9a9aa3",
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						tickFormatter: (v) => `${Math.round(v / 1e3)}k`,
						width: 40
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						formatter: (v) => [`${Number(v).toFixed(0)}`, "Equity"],
						labelFormatter: (l) => String(l)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "equity",
						stroke: "#b45a4e",
						strokeWidth: 1.6,
						fill: "url(#eq)"
					})
				]
			})
		})
	});
}
function YearlyChart() {
	const data = research.candidate.yearly.map((y) => ({
		year: String(y.year),
		e: Number(y.expectancy_r.toFixed(3))
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
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
						width: 44
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						formatter: (v) => [`${v}R`, "Expectancy"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "e",
						radius: [
							4,
							4,
							0,
							0
						],
						children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.e >= 0 ? "#6b8f71" : "#b45a4e" }, d.year))
					})
				]
			})
		})
	});
}
function Heatmap() {
	const cells = research.stability.lookback_z;
	const zs = [...new Set(cells.map((c) => c.z_entry))].sort((a, b) => a - b);
	const lbs = [...new Set(cells.map((c) => c.lookback))].sort((a, b) => a - b);
	const min = Math.min(...cells.map((c) => c.oos_e));
	const max = Math.max(...cells.map((c) => c.oos_e));
	function color(e) {
		const t = (e - min) / Math.max(1e-9, max - min);
		return `rgb(${Math.round(180 - t * 40)},${Math.round(50 + t * 40)},${Math.round(50 + t * 20)})`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[28rem] border-separate border-spacing-1 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "text-left text-xs font-medium text-subtle",
				children: "Lookback \\\\ Z"
			}), zs.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "text-xs font-medium text-muted",
				children: z
			}, z))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lbs.map((lb) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "pr-2 text-left font-mono text-xs tabular-nums text-muted",
				children: lb
			}), zs.map((z) => {
				const cell = cells.find((c) => c.lookback === lb && c.z_entry === z);
				if (!cell) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {}, z);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md px-1 py-2 font-mono text-[11px] tabular-nums text-fg",
					style: { background: color(cell.oos_e) },
					title: `IS ${cell.is_e.toFixed(3)}R n=${cell.is_n} · OOS ${cell.oos_e.toFixed(3)}R n=${cell.oos_n}`,
					children: num(cell.oos_e, 3)
				}) }, z);
			})] }, lb)) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted",
			children: "Cell color is OOS expectancy (all cells are negative). Darker red is worse. Hover for IS vs OOS."
		})]
	});
}
//#endregion
export { Heatmap as n, YearlyChart as r, EquityChart as t };
