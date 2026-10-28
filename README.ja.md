<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg">
  <img alt="ai-video-pricing: AI video cost per second, checked and dated" src="assets/banner.svg" width="1280" height="320">
</picture>

[![License: CC BY 4.0 + MIT](https://img.shields.io/badge/license-CC_BY_4.0_%2B_MIT-d1fe17?style=flat-square&labelColor=0d0f12)](LICENSE)
[![Claude Code skill](https://img.shields.io/badge/Claude_Code-skill-d1fe17?style=flat-square&labelColor=0d0f12)](#インストール)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-d1fe17?style=flat-square&labelColor=0d0f12)](#使い方)
[![Prices checked](https://img.shields.io/badge/prices_checked-2026--10--28-d1fe17?style=flat-square&labelColor=0d0f12)](#料金表)
[![Made by UniqAI](https://img.shields.io/badge/made_by-UniqAI-fdfc07?style=flat-square&labelColor=0d0f12)](https://uniqai.app/?utm_source=github&utm_medium=readme-ja&utm_campaign=ai-video-pricing)

# ai-video-pricing：AI動画は1秒いくらか、Kling・Veo・Runway・Luma の料金比較

**AI動画1秒あたりのドル単価を各ベンダー自身の料金ページから取得し、すべての行に計算式、出典URL、確認日を記載しています。**

[料金表](#料金表) · [仕組み](#仕組み) · [使い方](#使い方) · [インストール](#インストール) · [データを最新に保つ](#データを最新に保つ) · [FAQ](#faq)

</div>

[English](README.md) · [Русский](README.ru.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · 日本語 · [한국어](README.ko.md) · [Deutsch](README.de.md)

Kling 3.0、Veo 3 および 3.1、Runway Gen-4.5、Luma Ray3.2、Pika、MiniMax Hailuo と H3、BytePlus 経由の Seedance、Higgsfield、Google Flow、Gemini API、UniqAI の AI動画1秒あたりの料金を 2026-10-28 に確認し、すべての行に出典URLを付けています。ベンダーが売っているのはプランとクレジットであって秒数ではないため、この表では支払額を実際に得られる秒数で割り、その計算をセル内にそのまま示しています。データは CC BY 4.0 の JSON と CSV で、依存パッケージなしの Node 製 CLI で絞り込み、再計算、自分のプランの単価計算、再確認が必要な行の一覧表示ができます。同じ数字を使った詳しい解説は [uniqai.app](https://uniqai.app/video/ai-video-cost-per-second?utm_source=github&utm_medium=readme-ja&utm_campaign=ai-video-pricing) にあります。

| **計算式はひとつ、しかも明示** | **ベンダーのページのみ** | **古い行には印が付く** |
|:---|:---|:---|
| `（クリップあたりのクレジット × クレジット単価$）÷ 実際に得られる秒数` をすべての数字の横に表示。CLI が再計算し、手入力は一切ありません。 | すべての行がベンダー自身の料金ページと、それを読んだ日付にリンクしています。アプリ内でしか表示されない価格は推測せず `not published` と記します。 | `avp stale` が 30 日より古い行を一覧表示し、毎月の GitHub Action がそれをチェックリスト付きの issue にします。 |

## クイックスタート

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing && cd ai-video-pricing
node scripts/avp.mjs cheapest --resolution 720p
node scripts/avp.mjs quote --plan-price 15 --credits 625 --credits-per-second 12
```

1 つ目のコマンドは、公開価格のある 720p の行のうち最も安い 5 行を計算式付きで表示します。2 つ目はプラン（「$15 で 625 クレジット、1 秒あたり 12 クレジット」）を 1 秒あたり $0.288、1 クレジットあたり $0.024、1 分あたり $17.28 に換算します。Node 18 以降が必要で、インストールするものはありません。

## デモ

<img alt="ai-video-pricing demo: cheapest 720p rows, a plan quote, and the stale-row check" src="assets/demo.svg" width="820">

## 料金表

1 秒あたりの価格順に並んでいます。クリップ = ベンダーが明記している、得られる秒数・解像度・音声の有無です。2 つのセルを比べるのは、クリップ列が一致しているときだけにしてください。`not published` は、ベンダーがアプリやコンソールの中でしか価格を表示していないことを意味します。[`data/prices.json`](data/prices.json) から `node scripts/avp.mjs readme --write` で生成され、この表とデータが食い違うとテストが失敗します。

<!-- prices:start -->
| サービス | モデル | クリップ | 料金の基準 | $ / 秒 | 計算式 | 出典 | 確認日 |
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

価格は月額課金の USD で、最終列の日付にリンク先のページから読み取ったものです。1 秒あたりの値は小数点以下 3 桁に丸めています。解説ページではセント単位に丸めるため、`$0.288` はそこでは `$0.29` と表示されますが、入力値は同一です。詳しいルールは [references/methodology.md](references/methodology.md) を参照してください。

## 仕組み

1. `data/prices.json` には、サービス・モデル・設定ごとに 1 行ずつ、ベンダーが実際に公開している入力値だけを保存しています。プラン価格とクレジット数、クリップあたりまたは秒あたりのクレジット、得られる秒数、解像度、音声、あるいはクリップ・秒・トークンあたりの直接価格です。フィールドの説明は [`data/schema.json`](data/schema.json) にあります。
2. `node scripts/avp.mjs recompute --write` が、課金方式ごとにひとつの計算式でこれらの入力値から `usd_per_second` を埋めます。保存値が再計算値と異なる、URL の形式が不正、日付が実在しない、公開行にその課金方式に必要な入力値がない、のいずれかがあると `validate` は失敗します。
3. `export`、`readme --write`、`scripts/examples.mjs` が CSV、この README の表、`examples/` のファイルを再生成します。テストはそれぞれをデータとバイト単位で比較するため、数字が一箇所だけ変わることはありません。
4. `stale --days 30` が 30 日より古い行を出典ページごとにまとめて一覧表示します。`.github/workflows/price-recheck.yml` が毎月 1 日にこれを実行し、チェックリスト付きの issue を開きます。

```
data/prices.json ──recompute──▶ usd_per_second ──export──▶ data/prices.csv
        │                                          ──readme──▶ README.md (this table)
        │                                          ──examples──▶ examples/*
        └──stale──▶ price-recheck issue (monthly)
```

## 使い方

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

フィルタ：`--service`、`--model`、`--maker`、`--door app|api`、`--resolution 720p`、`--audio yes|no`、`--max 0.10`、`--published`。並び替えは `--sort price|service|model|checked` と `--desc`、出力形式は `--format md|text|csv|json` です。データはただの JSON なので、CLI を使わなくても構いません：`JSON.parse(fs.readFileSync("data/prices.json"))` または `pandas.read_csv("data/prices.csv")`。

## 例

[`examples/`](examples/README.md) の各ファイルは [`examples/commands.json`](examples/commands.json) に記載されたコマンドの出力そのもので、テストスイートがそれぞれを再現します。

<details>
<summary><b>同じモデル、6 つの入口：Kling 3.0</b></summary>

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

料金の基準と計算式を含む完全版：[`examples/kling-3-0-doors.md`](examples/kling-3-0-doors.md)。

</details>

<details>
<summary><b>自分のプランを 1 秒あたりのドルに換算する</b></summary>

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
<summary><b>毎月のリマインダー issue はこう見える</b></summary>

`node scripts/avp.mjs stale --days 30 --as-of 2026-12-01` は出典ページごとにまとめたチェックリストを出力します。[`examples/stale-2026-12-01.md`](examples/stale-2026-12-01.md) を参照してください。同梱のデータと今日の日付では `No rows older than 30 days.` と表示されます。

</details>

## インストール

CLI はエージェントなしで動作します。スキルは、価格に関する質問に記憶ではなくこのデータで答え、その行の出典と日付を引用するようエージェントに指示します。

<details open>
<summary><b>Claude Code</b></summary>

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing ~/.claude/skills/ai-video-pricing
```

その後、任意のセッションで `/ai-video-pricing` と入力するか、単に「Kling は 1 秒いくら」と聞いてください。スキルの説明文がトリガーになります。グローバルではなくプロジェクト単位で使う場合は、プロジェクト内の `.claude/skills/ai-video-pricing` にクローンします。uniqaiapp マーケットプレイスの公開後は `/plugin marketplace add uniqaiapp/skills` の後に `/plugin install ai-video-pricing@uniqaiapp` を実行します。

</details>

<details>
<summary><b>Cursor</b></summary>

[`.cursor/rules/ai-video-pricing.mdc`](.cursor/rules/ai-video-pricing.mdc) を `SKILL.md`、`scripts/`、`data/`、`references/` と一緒にプロジェクトの `.cursor/rules/` にコピーします。ルールファイルにスキルが埋め込まれています。

</details>

<details>
<summary><b>Codex / AGENTS.md を読む任意のエージェント</b></summary>

`SKILL.md`、`scripts/`、`data/`、`references/` を `.agents/skills/ai-video-pricing/` にコピーし、[`codex/INSTRUCTIONS.md`](codex/INSTRUCTIONS.md) のスニペットを自分の `AGENTS.md` に追加します。

</details>

<details>
<summary><b>プレーンなプロンプト</b></summary>

シェルコマンドを実行できる任意のモデルのシステムプロンプトに [`SKILL.md`](SKILL.md) を貼り付けます。frontmatter 以外にエージェント固有の構文はありません。

</details>

## データを最新に保つ

価格は毎月動きます。[`.github/workflows/price-recheck.yml`](.github/workflows/price-recheck.yml) は毎月 1 日に実行され、30 日より古い行をすべて出典ページごとにまとめて一覧にし、チェックリスト付きの `price-recheck` issue をひとつ開きます（すでに開いていればそこにコメントします）。メンテナーが各ページを読み直し、入力値と `checked_on` を更新して、次を実行します：

```bash
node scripts/avp.mjs recompute --write && node scripts/avp.mjs validate
node scripts/avp.mjs export && node scripts/avp.mjs readme --write && node scripts/examples.mjs
node tests/run.mjs
```

このリマインダーを自分のデータリポジトリで使うには、ワークフローをコピーして、2 行の `stale` を、期限切れの行を Markdown で出力する任意のコマンドに置き換えてください。

## 制限と正直な注記

- ここにある数字はすべて、記載の日付にリンク先のベンダーページから読み取ったものか、そうした数字からセル内の計算式で算出したものです。推定値はありません。価格を隠しているベンダーは `not_published` の行になります。
- このデータセットは、標準的な月額課金における有料出力の価格を扱います。毎日の無料クレジット、初月のプロモーション、年払い割引、ウォーターマーク、商用ライセンスの段階、「無制限」モード、クレジットの繰り越し、API の最低利用額は、一部のユーザーにとって実質価格を変えます。これらは `notes` と[方法論](references/methodology.md)に書かれており、数字には含まれていません。
- UniqAI 自身の行も他社とまったく同じルールに従っています。プランなしで誰でも買える 2 つのパックと、下限としての最大パックです。UniqAI は Kling 3.0 と Wan 2.5 では安い入口のひとつ、Veo 3 では高い入口のひとつであり、表はそのとおりに示しています。
- この README にある行数・サービス数・モデル数は `node scripts/avp.mjs validate`（`ok: 69 rows, 64 published`）と例から来ています。利用数、ダウンロード数、人気の数字はありません。正直な数字を持っていないからです。
- 解像度の表記はベンダーのものをそのまま使い、正規化していません。データセットは USD と英語で、上記のベンダーを対象としており、網羅性は主張しません。

## FAQ

<details>
<summary><b>1 秒あたりで最も安い AI動画生成はどれですか？</b></summary>

2026-10-28 に確認した行では、BytePlus ModelArk API 経由の Seedance 1.0 Pro Fast の 480p です（5 秒クリップあたり $0.05、1 秒あたり $0.010）。720p の下限は $0.020 から $0.030 です（Seedance 1.0 Pro Fast、Google Flow の Gemini Omni Flash）。`node scripts/avp.mjs cheapest --resolution 720p` を実行すると、計算式付きの最新リストが得られます。

</details>

<details>
<summary><b>Kling 3.0 は 1 秒いくらですか？</b></summary>

入口によって違います。UniqAI では $0.080（5 秒クリップ、1,000 Gem パック）、Runway の API 経由で音声なしなら $0.090、Luma の 1080p 音声ありで $0.147、Kling 自身の Standard プランの 4K で $0.400 です。Kling のアプリは 720p と 1080p のクレジット消費を生成パネルの外では公開していません。`node scripts/avp.mjs model "Kling 3.0"` ですべて表示されます。

</details>

<details>
<summary><b>同じモデルなのに、なぜこれほど価格が違うのですか？</b></summary>

プランの算数です。10,000 クレジットの $30 プランと 625 クレジットの $15 プランは、そのモデルのその解像度で 1 クレジットが何を買えるかを知るまで比較できません。再販業者はさらに最低消費（Runway は 1 回の生成につき 56 から 80 クレジット）を加え、音声の扱いもそれぞれ違います。得られる秒数で割ることが横に並べる唯一の方法で、クリップ列を見れば比較がまだ不公平なときが分かります。

</details>

<details>
<summary><b>OpenAI はまだ Sora を販売していますか？</b></summary>

いいえ。Sora アプリは 2026-04-26 に終了し、sora-2 と sora-2-pro を含む Videos API は 2026-09-24 に廃止されました。OpenAI の廃止一覧ページには後継の動画モデルが載っていないため、データセットには価格の代わりに `discontinued` の行があります。

</details>

<details>
<summary><b>このデータを自分の記事やツールで使えますか？</b></summary>

はい、CC BY 4.0 のもとで使えます。「UniqAI, https://github.com/uniqaiapp/ai-video-pricing」とクレジットし、数字の新しさが読者に分かるよう確認日を見える形で残してください。[`CITATION.cff`](CITATION.cff) に機械可読の引用情報があります。スクリプトは MIT です。

</details>

## 関連プロジェクト

- [awesome-ai-video-prompts](https://github.com/uniqaiapp/awesome-ai-video-prompts)：AI動画モデル向けの厳選・分類済みプロンプト集。生成時の設定付きで、JSON と Markdown で提供。
- [video-director](https://github.com/uniqaiapp/video-director)：一行のアイデアを AI動画モデル（Kling、Veo、Sora など）向けのショットごとのプロンプトに変換。カメラ、ライティング、動きの語彙付き。
- [model-router](https://github.com/uniqaiapp/model-router)：タスクをこなせる最も安いモデルを選ぶ。ルール表と、タスクを種類・長さ・リスクで振り分ける標準ライブラリのみのスクリプト。

## コントリビュート

修正は issue または pull request で歓迎します。[price correction](.github/ISSUE_TEMPLATE/price_correction.md) テンプレートでは、ベンダーの URL と読み取った行を尋ねます。再生成とテストの流れは [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください（`node tests/run.mjs`、依存パッケージなし）。

## ライセンス

データ（`data/`、`examples/`、`references/`）は [CC BY 4.0](LICENSE)、スクリプトとそれ以外はすべて [MIT](LICENSE) です。© UniqAI

---

<div align="center">

<sub>制作：<a href="https://uniqai.app/?utm_source=github&utm_medium=readme-ja&utm_campaign=ai-video-pricing">UniqAI</a>、AI写真・動画・チャットのアプリ。自社の価格を決めるために各ベンダーの秒単価をもともと追跡しているので、この表はいずれにせよ維持されます。</sub>

</div>
