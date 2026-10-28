## What changed

<!-- Which rows, which fields, or which script. -->

## Source

<!-- For every number: the vendor URL and the line you read, with the date you read it. -->

## How to test

```bash
node scripts/avp.mjs validate && node tests/run.mjs
```

## Checklist

- [ ] Numbers come from the vendor's own page (no roundups, no memory) and `checked_on` is the date I read it
- [ ] `usd_per_second` was filled by `node scripts/avp.mjs recompute --write`, not typed
- [ ] Regenerated `data/prices.csv`, the README table and `examples/` (tests pass)
- [ ] No personal names, secrets or dependencies added
