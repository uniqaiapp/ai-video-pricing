#!/usr/bin/env node
// Regenerates every file in examples/ from examples/commands.json by running the CLI in-process.
// Usage: node scripts/examples.mjs [--check]   (--check exits 1 if any committed example is out of date)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { main } from "./avp.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "examples");
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "commands.json"), "utf8"));

export function runExample(args) {
  let out = "";
  const code = main(args, { out: (s) => { out += s; }, err: (s) => { out += s; } });
  return { out, code };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes("--check");
  let bad = 0;
  for (const [file, args] of Object.entries(manifest)) {
    if (file.startsWith("$")) continue;
    const { out } = runExample(args);
    const target = path.join(DIR, file);
    if (check) {
      const cur = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : null;
      if (cur !== out) { bad++; console.log(`out of date: examples/${file}`); }
    } else { fs.writeFileSync(target, out); console.log(`wrote examples/${file}`); }
  }
  if (check) { console.log(bad ? `${bad} example(s) differ; run node scripts/examples.mjs` : "examples up to date"); process.exitCode = bad ? 1 : 0; }
}
