import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./router-GA0KNnSl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-C0UO17SE.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "neutral", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", tone === "neutral" && "bg-elevated text-muted", tone === "good" && "bg-positive/15 text-positive", tone === "bad" && "bg-negative/15 text-negative", tone === "warn" && "bg-warn/15 text-warn", className),
		children
	});
}
//#endregion
export { Badge as t };
