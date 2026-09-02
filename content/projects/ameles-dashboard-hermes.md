Title: Controlling my local AI's sleep and dreams inside Hermes
Category: projects
Date: 2026-09-02 14:00
Image: ameles-dashboard.png
Tags: ai, ameles, hermes, local-ai

I don't want to open a web browser and load a separate local page just to chat with my AI assistant. 

I want to chat inside my daily-use desktop app: **Hermes Agent**.

But there’s a catch. If I chat in Hermes, how does the system log our conversation so the AI can "dream" about it and train on it tonight?

I built a proxy server in `chat.py` that intercepts the API traffic, a clean real-time dashboard, and a custom Hermes control skill.

Here is how the integration works under the hood.

---

## 1. Setting up the Hermes Endpoint

Hermes is incredibly flexible. It supports custom, OpenAI-compatible API providers.

So, I pointed Hermes directly to my local Ameles server running on port 8001. 

In Hermes under **Settings → Providers → Add Endpoint**, I filled in:
* **Name**: `Ameles`
* **Provider ID**: `ameles`
* **Endpoint URL**: `http://127.0.0.1:8001/v1`
* **Default Model**: `ameles:latest`
* **Context**: `65536`

Ollama's default model context is tiny (2048 tokens). Hermes wants 64k+. 

To prevent my local model from suffocating, I extended the context by creating a quick modelfile and rebuilding the Ollama model:

```bash
printf 'FROM ameles\nPARAMETER num_ctx 65536\n' > ameles-ctx.modelfile
ollama create ameles -f ameles-ctx.modelfile
```

---

## 2. The Smart Proxy Logging Mechanism

When you chat inside Hermes, every message passes through the FastAPI server in `chat.py`. 

The proxy server acts as a middleman between Hermes and Ollama. But we don't want to log everything. If you are using Hermes to chat with `hermes3:8b` or some other coding model, logging those massive developer prompts would bloat your training set with garbage.

So I wrote a strict filtering rule in the proxy: **it only logs the model named `ameles`**.

If you request any other model, the server silently passes the traffic straight through to Ollama unlogged. Streaming and tool calls still work perfectly.

But if you chat with the model named `ameles`, the server intercepts the request and logs the exchange to `sleep_cycle/day_logs/<date>.jsonl`.

One flat JSON object per line. Perfect, structured data.

Now, I can enjoy a premium desktop chat experience, while Ameles quietly and securely collects the raw material she needs to dream at night.

---

## 3. The Real-Time Sleep Dashboard

When the nightly training cycle begins, I can open the web dashboard to see exactly what's happening.

![](/images/ameles-dashboard.png)

The dashboard tracks the active phase of the sleep cycle:
`idle` → `collecting` → `reviewing` → `dreaming` → `training` → `converting` → `promoting` → `done`.

I can watch:
* Live logs from the fine-tuning process.
* The mentor's keep/fix/expand evaluations of my logs.
* Historic scores of how each model version performs over time.

*(If you are curious about the QLoRA hyperparameters, target attention layers, or the math behind weight-merging locally on an RTX 4070 SUPER, check out my deep technical architecture write-up on the [Last Machine Research Blog](https://lastmachine.com/ai-sleep-cycle-high-context-local-personalization.html).)*

---

## 4. Controlling the Sleep Cycle via Hermes Skills

Because I chat inside Hermes Agent, I wanted a way to manage the Ameles server right from my conversations. 

So I wrote a custom Hermes skill: `ameles-control`.

By copying the skill folder to the Hermes directory (`cp -r hermes/ameles-control ~/.hermes/skills/`), Hermes learns how to interact with the Ameles API endpoints on port 8001.

Now, instead of running terminal scripts, I can simply talk to Hermes:

* *"How is Ameles doing?"* → Hermes triggers `GET /api/status` and reads back the current phase.
* *"What did the mentor think of the dataset?"* → Hermes queries `GET /api/sleep/review` to see what training examples were kept, fixed, or dropped.
* *"Send Ameles to sleep"* → Hermes prompts for confirmation, hits `POST /api/sleep/start` to trigger the nightly training pipeline, and polls the progress bar for me.

It’s the ultimate feedback loop. 

An AI running inside Hermes, logged by a smart proxy, and controlled by Hermes itself. 

Research is hard, but when the pieces fit together like this, it feels like magic.
