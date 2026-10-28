<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg">
  <img alt="ai-video-pricing: AI video cost per second, checked and dated" src="assets/banner.svg" width="1280" height="320">
</picture>

[![License: CC BY 4.0 + MIT](https://img.shields.io/badge/license-CC_BY_4.0_%2B_MIT-d1fe17?style=flat-square&labelColor=0d0f12)](LICENSE)
[![Claude Code skill](https://img.shields.io/badge/Claude_Code-skill-d1fe17?style=flat-square&labelColor=0d0f12)](#安装)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-d1fe17?style=flat-square&labelColor=0d0f12)](#用法)
[![Prices checked](https://img.shields.io/badge/prices_checked-2026--10--28-d1fe17?style=flat-square&labelColor=0d0f12)](#价格表)
[![Made by UniqAI](https://img.shields.io/badge/made_by-UniqAI-fdfc07?style=flat-square&labelColor=0d0f12)](https://uniqai.app/?utm_source=github&utm_medium=readme-zh-cn&utm_campaign=ai-video-pricing)

# ai-video-pricing：AI 视频每秒多少钱，Kling、Veo、Runway、Luma 价格对比

**AI 视频每秒美元成本，数据取自各厂商自己的定价页面，每一行都附公式、来源链接和检查日期。**

[价格表](#价格表) · [工作原理](#工作原理) · [用法](#用法) · [安装](#安装) · [保持数据更新](#保持数据更新) · [FAQ](#faq)

</div>

[English](README.md) · [Русский](README.ru.md) · 简体中文 · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Deutsch](README.de.md)

Kling（可灵）3.0、Veo 3 和 3.1、Runway Gen-4.5、Luma Ray3.2、Pika、MiniMax Hailuo（海螺）和 H3、经 BytePlus 的 Seedance（即梦）、Higgsfield、Google Flow、Gemini API 以及 UniqAI 的 AI 视频每秒成本，于 2026-10-28 检查，每一行都有来源链接。厂商卖的是套餐和积分，不是秒数，所以这张表把你付的钱除以你拿到的秒数，并把算式直接写在单元格里。数据以 JSON 和 CSV 提供，许可证为 CC BY 4.0；一个零依赖的 Node CLI 可以筛选、重新计算、换算你自己的套餐，并列出该复查的行。使用同一组数字的长文解读在 [uniqai.app](https://uniqai.app/video/ai-video-cost-per-second?utm_source=github&utm_medium=readme-zh-cn&utm_campaign=ai-video-pricing)。

| **一个公式，明明白白** | **只认厂商页面** | **过期行会被标出** |
|:---|:---|:---|
| `（每段积分 × 每积分美元）÷ 实际交付秒数`，写在每个数字旁边，由 CLI 重新计算，从不手工输入。 | 每一行都链接到厂商自己的定价页面，并注明读取日期。只在应用内才显示的价格标为 `not published`，不猜。 | `avp stale` 列出超过 30 天的行；每月一次的 GitHub Action 把它们变成一条清单式 issue。 |

## 快速开始

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing && cd ai-video-pricing
node scripts/avp.mjs cheapest --resolution 720p
node scripts/avp.mjs quote --plan-price 15 --credits 625 --credits-per-second 12
```

第一条命令打印最便宜的五行已公开 720p 价格及其公式；第二条把一个套餐（“$15 买 625 积分，每秒 12 积分”）换算成每秒 $0.288、每积分 $0.024、每分钟 $17.28。需要 Node 18 或更新版本，无需安装任何东西。

## 演示

<img alt="ai-video-pricing demo: cheapest 720p rows, a plan quote, and the stale-row check" src="assets/demo.svg" width="820">

## 价格表

按每秒价格排序。片段 = 厂商标明的交付秒数、分辨率和音频；只有“片段”一列相同时，两个单元格才可比。`not published` 表示厂商只在应用或控制台内显示价格。由 `node scripts/avp.mjs readme --write` 从 [`data/prices.json`](data/prices.json) 生成；表格与数据不一致时测试会失败。

<!-- prices:start -->
| 服务 | 模型 | 片段 | 计价基础 | $ / 秒 | 公式 | 来源 | 检查日期 |
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

价格为按月计费的美元价格，在最后一列的日期从所链接页面读取。每秒价格四舍五入到小数点后三位。解读页面四舍五入到美分，所以那里的 `$0.288` 显示为 `$0.29`；输入数据完全相同。完整规则见 [references/methodology.md](references/methodology.md)。

## 工作原理

1. `data/prices.json` 为每个服务、模型和设置保存一行，只记录厂商实际公布的输入：套餐价格和积分数、每段或每秒积分、交付秒数、分辨率、音频，或者直接的每段、每秒、每 token 价格。字段说明在 [`data/schema.json`](data/schema.json)。
2. `node scripts/avp.mjs recompute --write` 按每种计费方式各一个公式，从这些输入算出 `usd_per_second`。如果存储值与重算值不符、URL 格式错误、日期不存在，或某个已公开的行缺少其计费方式所需的输入，`validate` 会失败。
3. `export`、`readme --write` 和 `scripts/examples.mjs` 重新生成 CSV、本 README 的表格以及 `examples/` 中的文件。测试逐字节比对它们与数据，所以任何数字都不可能只在一处改动。
4. `stale --days 30` 按来源页面分组列出超过 30 天的行；`.github/workflows/price-recheck.yml` 每月 1 日运行它并开一条清单 issue。

```
data/prices.json ──recompute──▶ usd_per_second ──export──▶ data/prices.csv
        │                                          ──readme──▶ README.md (this table)
        │                                          ──examples──▶ examples/*
        └──stale──▶ price-recheck issue (monthly)
```

## 用法

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

筛选：`--service`、`--model`、`--maker`、`--door app|api`、`--resolution 720p`、`--audio yes|no`、`--max 0.10`、`--published`。排序用 `--sort price|service|model|checked` 和 `--desc`；输出格式用 `--format md|text|csv|json`。数据就是普通 JSON，所以也可以跳过 CLI：`JSON.parse(fs.readFileSync("data/prices.json"))` 或 `pandas.read_csv("data/prices.csv")`。

## 示例

[`examples/`](examples/README.md) 中的每个文件都是 [`examples/commands.json`](examples/commands.json) 里对应命令的原样输出，测试套件会逐个复现。

<details>
<summary><b>同一模型，六个购买渠道：Kling 3.0</b></summary>

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

含计价基础和公式的完整版本：[`examples/kling-3-0-doors.md`](examples/kling-3-0-doors.md)。

</details>

<details>
<summary><b>把你自己的套餐换算成每秒美元</b></summary>

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
<summary><b>每月提醒 issue 长什么样</b></summary>

`node scripts/avp.mjs stale --days 30 --as-of 2026-12-01` 生成一份按来源页面分组的清单；见 [`examples/stale-2026-12-01.md`](examples/stale-2026-12-01.md)。在当前数据和今天的日期下，它输出 `No rows older than 30 days.`

</details>

## 安装

CLI 不需要任何 agent 就能用。这个 skill 让 agent 用这份数据而不是凭记忆回答价格问题，并引用该行的来源和日期。

<details open>
<summary><b>Claude Code</b></summary>

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing ~/.claude/skills/ai-video-pricing
```

然后在任意会话里输入 `/ai-video-pricing`，或者直接问“Kling 一秒多少钱”；skill 会根据自己的描述触发。想只在项目内安装而非全局：克隆到项目里的 `.claude/skills/ai-video-pricing`。等 uniqaiapp marketplace 发布后：先 `/plugin marketplace add uniqaiapp/skills`，再 `/plugin install ai-video-pricing@uniqaiapp`。

</details>

<details>
<summary><b>Cursor</b></summary>

把 [`.cursor/rules/ai-video-pricing.mdc`](.cursor/rules/ai-video-pricing.mdc) 连同 `SKILL.md`、`scripts/`、`data/` 和 `references/` 一起复制到你项目的 `.cursor/rules/`。规则文件内嵌了这个 skill。

</details>

<details>
<summary><b>Codex / 任何读取 AGENTS.md 的 agent</b></summary>

把 `SKILL.md`、`scripts/`、`data/` 和 `references/` 复制到 `.agents/skills/ai-video-pricing/`，并把 [`codex/INSTRUCTIONS.md`](codex/INSTRUCTIONS.md) 中的片段加到你的 `AGENTS.md`。

</details>

<details>
<summary><b>普通提示词</b></summary>

把 [`SKILL.md`](SKILL.md) 粘贴到任何能执行 shell 命令的模型的系统提示词里。除 frontmatter 外，它没有任何特定 agent 的语法。

</details>

## 保持数据更新

价格每月都在变。[`.github/workflows/price-recheck.yml`](.github/workflows/price-recheck.yml) 每月 1 日运行，按来源页面分组列出所有超过 30 天的行，并开一条 `price-recheck` issue（或在已开的那条下评论），附带检查清单。维护者重读每个页面，更新输入和 `checked_on`，然后运行：

```bash
node scripts/avp.mjs recompute --write && node scripts/avp.mjs validate
node scripts/avp.mjs export && node scripts/avp.mjs readme --write && node scripts/examples.mjs
node tests/run.mjs
```

要在你自己的数据仓库里复用这个提醒，复制该 workflow，把其中两行 `stale` 换成任何能以 Markdown 打印过期行的命令即可。

## 局限与诚实说明

- 这里的每个数字要么是在标注日期从所链接的厂商页面读取的，要么是用单元格里的公式从这些数字算出来的。没有任何估算。隐藏价格的厂商得到一行 `not_published`。
- 本数据集按标准月付计算付费产出的价格。每日免费积分、首月促销、年付折扣、水印、商用授权档位、“无限”模式、积分结转和 API 最低消费都会改变部分用户的实际价格；这些写在 `notes` 和[方法说明](references/methodology.md)里，不计入数字。
- UniqAI 自己的行遵守与其他家完全相同的规则：任何人无需订阅即可购买的两个积分包，加上作为下限的最大积分包。UniqAI 在 Kling 3.0 和 Wan 2.5 上属于较便宜的渠道，在 Veo 3 上属于较贵的渠道；表格就是这么写的。
- 本 README 中的行数、服务数和模型数来自 `node scripts/avp.mjs validate`（`ok: 69 rows, 64 published`）和示例文件。这里没有使用量、下载量或热度数字，因为我们没有诚实的数据可写。
- 分辨率标签沿用厂商的写法，未做归一化。数据集以美元和英文为准，只覆盖上面列出的厂商，不声称完整。

## FAQ

<details>
<summary><b>按秒算最便宜的 AI 视频生成器是哪个？</b></summary>

按 2026-10-28 检查的行，是通过 BytePlus ModelArk API 的 Seedance 1.0 Pro Fast 480p（每 5 秒片段 $0.05，每秒 $0.010）。720p 的底价在 $0.020 到 $0.030 之间（Seedance 1.0 Pro Fast、Google Flow 里的 Gemini Omni Flash）。运行 `node scripts/avp.mjs cheapest --resolution 720p` 可得到带公式的最新列表。

</details>

<details>
<summary><b>Kling 3.0 每秒多少钱？</b></summary>

看从哪里买：UniqAI 里 $0.080（5 秒片段，1,000 Gem 积分包），通过 Runway API 不带音频 $0.090，Luma 里 1080p 带音频 $0.147，Kling 自家 Standard 套餐 4K $0.400。Kling 应用在生成面板之外不公布 720p 和 1080p 的积分消耗。`node scripts/avp.mjs model "Kling 3.0"` 会把这些全部打印出来。

</details>

<details>
<summary><b>同一个模型为什么价格差这么多？</b></summary>

套餐算术。一个 $30 含 10,000 积分的套餐和一个 $15 含 625 积分的套餐，在你弄清一个积分在该模型该分辨率下能买到什么之前，根本没法比。转售方还会加最低消费（Runway 每次生成 56 到 80 积分）并以不同方式捆绑音频。除以交付秒数是唯一能把它们并排比较的办法，而“片段”一列会告诉你比较何时仍然不公平。

</details>

<details>
<summary><b>OpenAI 还在卖 Sora 吗？</b></summary>

不卖了。Sora 应用已于 2026-04-26 关闭，包含 sora-2 和 sora-2-pro 的 Videos API 已于 2026-09-24 下线；OpenAI 的弃用页面没有列出替代的视频模型，所以数据集里是一行 `discontinued` 而不是价格。

</details>

<details>
<summary><b>我可以在自己的文章或工具里用这些数据吗？</b></summary>

可以，依据 CC BY 4.0：注明“UniqAI, https://github.com/uniqaiapp/ai-video-pricing”并保留可见的检查日期，让读者知道这些数字有多新。[`CITATION.cff`](CITATION.cff) 提供机器可读的引用信息。脚本为 MIT 许可。

</details>

## 相关项目

- [awesome-ai-video-prompts](https://github.com/uniqaiapp/awesome-ai-video-prompts)：精选并分类的 AI 视频模型提示词，附生成时的设置，提供 JSON 和 Markdown。
- [video-director](https://github.com/uniqaiapp/video-director)：把一句话的想法变成 AI 视频模型（Kling、Veo、Sora 等）逐镜头的提示词，带运镜、灯光和运动词汇表。
- [model-router](https://github.com/uniqaiapp/model-router)：挑选能完成任务的最便宜模型：一张规则表和一个标准库脚本，按类型、长度和风险路由任务。

## 参与贡献

欢迎通过 issue 或 pull request 提交更正；[price correction](.github/ISSUE_TEMPLATE/price_correction.md) 模板会要求厂商 URL 和你读到的那一行。重新生成与测试的流程见 [CONTRIBUTING.md](CONTRIBUTING.md)（`node tests/run.mjs`，零依赖）。

## 许可证

数据（`data/`、`examples/`、`references/`）采用 [CC BY 4.0](LICENSE)；脚本及其余内容采用 [MIT](LICENSE)。© UniqAI

---

<div align="center">

<sub>由 <a href="https://uniqai.app/?utm_source=github&utm_medium=readme-zh-cn&utm_campaign=ai-video-pricing">UniqAI</a> 出品，一款集 AI 图片、视频和聊天于一体的应用。我们本来就要追踪每家厂商的每秒价格来定自己的价，所以这张表无论如何都会维护下去。</sub>

</div>
