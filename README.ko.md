<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg">
  <img alt="ai-video-pricing: AI video cost per second, checked and dated" src="assets/banner.svg" width="1280" height="320">
</picture>

[![License: CC BY 4.0 + MIT](https://img.shields.io/badge/license-CC_BY_4.0_%2B_MIT-d1fe17?style=flat-square&labelColor=0d0f12)](LICENSE)
[![Claude Code skill](https://img.shields.io/badge/Claude_Code-skill-d1fe17?style=flat-square&labelColor=0d0f12)](#설치)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-d1fe17?style=flat-square&labelColor=0d0f12)](#사용법)
[![Prices checked](https://img.shields.io/badge/prices_checked-2026--10--28-d1fe17?style=flat-square&labelColor=0d0f12)](#가격표)
[![Made by UniqAI](https://img.shields.io/badge/made_by-UniqAI-fdfc07?style=flat-square&labelColor=0d0f12)](https://uniqai.app/?utm_source=github&utm_medium=readme-ko&utm_campaign=ai-video-pricing)

# ai-video-pricing: AI 영상 초당 비용, Kling vs Veo vs Runway vs Luma 가격 비교

**AI 영상 1초당 달러 비용을 각 제조사의 공식 가격 페이지에서 가져와, 모든 행에 계산 공식, 출처 URL, 확인 날짜를 적었습니다.**

[가격표](#가격표) · [작동 방식](#작동-방식) · [사용법](#사용법) · [설치](#설치) · [최신 상태 유지](#최신-상태-유지) · [FAQ](#faq)

</div>

[English](README.md) · [Русский](README.ru.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [日本語](README.ja.md) · 한국어 · [Deutsch](README.de.md)

Kling 3.0, Veo 3과 3.1, Runway Gen-4.5, Luma Ray3.2, Pika, MiniMax Hailuo와 H3, BytePlus 경유 Seedance, Higgsfield, Google Flow, Gemini API, UniqAI의 AI 영상 초당 비용을 2026-10-28에 확인했으며, 모든 행에 출처 URL이 있습니다. 제조사는 초 단위가 아니라 요금제와 크레딧을 팔기 때문에, 이 표는 지불하는 금액을 실제로 받는 초 수로 나누고 그 계산을 셀 안에 그대로 보여줍니다. 데이터는 CC BY 4.0 라이선스의 JSON과 CSV이며, 의존성 없는 Node CLI로 필터링, 재계산, 내 요금제 단가 계산, 재확인이 필요한 행 목록 출력을 할 수 있습니다. 같은 숫자를 바탕으로 한 자세한 해설은 [uniqai.app](https://uniqai.app/video/ai-video-cost-per-second?utm_source=github&utm_medium=readme-ko&utm_campaign=ai-video-pricing)에 있습니다.

| **공식은 하나, 그리고 공개** | **제조사 페이지만 사용** | **오래된 행은 표시됨** |
|:---|:---|:---|
| `(클립당 크레딧 × 크레딧당 $) ÷ 실제 제공 초 수`를 모든 숫자 옆에 적고, CLI가 재계산하며, 손으로 입력하는 일은 없습니다. | 모든 행이 제조사 자체 가격 페이지와 그것을 읽은 날짜로 연결됩니다. 앱 안에서만 보이는 가격은 추측하지 않고 `not published`로 표시합니다. | `avp stale`이 30일 넘은 행을 나열하고, 매월 실행되는 GitHub Action이 이를 체크리스트 이슈로 만듭니다. |

## 빠른 시작

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing && cd ai-video-pricing
node scripts/avp.mjs cheapest --resolution 720p
node scripts/avp.mjs quote --plan-price 15 --credits 625 --credits-per-second 12
```

첫 번째 명령은 가격이 공개된 720p 행 중 가장 저렴한 다섯 개를 공식과 함께 출력합니다. 두 번째 명령은 요금제("625 크레딧에 $15, 초당 12 크레딧")를 초당 $0.288, 크레딧당 $0.024, 분당 $17.28로 환산합니다. Node 18 이상이 필요하고, 설치할 것은 없습니다.

## 데모

<img alt="ai-video-pricing demo: cheapest 720p rows, a plan quote, and the stale-row check" src="assets/demo.svg" width="820">

## 가격표

초당 가격순으로 정렬되어 있습니다. 클립 = 제조사가 명시한 제공 초 수, 해상도, 오디오 여부입니다. 두 셀은 클립 열이 같을 때만 비교하십시오. `not published`는 제조사가 앱이나 콘솔 안에서만 가격을 보여준다는 뜻입니다. [`data/prices.json`](data/prices.json)에서 `node scripts/avp.mjs readme --write`로 생성되며, 이 표와 데이터가 다르면 테스트가 실패합니다.

<!-- prices:start -->
| 서비스 | 모델 | 클립 | 가격 기준 | $ / 초 | 공식 | 출처 | 확인일 |
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

가격은 월간 결제 기준 USD이며, 마지막 열의 날짜에 링크된 페이지에서 읽은 값입니다. 초당 금액은 소수점 셋째 자리까지 반올림했습니다. 해설 페이지는 센트 단위로 반올림하므로 거기서는 `$0.288`이 `$0.29`로 보이지만, 입력값은 동일합니다. 전체 규칙: [references/methodology.md](references/methodology.md).

## 작동 방식

1. `data/prices.json`에는 서비스, 모델, 설정별로 한 행씩, 제조사가 실제로 공개하는 입력값만 담겨 있습니다. 요금제 가격과 크레딧 수, 클립당 또는 초당 크레딧, 제공 초 수, 해상도, 오디오, 혹은 클립·초·토큰당 직접 가격입니다. 필드 설명은 [`data/schema.json`](data/schema.json)에 있습니다.
2. `node scripts/avp.mjs recompute --write`가 과금 방식별로 하나의 공식을 써서 이 입력값으로 `usd_per_second`를 채웁니다. 저장된 값이 재계산 값과 다르거나, URL 형식이 잘못됐거나, 날짜가 실제로 존재하지 않거나, 공개된 행에 해당 과금 방식에 필요한 입력값이 없으면 `validate`가 실패합니다.
3. `export`, `readme --write`, `scripts/examples.mjs`가 CSV, 이 README의 표, `examples/`의 파일을 다시 생성합니다. 테스트가 각각을 데이터와 바이트 단위로 비교하므로 숫자가 한 곳에서만 바뀔 수 없습니다.
4. `stale --days 30`이 30일 넘은 행을 출처 페이지별로 묶어 나열합니다. `.github/workflows/price-recheck.yml`이 매월 1일에 이를 실행하고 체크리스트 이슈를 엽니다.

```
data/prices.json ──recompute──▶ usd_per_second ──export──▶ data/prices.csv
        │                                          ──readme──▶ README.md (this table)
        │                                          ──examples──▶ examples/*
        └──stale──▶ price-recheck issue (monthly)
```

## 사용법

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

필터: `--service`, `--model`, `--maker`, `--door app|api`, `--resolution 720p`, `--audio yes|no`, `--max 0.10`, `--published`. 정렬은 `--sort price|service|model|checked`와 `--desc`, 출력 형식은 `--format md|text|csv|json`입니다. 데이터는 평범한 JSON이라 CLI를 건너뛰어도 됩니다: `JSON.parse(fs.readFileSync("data/prices.json"))` 또는 `pandas.read_csv("data/prices.csv")`.

## 예시

[`examples/`](examples/README.md)의 모든 파일은 [`examples/commands.json`](examples/commands.json)에 적힌 명령의 정확한 출력이며, 테스트 스위트가 각각을 재현합니다.

<details>
<summary><b>같은 모델, 여섯 개의 구매 경로: Kling 3.0</b></summary>

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

가격 기준과 공식이 포함된 전체 버전: [`examples/kling-3-0-doors.md`](examples/kling-3-0-doors.md).

</details>

<details>
<summary><b>내 요금제를 초당 달러로 환산하기</b></summary>

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
<summary><b>매월 오는 알림 이슈의 모습</b></summary>

`node scripts/avp.mjs stale --days 30 --as-of 2026-12-01`은 출처 페이지별로 묶은 체크리스트를 만듭니다. [`examples/stale-2026-12-01.md`](examples/stale-2026-12-01.md)를 참고하십시오. 포함된 데이터와 오늘 날짜 기준으로는 `No rows older than 30 days.`를 출력합니다.

</details>

## 설치

CLI는 에이전트 없이도 동작합니다. 스킬은 에이전트가 가격 질문에 기억이 아니라 이 데이터로 답하고, 해당 행의 출처와 날짜를 인용하도록 지시합니다.

<details open>
<summary><b>Claude Code</b></summary>

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing ~/.claude/skills/ai-video-pricing
```

그다음 아무 세션에서나 `/ai-video-pricing`을 입력하거나, 그냥 "Kling 1초에 얼마야"라고 물어보십시오. 스킬 설명이 트리거가 됩니다. 전역 대신 프로젝트 단위로 쓰려면 프로젝트 안의 `.claude/skills/ai-video-pricing`에 클론하십시오. uniqaiapp 마켓플레이스가 공개되면 `/plugin marketplace add uniqaiapp/skills` 다음에 `/plugin install ai-video-pricing@uniqaiapp`을 실행합니다.

</details>

<details>
<summary><b>Cursor</b></summary>

[`.cursor/rules/ai-video-pricing.mdc`](.cursor/rules/ai-video-pricing.mdc)를 `SKILL.md`, `scripts/`, `data/`, `references/`와 함께 프로젝트의 `.cursor/rules/`에 복사하십시오. 규칙 파일에 스킬이 포함되어 있습니다.

</details>

<details>
<summary><b>Codex / AGENTS.md를 읽는 모든 에이전트</b></summary>

`SKILL.md`, `scripts/`, `data/`, `references/`를 `.agents/skills/ai-video-pricing/`에 복사하고, [`codex/INSTRUCTIONS.md`](codex/INSTRUCTIONS.md)의 스니펫을 `AGENTS.md`에 추가하십시오.

</details>

<details>
<summary><b>일반 프롬프트</b></summary>

셸 명령을 실행할 수 있는 아무 모델의 시스템 프롬프트에 [`SKILL.md`](SKILL.md)를 붙여넣으십시오. frontmatter 밖에는 특정 에이전트 전용 문법이 없습니다.

</details>

## 최신 상태 유지

가격은 매달 바뀝니다. [`.github/workflows/price-recheck.yml`](.github/workflows/price-recheck.yml)은 매월 1일에 실행되어 30일 넘은 모든 행을 출처 페이지별로 묶어 나열하고, 체크리스트가 담긴 `price-recheck` 이슈를 하나 엽니다(이미 열려 있으면 거기에 댓글을 답니다). 메인테이너는 각 페이지를 다시 읽고 입력값과 `checked_on`을 갱신한 뒤 다음을 실행합니다:

```bash
node scripts/avp.mjs recompute --write && node scripts/avp.mjs validate
node scripts/avp.mjs export && node scripts/avp.mjs readme --write && node scripts/examples.mjs
node tests/run.mjs
```

이 알림을 자신의 데이터 저장소에서 재사용하려면 워크플로를 복사하고, `stale` 두 줄을 기한이 지난 행을 Markdown으로 출력하는 아무 명령으로 바꾸면 됩니다.

## 한계와 솔직한 설명

- 여기 있는 모든 숫자는 표시된 날짜에 링크된 제조사 페이지에서 읽었거나, 그런 숫자로부터 셀 안의 공식으로 계산한 것입니다. 추정치는 없습니다. 가격을 숨기는 제조사는 `not_published` 행을 받습니다.
- 이 데이터셋은 표준 월간 결제 기준으로 유료 출력의 가격을 매깁니다. 매일 지급되는 무료 크레딧, 첫 달 프로모션, 연간 할인, 워터마크, 상업용 라이선스 등급, "무제한" 모드, 크레딧 이월, API 최소 사용량은 일부 사용자에게 실제 가격을 바꿉니다. 이런 내용은 `notes`와 [방법론](references/methodology.md)에 있고 숫자에는 들어 있지 않습니다.
- UniqAI 자체 행도 다른 모든 곳과 같은 규칙을 따릅니다. 요금제 없이 누구나 살 수 있는 두 개의 팩, 그리고 하한선으로서 가장 큰 팩입니다. UniqAI는 Kling 3.0과 Wan 2.5에서는 저렴한 경로 중 하나이고 Veo 3에서는 비싼 경로 중 하나이며, 표도 그렇게 말합니다.
- 이 README의 행, 서비스, 모델 수는 `node scripts/avp.mjs validate`(`ok: 69 rows, 64 published`)와 예시에서 나옵니다. 사용량, 다운로드 수, 인기 수치는 없습니다. 솔직한 수치가 없기 때문입니다.
- 해상도 표기는 제조사의 것을 그대로 쓰며 정규화하지 않았습니다. 데이터셋은 USD와 영어 기준이고 위에 나열된 제조사를 다루며, 완전하다고 주장하지 않습니다.

## FAQ

<details>
<summary><b>초당 비용이 가장 저렴한 AI 영상 생성기는 무엇입니까?</b></summary>

2026-10-28에 확인한 행 기준으로, BytePlus ModelArk API를 통한 Seedance 1.0 Pro Fast 480p입니다(5초 클립당 $0.05, 초당 $0.010). 720p의 하한선은 $0.020에서 $0.030 사이입니다(Seedance 1.0 Pro Fast, Google Flow의 Gemini Omni Flash). `node scripts/avp.mjs cheapest --resolution 720p`를 실행하면 공식이 포함된 최신 목록을 볼 수 있습니다.

</details>

<details>
<summary><b>Kling 3.0은 초당 얼마입니까?</b></summary>

구매 경로에 따라 다릅니다. UniqAI에서는 $0.080(5초 클립, 1,000 Gem 팩), Runway API로 오디오 없이 $0.090, Luma에서 1080p 오디오 포함 $0.147, Kling 자체 Standard 요금제 4K로 $0.400입니다. Kling 앱은 720p와 1080p의 크레딧 비용을 생성 패널 밖에서는 공개하지 않습니다. `node scripts/avp.mjs model "Kling 3.0"`이 이 모든 것을 출력합니다.

</details>

<details>
<summary><b>같은 모델인데 왜 가격이 이렇게 다릅니까?</b></summary>

요금제 산수 때문입니다. 10,000 크레딧에 $30인 요금제와 625 크레딧에 $15인 요금제는, 그 모델의 그 해상도에서 크레딧 하나로 무엇을 살 수 있는지 알기 전까지는 비교할 수 없습니다. 리셀러는 여기에 최소 사용량(Runway는 생성 1회당 56~80 크레딧)을 더하고 오디오를 각기 다르게 묶습니다. 제공 초 수로 나누는 것이 나란히 놓을 수 있는 유일한 방법이고, 클립 열을 보면 비교가 여전히 불공정한 때를 알 수 있습니다.

</details>

<details>
<summary><b>OpenAI는 아직 Sora를 판매합니까?</b></summary>

아닙니다. Sora 앱은 2026-04-26에 종료됐고, sora-2와 sora-2-pro가 포함된 Videos API는 2026-09-24에 제거됐습니다. OpenAI의 지원 종료 페이지에 대체 영상 모델이 없어서, 데이터셋에는 가격 대신 `discontinued` 행이 있습니다.

</details>

<details>
<summary><b>이 데이터를 제 글이나 도구에 써도 됩니까?</b></summary>

네, CC BY 4.0 조건으로 가능합니다. "UniqAI, https://github.com/uniqaiapp/ai-video-pricing"를 출처로 밝히고, 독자가 숫자의 시점을 알 수 있도록 확인 날짜를 보이게 두십시오. [`CITATION.cff`](CITATION.cff)에 기계가 읽을 수 있는 인용 정보가 있습니다. 스크립트는 MIT입니다.

</details>

## 관련 프로젝트

- [awesome-ai-video-prompts](https://github.com/uniqaiapp/awesome-ai-video-prompts): AI 영상 모델용으로 엄선하고 분류한 프롬프트 모음. 생성에 쓴 설정과 함께 JSON과 Markdown으로 제공.
- [video-director](https://github.com/uniqaiapp/video-director): 한 줄짜리 아이디어를 AI 영상 모델(Kling, Veo, Sora 등)용 샷별 프롬프트로 바꿔 줌. 카메라, 조명, 움직임 어휘 포함.
- [model-router](https://github.com/uniqaiapp/model-router): 작업을 해낼 수 있는 가장 저렴한 모델 고르기. 규칙 표와, 작업을 유형·길이·위험도로 라우팅하는 표준 라이브러리 스크립트.

## 기여

수정은 이슈나 pull request로 환영합니다. [price correction](.github/ISSUE_TEMPLATE/price_correction.md) 템플릿은 제조사 URL과 읽은 줄을 요청합니다. 재생성과 테스트 과정은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하십시오(`node tests/run.mjs`, 의존성 없음).

## 라이선스

데이터(`data/`, `examples/`, `references/`)는 [CC BY 4.0](LICENSE), 스크립트와 나머지는 모두 [MIT](LICENSE)입니다. © UniqAI

---

<div align="center">

<sub><a href="https://uniqai.app/?utm_source=github&utm_medium=readme-ko&utm_campaign=ai-video-pricing">UniqAI</a>가 만들었습니다. AI 사진, 영상, 채팅을 하나로 묶은 앱입니다. 우리 가격을 정하려고 모든 제조사의 초당 가격을 어차피 추적하고 있으니, 이 표는 어떻게든 유지됩니다.</sub>

</div>
