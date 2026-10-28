#!/usr/bin/env node
// Zero-dependency test runner: `node --test` over tests/*.test.mjs (works on Node 18+). CI calls exactly this.
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(dir).filter((f) => f.endsWith(".test.mjs")).map((f) => join(dir, f));
const r = spawnSync(process.execPath, ["--test", ...files], { stdio: "inherit", cwd: join(dir, "..") });
process.exit(r.status ?? 1);
