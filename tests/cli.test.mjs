// CLI behaviour, exit codes, and the committed examples reproducing byte for byte.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { main, ROOT } from "../scripts/avp.mjs";

const run = (args) => { let out = "", err = ""; const code = main(args, { out: (s) => { out += s; }, err: (s) => { err += s; } }); return { out, err, code }; };
const CLI = path.join(ROOT, "scripts", "avp.mjs");

test("--help and no arguments exit 0 and print usage", () => {
  for (const args of [[], ["--help"], ["help"]]) {
    const r = run(args);
    assert.equal(r.code, 0);
    assert.ok(r.out.includes("node scripts/avp.mjs table"));
  }
  const sub = spawnSync(process.execPath, [CLI, "--help"], { encoding: "utf8" });
  assert.equal(sub.status, 0);
  assert.ok(sub.stdout.includes("Filters:"));
});

test("unknown command exits 2", () => {
  const r = run(["frobnicate"]);
  assert.equal(r.code, 2);
  assert.ok(r.err.startsWith("unknown command"));
});

test("validate exits 0 on the shipped data and 1 on broken data", () => {
  assert.equal(run(["validate"]).code, 0);
  const tmp = path.join(ROOT, "tests", ".broken.json");
  fs.writeFileSync(tmp, JSON.stringify([{ id: "x", status: "published", billing: "plan" }]));
  try { assert.equal(run(["validate", "--data", tmp]).code, 1); } finally { fs.unlinkSync(tmp); }
});

test("filters and sorting", () => {
  const api = JSON.parse(run(["table", "--door", "api", "--published", "--format", "json"]).out);
  assert.ok(api.length > 0 && api.every((r) => r.door === "api" && r.status === "published"));
  const cheap = JSON.parse(run(["table", "--max", "0.05", "--format", "json"]).out);
  assert.ok(cheap.every((r) => r.usd_per_second <= 0.05));
  const prices = cheap.map((r) => r.usd_per_second);
  assert.deepEqual(prices, [...prices].sort((a, b) => a - b));
  const desc = JSON.parse(run(["table", "--published", "--sort", "price", "--desc", "--limit", "1", "--format", "json"]).out);
  assert.equal(desc[0].id, "runway-api-seedance-2-0-4k");
  const audio = JSON.parse(run(["table", "--audio", "yes", "--format", "json"]).out);
  assert.ok(audio.length > 0 && audio.every((r) => r.audio === true));
  assert.equal(JSON.parse(run(["table", "--service", "nobody", "--format", "json"]).out).length, 0);
});

test("cheapest defaults to 5 published rows as text; --brief drops the wide columns", () => {
  const r = run(["cheapest"]);
  assert.equal(r.code, 0);
  const lines = r.out.trimEnd().split("\n");
  assert.equal(lines.length, 7);
  assert.ok(lines[0].includes("formula"));
  assert.ok(!run(["cheapest", "--brief"]).out.split("\n")[0].includes("formula"));
});

test("model prints every door for a model and fails cleanly for an unknown one", () => {
  const r = run(["model", "Kling 3.0", "--format", "json"]);
  assert.equal(r.code, 0);
  const list = JSON.parse(r.out);
  assert.ok(list.length >= 5 && list.every((x) => x.model === "Kling 3.0"));
  assert.ok(new Set(list.map((x) => x.service)).size >= 4, "Kling 3.0 is sold through several doors");
  assert.equal(run(["model", "No Such Model"]).code, 1);
  assert.equal(run(["model"]).code, 2);
});

test("quote recomputes from plan, pack, per-clip and per-credit inputs; rejects incomplete input", () => {
  assert.ok(run(["quote", "--plan-price", "15", "--credits", "625", "--credits-per-second", "12"]).out.startsWith("$ per second: 0.288"));
  assert.ok(run(["quote", "--plan-price", "4.99", "--credits", "1000", "--credits-per-clip", "80", "--seconds", "5"]).out.startsWith("$ per second: 0.080"));
  assert.ok(run(["quote", "--clip-price", "0.28", "--seconds", "6"]).out.startsWith("$ per second: 0.047"));
  assert.ok(run(["quote", "--per-credit", "0.01", "--credits-per-second", "9"]).out.startsWith("$ per second: 0.090"));
  assert.ok(run(["quote", "--per-second", "0.15"]).out.includes("$ per minute: 9.00"));
  const bad = run(["quote", "--plan-price", "15"]);
  assert.equal(bad.code, 2);
  assert.ok(bad.err.includes("quote needs"));
});

test("stale honours --days and --as-of, in md, text and json", () => {
  assert.ok(run(["stale", "--days", "30", "--as-of", "2026-11-01"]).out.startsWith("No rows older than 30 days"));
  const md = run(["stale", "--days", "30", "--as-of", "2026-12-01"]).out;
  assert.ok(md.includes("- [ ] ["));
  const json = JSON.parse(run(["stale", "--days", "30", "--as-of", "2026-12-01", "--format", "json"]).out);
  assert.ok(json.length > 0 && json.every((r) => r.age_days === 34));
  assert.ok(!run(["stale", "--as-of", "2026-12-01", "--format", "text"]).out.includes("- [ ]"));
});

test("recompute without --write changes nothing on disk and reports 0 rows", () => {
  const before = fs.readFileSync(path.join(ROOT, "data", "prices.json"), "utf8");
  const r = run(["recompute"]);
  assert.equal(r.code, 0);
  assert.ok(r.out.trim().endsWith("0 rows would change (add --write)"));
  assert.equal(fs.readFileSync(path.join(ROOT, "data", "prices.json"), "utf8"), before);
});

test("every file in examples/ reproduces byte for byte from examples/commands.json", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "examples", "commands.json"), "utf8"));
  let n = 0;
  for (const [file, args] of Object.entries(manifest)) {
    if (file.startsWith("$")) continue;
    const expected = fs.readFileSync(path.join(ROOT, "examples", file), "utf8");
    const r = run(args);
    assert.equal(r.out + r.err, expected, `examples/${file} is stale: node scripts/examples.mjs`);
    n++;
  }
  assert.ok(n >= 10);
  // examples/README.md documents every example and nothing else
  const doc = fs.readFileSync(path.join(ROOT, "examples", "README.md"), "utf8");
  for (const file of Object.keys(manifest)) if (!file.startsWith("$")) assert.ok(doc.includes(`\`${file}\``), `examples/README.md does not mention ${file}`);
});
