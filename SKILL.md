---
name: ai-video-pricing
description: Answers "how much does AI video cost per second" from a dated, sourced price dataset (Kling 3.0, Veo 3 and 3.1, Runway Gen-4.5, Luma Ray3.2, Pika, MiniMax Hailuo and H3, Seedance via BytePlus, Higgsfield, Google Flow, Gemini API, UniqAI) and a zero-dependency CLI that filters, sorts and recomputes dollars per second and per clip. Use when the user asks what AI video generation costs, which AI video generator is cheapest per second or per clip, what a plan's credits work out to in dollars, how the same model (Kling, Veo, Seedance) is priced through different apps and APIs, or wants to add or recheck a price row. Not for image, music or chat model pricing, not for prices quoted from memory, and not for prices newer than the dataset's checked_on dates.
license: CC-BY-4.0 (data) + MIT (scripts)
metadata:
  version: 0.1.0
  author: UniqAI
  homepage: https://github.com/uniqaiapp/ai-video-pricing
---

# AI video pricing: cost per second, from the data, never from memory

This skill answers AI video price questions by running `scripts/avp.mjs` against `data/prices.json`: 69 rows across Kling, Google Flow, Gemini API, Runway, Luma, Pika, MiniMax, Higgsfield, BytePlus and UniqAI, each with the vendor's own source URL and the date it was last checked. Every dollar-per-second figure is recomputed from the plan price, credits and clip length by one formula, so you can show the arithmetic instead of asserting a number. The most common trigger is "how much does a second of AI video cost" or "is X cheaper than Y".

## When to use

- The user asks what AI video costs, per second, per clip, per minute, or per month for a given volume.
- They ask which service or model is cheapest, optionally at a resolution (720p, 1080p, 4K) or with audio.
- They name a model sold through several doors (Kling 3.0, Veo 3/3.1, Seedance 2.0, Wan) and want the price through each.
- They paste their own plan ("$30 for 10,000 credits, 100 credits per 5-second clip") and want it in dollars per second.
- They want to add, correct or recheck a row in the dataset, or ask which rows are stale.

## When NOT to use

- Image, music, chat or LLM token pricing. This dataset is video only.
- The user needs today's price and the row's `checked_on` is older than 30 days: run `stale`, say the row is stale, and ask them to read the linked source page (or do it for them if you have browsing). Never fill the gap from memory.
- Free tiers, promotional first-month prices, regional prices or taxes. The dataset prices paid output on standard monthly billing; say so.
- Anything not in the table (a vendor or model with no row): say it is not covered rather than estimating.

## How it works

1. Identify what is being compared: model, resolution, audio, clip length, app vs API. Resolution and audio change the price by 2x to 10x for the same model, so do not compare cells without them.
2. Run the matching command from the repo root (all are offline, Node 18+, no packages):
   - Cheapest at a setting: `node scripts/avp.mjs cheapest --resolution 720p --audio yes`
   - One model through every door: `node scripts/avp.mjs model "Kling 3.0" --format text`
   - A filtered table for the answer: `node scripts/avp.mjs table --max 0.10 --published --format text`
   - The user's own plan in dollars: `node scripts/avp.mjs quote --plan-price 30 --credits 10000 --credits-per-clip 100 --seconds 5`
   - Freshness: `node scripts/avp.mjs stale --days 30`
   Each prints the formula next to the number (`100 cr × ($30.00 ÷ 10,000 cr) ÷ 5 s`).
3. Answer with the number, its formula, the clip setting, the source label and the `checked_on` date, in that order. Example: "Luma Ray3.2 at 720p is $0.060 per second on the Plus plan (100 credits × $30 ÷ 10,000 ÷ 5 s), per Luma's pricing page, checked 2026-10-28."
4. When two doors sell the same model, point out what differs (resolution, audio, minimum credits, plan size) before calling one cheaper. The `model` command lists the clip column for exactly this reason.
5. If a row is `not_published`, say the vendor shows the price only inside its app or console, and offer the resold rows (Runway API, Luma) as a proxy, clearly labelled as such.
6. For volume questions, multiply: seconds needed ÷ clip seconds = clips, × price per clip, and add a line about rejected takes (people usually generate 2 to 4 takes per kept clip; say that this is a rule of thumb, not data).

## Adding or rechecking a row

1. Open the vendor's own pricing page or docs. Third-party roundups are not sources.
2. Record what the page says, not what it implies: plan price on monthly billing (not annual, not first-month promo), credits included, credits per clip or per second, seconds delivered, resolution, whether audio is included, minimums and top-up rates (put those in `notes`).
3. Add the row to `data/prices.json` with `usd_per_second: null`, following `data/schema.json` (field docs are inside it). Pick `billing` by what the page publishes: `plan` or `pack` (price + credits), `credit_rate` ($ per credit), `per_clip`, `per_second`, `per_token`.
4. Run, in order: `node scripts/avp.mjs recompute --write`, `node scripts/avp.mjs validate`, `node scripts/avp.mjs export`, `node scripts/avp.mjs readme --write`, `node scripts/examples.mjs`, `node tests/run.mjs`. The tests fail if any generated file is out of date, so nothing in the README can drift from the data.
5. Set `checked_on` to today for every row you re-read, even when the number did not move. Bump `updated` in `data/meta.json` to the newest `checked_on`.

## Inputs / outputs

| Input | Output |
|---|---|
| Filters (`--service`, `--model`, `--maker`, `--door`, `--resolution`, `--audio`, `--max`, `--published`) | Table in `md`, `text`, `csv` or `json`, sorted by price unless `--sort service|model|checked` |
| `quote` with a plan price + credits, a $ per credit, a clip price or a per-second price | $ per second, formula, $ per credit, $ per clip, $ per minute |
| `stale --days N [--as-of DATE]` | Rows older than N days grouped by source page, as a checklist |
| `data/prices.json` | `data/prices.csv`, README table, `examples/` (all generated) |

## Examples

See [examples/README.md](examples/README.md); every file there is the exact output of the command listed in [examples/commands.json](examples/commands.json). Useful ones: [examples/kling-3-0-doors.md](examples/kling-3-0-doors.md) (same model, six doors), [examples/under-5-cents.md](examples/under-5-cents.md), [examples/quote-uniqai-kling-5s.txt](examples/quote-uniqai-kling-5s.txt).

## Limits

- Prices are as of each row's `checked_on`; vendors change plans monthly. The repo's monthly Action opens a reminder issue, but between rechecks a row can be wrong.
- "Unlimited" or relax modes, daily free credits and rollover rules are not expressible as dollars per second; they are described in `notes` and in the methodology, not priced.
- Resolution labels are the vendor's (768p, 2K, "Draft"); they are not normalised, so filter by substring.
- UniqAI's subscriptions bundle two currencies, so UniqAI rows use the two packs anyone can buy without a plan, plus the largest packs as the floor. That is a choice, documented in [references/methodology.md](references/methodology.md).
- The dataset is English-language, USD, and covers the vendors listed in the README; it does not claim to be complete.

## References

- [references/methodology.md](references/methodology.md): the formula, rounding, which plan is used, what is excluded, and how "not published" is decided.
- [data/schema.json](data/schema.json): every field with its meaning.
