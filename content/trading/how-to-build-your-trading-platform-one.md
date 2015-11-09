Title: How to build your own algorithmic trading platform - Part One
Tags: trading
Status: draft

That's it. Every week, I get at least 10 DMs on twitter asking how to experiment with algotrading, Forex and portfolio synthesis and I've decided that it's time to do something about it.

So, I am planning to cover the basics of how to build your own trading platform and apply these basics in every language you like. The majority of the examples are going to be in Python, even though there are going to be parts in Erlang.

Let's talk now about what the final product will be.

We are building a system where you will be able to:
1. Simulate your strategy (this is called backtesting)
2. Execute your strategy without supervision
3. Alert you via sms/email for trades and errors
4. Be scalable and trivial to deploy new updates
5. Being able to run even from your home (from a raspberrypi for example)

