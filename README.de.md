<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg">
  <img alt="ai-video-pricing: AI video cost per second, checked and dated" src="assets/banner.svg" width="1280" height="320">
</picture>

[![License: CC BY 4.0 + MIT](https://img.shields.io/badge/license-CC_BY_4.0_%2B_MIT-d1fe17?style=flat-square&labelColor=0d0f12)](LICENSE)
[![Claude Code skill](https://img.shields.io/badge/Claude_Code-skill-d1fe17?style=flat-square&labelColor=0d0f12)](#installation)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-d1fe17?style=flat-square&labelColor=0d0f12)](#verwendung)
[![Prices checked](https://img.shields.io/badge/prices_checked-2026--10--28-d1fe17?style=flat-square&labelColor=0d0f12)](#die-tabelle)
[![Made by UniqAI](https://img.shields.io/badge/made_by-UniqAI-fdfc07?style=flat-square&labelColor=0d0f12)](https://uniqai.app/?utm_source=github&utm_medium=readme-de&utm_campaign=ai-video-pricing)

# ai-video-pricing: KI-Video-Kosten pro Sekunde, Kling vs. Veo vs. Runway vs. Luma

**Dollar pro Sekunde KI-Video, direkt von der Preisseite des jeweiligen Anbieters, mit Formel, Quell-URL und Prüfdatum in jeder Zeile.**

[Die Tabelle](#die-tabelle) · [So funktioniert es](#so-funktioniert-es) · [Verwendung](#verwendung) · [Installation](#installation) · [Aktuell halten](#aktuell-halten) · [FAQ](#faq)

</div>

[English](README.md) · [Русский](README.ru.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · Deutsch

KI-Video-Kosten pro Sekunde für Kling 3.0, Veo 3 und 3.1, Runway Gen-4.5, Luma Ray3.2, Pika, MiniMax Hailuo und H3, Seedance über BytePlus, Higgsfield, Google Flow, die Gemini API und UniqAI, geprüft am 2026-10-28, mit einer Quell-URL in jeder Zeile. Anbieter verkaufen Tarife und Credits, keine Sekunden; die Tabelle teilt deshalb den gezahlten Betrag durch die gelieferten Sekunden und zeigt die Rechnung direkt in der Zelle. Die Daten liegen als JSON und CSV unter CC BY 4.0 vor; eine Node-CLI ohne Abhängigkeiten filtert sie, rechnet sie nach, bewertet Ihren eigenen Tarif und listet Zeilen auf, die überprüft werden müssen. Die ausführliche Erklärung mit denselben Zahlen steht auf [uniqai.app](https://uniqai.app/video/ai-video-cost-per-second?utm_source=github&utm_medium=readme-de&utm_campaign=ai-video-pricing).

| **Eine Formel, offen gezeigt** | **Nur Anbieterseiten** | **Veraltete Zeilen werden markiert** |
|:---|:---|:---|
| `(Credits pro Clip × $ pro Credit) ÷ gelieferte Sekunden` steht neben jeder Zahl, wird von der CLI nachgerechnet und nie von Hand eingetippt. | Jede Zeile verlinkt die Preisseite des Anbieters selbst und das Datum, an dem sie gelesen wurde. Preise, die nur in einer App zu sehen sind, stehen als `not published` da, nicht als Schätzung. | `avp stale` listet Zeilen auf, die älter als 30 Tage sind; eine monatliche GitHub Action macht daraus ein Issue mit Checkliste. |

## Schnellstart

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing && cd ai-video-pricing
node scripts/avp.mjs cheapest --resolution 720p
node scripts/avp.mjs quote --plan-price 15 --credits 625 --credits-per-second 12
```

Der erste Befehl gibt die fünf günstigsten veröffentlichten 720p-Zeilen mit ihren Formeln aus; der zweite rechnet einen Tarif („$15 für 625 Credits, 12 Credits pro Sekunde“) in $0.288 pro Sekunde, $0.024 pro Credit und $17.28 pro Minute um. Node 18 oder neuer, nichts zu installieren.

## Demo

<img alt="ai-video-pricing demo: cheapest 720p rows, a plan quote, and the stale-row check" src="assets/demo.svg" width="820">

## Die Tabelle

Sortiert nach Preis pro Sekunde. Clip = gelieferte Sekunden, Auflösung und Audio, so wie der Anbieter sie angibt; vergleichen Sie zwei Zellen nur, wenn die Clip-Spalte übereinstimmt. `not published` bedeutet, dass der Anbieter den Preis nur in seiner App oder Konsole zeigt. Erzeugt mit `node scripts/avp.mjs readme --write` aus [`data/prices.json`](data/prices.json); ein Test schlägt fehl, wenn Tabelle und Daten voneinander abweichen.

<!-- prices:start -->
| Dienst | Modell | Clip | Preisbasis | $ / s | Formel | Quelle | Geprüft |
|---|---|---|---|---:|---|---|---|
| **BytePlus ModelArk API** | Seedance 1.0 Pro Fast | 5 s, 480p | pay-as-you-go, per clip | **$0.010** | $0.05 ÷ 5 s | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **Luma app** | Ray3.2 Draft | 5 s, 360p | Plus plan ($30/mo, 10,000 credits) | **$0.012** | 20 cr × ($30.00 ÷ 10,000 cr) ÷ 5 s | [Luma pricing](https://lumalabs.ai/pricing) | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 1.0 Pro Fast | 5 s, 720p | pay-as-you-go, per clip | **$0.020** | $0.10 ÷ 5 s | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **UniqAI** | Wan 2.5 | 5 s, no audio | 7,000-Gem pack ($19.99, needs an active plan) | **$0.023** | 40 cr × ($19.99 ÷ 7,000 cr) ÷ 5 s | [UniqAI pricing](https://uniqai.app/pricing) | 2026-10-28 |
| **Google Flow** | Veo 3.1 Lite | 8 s, audio | Google AI Pro ($19.99/mo, 1,000 Flow credits) | **$0.025** | 10 cr × ($19.99 ÷ 1,000 cr) ÷ 8 s | [Flow credits](https://support.google.com/flow/answer/16526234?hl=en) | 2026-10-28 |
| **MiniMax API** | MiniMax H3-Lite | 480p | pay-as-you-go, per second of output | **$0.025** | $0.025/s published | [MiniMax video pricing](https://platform.minimax.io/docs/guides/pricing-video) | 2026-10-28 |
| **Google Flow** | Gemini Omni Flash | 8 s, 720p | Google AI Pro ($19.99/mo, 1,000 Flow credits) | **$0.030** | 12 cr × ($19.99 ÷ 1,000 cr) ÷ 8 s | [Flow credits](https://support.google.com/flow/answer/16526234?hl=en) | 2026-10-28 |
| **Luma API** | Ray3.2 | 5 s, 540p | pay-as-you-go, per 5-second block | **$0.030** | $0.15 ÷ 5 s | [Luma API pricing](https://lumalabs.ai/api/pricing) | 2026-10-28 |
| **MiniMax API** | Hailuo 2.3 Fast | 6 s, 768p | pay-as-you-go, per clip | **$0.032** | $0.19 ÷ 6 s | [MiniMax video pricing](https://platform.minimax.io/docs/guides/pricing-video) | 2026-10-28 |
| **UniqAI** | Wan 2.5 | 5 s, no audio | 1,000-Gem pack ($4.99) | **$0.040** | 40 cr × ($4.99 ÷ 1,000 cr) ÷ 5 s | [UniqAI pricing](https://uniqai.app/pricing) | 2026-10-28 |
| **MiniMax API** | MiniMax H3-Lite | 768p | pay-as-you-go, per second of output | **$0.040** | $0.04/s published | [MiniMax video pricing](https://platform.minimax.io/docs/guides/pricing-video) | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 2.0 Mini | 480p | pay-as-you-go (token-billed; BytePlus publishes the per-second equivalent) | **$0.040** | $0.04/s published | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **UniqAI** | Kling 3.0 | 5 s | 7,000-Gem pack ($19.99, needs an active plan) | **$0.046** | 80 cr × ($19.99 ÷ 7,000 cr) ÷ 5 s | [UniqAI pricing](https://uniqai.app/pricing) | 2026-10-28 |
| **MiniMax API** | Hailuo 2.3 | 6 s, 768p | pay-as-you-go, per clip | **$0.047** | $0.28 ÷ 6 s | [MiniMax video pricing](https://platform.minimax.io/docs/guides/pricing-video) | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 1.0 Pro Fast | 5 s, 1080p | pay-as-you-go, per clip | **$0.048** | $0.24 ÷ 5 s | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **Google Flow** | Veo 3.1 Fast | 8 s, audio | Google AI Pro ($19.99/mo, 1,000 Flow credits) | **$0.050** | 20 cr × ($19.99 ÷ 1,000 cr) ÷ 8 s | [Flow credits](https://support.google.com/flow/answer/16526234?hl=en) | 2026-10-28 |
| **Runway API** | Gen-4 Turbo | — | pay-as-you-go ($0.01 per credit) | **$0.050** | 5 cr/s × $0.01/cr | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **MiniMax API** | Hailuo 2.3 | 10 s, 768p | pay-as-you-go, per clip | **$0.056** | $0.56 ÷ 10 s | [MiniMax video pricing](https://platform.minimax.io/docs/guides/pricing-video) | 2026-10-28 |
| **Luma app** | Ray3.2 | 5 s, 720p | Plus plan ($30/mo, 10,000 credits) | **$0.060** | 100 cr × ($30.00 ÷ 10,000 cr) ÷ 5 s | [Luma pricing](https://lumalabs.ai/pricing) | 2026-10-28 |
| **Luma API** | Ray3.2 | 5 s, 720p | pay-as-you-go, per 5-second block | **$0.060** | $0.30 ÷ 5 s | [Luma API pricing](https://lumalabs.ai/api/pricing) | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 2.0 | 480p | pay-as-you-go (token-billed; BytePlus publishes the per-second equivalent) | **$0.070** | $0.07/s published | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **Luma app** | Seedance 2.0 | 480p, audio | Plus plan ($30/mo, 10,000 credits) | **$0.072** | 24 cr/s × ($30.00 ÷ 10,000 cr) | [Luma pricing](https://lumalabs.ai/pricing) | 2026-10-28 |
| **Pika** | Wan 3.0 | 5 s, 720p | Starter plan ($10/mo, 900 credits) | **$0.073** | 33 cr × ($10.00 ÷ 900 cr) ÷ 5 s | [Pika pricing](https://pika.art/pricing) | 2026-10-28 |
| **UniqAI** | Kling 3.0 | 8 s | 1,000-Gem pack ($4.99) | **$0.075** | 120 cr × ($4.99 ÷ 1,000 cr) ÷ 8 s | [UniqAI pricing](https://uniqai.app/pricing) | 2026-10-28 |
| **UniqAI** | Kling 3.0 | 5 s | 1,000-Gem pack ($4.99) | **$0.080** | 80 cr × ($4.99 ÷ 1,000 cr) ÷ 5 s | [UniqAI pricing](https://uniqai.app/pricing) | 2026-10-28 |
| **MiniMax API** | MiniMax H3 | 768p | pay-as-you-go, per second of output | **$0.080** | $0.08/s published | [MiniMax video pricing](https://platform.minimax.io/docs/guides/pricing-video) | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 2.0 Mini | 720p | pay-as-you-go (token-billed; BytePlus publishes the per-second equivalent) | **$0.080** | $0.08/s published | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **MiniMax API** | Hailuo 2.3 | 6 s, 1080p | pay-as-you-go, per clip | **$0.082** | $0.49 ÷ 6 s | [MiniMax video pricing](https://platform.minimax.io/docs/guides/pricing-video) | 2026-10-28 |
| **Runway API** | Kling 3.0 | no audio | pay-as-you-go ($0.01 per credit), Standard | **$0.090** | 9 cr/s × $0.01/cr | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **Gemini API** | Gemini Omni Flash | 720p | pay-as-you-go ($17.50 per 1M output tokens) | **$0.101** | 5,792 tok/s × $17.50 ÷ 1M | [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing), 2026-10-27 | 2026-10-28 |
| **Pika** | Wan 3.0 | 5 s, 720p | top-up ($1 per 60 credits) | **$0.110** | 33 cr × ($1.00 ÷ 60 cr) ÷ 5 s | [Pika pricing](https://pika.art/pricing) | 2026-10-28 |
| **Runway app** | Gen-4.5 | — | Max plan ($95/mo, 9,500 credits) | **$0.120** | 12 cr/s × ($95.00 ÷ 9,500 cr) | [Runway pricing](https://runway.com/pricing) | 2026-10-28 |
| **Runway API** | Gen-4.5 | — | pay-as-you-go ($0.01 per credit) | **$0.120** | 12 cr/s × $0.01/cr | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **Runway API** | Kling 3.0 | audio | pay-as-you-go ($0.01 per credit), Standard with audio | **$0.130** | 13 cr/s × $0.01/cr | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **MiniMax API** | MiniMax H3 | 2K | pay-as-you-go, per second of output | **$0.130** | $0.13/s published | [MiniMax video pricing](https://platform.minimax.io/docs/guides/pricing-video) | 2026-10-28 |
| **Luma app** | Kling 3.0 | 1080p, audio | Plus plan ($30/mo, 10,000 credits) | **$0.147** | 49 cr/s × ($30.00 ÷ 10,000 cr) | [Luma pricing](https://lumalabs.ai/pricing) | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 2.0 | 720p | pay-as-you-go (token-billed; BytePlus publishes the per-second equivalent) | **$0.150** | $0.15/s published | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **Runway API** | Kling 3.0 | audio | pay-as-you-go ($0.01 per credit), Pro with audio | **$0.170** | 17 cr/s × $0.01/cr | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **Kling app** | Kling 3.0 | 4K | Ultra plan ($159.99/mo, 26,000 credits) | **$0.185** | 30 cr/s × ($159.99 ÷ 26,000 cr) | [Kling 3.0 credit cost guide](https://kling.ai/blog/kling-video-3-0-credit-cost-guide), 2026-07-28 | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 2.5 | 720p | pay-as-you-go (token-billed; BytePlus publishes the per-second equivalent) | **$0.231** | $0.231/s published | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **Luma app** | Ray3.2 | 5 s, 1080p | Plus plan ($30/mo, 10,000 credits) | **$0.240** | 400 cr × ($30.00 ÷ 10,000 cr) ÷ 5 s | [Luma pricing](https://lumalabs.ai/pricing) | 2026-10-28 |
| **Luma API** | Ray3.2 | 5 s, 1080p | pay-as-you-go, per 5-second block | **$0.240** | $1.20 ÷ 5 s | [Luma API pricing](https://lumalabs.ai/api/pricing) | 2026-10-28 |
| **Google Flow** | Veo 3.1 Quality | 8 s, audio | Google AI Pro ($19.99/mo, 1,000 Flow credits) | **$0.250** | 100 cr × ($19.99 ÷ 1,000 cr) ÷ 8 s | [Flow credits](https://support.google.com/flow/answer/16526234?hl=en) | 2026-10-28 |
| **Higgsfield** | Seedance 2.0 | 5 s, 720p | Ultra plan ($129/mo, 3,000 credits) | **$0.258** | 30 cr × ($129.00 ÷ 3,000 cr) ÷ 5 s | [Higgsfield pricing explained](https://higgsfield.ai/blog/higgsfield-pricing-explained), 2026-10-24 | 2026-10-28 |
| **Pika** | Seedance 2.5 | 5 s, 720p | Starter plan ($10/mo, 900 credits) | **$0.271** | 122 cr × ($10.00 ÷ 900 cr) ÷ 5 s | [Pika pricing](https://pika.art/pricing) | 2026-10-28 |
| **Runway app** | Gen-4.5 | — | Standard plan ($15/mo, 625 credits) | **$0.288** | 12 cr/s × ($15.00 ÷ 625 cr) | [Runway pricing](https://runway.com/pricing) | 2026-10-28 |
| **Higgsfield** | Seedance 2.0 | 5 s, 720p | Plus plan ($49/mo, 1,000 credits) | **$0.294** | 30 cr × ($49.00 ÷ 1,000 cr) ÷ 5 s | [Higgsfield pricing explained](https://higgsfield.ai/blog/higgsfield-pricing-explained), 2026-10-24 | 2026-10-28 |
| **Runway API** | Seedance 2.0 | 720p | pay-as-you-go | **$0.300** | $0.30/s published | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **Higgsfield** | Veo 3 | 8 s, 720p, audio | Plus plan ($49/mo, 1,000 credits) | **≈ $0.355** | 58 cr × ($49.00 ÷ 1,000 cr) ÷ 8 s | [Higgsfield pricing explained](https://higgsfield.ai/blog/higgsfield-pricing-explained), 2026-10-24 | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 2.0 | 1080p | pay-as-you-go (token-billed; BytePlus publishes the per-second equivalent) | **$0.370** | $0.37/s published | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **UniqAI** | Veo 3 | 6 s, audio | 30-Cinema pack ($69.99, needs an active plan) | **$0.389** | 1 cr × ($69.99 ÷ 30 cr) ÷ 6 s | [UniqAI pricing](https://uniqai.app/pricing) | 2026-10-28 |
| **UniqAI** | Veo 3 | 6 s, audio | 5-Cinema pack ($11.99) | **$0.400** | 1 cr × ($11.99 ÷ 5 cr) ÷ 6 s | [UniqAI pricing](https://uniqai.app/pricing) | 2026-10-28 |
| **Kling app** | Kling 3.0 | 4K | Standard plan ($8.80/mo, 660 credits) | **$0.400** | 30 cr/s × ($8.80 ÷ 660 cr) | [Kling 3.0 credit cost guide](https://kling.ai/blog/kling-video-3-0-credit-cost-guide), 2026-07-28 | 2026-10-28 |
| **Runway API** | Seedance 2.0 | 1080p | pay-as-you-go | **$0.400** | $0.40/s published | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **Pika** | Seedance 2.5 | 5 s, 720p | top-up ($1 per 60 credits) | **$0.407** | 122 cr × ($1.00 ÷ 60 cr) ÷ 5 s | [Pika pricing](https://pika.art/pricing) | 2026-10-28 |
| **Luma app** | Veo 3.1 | 720p, no audio | Plus plan ($30/mo, 10,000 credits) | **$0.420** | 140 cr/s × ($30.00 ÷ 10,000 cr) | [Luma pricing](https://lumalabs.ai/pricing) | 2026-10-28 |
| **Runway API** | Kling 3.0 | 4K | pay-as-you-go ($0.01 per credit), 4K | **$0.430** | 43 cr/s × $0.01/cr | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **Higgsfield** | Seedance 2.0 | 5 s, 720p | Starter plan ($15/mo, 200 credits) | **$0.450** | 30 cr × ($15.00 ÷ 200 cr) ÷ 5 s | [Higgsfield pricing explained](https://higgsfield.ai/blog/higgsfield-pricing-explained), 2026-10-24 | 2026-10-28 |
| **Higgsfield** | Seedance 2.0 | 5 s, 1080p | Plus plan ($49/mo, 1,000 credits) | **$0.588** | 60 cr × ($49.00 ÷ 1,000 cr) ÷ 5 s | [Higgsfield pricing explained](https://higgsfield.ai/blog/higgsfield-pricing-explained), 2026-10-24 | 2026-10-28 |
| **UniqAI** | Veo 3 | 8 s, audio | 5-Cinema pack ($11.99) | **$0.600** | 2 cr × ($11.99 ÷ 5 cr) ÷ 8 s | [UniqAI pricing](https://uniqai.app/pricing) | 2026-10-28 |
| **BytePlus ModelArk API** | Seedance 2.0 | 4K | pay-as-you-go (token-billed; BytePlus publishes the per-second equivalent) | **$0.780** | $0.78/s published | [ModelArk pricing](https://ai.byteplus.com/ark/region:ap-southeast-1/docs/model-pricing) | 2026-10-28 |
| **Luma app** | Seedance 2.0 | 4K | Plus plan ($30/mo, 10,000 credits) | **$0.783** | 261 cr/s × ($30.00 ÷ 10,000 cr) | [Luma pricing](https://lumalabs.ai/pricing) | 2026-10-28 |
| **Higgsfield** | Seedance 2.0 | 5 s, 4K | Plus plan ($49/mo, 1,000 credits) | **$1.274** | 130 cr × ($49.00 ÷ 1,000 cr) ÷ 5 s | [Higgsfield pricing explained](https://higgsfield.ai/blog/higgsfield-pricing-explained), 2026-10-24 | 2026-10-28 |
| **Runway API** | Seedance 2.0 | 4K | pay-as-you-go | **$1.500** | $1.50/s published | [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/) | 2026-10-28 |
| **Kling app** | Kling 3.0 | 720p / 1080p | Standard, Pro, Premier and Ultra plans | **not published** | not published | [Kling credits policy](https://kling.ai/docs/point-policy) | 2026-10-28 |
| **Kling API** | Kling 3.0 | — | developer pricing | **not published** | not published | [Kling developer pricing](https://kling.ai/dev/pricing) | 2026-10-28 |
| **Hailuo app** | Hailuo 2.3 | — | subscription plans | **not published** | not published | [Hailuo subscribe](https://hailuoai.video/subscribe) | 2026-10-28 |
| **Higgsfield** | Kling 3.0 | 5 s, 720p | Plus and Ultra plans | **not published** | not published | [Higgsfield pricing explained](https://higgsfield.ai/blog/higgsfield-pricing-explained), 2026-10-24 | 2026-10-28 |
| **OpenAI** | Sora 2 | — | none | **—** | discontinued | [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations), 2026-03-24 | 2026-10-28 |
<!-- prices:end -->

Preise in USD bei monatlicher Abrechnung, gelesen von der verlinkten Seite am Datum in der letzten Spalte. Die Sekundenpreise sind auf drei Nachkommastellen gerundet. Die Erklärseite rundet auf den Cent, dort steht für `$0.288` also `$0.29`; die Eingaben sind identisch. Vollständige Regeln: [references/methodology.md](references/methodology.md).

## So funktioniert es

1. `data/prices.json` enthält eine Zeile pro Dienst, Modell und Einstellung mit den Eingaben, die ein Anbieter tatsächlich veröffentlicht: Tarifpreis und Credits, Credits pro Clip oder pro Sekunde, gelieferte Sekunden, Auflösung, Audio oder ein direkter Preis pro Clip, Sekunde oder Token. Die Felddokumentation steht in [`data/schema.json`](data/schema.json).
2. `node scripts/avp.mjs recompute --write` füllt `usd_per_second` aus diesen Eingaben mit einer Formel pro Abrechnungsart. `validate` schlägt fehl, wenn ein gespeicherter Wert vom nachgerechneten abweicht, eine URL fehlerhaft ist, ein Datum nicht existiert oder einer veröffentlichten Zeile die Eingaben fehlen, die ihre Abrechnungsart braucht.
3. `export`, `readme --write` und `scripts/examples.mjs` erzeugen die CSV, die Tabelle in dieser README und die Dateien in `examples/` neu. Die Tests vergleichen jede davon Byte für Byte mit den Daten, sodass sich eine Zahl nicht nur an einer Stelle ändern kann.
4. `stale --days 30` listet Zeilen auf, die älter als 30 Tage sind, gruppiert nach Quellseite; `.github/workflows/price-recheck.yml` führt das am Ersten jedes Monats aus und öffnet ein Issue mit Checkliste.

```
data/prices.json ──recompute──▶ usd_per_second ──export──▶ data/prices.csv
        │                                          ──readme──▶ README.md (this table)
        │                                          ──examples──▶ examples/*
        └──stale──▶ price-recheck issue (monthly)
```

## Verwendung

```bash
node scripts/avp.mjs table --max 0.10 --published --format text   # everything at or under 10 cents
node scripts/avp.mjs model "Kling 3.0"                             # the same model through every door
node scripts/avp.mjs cheapest --audio yes --brief                  # cheapest rows whose price includes audio
node scripts/avp.mjs table --door api --format csv > api.csv       # developer APIs only, as CSV
node scripts/avp.mjs quote --plan-price 30 --credits 10000 --credits-per-clip 100 --seconds 5
node scripts/avp.mjs quote --clip-price 0.28 --seconds 6
node scripts/avp.mjs stale --days 30                               # rows due for a recheck
node scripts/avp.mjs validate                                      # schema + arithmetic, exit 1 on errors
node scripts/avp.mjs --help
```

Filter: `--service`, `--model`, `--maker`, `--door app|api`, `--resolution 720p`, `--audio yes|no`, `--max 0.10`, `--published`. Sortieren mit `--sort price|service|model|checked` und `--desc`; Ausgabe mit `--format md|text|csv|json`. Die Daten sind einfaches JSON, die CLI können Sie also auch weglassen: `JSON.parse(fs.readFileSync("data/prices.json"))` oder `pandas.read_csv("data/prices.csv")`.

## Beispiele

Jede Datei in [`examples/`](examples/README.md) ist die exakte Ausgabe des in [`examples/commands.json`](examples/commands.json) genannten Befehls, und die Testsuite reproduziert jede davon.

<details>
<summary><b>Ein Modell, sechs Wege: Kling 3.0</b></summary>

`node scripts/avp.mjs model "Kling 3.0" --format text --brief`

```text
        $ / s  service     model      clip
-------------  ----------  ---------  ------------
       $0.046  UniqAI      Kling 3.0  5 s
       $0.075  UniqAI      Kling 3.0  8 s
       $0.080  UniqAI      Kling 3.0  5 s
       $0.090  Runway API  Kling 3.0  no audio
       $0.130  Runway API  Kling 3.0  audio
       $0.147  Luma app    Kling 3.0  1080p, audio
       $0.170  Runway API  Kling 3.0  audio
       $0.185  Kling app   Kling 3.0  4K
       $0.400  Kling app   Kling 3.0  4K
       $0.430  Runway API  Kling 3.0  4K
not published  Kling app   Kling 3.0  720p / 1080p
not published  Kling API   Kling 3.0  —
not published  Higgsfield  Kling 3.0  5 s, 720p
```

Vollständige Version mit Preisbasis und Formel: [`examples/kling-3-0-doors.md`](examples/kling-3-0-doors.md).

</details>

<details>
<summary><b>Ihr eigener Tarif in Dollar pro Sekunde</b></summary>

`node scripts/avp.mjs quote --plan-price 4.99 --credits 1000 --credits-per-clip 80 --seconds 5`

```text
$ per second: 0.080
formula: 80 cr × ($4.99 ÷ 1,000 cr) ÷ 5 s
$ per credit: 0.00499
$ per clip (5 s): 0.399
$ per minute: 4.79
```

</details>

<details>
<summary><b>So sieht das monatliche Erinnerungs-Issue aus</b></summary>

`node scripts/avp.mjs stale --days 30 --as-of 2026-12-01` erzeugt eine nach Quellseite gruppierte Checkliste; siehe [`examples/stale-2026-12-01.md`](examples/stale-2026-12-01.md). Mit den mitgelieferten Daten und dem heutigen Datum gibt es `No rows older than 30 days.` aus.

</details>

## Installation

Die CLI funktioniert ohne jeden Agenten. Der Skill weist einen Agenten an, Preisfragen aus diesen Daten statt aus dem Gedächtnis zu beantworten und Quelle und Datum der Zeile zu nennen.

<details open>
<summary><b>Claude Code</b></summary>

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing ~/.claude/skills/ai-video-pricing
```

Dann `/ai-video-pricing` in einer beliebigen Sitzung eingeben oder einfach fragen „was kostet eine Sekunde Kling“; die Beschreibung des Skills löst ihn aus. Projektlokal statt global: in `.claude/skills/ai-video-pricing` innerhalb Ihres Projekts klonen. Sobald der uniqaiapp-Marketplace veröffentlicht ist: `/plugin marketplace add uniqaiapp/skills`, dann `/plugin install ai-video-pricing@uniqaiapp`.

</details>

<details>
<summary><b>Cursor</b></summary>

Kopieren Sie [`.cursor/rules/ai-video-pricing.mdc`](.cursor/rules/ai-video-pricing.mdc) zusammen mit `SKILL.md`, `scripts/`, `data/` und `references/` in das `.cursor/rules/` Ihres Projekts. Die Regeldatei bettet den Skill ein.

</details>

<details>
<summary><b>Codex / jeder Agent mit AGENTS.md</b></summary>

Kopieren Sie `SKILL.md`, `scripts/`, `data/` und `references/` nach `.agents/skills/ai-video-pricing/` und fügen Sie den Schnipsel aus [`codex/INSTRUCTIONS.md`](codex/INSTRUCTIONS.md) in Ihre `AGENTS.md` ein.

</details>

<details>
<summary><b>Einfacher Prompt</b></summary>

Fügen Sie [`SKILL.md`](SKILL.md) in den System-Prompt eines beliebigen Modells ein, das Shell-Befehle ausführen kann. Außerhalb des Frontmatters enthält sie keine agentenspezifische Syntax.

</details>

## Aktuell halten

Preise ändern sich monatlich. [`.github/workflows/price-recheck.yml`](.github/workflows/price-recheck.yml) läuft am Ersten jedes Monats, listet jede Zeile auf, die älter als 30 Tage ist, gruppiert nach Quellseite, und öffnet ein `price-recheck`-Issue (oder kommentiert das offene) mit einer Checkliste. Ein Maintainer liest jede Seite erneut, aktualisiert die Eingaben und `checked_on` und führt aus:

```bash
node scripts/avp.mjs recompute --write && node scripts/avp.mjs validate
node scripts/avp.mjs export && node scripts/avp.mjs readme --write && node scripts/examples.mjs
node tests/run.mjs
```

Um die Erinnerung in Ihrem eigenen Daten-Repository zu nutzen, kopieren Sie den Workflow und ersetzen die beiden `stale`-Zeilen durch einen beliebigen Befehl, der Ihre überfälligen Zeilen als Markdown ausgibt.

## Grenzen und Ehrlichkeit

- Jede Zahl hier wurde entweder am angegebenen Datum von der verlinkten Anbieterseite gelesen oder mit der Formel in der Zelle aus solchen Zahlen berechnet. Nichts ist geschätzt. Ein Anbieter, der seinen Preis verbirgt, bekommt eine `not_published`-Zeile.
- Der Datensatz bewertet bezahlte Ausgabe bei regulärer monatlicher Abrechnung. Tägliche Gratis-Credits, Aktionen für den ersten Monat, Jahresrabatte, Wasserzeichen, kommerzielle Lizenzstufen, „Unlimited“-Modi, Credit-Übertrag und API-Mindestabnahmen verändern den effektiven Preis für manche Nutzer; sie stehen in `notes` und in der [Methodik](references/methodology.md), nicht in der Zahl.
- Die eigenen Zeilen von UniqAI folgen derselben Regel wie alle anderen: die zwei Pakete, die jeder ohne Tarif kaufen kann, plus die größten Pakete als Untergrenze. UniqAI ist für Kling 3.0 und Wan 2.5 einer der günstigeren Wege und für Veo 3 einer der teureren; die Tabelle sagt das auch.
- Die Zahlen zu Zeilen, Diensten und Modellen in dieser README stammen aus `node scripts/avp.mjs validate` (`ok: 69 rows, 64 published`) und den Beispielen. Es gibt hier keine Nutzungs-, Download- oder Beliebtheitszahlen, weil wir keine ehrlichen haben.
- Auflösungsbezeichnungen sind die des Anbieters und nicht normalisiert. Der Datensatz ist in USD und auf Englisch und deckt die oben genannten Anbieter ab; er erhebt keinen Anspruch auf Vollständigkeit.

## FAQ

<details>
<summary><b>Welcher KI-Video-Generator ist pro Sekunde am günstigsten?</b></summary>

In den am 2026-10-28 geprüften Zeilen: Seedance 1.0 Pro Fast über die BytePlus ModelArk API in 480p ($0.05 pro 5-Sekunden-Clip, $0.010 pro Sekunde). In 720p liegt die Untergrenze bei $0.020 bis $0.030 (Seedance 1.0 Pro Fast, Gemini Omni Flash in Google Flow). Führen Sie `node scripts/avp.mjs cheapest --resolution 720p` aus, um die aktuelle Liste mit Formeln zu erhalten.

</details>

<details>
<summary><b>Was kostet Kling 3.0 pro Sekunde?</b></summary>

Das hängt vom Weg ab: $0.080 bei UniqAI (5-s-Clip, 1,000-Gem-Paket), $0.090 über die API von Runway ohne Audio, $0.147 bei Luma in 1080p mit Audio, $0.400 in 4K im Standard-Tarif von Kling selbst. Die Kling-App veröffentlicht ihre Credit-Kosten für 720p und 1080p nur im Generierungsfenster. `node scripts/avp.mjs model "Kling 3.0"` gibt alles davon aus.

</details>

<details>
<summary><b>Warum ist dasselbe Modell so unterschiedlich bepreist?</b></summary>

Tarifarithmetik. Ein $30-Tarif mit 10,000 Credits und ein $15-Tarif mit 625 Credits lassen sich nicht vergleichen, bevor man weiß, was ein Credit für dieses Modell in dieser Auflösung kauft. Wiederverkäufer fügen außerdem Mindestmengen hinzu (bei Runway 56 bis 80 Credits pro Generierung) und bündeln Audio unterschiedlich. Durch die gelieferten Sekunden zu teilen ist der einzige Weg, sie nebeneinanderzustellen, und die Clip-Spalte zeigt, wann der Vergleich trotzdem noch unfair ist.

</details>

<details>
<summary><b>Verkauft OpenAI Sora noch?</b></summary>

Nein. Die Sora-App wurde am 2026-04-26 geschlossen, und die Videos API mit sora-2 und sora-2-pro wurde am 2026-09-24 entfernt; die Deprecations-Seite von OpenAI nennt kein Nachfolge-Videomodell, daher enthält der Datensatz eine `discontinued`-Zeile statt eines Preises.

</details>

<details>
<summary><b>Darf ich diese Daten in meinem eigenen Artikel oder Tool verwenden?</b></summary>

Ja, unter CC BY 4.0: Nennen Sie „UniqAI, https://github.com/uniqaiapp/ai-video-pricing“ und lassen Sie das Prüfdatum sichtbar, damit Leser wissen, wie alt die Zahlen sind. [`CITATION.cff`](CITATION.cff) enthält eine maschinenlesbare Zitation. Die Skripte stehen unter MIT.

</details>

## Verwandte Projekte

- [awesome-ai-video-prompts](https://github.com/uniqaiapp/awesome-ai-video-prompts): kuratierte, kategorisierte Prompts für KI-Videomodelle mit den Einstellungen, die sie erzeugt haben, als JSON und Markdown.
- [video-director](https://github.com/uniqaiapp/video-director): macht aus einer einzeiligen Idee einen Shot-für-Shot-Prompt für KI-Videomodelle (Kling, Veo, Sora und andere), mit Vokabular für Kamera, Licht und Bewegung.
- [model-router](https://github.com/uniqaiapp/model-router): wählt das günstigste Modell, das die Aufgabe schafft: eine Regeltabelle und ein Skript nur mit Standardbibliothek, das Aufgaben nach Typ, Länge und Risiko verteilt.

## Mitwirken

Korrekturen sind als Issues oder Pull Requests willkommen; die Vorlage [price correction](.github/ISSUE_TEMPLATE/price_correction.md) fragt nach der Anbieter-URL und der gelesenen Zeile. Den Ablauf „neu erzeugen und testen“ beschreibt [CONTRIBUTING.md](CONTRIBUTING.md) (`node tests/run.mjs`, keine Abhängigkeiten).

## Lizenz

Daten (`data/`, `examples/`, `references/`) stehen unter [CC BY 4.0](LICENSE); Skripte und alles andere unter [MIT](LICENSE). © UniqAI

---

<div align="center">

<sub>Erstellt von <a href="https://uniqai.app/?utm_source=github&utm_medium=readme-de&utm_campaign=ai-video-pricing">UniqAI</a>, einer App für KI-Fotos, -Videos und -Chat. Wir verfolgen den Sekundenpreis jedes Anbieters ohnehin, um unseren eigenen festzulegen, also wird die Tabelle so oder so gepflegt.</sub>

</div>
