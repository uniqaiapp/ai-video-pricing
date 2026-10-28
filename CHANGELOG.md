# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow SemVer. Price refreshes are PATCH releases and list the rows that moved.

## [0.1.0] - 2026-10-28

### Added

- `data/prices.json` with 69 rows (64 published, 4 not published, 1 discontinued) across UniqAI, Kling, Google Flow, Gemini API, Runway, Luma, Pika, MiniMax, Hailuo, Higgsfield, BytePlus ModelArk and OpenAI, every row with source URL and `checked_on` 2026-10-28.
- `data/schema.json` (hand-written, validated without packages) and `data/prices.csv` generated from the JSON.
- `scripts/avp.mjs`: `table`, `cheapest`, `model`, `quote`, `recompute`, `validate`, `stale`, `export`, `readme` subcommands; Node 18+ built-ins only.
- `SKILL.md` for Claude Code, with Cursor (`.cursor/rules`), Codex (`codex/INSTRUCTIONS.md`) and generic `AGENTS.md` adapters, and a Claude Code plugin manifest.
- `.github/workflows/price-recheck.yml`: monthly reminder issue listing rows older than 30 days, grouped by source page.
- Tests (`node tests/run.mjs`): schema and arithmetic on every row, CSV and README table byte-equality, examples reproducibility, adapter structure, forbidden strings.
- `references/methodology.md`: the formula, plan choice, rounding and exclusions.
