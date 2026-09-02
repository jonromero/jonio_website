Title: My A.I dreams at night
Category: projects
Date: 2026-09-02 12:00
Image: ameles-photo.png
Tags: popular, ai, ameles, local-ai

Every night, around 10am, my A.I goes to sleep and starts dreaming.

Why? 

Glad you asked. 

## Why we dream?

Going to sleep, forces our brain to restructure information, distill new skills we learnt - or at least that's what I read [in this book](https://www.amazon.com/dp/1501144316?lv=shuf&channelId=500&plpRedirect=mhFallback) (it's pretty epic btw).

So I thought to get a small model (**`microsoft/Phi-4-mini-instruct` (4-bit)** for my fellow engineers), talk to it and log every single interaction. 

But there is a problem.

## Being stupid

Small local models are stupid. Very stupid. And that's ok. 

But how do we make a small local model incredibly personalized, fast, and capable?

Most companies do this by stuffing thousands of lines of chat history into a massive prompt window every time they chat. This is the "context" you heard many times.

That's a terrible idea. It's slow, it's expensive, and eventually, context window rot ruins everything (known as context rot). The model gets confused, loses its edge, or simply breaks.

> Interesting fact! You can have 1M+ token context window but the rot happens ALWAYS much earlier. 

So I decided to try something else: **by making an LLM "dream," we can dodge all the context rot issues and keep it incredibly small.**

Instead of carrying a giant bag of history, we let the AI compile its experiences, replay them, and fine-tune its own weights overnight during its "sleep/dream cycle."

There are a lot of problems around this. Fine-tuning is fragile. Paraphrasing is hard. Keeping a small model from forgetting its base capabilities is a constant battle.

But, hey, research is awesome. :D

In the next post, I'll show you how we teach this small model to know exactly when it's stuck, how it asks for help and how I use a mentor. 

Next:

Can an A.I do lucid dreaming?
