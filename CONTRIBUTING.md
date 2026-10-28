# Contributing

Corrections are the point of this repo. If a vendor's page says something different from a row, open an issue with the URL and the number you see, or send a PR.

## Fixing or adding a price

1. Read the vendor's own pricing page or docs. Third-party roundups, screenshots and chat answers do not count as sources.
2. Edit `data/prices.json` (one object per line; field meanings are in `data/schema.json`). Leave `usd_per_second` as `null`; set `checked_on` to today for every row you re-read.
3. Regenerate and test:

```bash
node scripts/avp.mjs recompute --write   # fills usd_per_second from the inputs
node scripts/avp.mjs validate            # schema + arithmetic + dates + URLs
node scripts/avp.mjs export              # data/prices.csv
node scripts/avp.mjs readme --write      # the table in README.md
node scripts/examples.mjs                # examples/*
node tests/run.mjs                       # must be green
```

4. If `checked_on` moved, update `updated` in `data/meta.json` to the newest date (a test enforces it).
5. In the PR, paste the source URL and quote the line you read. The PR template asks for it.

## Rules

- Zero dependencies: Node 18+ built-ins only. No `package.json`, no lockfile.
- No numbers from memory, no estimated rows. A vendor that hides its price gets a `not_published` row, not a guess.
- Brand-only authorship: the maintainer is UniqAI <support@uniqai.app>. No personal names in files, data or commit messages.
- Same tone as the README: plain, specific, no superlatives.
- Keep `SKILL.md` under 500 lines; long explanations go to `references/`.

## Regenerating the visuals

`assets/banner.svg`, `assets/banner-light.svg`, `assets/demo.svg` and `assets/social-preview.png` are produced by the shared uniqaiapp design kit (Node built-ins; the PNG step needs `sharp`, which is not a dependency of this repo). `assets/demo.txt` is the terminal transcript the demo is rendered from; keep it a real transcript (`node scripts/avp.mjs cheapest --resolution 720p --brief` and friends).

## Deviations from org conventions

- Runtime is Node, not Python: the product brief for this repo asked for a Node CLI, and the dataset, tests and examples all run on `node` alone. `tests/run.mjs` wraps `node --test` so Node 18 works without `node:test/reporters`.
- Data is JSON + a generated CSV rather than YAML, so it loads with `JSON.parse` in any language with no parser dependency.
- The README table contains the eight UniqAI source links (`https://uniqai.app/pricing`) because they are the data rows' source URLs. They carry no UTM on purpose; the brand links with UTM are the explainer link and the footer.
- `.gitignore` lists the standard Node dependency folder (hygiene) although that folder name is on the forbidden-strings list; the adapters test exempts that one file.
