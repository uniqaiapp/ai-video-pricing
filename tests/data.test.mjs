// The dataset is the product. These tests keep it honest: schema, dates, sources, arithmetic, and the
// generated artefacts (CSV, README table) matching the JSON byte for byte.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { load, loadSchema, validate, compute, round3, toCsv, readmeWithTable, readmeTable, stale, perCredit, formula, ROOT, CSV, README } from "../scripts/avp.mjs";

const rows = load();
const meta = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "meta.json"), "utf8"));

test("prices.json validates against data/schema.json with no errors", () => {
  assert.deepEqual(validate(rows, loadSchema()), []);
});

test("every row has a vendor source URL and an ISO checked_on date; ids are unique", () => {
  const ids = new Set();
  for (const r of rows) {
    assert.match(r.source_url, /^https:\/\//, r.id);
    assert.match(r.checked_on, /^\d{4}-\d{2}-\d{2}$/, r.id);
    assert.ok(!ids.has(r.id), `duplicate id ${r.id}`);
    ids.add(r.id);
  }
});

test("usd_per_second is exactly the rounded formula result for every published row", () => {
  for (const r of rows) {
    if (r.status !== "published") { assert.equal(r.usd_per_second ?? null, null, r.id); continue; }
    assert.equal(r.usd_per_second, round3(compute(r)), r.id);
    assert.ok(formula(r).length > 0, r.id);
  }
});

test("the one formula, checked by hand on four billing kinds", () => {
  const plan = { status: "published", billing: "plan", plan_price_usd: 15, plan_credits: 625, credits_per_second: 12 };
  assert.equal(round3(compute(plan)), 0.288);
  assert.equal(perCredit(plan), 0.024);
  const pack = { status: "published", billing: "pack", plan_price_usd: 4.99, plan_credits: 1000, credits_per_clip: 80, seconds: 5 };
  assert.equal(round3(compute(pack)), 0.08);
  const clip = { status: "published", billing: "per_clip", clip_price_usd: 0.28, seconds: 6 };
  assert.equal(round3(compute(clip)), 0.047);
  const tok = { status: "published", billing: "per_token", tokens_per_second: 5792, usd_per_1m_tokens: 17.5 };
  assert.equal(round3(compute(tok)), 0.101);
  assert.equal(compute({ status: "not_published", billing: "plan" }), null);
});

test("the UniqAI rows use the published pack rates (1,000 Gems $4.99; 5 Cinema $11.99)", () => {
  const by = Object.fromEntries(rows.map((r) => [r.id, r]));
  assert.equal(by["uniqai-kling-3-0-5s-gems-1000"].usd_per_second, 0.08);
  assert.equal(by["uniqai-kling-3-0-8s-gems-1000"].usd_per_second, 0.075);
  assert.equal(by["uniqai-wan-2-5-5s-gems-1000"].usd_per_second, 0.04);
  assert.equal(by["uniqai-veo-3-6s-cinema-5"].usd_per_second, 0.4);
  assert.equal(by["uniqai-veo-3-8s-cinema-5"].usd_per_second, 0.6);
});

test("data/prices.csv is exactly the export of prices.json", () => {
  assert.equal(fs.readFileSync(CSV, "utf8"), toCsv(rows));
});

test("README table between the markers is exactly `avp readme` output, and the badge date matches data/meta.json", () => {
  const md = fs.readFileSync(README, "utf8");
  assert.equal(md, readmeWithTable(md, readmeTable(rows)), "run: node scripts/avp.mjs readme --write");
  assert.ok(md.includes(`checked-${meta.updated.replace(/-/g, "--")}`), "README badge date must equal data/meta.json updated");
  assert.ok(md.includes(`checked on ${meta.updated}`) || md.includes(`checked ${meta.updated}`), "README prose must state the check date");
});

test("data/meta.json updated equals the newest checked_on", () => {
  const newest = rows.map((r) => r.checked_on).sort().at(-1);
  assert.equal(meta.updated, newest);
  assert.equal(meta.schema_version, loadSchema().schema_version);
});

test("stale() measures age from --as-of and sorts oldest first", () => {
  assert.equal(stale(rows, { days: 30, asOf: "2026-11-27" }).length, 0);
  const s = stale(rows, { days: 30, asOf: "2026-11-28" });
  assert.equal(s.length, rows.length);
  assert.equal(s[0].age_days, 31);
  const custom = stale([{ id: "a", checked_on: "2026-01-01" }, { id: "b", checked_on: "2026-06-01" }], { days: 30, asOf: "2026-07-01" });
  assert.deepEqual(custom.map((r) => r.id), ["a"]);
});

test("validator catches the mistakes people actually make", () => {
  const schema = loadSchema();
  const good = rows.find((r) => r.id === "runway-app-gen-4-5-standard");
  const bad = [
    { ...good, id: "Bad Id" },
    { ...good, id: "x1", usd_per_second: 0.3 },
    { ...good, id: "x2", source_url: "runway.com/pricing" },
    { ...good, id: "x3", checked_on: "2026-02-30" },
    { ...good, id: "x4", door: "web" },
    { ...good, id: "x5", plan_credits: undefined, credits_per_second: undefined },
    { ...good, id: good.id },
    good,
  ];
  const errors = validate(bad, schema);
  for (const needle of ["does not match", "!= computed", "not a URL", "not a real date", "must be one of", "needs one of", "duplicate id"]) {
    assert.ok(errors.some((e) => e.includes(needle)), `expected an error containing "${needle}"\n${errors.join("\n")}`);
  }
});
