import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./router-GA0KNnSl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-W5_0_Dl3.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("min-w-0 max-w-full overflow-x-auto rounded-xl bg-surface p-5 shadow-border sm:p-6", className),
		children
	});
}
function CardHeader({ title, kicker, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-4 flex flex-wrap items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-xs font-medium uppercase tracking-[0.14em] text-subtle",
			children: kicker
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-medium tracking-tight text-balance text-fg",
			children: title
		})] }), action]
	});
}
//#endregion
export { CardHeader as n, Card as t };
