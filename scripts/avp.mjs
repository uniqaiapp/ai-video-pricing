#!/usr/bin/env node
// ai-video-pricing CLI. Node 18+ built-ins only, no packages.
//
//   node scripts/avp.mjs table [filters] [--sort price|service|model|checked] [--desc] [--limit N] [--format md|text|csv|json]
//   node scripts/avp.mjs cheapest [filters] [--limit 5]        published rows, cheapest first, as text
//   node scripts/avp.mjs model "Kling 3.0"                      same model through every door
//   node scripts/avp.mjs quote --plan-price 15 --credits 625 --credits-per-second 12
//   node scripts/avp.mjs quote --plan-price 4.99 --credits 1000 --credits-per-clip 80 --seconds 5
//   node scripts/avp.mjs recompute [--write]                    recompute usd_per_second from the inputs
//   node scripts/avp.mjs validate                               schema + consistency checks, exit 1 on errors
//   node scripts/avp.mjs stale [--days 30] [--as-of YYYY-MM-DD] [--format md|text|json]
//   node scripts/avp.mjs export [--csv data/prices.csv]         regenerate the CSV from the JSON
//   node scripts/avp.mjs readme [--write]                       refresh the table between the README markers
//
// Filters: --service X --model X --maker X --door app|api --resolution 720p --audio yes|no --max 0.10 --published
// --brief with --format text keeps only price, service, model and clip (fits a narrow terminal).
// Every subcommand reads data/prices.json; nothing is fetched from the network.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const DATA = path.join(ROOT, "data", "prices.json");
export const CSV = path.join(ROOT, "data", "prices.csv");
export const SCHEMA = path.join(ROOT, "data", "schema.json");
export const README = path.join(ROOT, "README.md");

export const COLUMNS = [
  "id", "service", "door", "model", "maker", "tier", "billing",
  "plan_price_usd", "plan_credits", "price_per_credit_usd", "credits_per_clip", "credits_per_second",
  "clip_price_usd", "second_price_usd", "tokens_per_second", "usd_per_1m_tokens",
  "seconds", "resolution", "audio", "usd_per_second", "formula", "status", "approximate",
  "source_label", "source_url", "source_date", "checked_on", "notes",
];

const MARK_START = "<!-- prices:start -->", MARK_END = "<!-- prices:end -->";

// ---------- data ----------
export function load(file = DATA) { return JSON.parse(fs.readFileSync(file, "utf8")); }
export function loadSchema(file = SCHEMA) { return JSON.parse(fs.readFileSync(file, "utf8")); }
export const round3 = (x) => Math.round(x * 1000) / 1000;
const has = (r, k) => r[k] !== undefined && r[k] !== null;

// Dollars per credit for plan / pack / credit_rate rows.
export function perCredit(r) {
  if (r.billing === "credit_rate") return has(r, "price_per_credit_usd") ? r.price_per_credit_usd : null;
  if (has(r, "plan_price_usd") && has(r, "plan_credits") && r.plan_credits > 0) return r.plan_price_usd / r.plan_credits;
  return null;
}

// The one formula: price per second = (credits per clip x dollars per credit) / seconds delivered,
// or the vendor's published per-second / per-clip / per-token price. Returns null when not computable.
export function compute(r) {
  if (r.status !== "published") return null;
  switch (r.billing) {
    case "per_second": return has(r, "second_price_usd") ? r.second_price_usd : null;
    case "per_clip": return has(r, "clip_price_usd") && r.seconds > 0 ? r.clip_price_usd / r.seconds : null;
    case "per_token": return has(r, "tokens_per_second") && has(r, "usd_per_1m_tokens") ? (r.tokens_per_second * r.usd_per_1m_tokens) / 1e6 : null;
    case "plan": case "pack": case "credit_rate": {
      const pc = perCredit(r);
      if (pc === null) return null;
      if (has(r, "credits_per_second")) return r.credits_per_second * pc;
      if (has(r, "credits_per_clip") && r.seconds > 0) return (r.credits_per_clip * pc) / r.seconds;
      return null;
    }
    default: return null;
  }
}

const usd = (x) => "$" + (Math.abs(x * 100 - Math.round(x * 100)) < 1e-9 ? x.toFixed(2) : String(x));
const n = (x) => x.toLocaleString("en-US");

// Human-readable arithmetic for the row, so every number in the table shows its working.
export function formula(r) {
  if (r.status === "not_published") return "not published";
  if (r.status === "discontinued") return "discontinued";
  switch (r.billing) {
    case "per_second": return `${usd(r.second_price_usd)}/s published`;
    case "per_clip": return `${usd(r.clip_price_usd)} ÷ ${r.seconds} s`;
    case "per_token": return `${n(r.tokens_per_second)} tok/s × ${usd(r.usd_per_1m_tokens)} ÷ 1M`;
    case "credit_rate": {
      const rate = `${usd(r.price_per_credit_usd)}/cr`;
      return has(r, "credits_per_second") ? `${n(r.credits_per_second)} cr/s × ${rate}` : `${n(r.credits_per_clip)} cr × ${rate} ÷ ${r.seconds} s`;
    }
    case "plan": case "pack": {
      const rate = `(${usd(r.plan_price_usd)} ÷ ${n(r.plan_credits)} cr)`;
      return has(r, "credits_per_second") ? `${n(r.credits_per_second)} cr/s × ${rate}` : `${n(r.credits_per_clip)} cr × ${rate} ÷ ${r.seconds} s`;
    }
    default: return "";
  }
}

export function clipLabel(r) {
  const parts = [];
  if (has(r, "seconds")) parts.push(`${r.seconds} s`);
  if (has(r, "resolution")) parts.push(r.resolution);
  if (r.audio === true) parts.push("audio"); else if (r.audio === false) parts.push("no audio");
  return parts.join(", ") || "—";
}

export function priceLabel(r) {
  if (r.status === "not_published") return "not published";
  if (r.status === "discontinued") return "—";
  if (!has(r, "usd_per_second")) return "?";
  return (r.approximate ? "≈ " : "") + "$" + r.usd_per_second.toFixed(3);
}

// ---------- validation ----------
function isDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + "T00:00:00Z");
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function validate(rows, schema = loadSchema()) {
  const errors = [], ids = new Set();
  if (!Array.isArray(rows)) return ["prices.json must be an array"];
  rows.forEach((r, i) => {
    const at = `row ${i} (${r && r.id ? r.id : "no id"})`;
    if (!r || typeof r !== "object") { errors.push(`${at}: not an object`); return; }
    for (const k of schema.required) if (!has(r, k)) errors.push(`${at}: missing ${k}`);
    for (const [k, v] of Object.entries(r)) {
      const f = schema.fields[k];
      if (!f) { errors.push(`${at}: unknown field ${k}`); continue; }
      if (v === null) continue;
      if (f.type === "number" && (typeof v !== "number" || !Number.isFinite(v))) errors.push(`${at}: ${k} must be a number`);
      if (f.type === "string" && typeof v !== "string") errors.push(`${at}: ${k} must be a string`);
      if (f.type === "boolean" && typeof v !== "boolean") errors.push(`${at}: ${k} must be a boolean`);
      if (f.min !== undefined && typeof v === "number" && v < f.min) errors.push(`${at}: ${k} below ${f.min}`);
      if (f.enum && !f.enum.includes(v)) errors.push(`${at}: ${k} must be one of ${f.enum.join("|")}`);
      if (f.pattern && typeof v === "string" && !new RegExp(f.pattern).test(v)) errors.push(`${at}: ${k} does not match ${f.pattern}`);
    }
    if (r.id) { if (ids.has(r.id)) errors.push(`${at}: duplicate id`); ids.add(r.id); }
    for (const k of ["checked_on", "source_date"]) if (has(r, k) && !isDate(r[k])) errors.push(`${at}: ${k} is not a real date`);
    if (has(r, "source_url")) { try { new URL(r.source_url); } catch { errors.push(`${at}: source_url is not a URL`); } }
    if (r.status === "published") {
      for (const group of schema.billing_requires[r.billing] || []) {
        if (!group.some((k) => has(r, k))) errors.push(`${at}: ${r.billing} needs one of ${group.join("|")}`);
      }
      if (has(r, "credits_per_clip") && !has(r, "seconds")) errors.push(`${at}: credits_per_clip needs seconds`);
      const c = compute(r);
      if (c === null) errors.push(`${at}: usd_per_second cannot be computed from the inputs`);
      else if (!has(r, "usd_per_second")) errors.push(`${at}: usd_per_second is null; run \`avp recompute --write\``);
      else if (round3(c) !== r.usd_per_second) errors.push(`${at}: usd_per_second ${r.usd_per_second} != computed ${round3(c)}; run \`avp recompute --write\``);
    } else if (has(r, "usd_per_second")) errors.push(`${at}: ${r.status} rows must not carry usd_per_second`);
  });
  return errors;
}

// ---------- filtering / sorting ----------
const ci = (a, b) => String(a).toLowerCase().includes(String(b).toLowerCase());
export function filterRows(rows, o = {}) {
  return rows.filter((r) => {
    if (o.service && !ci(r.service, o.service)) return false;
    if (o.model && !ci(r.model, o.model)) return false;
    if (o.maker && !ci(r.maker, o.maker)) return false;
    if (o.door && r.door !== o.door) return false;
    if (o.resolution && !(has(r, "resolution") && ci(r.resolution, o.resolution))) return false;
    if (o.audio === "yes" && r.audio !== true) return false;
    if (o.audio === "no" && r.audio !== false) return false;
    if (o.published && r.status !== "published") return false;
    if (o.max !== undefined && !(has(r, "usd_per_second") && r.usd_per_second <= Number(o.max))) return false;
    return true;
  });
}

export function sortRows(rows, key = "price", desc = false) {
  const val = (r) => key === "price" ? (has(r, "usd_per_second") ? r.usd_per_second : Infinity)
    : key === "checked" ? r.checked_on : key === "model" ? `${r.model} ${r.service}` : `${r.service} ${r.model}`;
  const out = rows.map((r, i) => [r, i]).sort(([a, ia], [b, ib]) => {
    const va = val(a), vb = val(b);
    const c = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
    return (c !== 0 ? c : ia - ib) * (desc ? -1 : 1);
  }).map(([r]) => r);
  return out;
}

// ---------- rendering ----------
const mdCell = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
export function toMarkdown(rows) {
  const head = ["Service", "Model", "Clip", "Price basis", "$ / s", "Formula", "Source", "Checked"];
  const lines = ["| " + head.join(" | ") + " |", "|" + head.map((h, i) => (i === 4 ? "---:" : "---")).join("|") + "|"];
  for (const r of rows) {
    const src = `[${mdCell(r.source_label)}](${r.source_url})` + (r.source_date ? `, ${r.source_date}` : "");
    lines.push("| " + [`**${mdCell(r.service)}**`, mdCell(r.model), mdCell(clipLabel(r)), mdCell(r.tier), `**${priceLabel(r)}**`, mdCell(formula(r)), src, r.checked_on].join(" | ") + " |");
  }
  return lines.join("\n") + "\n";
}

export function toText(rows, brief = false) {
  const all = [["$ / s", (r) => priceLabel(r)], ["service", (r) => r.service], ["model", (r) => r.model], ["clip", clipLabel], ["price basis", (r) => r.tier], ["formula", formula], ["checked", (r) => r.checked_on]];
  const cols = brief ? all.slice(0, 4) : all;
  const cells = rows.map((r) => cols.map(([, f]) => String(f(r))));
  const w = cols.map(([h], i) => Math.max(h.length, ...cells.map((c) => c[i].length)));
  const line = (c) => c.map((s, i) => (i === 0 ? s.padStart(w[i]) : s.padEnd(w[i]))).join("  ").trimEnd();
  return [line(cols.map(([h]) => h)), line(w.map((x) => "-".repeat(x))), ...cells.map(line)].join("\n") + "\n";
}

const csvCell = (v) => { const s = v === undefined || v === null ? "" : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
export function toCsv(rows) {
  return [COLUMNS.join(","), ...rows.map((r) => COLUMNS.map((k) => csvCell(k === "formula" ? formula(r) : r[k])).join(","))].join("\n") + "\n";
}

export function toJson(rows) { return JSON.stringify(rows.map((r) => ({ ...r, formula: formula(r) })), null, 2) + "\n"; }

export function render(rows, format = "md", brief = false) {
  if (format === "csv") return toCsv(rows);
  if (format === "json") return toJson(rows);
  if (format === "text") return toText(rows, brief);
  return toMarkdown(rows);
}

// ---------- stale rows ----------
export function stale(rows, { days = 30, asOf } = {}) {
  const now = asOf ? new Date(asOf + "T00:00:00Z") : new Date();
  return rows.map((r) => {
    const age = Math.floor((now - new Date(r.checked_on + "T00:00:00Z")) / 86400000);
    return { ...r, age_days: age };
  }).filter((r) => r.age_days > days).sort((a, b) => b.age_days - a.age_days || a.id.localeCompare(b.id));
}

export function staleReport(list, { days, asOf, format = "md" }) {
  if (format === "json") return JSON.stringify(list.map((r) => ({ id: r.id, service: r.service, model: r.model, checked_on: r.checked_on, age_days: r.age_days, source_url: r.source_url })), null, 2) + "\n";
  const when = asOf ? ` as of ${asOf}` : "";
  if (!list.length) return `No rows older than ${days} days${when}.\n`;
  const bySource = new Map();
  for (const r of list) { const k = r.source_url; if (!bySource.has(k)) bySource.set(k, []); bySource.get(k).push(r); }
  const out = [`${list.length} row${list.length === 1 ? "" : "s"} older than ${days} days${when}. Re-read each source and update \`checked_on\` (and the numbers, if they moved):`, ""];
  for (const [url, rs] of bySource) {
    const ids = rs.map((r) => r.id).join(", ");
    out.push(format === "md" ? `- [ ] [${rs[0].source_label}](${url}) — ${rs.length} row${rs.length === 1 ? "" : "s"}, checked ${rs[0].checked_on} (${rs[0].age_days} days ago): ${ids}`
      : `${rs[0].source_label} <${url}> ${rs.length} rows, checked ${rs[0].checked_on} (${rs[0].age_days} days ago): ${ids}`);
  }
  return out.join("\n") + "\n";
}

// ---------- quote ----------
export function quote(o) {
  const num = (k) => (o[k] === undefined ? undefined : Number(o[k]));
  const r = { status: "published" };
  if (o.perSecond !== undefined) { r.billing = "per_second"; r.second_price_usd = num("perSecond"); }
  else if (o.clipPrice !== undefined) { r.billing = "per_clip"; r.clip_price_usd = num("clipPrice"); r.seconds = num("seconds"); }
  else if (o.perCredit !== undefined) { r.billing = "credit_rate"; r.price_per_credit_usd = num("perCredit"); }
  else { r.billing = "plan"; r.plan_price_usd = num("planPrice"); r.plan_credits = num("credits"); }
  if (o.creditsPerSecond !== undefined) r.credits_per_second = num("creditsPerSecond");
  if (o.creditsPerClip !== undefined) { r.credits_per_clip = num("creditsPerClip"); r.seconds = num("seconds"); }
  const v = compute(r);
  if (v === null || !Number.isFinite(v)) throw new Error("quote needs --per-second, or --clip-price + --seconds, or (--plan-price + --credits | --per-credit) + (--credits-per-second | --credits-per-clip + --seconds)");
  const pc = perCredit(r);
  const lines = [`$ per second: ${round3(v).toFixed(3)}`, `formula: ${formula(r)}`];
  if (pc !== null) lines.push(`$ per credit: ${pc.toFixed(5)}`);
  if (r.seconds) lines.push(`$ per clip (${r.seconds} s): ${(v * r.seconds).toFixed(3)}`);
  lines.push(`$ per minute: ${(v * 60).toFixed(2)}`);
  return lines.join("\n") + "\n";
}

// ---------- readme ----------
export function readmeWithTable(readme, table) {
  const a = readme.indexOf(MARK_START), b = readme.indexOf(MARK_END);
  if (a < 0 || b < 0 || b < a) throw new Error(`README is missing ${MARK_START} / ${MARK_END}`);
  return readme.slice(0, a + MARK_START.length) + "\n" + table + readme.slice(b);
}
export function readmeTable(rows) { return toMarkdown(sortRows(rows, "price")); }

// ---------- cli ----------
export function parseArgs(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const v = argv[i + 1];
      if (v === undefined || v.startsWith("--")) o[k] = true; else { o[k] = v; i++; }
    } else o._.push(a);
  }
  return o;
}

// Help text = the leading comment block of this file (stops at the first non-comment line).
const HELP = (() => {
  const out = [];
  for (const l of fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1)) {
    if (!l.startsWith("//")) break;
    out.push(l.replace(/^\/\/ ?/, ""));
  }
  return out.join("\n");
})();

export function main(argv = process.argv.slice(2), io = { out: (s) => process.stdout.write(s), err: (s) => process.stderr.write(s) }) {
  const o = parseArgs(argv);
  const cmd = o._[0];
  if (!cmd || cmd === "help" || o.help) { io.out(HELP + "\n"); return 0; }
  const rows = load(o.data || DATA);
  const fmt = o.format || (cmd === "cheapest" ? "text" : "md");
  const pick = () => sortRows(filterRows(rows, o), o.sort || "price", !!o.desc);
  const limit = (list) => (o.limit ? list.slice(0, Number(o.limit)) : list);

  switch (cmd) {
    case "table": io.out(render(limit(pick()), fmt, !!o.brief)); return 0;
    case "cheapest": io.out(render(sortRows(filterRows(rows, { ...o, published: true }), "price").slice(0, Number(o.limit || 5)), fmt, !!o.brief)); return 0;
    case "model": {
      const name = o._[1] || o.model;
      if (!name) { io.err("usage: avp model \"Kling 3.0\"\n"); return 2; }
      const list = sortRows(filterRows(rows, { model: name }), "price");
      if (!list.length) { io.err(`no rows for model "${name}"\n`); return 1; }
      io.out(render(list, fmt, !!o.brief)); return 0;
    }
    case "quote": try { io.out(quote(o)); return 0; } catch (e) { io.err(e.message + "\n"); return 2; }
    case "recompute": {
      let changed = 0;
      const lines = [];
      for (const r of rows) {
        const c = r.status === "published" ? compute(r) : null;
        const next = c === null ? null : round3(c);
        if (next !== (has(r, "usd_per_second") ? r.usd_per_second : null)) { changed++; lines.push(`${r.id}: ${r.usd_per_second ?? "null"} -> ${next ?? "null"}`); r.usd_per_second = next; }
      }
      if (o.write && changed) fs.writeFileSync(o.data || DATA, serialize(rows));
      io.out((lines.length ? lines.join("\n") + "\n" : "") + `${changed} row${changed === 1 ? "" : "s"} ${o.write ? "updated" : "would change (add --write)"}\n`);
      return 0;
    }
    case "validate": {
      const errors = validate(rows);
      io.out(errors.length ? errors.join("\n") + `\n${errors.length} error${errors.length === 1 ? "" : "s"}\n` : `ok: ${rows.length} rows, ${rows.filter((r) => r.status === "published").length} published\n`);
      return errors.length ? 1 : 0;
    }
    case "stale": {
      const days = o.days ? Number(o.days) : 30;
      io.out(staleReport(stale(rows, { days, asOf: o.asOf }), { days, asOf: o.asOf, format: fmt }));
      return 0;
    }
    case "export": {
      const file = o.csv === true || !o.csv ? CSV : path.resolve(o.csv);
      fs.writeFileSync(file, toCsv(rows));
      io.out(`wrote ${path.relative(process.cwd(), file) || file} (${rows.length} rows)\n`);
      return 0;
    }
    case "readme": {
      const next = readmeWithTable(fs.readFileSync(README, "utf8"), readmeTable(rows));
      if (o.write) { fs.writeFileSync(README, next); io.out("README table refreshed\n"); } else io.out(next);
      return 0;
    }
    default: io.err(`unknown command: ${cmd}\n\n${HELP}\n`); return 2;
  }
}

// Stable one-row-per-line JSON so diffs stay readable; blank line between services.
export function serialize(rows) {
  const out = [];
  rows.forEach((r, i) => {
    if (i > 0 && rows[i - 1].service !== r.service) out.push("");
    out.push("  " + JSON.stringify(r) + (i < rows.length - 1 ? "," : ""));
  });
  return "[\n" + out.join("\n") + "\n]\n";
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main();
}
