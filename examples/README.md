# Examples

Every file in this folder is the exact stdout of one `node scripts/avp.mjs` call, listed in [`commands.json`](commands.json). `node scripts/examples.mjs` regenerates them; `node tests/run.mjs` fails if any differ, which is how the numbers quoted in the README stay reproducible.

| File | Command | What it shows |
|---|---|---|
| `cheapest-720p.txt` | `cheapest --resolution 720p` | The five cheapest published rows at 720p, with formulas |
| `cheapest-with-audio.txt` | `cheapest --audio yes --brief` | Cheapest rows whose price includes audio, narrow view |
| `kling-3-0-doors.md` | `model "Kling 3.0"` | Kling 3.0 through UniqAI, Runway API, Luma, Kling's own app, Higgsfield |
| `veo-doors.md` | `model Veo` | Veo 3 and 3.1 through Google Flow, Higgsfield, UniqAI, Luma |
| `seedance-2-0-doors.md` | `model "Seedance 2.0"` | Seedance 2.0 through BytePlus, Runway API, Luma, Higgsfield |
| `under-5-cents.md` | `table --max 0.05 --published` | Everything at or under $0.05 per second |
| `api-only.csv` | `table --door api --published --format csv` | Developer APIs only, as CSV |
| `uniqai.json` | `table --service UniqAI --format json` | The UniqAI rows with their formulas, as JSON |
| `quote-runway-standard.txt` | `quote --plan-price 15 --credits 625 --credits-per-second 12` | A plan priced per second of output |
| `quote-uniqai-kling-5s.txt` | `quote --plan-price 4.99 --credits 1000 --credits-per-clip 80 --seconds 5` | A pack priced per clip |
| `quote-luma-api-720p.txt` | `quote --clip-price 0.30 --seconds 5` | A published per-clip price |
| `stale-2026-12-01.md` | `stale --days 30 --as-of 2026-12-01` | What the monthly reminder issue looks like once rows are 30+ days old |
| `stale-2026-11-20.txt` | `stale --days 30 --as-of 2026-11-20 --format text` | Plain-text variant for terminals |
| `validate.txt` | `validate` | Row and published-row counts on a clean dataset |
