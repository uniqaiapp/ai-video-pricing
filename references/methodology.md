# Methodology

How every number in `data/prices.json` is produced, so you can disagree with a step rather than a figure.

## The formula

```
$ per second = (credits per clip × $ per credit) ÷ seconds delivered
$ per credit = plan or pack price ÷ credits included          (monthly billing)
```

When a vendor publishes a per-second price (BytePlus, MiniMax H3, Runway API for Seedance), a per-clip price (Luma API, MiniMax Hailuo, BytePlus Seedance 1.0) or a per-credit rate (Runway API), we use it directly; the `billing` field records which case applies and `scripts/avp.mjs formula()` prints the arithmetic. Token-billed video (Gemini API) uses the vendor's own tokens-per-second figure.

`usd_per_second` is never typed by hand. `node scripts/avp.mjs recompute --write` fills it, rounded to three decimals, and `validate` fails if a stored value differs from the recomputed one.

## Which plan

- The cheapest paid plan that includes the model, named in `tier` with its price and credit count, plus the largest plan where the gap is large (Kling Ultra, Runway Max, Higgsfield Ultra). Annual billing is usually about 20% cheaper and is not used.
- First-month or promotional prices are noted but not used (Kling Standard renews at $8.80; the $6.99 first month is in `notes`).
- Top-up rates get their own rows (Pika) because people who run out of credits pay them.
- UniqAI: subscriptions bundle Gems and Cinema credits, so there is no clean per-credit price from a plan. Rows use the 1,000-Gem pack ($4.99) and the 5-Cinema pack ($11.99), which anyone can buy without a subscription, and add the 7,000-Gem and 30-Cinema packs (which need an active plan) as the floor. The rule is the same one applied to other vendors' top-ups and largest tiers.

## Seconds delivered, not requested

Divide by the clip length the service actually outputs. UniqAI's "5 s" Veo 3 option delivers a 6-second clip, so it is divided by 6. Where a vendor bills per second (Runway app, Luma for resold models, MiniMax H3), `seconds` is left empty and `credits_per_second` or `second_price_usd` is used.

## Resolution and audio

Recorded as the vendor labels them (`480p`, `720p`, `768p`, `1080p`, `2K`, `4K`, `360p` for Luma Draft). `audio: true` only when the page says the price includes generated audio; absent when the page does not say. The same model at a different resolution or with audio is a separate row, because the price differs by 2x to 10x.

## "Not published"

A row is `not_published` when the vendor shows the price only after sign-in, inside a generation panel or a developer console we could not load, and no public page states the number. We do not sign in, do not read prices from screenshots, and do not take numbers from third-party roundups. The row stays in the dataset so readers know the gap is known, not forgotten.

## Rounding

Three decimals in the data and CLI. The uniqai.app explainer page rounds to the cent above 10 cents and to a tenth of a cent below, so `0.288` there reads `$0.29`; the inputs and formula are identical.

## Dates

`checked_on` is the day a maintainer read the source page and confirmed every number in the row, even if nothing moved. `source_date` is a date printed on the source itself (a blog post or a "last updated" line). `data/meta.json → updated` equals the newest `checked_on`. `node scripts/avp.mjs stale --days 30` lists rows older than 30 days; the monthly GitHub Action turns that into an issue.

## Not covered

Free daily or welcome credits, watermark and licence differences, failed-generation refunds, taxes, regional prices, "unlimited" or relax modes, credit rollover, and API minimums (noted in `notes` where known, e.g. Runway's 56 to 80 credit minimum on resold models). These change the effective price for some users and cannot be expressed as one number per row.
