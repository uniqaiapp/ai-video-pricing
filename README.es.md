<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg">
  <img alt="ai-video-pricing: AI video cost per second, checked and dated" src="assets/banner.svg" width="1280" height="320">
</picture>

[![License: CC BY 4.0 + MIT](https://img.shields.io/badge/license-CC_BY_4.0_%2B_MIT-d1fe17?style=flat-square&labelColor=0d0f12)](LICENSE)
[![Claude Code skill](https://img.shields.io/badge/Claude_Code-skill-d1fe17?style=flat-square&labelColor=0d0f12)](#instalación)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-d1fe17?style=flat-square&labelColor=0d0f12)](#uso)
[![Prices checked](https://img.shields.io/badge/prices_checked-2026--10--28-d1fe17?style=flat-square&labelColor=0d0f12)](#la-tabla)
[![Made by UniqAI](https://img.shields.io/badge/made_by-UniqAI-fdfc07?style=flat-square&labelColor=0d0f12)](https://uniqai.app/?utm_source=github&utm_medium=readme-es&utm_campaign=ai-video-pricing)

# ai-video-pricing: cuánto cuesta un segundo de video con IA, Kling vs Veo vs Runway vs Luma

**Dólares por segundo de video con IA, tomados de la página de precios de cada proveedor, con la fórmula, la URL de origen y la fecha de verificación en cada fila.**

[La tabla](#la-tabla) · [Cómo funciona](#cómo-funciona) · [Uso](#uso) · [Instalación](#instalación) · [Mantenerla al día](#mantenerla-al-día) · [FAQ](#faq)

</div>

[English](README.md) · [Русский](README.ru.md) · [简体中文](README.zh-CN.md) · Español · [Português (BR)](README.pt-BR.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Deutsch](README.de.md)

Costo por segundo del video con IA para Kling 3.0, Veo 3 y 3.1, Runway Gen-4.5, Luma Ray3.2, Pika, MiniMax Hailuo y H3, Seedance vía BytePlus, Higgsfield, Google Flow, la API de Gemini y UniqAI, verificado el 2026-10-28, con una URL de origen en cada fila. Los proveedores venden planes y créditos, no segundos, así que la tabla divide lo que pagas entre los segundos que recibes y muestra la aritmética en la propia celda. Los datos están en JSON y CSV bajo CC BY 4.0; una CLI en Node sin dependencias los filtra, los recalcula, cotiza tu propio plan y lista las filas que ya toca revisar. La explicación extensa con los mismos números está en [uniqai.app](https://uniqai.app/video/ai-video-cost-per-second?utm_source=github&utm_medium=readme-es&utm_campaign=ai-video-pricing).

| **Una sola fórmula, a la vista** | **Solo páginas de proveedores** | **Las filas viejas se marcan** |
|:---|:---|:---|
| `(créditos por clip × $ por crédito) ÷ segundos entregados`, impresa junto a cada número, recalculada por la CLI, nunca escrita a mano. | Cada fila enlaza la página de precios del propio proveedor y la fecha en que se leyó. Los precios que solo aparecen dentro de una app se marcan como `not published`, no se adivinan. | `avp stale` lista las filas con más de 30 días; una GitHub Action mensual las convierte en un issue con checklist. |

## Inicio rápido

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing && cd ai-video-pricing
node scripts/avp.mjs cheapest --resolution 720p
node scripts/avp.mjs quote --plan-price 15 --credits 625 --credits-per-second 12
```

El primer comando imprime las cinco filas publicadas más baratas en 720p con sus fórmulas; el segundo convierte un plan ("$15 por 625 créditos, 12 créditos por segundo") en $0.288 por segundo, $0.024 por crédito y $17.28 por minuto. Node 18 o superior, nada que instalar.

## Demo

<img alt="ai-video-pricing demo: cheapest 720p rows, a plan quote, and the stale-row check" src="assets/demo.svg" width="820">

## La tabla

Ordenada por precio por segundo. Clip = segundos entregados, resolución y audio tal como los declara el proveedor; compara dos celdas solo cuando la columna de clip coincide. `not published` significa que el proveedor muestra el precio solo dentro de su app o consola. Generada con `node scripts/avp.mjs readme --write` a partir de [`data/prices.json`](data/prices.json); un test falla si esta tabla y los datos no coinciden.

<!-- prices:start -->
| Servicio | Modelo | Clip | Base del precio | $ / s | Fórmula | Fuente | Verificado |
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

Precios en USD con facturación mensual, leídos de la página enlazada en la fecha de la última columna. Las cifras por segundo se redondean a tres decimales. La página explicativa redondea al centavo, así que `$0.288` allí se lee `$0.29`; las entradas son idénticas. Reglas completas: [references/methodology.md](references/methodology.md).

## Cómo funciona

1. `data/prices.json` contiene una fila por servicio, modelo y configuración, con las entradas que el proveedor realmente publica: precio del plan y créditos, créditos por clip o por segundo, segundos entregados, resolución, audio, o un precio directo por clip, por segundo o por token. La documentación de los campos está en [`data/schema.json`](data/schema.json).
2. `node scripts/avp.mjs recompute --write` rellena `usd_per_second` a partir de esas entradas con una fórmula por tipo de facturación. `validate` falla si un valor guardado difiere del recalculado, si una URL está mal formada, si una fecha no es real o si una fila publicada no tiene las entradas que su tipo de facturación necesita.
3. `export`, `readme --write` y `scripts/examples.mjs` regeneran el CSV, la tabla de este README y los archivos de `examples/`. Los tests comparan cada uno con los datos byte a byte, así que un número no puede cambiar en un solo lugar.
4. `stale --days 30` lista las filas con más de 30 días agrupadas por página de origen; `.github/workflows/price-recheck.yml` lo ejecuta el día 1 de cada mes y abre un issue con checklist.

```
data/prices.json ──recompute──▶ usd_per_second ──export──▶ data/prices.csv
        │                                          ──readme──▶ README.md (this table)
        │                                          ──examples──▶ examples/*
        └──stale──▶ price-recheck issue (monthly)
```

## Uso

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

Filtros: `--service`, `--model`, `--maker`, `--door app|api`, `--resolution 720p`, `--audio yes|no`, `--max 0.10`, `--published`. Ordena con `--sort price|service|model|checked` y `--desc`; elige la salida con `--format md|text|csv|json`. Los datos son JSON plano, así que también puedes saltarte la CLI: `JSON.parse(fs.readFileSync("data/prices.json"))` o `pandas.read_csv("data/prices.csv")`.

## Ejemplos

Cada archivo de [`examples/`](examples/README.md) es la salida exacta del comando indicado en [`examples/commands.json`](examples/commands.json), y la suite de tests reproduce cada uno.

<details>
<summary><b>El mismo modelo, seis puertas: Kling 3.0</b></summary>

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

Versión completa con base del precio y fórmula: [`examples/kling-3-0-doors.md`](examples/kling-3-0-doors.md).

</details>

<details>
<summary><b>Tu propio plan en dólares por segundo</b></summary>

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
<summary><b>Cómo se ve el issue de recordatorio mensual</b></summary>

`node scripts/avp.mjs stale --days 30 --as-of 2026-12-01` produce un checklist agrupado por página de origen; ver [`examples/stale-2026-12-01.md`](examples/stale-2026-12-01.md). Con los datos incluidos y la fecha de hoy imprime `No rows older than 30 days.`

</details>

## Instalación

La CLI funciona sin ningún agente. El skill le dice a un agente que responda las preguntas de precios con estos datos y no de memoria, y que cite la fuente y la fecha de la fila.

<details open>
<summary><b>Claude Code</b></summary>

```bash
git clone https://github.com/uniqaiapp/ai-video-pricing ~/.claude/skills/ai-video-pricing
```

Luego escribe `/ai-video-pricing` en cualquier sesión, o simplemente pregunta "cuánto cuesta un segundo de Kling"; la descripción del skill lo activa. Local al proyecto en vez de global: clona en `.claude/skills/ai-video-pricing` dentro de tu proyecto. Cuando se publique el marketplace de uniqaiapp: `/plugin marketplace add uniqaiapp/skills` y después `/plugin install ai-video-pricing@uniqaiapp`.

</details>

<details>
<summary><b>Cursor</b></summary>

Copia [`.cursor/rules/ai-video-pricing.mdc`](.cursor/rules/ai-video-pricing.mdc) en el `.cursor/rules/` de tu proyecto junto con `SKILL.md`, `scripts/`, `data/` y `references/`. El archivo de reglas incrusta el skill.

</details>

<details>
<summary><b>Codex / cualquier agente con AGENTS.md</b></summary>

Copia `SKILL.md`, `scripts/`, `data/` y `references/` en `.agents/skills/ai-video-pricing/` y añade el fragmento de [`codex/INSTRUCTIONS.md`](codex/INSTRUCTIONS.md) a tu `AGENTS.md`.

</details>

<details>
<summary><b>Prompt simple</b></summary>

Pega [`SKILL.md`](SKILL.md) en el system prompt de cualquier modelo que pueda ejecutar comandos de shell. Fuera del frontmatter no tiene sintaxis específica de ningún agente.

</details>

## Mantenerla al día

Los precios cambian cada mes. [`.github/workflows/price-recheck.yml`](.github/workflows/price-recheck.yml) se ejecuta el día 1 de cada mes, lista todas las filas con más de 30 días agrupadas por página de origen y abre un issue `price-recheck` (o comenta en el que ya esté abierto) con un checklist. Un mantenedor vuelve a leer cada página, actualiza las entradas y `checked_on`, y ejecuta:

```bash
node scripts/avp.mjs recompute --write && node scripts/avp.mjs validate
node scripts/avp.mjs export && node scripts/avp.mjs readme --write && node scripts/examples.mjs
node tests/run.mjs
```

Para reutilizar el recordatorio en tu propio repositorio de datos, copia el workflow y reemplaza las dos líneas de `stale` por cualquier comando que imprima tus filas vencidas en Markdown.

## Límites y honestidad

- Cada número aquí se leyó de la página del proveedor enlazada en la fecha indicada o se calculó a partir de esos números con la fórmula de la celda. Nada está estimado. Un proveedor que oculta su precio recibe una fila `not_published`.
- El dataset cotiza la salida pagada con facturación mensual estándar. Los créditos gratuitos diarios, las promociones del primer mes, los descuentos anuales, las marcas de agua, los niveles de licencia comercial, los modos "ilimitados", la acumulación de créditos y los mínimos de API cambian el precio efectivo para algunos usuarios; están en `notes` y en la [metodología](references/methodology.md), no en el número.
- Las filas de UniqAI siguen la misma regla que las de todos los demás: los dos paquetes que cualquiera puede comprar sin plan, más los paquetes más grandes como piso. UniqAI es una de las puertas más baratas para Kling 3.0 y Wan 2.5 y una de las más caras para Veo 3; la tabla lo dice.
- Los conteos de filas, servicios y modelos de este README salen de `node scripts/avp.mjs validate` (`ok: 69 rows, 64 published`) y de los ejemplos. No hay cifras de uso, descargas ni popularidad porque no tenemos cifras honestas.
- Las etiquetas de resolución son las del proveedor y no están normalizadas. El dataset está en USD y en inglés, y cubre los proveedores listados arriba; no pretende ser completo.

## FAQ

<details>
<summary><b>¿Cuál es el generador de video con IA más barato por segundo?</b></summary>

En las filas verificadas el 2026-10-28, Seedance 1.0 Pro Fast a través de la API BytePlus ModelArk en 480p ($0.05 por clip de 5 segundos, $0.010 por segundo). En 720p el piso está entre $0.020 y $0.030 (Seedance 1.0 Pro Fast, Gemini Omni Flash en Google Flow). Ejecuta `node scripts/avp.mjs cheapest --resolution 720p` para ver la lista actual con fórmulas.

</details>

<details>
<summary><b>¿Cuánto cuesta Kling 3.0 por segundo?</b></summary>

Depende de la puerta: $0.080 en UniqAI (clip de 5 s, paquete de 1,000 Gems), $0.090 a través de la API de Runway sin audio, $0.147 en Luma a 1080p con audio, $0.400 en 4K con el plan Standard del propio Kling. La app de Kling no publica el costo en créditos de 720p y 1080p fuera del panel de generación. `node scripts/avp.mjs model "Kling 3.0"` lo imprime todo.

</details>

<details>
<summary><b>¿Por qué el mismo modelo tiene precios tan distintos?</b></summary>

Aritmética de planes. Un plan de $30 con 10,000 créditos y un plan de $15 con 625 créditos no se pueden comparar hasta saber qué compra un crédito para ese modelo a esa resolución. Los revendedores además añaden mínimos (los 56 a 80 créditos por generación de Runway) y empaquetan el audio de forma distinta. Dividir entre los segundos entregados es la única manera de ponerlos lado a lado, y la columna de clip te avisa cuando la comparación sigue siendo injusta.

</details>

<details>
<summary><b>¿OpenAI todavía vende Sora?</b></summary>

No. La app de Sora cerró el 2026-04-26 y la Videos API con sora-2 y sora-2-pro se retiró el 2026-09-24; la página de deprecaciones de OpenAI no lista ningún modelo de video de reemplazo, así que el dataset lleva una fila `discontinued` en lugar de un precio.

</details>

<details>
<summary><b>¿Puedo usar estos datos en mi propio artículo o herramienta?</b></summary>

Sí, bajo CC BY 4.0: acredita "UniqAI, https://github.com/uniqaiapp/ai-video-pricing" y deja visible la fecha de verificación para que los lectores sepan qué tan antiguos son los números. [`CITATION.cff`](CITATION.cff) tiene una cita legible por máquina. Los scripts son MIT.

</details>

## Relacionados

- [awesome-ai-video-prompts](https://github.com/uniqaiapp/awesome-ai-video-prompts): prompts curados y categorizados para modelos de video con IA, con los ajustes que los produjeron, en JSON y Markdown.
- [video-director](https://github.com/uniqaiapp/video-director): convierte una idea de una línea en un prompt plano a plano para modelos de video con IA (Kling, Veo, Sora y otros), con vocabulario de cámara, iluminación y movimiento.
- [model-router](https://github.com/uniqaiapp/model-router): elige el modelo más barato capaz de hacer el trabajo: una tabla de reglas y un script de biblioteca estándar que enruta tareas por tipo, longitud y riesgo.

## Contribuir

Las correcciones son bienvenidas como issues o pull requests; la plantilla [price correction](.github/ISSUE_TEMPLATE/price_correction.md) pide la URL del proveedor y la línea que leíste. Ver [CONTRIBUTING.md](CONTRIBUTING.md) para el ciclo de regenerar y testear (`node tests/run.mjs`, sin dependencias).

## Licencia

Los datos (`data/`, `examples/`, `references/`) son [CC BY 4.0](LICENSE); los scripts y todo lo demás son [MIT](LICENSE). © UniqAI

---

<div align="center">

<sub>Hecho por <a href="https://uniqai.app/?utm_source=github&utm_medium=readme-es&utm_campaign=ai-video-pricing">UniqAI</a>, una app de foto, video y chat con IA. Seguimos el precio por segundo de cada proveedor para fijar el nuestro, así que la tabla se mantiene de todos modos.</sub>

</div>
