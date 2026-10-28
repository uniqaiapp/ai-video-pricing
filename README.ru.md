<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg">
  <img alt="ai-video-pricing: AI video cost per second, checked and dated" src="assets/banner.svg" width="1280" height="320">
</picture>

[![License: CC BY 4.0 + MIT](https://img.shields.io/badge/license-CC_BY_4.0_%2B_MIT-d1fe17?style=flat-square&labelColor=0d0f12)](LICENSE)
[![Claude Code skill](https://img.shields.io/badge/Claude_Code-skill-d1fe17?style=flat-square&labelColor=0d0f12)](#установка)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-d1fe17?style=flat-square&labelColor=0d0f12)](#использование)
[![Prices checked](https://img.shields.io/badge/prices_checked-2026--10--28-d1fe17?style=flat-square&labelColor=0d0f12)](#таблица)
[![Made by UniqAI](https://img.shields.io/badge/made_by-UniqAI-fdfc07?style=flat-square&labelColor=0d0f12)](https://uniqai.app/?utm_source=github&utm_medium=readme-ru&utm_campaign=ai-video-pricing)

# ai-video-pricing: сколько стоит секунда ИИ-видео, Kling vs Veo vs Runway vs Luma

**Доллары за секунду ИИ-видео по страницам цен самих вендоров, с формулой, ссылкой на источник и датой проверки в каждой строке.**

[Таблица](#таблица) · [Как это работает](#как-это-работает) · [Использование](#использование) · [Установка](#установка) · [Поддержание актуальности](#поддержание-актуальности) · [FAQ](#faq)

</div>

[English](README.md) · Русский · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Deutsch](README.de.md)

Стоимость секунды ИИ-видео для Kling 3.0, Veo 3 и 3.1, Runway Gen-4.5, Luma Ray3.2, Pika, MiniMax Hailuo и H3, Seedance через BytePlus, Higgsfield, Google Flow, Gemini API и UniqAI, проверена 2026-10-28, со ссылкой на источник в каждой строке. Вендоры продают тарифы и кредиты, а не секунды, поэтому таблица делит то, что вы платите, на секунды, которые получаете, и показывает арифметику прямо в ячейке. Данные лежат в JSON и CSV под лицензией CC BY 4.0; CLI на Node без зависимостей фильтрует их, пересчитывает, считает цену вашего тарифа и выводит строки, которые пора перепроверить. Подробный разбор с теми же цифрами есть на [uniqai.app](https://uniqai.app/video/ai-video-cost-per-second?utm_source=github&utm_medium=readme-ru&utm_campaign=ai-video-pricing).

| **Одна формула, и она на виду** | **Только страницы вендоров** | **Устаревшие строки помечаются** |
|:---|:---|:---|
| `(кредитов за клип × $ за кредит) ÷ полученных секунд` печатается рядом с каждым числом, пересчитывается CLI и никогда не вводится вручную. | В каждой строке ссылка на страницу цен самого вендора и дата, когда её читали. Цены, которые показывают только внутри приложения, помечены как `not published`, а не угаданы. | `avp stale` выводит строки старше 30 дней; ежемесячный GitHub Action превращает их в issue со списком для проверки. |

## Быстрый старт

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing && cd ai-video-pricing
node scripts/avp.mjs cheapest --resolution 720p
node scripts/avp.mjs quote --plan-price 15 --credits 625 --credits-per-second 12
```

Первая команда печатает пять самых дешёвых опубликованных строк для 720p с формулами; вторая превращает тариф («$15 за 625 кредитов, 12 кредитов за секунду») в $0.288 за секунду, $0.024 за кредит и $17.28 за минуту. Нужен Node 18 или новее, устанавливать ничего не надо.

## Демо

<img alt="ai-video-pricing demo: cheapest 720p rows, a plan quote, and the stale-row check" src="assets/demo.svg" width="820">

## Таблица

Отсортировано по цене за секунду. Клип = полученные секунды, разрешение и звук в том виде, как их указывает вендор; сравнивайте две ячейки, только если столбец «Клип» совпадает. `not published` означает, что вендор показывает цену только внутри приложения или консоли. Генерируется командой `node scripts/avp.mjs readme --write` из [`data/prices.json`](data/prices.json); если таблица и данные расходятся, тест падает.

<!-- prices:start -->
| Сервис | Модель | Клип | База цены | $ / сек | Формула | Источник | Проверено |
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

Цены в USD при помесячной оплате, прочитаны с указанной страницы в дату из последнего столбца. Цена за секунду округлена до трёх знаков. На странице-разборе округление до цента, поэтому `$0.288` там выглядит как `$0.29`; исходные данные одинаковые. Полные правила: [references/methodology.md](references/methodology.md).

## Как это работает

1. `data/prices.json` хранит по одной строке на сервис, модель и настройку с теми данными, которые вендор действительно публикует: цена тарифа и число кредитов, кредиты за клип или за секунду, полученные секунды, разрешение, звук, либо прямая цена за клип, секунду или токен. Описание полей — в [`data/schema.json`](data/schema.json).
2. `node scripts/avp.mjs recompute --write` заполняет `usd_per_second` из этих данных по одной формуле на каждый тип биллинга. `validate` падает, если сохранённое значение отличается от пересчитанного, URL некорректен, дата не существует или у опубликованной строки нет данных, которые нужны её типу биллинга.
3. `export`, `readme --write` и `scripts/examples.mjs` перегенерируют CSV, таблицу в этом README и файлы в `examples/`. Тесты сравнивают каждый из них с данными побайтово, так что число не может измениться только в одном месте.
4. `stale --days 30` выводит строки старше 30 дней, сгруппированные по странице-источнику; `.github/workflows/price-recheck.yml` запускает его первого числа каждого месяца и открывает issue со списком.

```
data/prices.json ──recompute──▶ usd_per_second ──export──▶ data/prices.csv
        │                                          ──readme──▶ README.md (this table)
        │                                          ──examples──▶ examples/*
        └──stale──▶ price-recheck issue (monthly)
```

## Использование

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

Фильтры: `--service`, `--model`, `--maker`, `--door app|api`, `--resolution 720p`, `--audio yes|no`, `--max 0.10`, `--published`. Сортировка: `--sort price|service|model|checked` и `--desc`; формат вывода: `--format md|text|csv|json`. Данные — обычный JSON, так что CLI можно и не трогать: `JSON.parse(fs.readFileSync("data/prices.json"))` или `pandas.read_csv("data/prices.csv")`.

## Примеры

Каждый файл в [`examples/`](examples/README.md) — это точный вывод команды, указанной в [`examples/commands.json`](examples/commands.json), и тесты воспроизводят каждый из них.

<details>
<summary><b>Одна модель, шесть входов: Kling 3.0</b></summary>

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

Полная версия с базой цены и формулой: [`examples/kling-3-0-doors.md`](examples/kling-3-0-doors.md).

</details>

<details>
<summary><b>Ваш собственный тариф в долларах за секунду</b></summary>

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
<summary><b>Как выглядит ежемесячное напоминание</b></summary>

`node scripts/avp.mjs stale --days 30 --as-of 2026-12-01` выводит список, сгруппированный по странице-источнику; см. [`examples/stale-2026-12-01.md`](examples/stale-2026-12-01.md). На текущих данных и сегодняшней дате он печатает `No rows older than 30 days.`

</details>

## Установка

CLI работает без всякого агента. Скилл говорит агенту отвечать на вопросы о ценах по этим данным, а не по памяти, и указывать источник и дату строки.

<details open>
<summary><b>Claude Code</b></summary>

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing ~/.claude/skills/ai-video-pricing
```

Затем `/ai-video-pricing` в любой сессии или просто спросите «сколько стоит секунда Kling»; скилл сработает по своему описанию. Локально для проекта вместо глобальной установки: клонируйте в `.claude/skills/ai-video-pricing` внутри проекта. Когда маркетплейс uniqaiapp будет опубликован: `/plugin marketplace add uniqaiapp/skills`, затем `/plugin install ai-video-pricing@uniqaiapp`.

</details>

<details>
<summary><b>Cursor</b></summary>

Скопируйте [`.cursor/rules/ai-video-pricing.mdc`](.cursor/rules/ai-video-pricing.mdc) в `.cursor/rules/` вашего проекта вместе с `SKILL.md`, `scripts/`, `data/` и `references/`. Файл правила встраивает скилл.

</details>

<details>
<summary><b>Codex / любой агент с AGENTS.md</b></summary>

Скопируйте `SKILL.md`, `scripts/`, `data/` и `references/` в `.agents/skills/ai-video-pricing/` и добавьте сниппет из [`codex/INSTRUCTIONS.md`](codex/INSTRUCTIONS.md) в свой `AGENTS.md`.

</details>

<details>
<summary><b>Обычный промпт</b></summary>

Вставьте [`SKILL.md`](SKILL.md) в системный промпт любой модели, которая умеет выполнять shell-команды. Вне frontmatter в нём нет синтаксиса под конкретного агента.

</details>

## Поддержание актуальности

Цены меняются каждый месяц. [`.github/workflows/price-recheck.yml`](.github/workflows/price-recheck.yml) запускается первого числа каждого месяца, выводит все строки старше 30 дней, сгруппированные по странице-источнику, и открывает один issue `price-recheck` (или комментирует уже открытый) со списком для проверки. Мейнтейнер перечитывает каждую страницу, обновляет данные и `checked_on` и запускает:

```bash
node scripts/avp.mjs recompute --write && node scripts/avp.mjs validate
node scripts/avp.mjs export && node scripts/avp.mjs readme --write && node scripts/examples.mjs
node tests/run.mjs
```

Чтобы использовать напоминание в своём репозитории с данными, скопируйте workflow и замените две строки со `stale` на любую команду, которая печатает ваши просроченные строки в Markdown.

## Ограничения и честность

- Каждое число здесь либо прочитано со страницы вендора по ссылке в указанную дату, либо вычислено из таких чисел по формуле в ячейке. Ничего не оценивалось на глаз. Вендор, который прячет цену, получает строку `not_published`.
- Датасет считает цену оплачиваемого результата при стандартной помесячной оплате. Бесплатные ежедневные кредиты, скидки на первый месяц, годовые скидки, водяные знаки, коммерческие лицензии, «безлимитные» режимы, перенос остатков и минимальные суммы в API меняют реальную цену для части пользователей; всё это есть в `notes` и в [методологии](references/methodology.md), но не в самом числе.
- Собственные строки UniqAI подчиняются тому же правилу, что и остальные: два пака, которые любой может купить без подписки, плюс самые большие паки как нижняя граница. UniqAI — один из более дешёвых вариантов для Kling 3.0 и Wan 2.5 и один из более дорогих для Veo 3; таблица так и показывает.
- Число строк, сервисов и моделей в этом README берётся из `node scripts/avp.mjs validate` (`ok: 69 rows, 64 published`) и примеров. Здесь нет цифр по использованию, скачиваниям или популярности, потому что честных у нас нет.
- Названия разрешений — как у вендора, без нормализации. Датасет в USD и на английском языке, покрывает перечисленных выше вендоров и не претендует на полноту.

## FAQ

<details>
<summary><b>Какой генератор ИИ-видео самый дешёвый за секунду?</b></summary>

По строкам, проверенным 2026-10-28, — Seedance 1.0 Pro Fast через BytePlus ModelArk API в 480p ($0.05 за 5-секундный клип, $0.010 за секунду). В 720p нижняя граница — от $0.020 до $0.030 (Seedance 1.0 Pro Fast, Gemini Omni Flash в Google Flow). Запустите `node scripts/avp.mjs cheapest --resolution 720p`, чтобы получить актуальный список с формулами.

</details>

<details>
<summary><b>Сколько стоит секунда Kling 3.0?</b></summary>

Зависит от того, где покупать: $0.080 в UniqAI (клип 5 с, пак на 1,000 Gems), $0.090 через API Runway без звука, $0.147 в Luma в 1080p со звуком, $0.400 в 4K на тарифе Standard самого Kling. Приложение Kling не публикует стоимость кредитов для 720p и 1080p нигде, кроме панели генерации. `node scripts/avp.mjs model "Kling 3.0"` выводит всё это.

</details>

<details>
<summary><b>Почему одна и та же модель стоит так по-разному?</b></summary>

Арифметика тарифов. Тариф за $30 с 10,000 кредитов и тариф за $15 с 625 кредитов нельзя сравнить, пока не знаешь, сколько даёт один кредит для этой модели в этом разрешении. Реселлеры ещё и добавляют минимумы (у Runway — от 56 до 80 кредитов за генерацию) и по-разному включают звук. Делить на полученные секунды — единственный способ поставить их рядом, а столбец «Клип» подсказывает, когда сравнение всё ещё нечестное.

</details>

<details>
<summary><b>OpenAI всё ещё продаёт Sora?</b></summary>

Нет. Приложение Sora закрылось 2026-04-26, а Videos API с sora-2 и sora-2-pro удалили 2026-09-24; на странице устаревших продуктов OpenAI нет видеомодели на замену, поэтому в датасете строка `discontinued`, а не цена.

</details>

<details>
<summary><b>Можно использовать эти данные в своей статье или инструменте?</b></summary>

Да, по CC BY 4.0: укажите «UniqAI, https://github.com/uniqaiapp/ai-video-pricing» и оставьте видимой дату проверки, чтобы читатели знали, насколько свежие цифры. В [`CITATION.cff`](CITATION.cff) есть машиночитаемая ссылка для цитирования. Скрипты — под MIT.

</details>

## Похожие проекты

- [awesome-ai-video-prompts](https://github.com/uniqaiapp/awesome-ai-video-prompts): отобранные и разложенные по категориям промпты для моделей ИИ-видео с настройками, на которых они получены, в JSON и Markdown.
- [video-director](https://github.com/uniqaiapp/video-director): превращает идею в одну строку в покадровый промпт для моделей ИИ-видео (Kling, Veo, Sora и другие) со словарём камеры, света и движения.
- [model-router](https://github.com/uniqaiapp/model-router): выбирает самую дешёвую модель, которая справится с задачей: таблица правил и stdlib-скрипт, который маршрутизирует задачи по типу, длине и риску.

## Участие

Исправления принимаются как issue или pull request; шаблон [price correction](.github/ISSUE_TEMPLATE/price_correction.md) просит URL вендора и строку, которую вы прочитали. Цикл «перегенерировать и прогнать тесты» описан в [CONTRIBUTING.md](CONTRIBUTING.md) (`node tests/run.mjs`, без зависимостей).

## Лицензия

Данные (`data/`, `examples/`, `references/`) — [CC BY 4.0](LICENSE); скрипты и всё остальное — [MIT](LICENSE). © UniqAI

---

<div align="center">

<sub>Сделано в <a href="https://uniqai.app/?utm_source=github&utm_medium=readme-ru&utm_campaign=ai-video-pricing">UniqAI</a>, приложении для ИИ-фото, видео и чата. Мы отслеживаем цену за секунду у каждого вендора, чтобы выставлять свою, так что таблица поддерживается в любом случае.</sub>

</div>
