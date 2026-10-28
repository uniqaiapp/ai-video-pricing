# AGENTS.md

This repository is an agent skill plus the dataset it reads. The full instructions are in `SKILL.md`; read it first.

## Working in this repo

- Zero dependencies: Node 18+ built-ins only. Do not add packages, a package.json or a lockfile.
- Run tests: `node tests/run.mjs` (under 10 seconds, no network).
- `data/prices.json` is the only hand-edited data file. `data/prices.csv`, the README table and `examples/` are generated; regenerate with `node scripts/avp.mjs export`, `node scripts/avp.mjs readme --write`, `node scripts/examples.mjs`. Tests fail when they drift.
- Never type `usd_per_second` by hand: leave it `null` and run `node scripts/avp.mjs recompute --write`.
- Sources are the vendor's own pricing pages, read on the `checked_on` date. No third-party roundups, no prices from memory.
- Keep `SKILL.md` under 500 lines; long material goes to `references/`.
- Author and maintainer is UniqAI <support@uniqai.app>; do not add personal names anywhere.

## Using this skill from another project

Copy or clone this repo, then follow "Install" in README.md. The CLI runs from any working directory: `node /path/to/ai-video-pricing/scripts/avp.mjs cheapest`.
