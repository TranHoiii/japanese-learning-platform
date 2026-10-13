// Generates src/dark.css : dark-mode overrides for the Washi & Ai-iro theme.
// Usage (from /frontend):  node <this file>
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("src");
const OUT = path.join(SRC, "dark.css");

/* ---------- colour maths ---------- */
const hexToRgb = (h) => {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const rgbToHsl = ([r, g, b]) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
};
const hslToRgb = ([h, s, l]) => {
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map((v) => Math.round(v * 255));
};
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/** map a light-theme colour to its dark-theme counterpart for a given role */
function darken(hex, role) {
  const [h, s, l] = rgbToHsl(hexToRgb(hex));
  let nl = l;
  let ns = s;
  if (role === "bg") {
    if (l >= 0.55) { nl = 0.07 + (1 - l) * 0.45; ns = s * 0.7; }
    else if (l < 0.2) nl = 0.3;
    else nl = Math.min(0.6, l + 0.06);
  } else if (role === "border") {
    if (l >= 0.5) { nl = 0.13 + (1 - l) * 0.55; ns = s * 0.7; }
  } else if (role === "text") {
    if (l >= 0.92) nl = l;
    else { nl = Math.max(0.7, 1 - l * 0.95); ns = Math.min(1, s * 0.9); }
  }
  return hslToRgb([h, ns, clamp(nl, 0, 1)]);
}

const ROLE = { bg: "bg", from: "bg", via: "bg", to: "bg", text: "text", decoration: "text", placeholder: "text", border: "border", divide: "border", ring: "border", outline: "border" };
const PROP = (p) => ({ bg: "background-color", text: "color", decoration: "text-decoration-color", border: "border-color", divide: "border-color", ring: "--tw-ring-color", outline: "outline-color", from: "--tw-gradient-from", via: "--tw-gradient-via", to: "--tw-gradient-to", placeholder: "color" })[p];

const esc = (s) => s.replace(/[^a-zA-Z0-9_-]/g, (c) => "\\" + c);
const BP = { sm: 640, md: 768, lg: 1024, xl: 1280 };

/* ---------- scan sources ---------- */
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx|ts)$/.test(e.name)) files.push(p);
  }
})(SRC);

const tokenRe = /(?<![\w:\[-])((?:[a-z0-9-]+:)*)(bg|text|border|divide|ring|outline|from|via|to|decoration|placeholder|border-[trblxy])-\[#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\](\/\d+)?/g;
const seen = new Map();
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(tokenRe)) seen.set(m[0], m);
}

const plain = [];
const responsive = { sm: [], md: [], lg: [], xl: [] };
for (const [token, m] of seen) {
  const variants = m[1] ? m[1].split(":").filter(Boolean) : [];
  let prefix = "", suffix = "", media = null, ok = true;
  for (const v of variants) {
    if (v === "hover") suffix += ":hover";
    else if (v === "focus") suffix += ":focus";
    else if (v === "focus-visible") suffix += ":focus-visible";
    else if (v === "active") suffix += ":active";
    else if (v === "disabled") suffix += ":disabled";
    else if (v === "group-hover") prefix = ".group:hover ";
    else if (BP[v]) media = v;
    else if (v === "dark") ok = false;
    else ok = false;
  }
  if (!ok) continue;
  const utility = m[2].startsWith("border-") ? "border" : m[2];
  const role = ROLE[utility];
  const [r, g, b] = darken(m[3], role);
  const alpha = m[4] ? (parseInt(m[4].slice(1), 10) / 100).toString() : null;
  const val = alpha ? `rgb(${r} ${g} ${b} / ${alpha})` : `rgb(${r} ${g} ${b})`;
  let sel = `.dark ${prefix}.${esc(token)}${utility === "placeholder" ? "::placeholder" : suffix}`;
  if (utility === "placeholder") sel = `.dark ${prefix}.${esc(token)}::placeholder`;
  let rule;
  if (utility === "divide") rule = `.dark ${prefix}.${esc(token)} > :not(:last-child){border-color:${val}}`;
  else if (m[2] === "border-x" || m[2] === "border-y" || /^border-[trbl]$/.test(m[2]))
    rule = `${sel}{${{ "border-t": "border-top-color", "border-r": "border-right-color", "border-b": "border-bottom-color", "border-l": "border-left-color", "border-x": "border-inline-color", "border-y": "border-block-color" }[m[2]]}:${val}}`;
  else rule = `${sel}{${PROP(utility)}:${val}}`;
  (media ? responsive[media] : plain).push(rule);
}

/* ---------- theme palettes ---------- */
const light = {};
const css = fs.readFileSync(path.join(SRC, "index.css"), "utf8");
for (const m of css.matchAll(/--color-([a-z]+)-(\d+):\s*(#[0-9A-Fa-f]{6});/g)) light[`${m[1]}-${m[2]}`] = m[3];

const dark = {
  slate: { 50: "#FAF7F1", 100: "#F4EFE6", 200: "#E8E1D3", 300: "#D5CCBC", 400: "#B8AC98", 500: "#887C68", 600: "#554D3F", 700: "#383126", 800: "#252018", 900: "#181510", 950: "#0E0C09" },
  indigo: { 50: "#17213A", 100: "#1C2A4A", 200: "#263A66", 700: "#A5BEE6", 800: "#BFD1F0", 900: "#D6E2F6" },
  rose: { 50: "#34161F", 100: "#45182A", 200: "#61213A", 700: "#FF9DB6", 800: "#FFB5C7", 900: "#FFCCD8" },
  emerald: { 50: "#172114", 100: "#1E2C19", 200: "#2B4023", 700: "#B4D68C", 800: "#C9E3A9", 900: "#DDEEC9" },
  amber: { 50: "#2B2010", 100: "#3A2B12", 200: "#54401A", 700: "#F8CE6A", 800: "#FBDC93", 900: "#FDE9B8" },
  sky: { 50: "#122538", 100: "#172F48", 200: "#204266", 700: "#92C5FD", 800: "#BEDAFE", 900: "#DBEAFF" },
  purple: { 50: "#261633", 100: "#331C44", 200: "#482660", 700: "#D4B3F7", 800: "#E2CCFA", 900: "#EFE5FC" },
};
dark.gray = dark.slate;
dark.primary = dark.indigo;
dark.sakura = { 50: dark.rose[50], 100: dark.rose[100], 200: dark.rose[200], 700: dark.rose[700] };

const fallbackHex = {
  "sky-600": "#0284c7", "sky-700": "#0369a1", "sky-800": "#075985", "sky-900": "#0c4a6e",
  "purple-600": "#9333ea", "purple-700": "#7e22ce", "purple-800": "#6b21a8", "purple-900": "#581c87",
};

let vars = "";
for (const [name, shades] of Object.entries(dark))
  for (const [shade, hex] of Object.entries(shades)) vars += `  --color-${name}-${shade}: ${hex};\n`;

// Strong backgrounds (700-900) were light-theme "dark buttons"; keep them dark so white text stays readable.
let keepBg = "";
for (const name of ["indigo", "rose", "emerald", "amber", "primary", "sakura", "sky", "purple"])
  for (const shade of [600, 700, 800, 900]) {
    const hex = light[`${name}-${shade}`] || fallbackHex[`${name}-${shade}`];
    if (!hex) continue;
    keepBg += `.dark .bg-${name}-${shade},.dark .hover\\:bg-${name}-${shade}:hover{background-color:${hex}}\n`;
  }
const slateBg = [["950", "#0E0C09"], ["900", "#2B261E"], ["800", "#352F25"], ["700", "#40392D"]]
  .map(([s, hex]) => `.dark .bg-slate-${s},.dark .hover\\:bg-slate-${s}:hover,.dark .bg-gray-${s},.dark .hover\\:bg-gray-${s}:hover{background-color:${hex}}`)
  .join("\n");

const out = `/* AUTO-GENERATED by frontend/scripts/gen-dark.mjs — dark mode for the Washi & Ai-iro theme. Do not edit by hand. */

.dark {
  color-scheme: dark;
${vars}  --color-paper: #14120F;
  --color-ink: #F4EFE6;
  --shadow-card: 0 1px 2px 0 rgba(0, 0, 0, 0.35), 0 2px 8px -2px rgba(0, 0, 0, 0.4);
  --shadow-elevated: 0 8px 22px -4px rgba(0, 0, 0, 0.55);
  --shadow-zen: 0 14px 36px -10px rgba(0, 0, 0, 0.6), 0 4px 12px -4px rgba(0, 0, 0, 0.35);
  --shadow-modal: 0 24px 48px -8px rgba(0, 0, 0, 0.7);
}

.dark:root, .dark body {
  color: #F4EFE6;
  background-color: #14120F;
}
.dark body {
  background-image:
    radial-gradient(900px 480px at 100% -10%, rgba(232, 82, 124, 0.08), transparent 60%),
    radial-gradient(800px 460px at -5% 0%, rgba(62, 105, 179, 0.12), transparent 60%);
}
.dark ::selection { background: rgba(95, 138, 203, 0.4); }
.dark rt { color: #92B2DD; }
.dark ::-webkit-scrollbar-thumb { background: #453E31; }
.dark ::-webkit-scrollbar-thumb:hover { background: #837866; }
.dark .custom-scrollbar-x { scrollbar-color: #837866 transparent; }

/* Surfaces */
.dark .surface { background: #1E1A14; border-color: #2F2A21; }
.dark .surface-hover:hover { border-color: #3F5F9E; }
.dark .skeleton-shimmer { background: linear-gradient(90deg, #201C16 25%, #2B261E 50%, #201C16 75%); background-size: 200% 100%; }
.dark .bg-white, .dark .hover\\:bg-white:hover { background-color: #1E1A14; }
.dark [class*="bg-white/6"], .dark [class*="bg-white/7"], .dark [class*="bg-white/8"], .dark [class*="bg-white/9"] { background-color: rgb(30 26 20 / 0.88); }
.dark [class*="from-white"], .dark [class*="via-white"], .dark [class*="to-white"] { --tw-gradient-to: #1E1A14; }
.dark [class*="from-white"] { --tw-gradient-from: #1E1A14; }
.dark .shadow-xs, .dark .shadow-sm, .dark .shadow-md, .dark .shadow-lg, .dark .shadow-xl, .dark .shadow-2xl { --tw-shadow-color: rgba(0, 0, 0, 0.5); }

/* Legacy dark gradient headers keep their navy look */
.dark [class*="from-slate-900"] { --tw-gradient-from: #1B2946; }
.dark [class*="via-slate-900"] { --tw-gradient-via: #1B2946; }
.dark [class*="to-slate-900"] { --tw-gradient-to: #1B2946; }
.dark [class*="from-slate-800"] { --tw-gradient-from: #213960; }
.dark [class*="to-slate-800"] { --tw-gradient-to: #213960; }
.dark [class*="from-indigo-900"] { --tw-gradient-from: #213960; }
.dark [class*="to-indigo-900"] { --tw-gradient-to: #213960; }
.dark [class*="bg-slate-900/"] { background-color: rgb(0 0 0 / 0.6); }
.dark [class*="bg-black/"] { background-color: rgb(0 0 0 / 0.7); }

${slateBg}
${keepBg}
/* Brand text/borders that were mapped with arbitrary hex in the source */
${plain.join("\n")}
${Object.entries(responsive).map(([bp, rules]) => (rules.length ? `@media (min-width: ${BP[bp]}px) {\n${rules.map((r) => "  " + r).join("\n")}\n}` : "")).join("\n")}
`;
fs.writeFileSync(OUT, out);
console.log(`dark.css written: ${seen.size} arbitrary-hex tokens scanned, ${plain.length} rules, files=${files.length}`);
