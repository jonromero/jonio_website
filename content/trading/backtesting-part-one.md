Title: Building a backtesting system in Python: or how I lost $3400 in two hours 
Tags: algotrading
Date: 2015-12-13 22:48

*This is the another post of the series: [How to build your own algotrading platform](how-to-build-your-own-algorithmic-trading-platform.html).*

Building a backtest system is actually pretty easy. Easy to screw up I mean. Even though there are tons of excellent libraries out there (and we'll go through them at some point), I always like doing this on my own in order to fine-tune it.

From all the backtesting systems I have seen, we can assume that there are two categories:

1. The "for-loopers"
2. The Event generators

Today, we'll talk about for-loopers.

The "for-loopers" are my favorite type of backtesters. They are trivial to write and super fun to expand but they have some vital flows and sadly the majority of backtesters out there is "for-loopers" (ps: I need to find a better name for this!).

How for-loopers work? Using a for loop (as you might have guessed). It is something like this:

	:::python
	for each element of readhistoricaldata(): 
		apply_strategy() 
		how_our_strategy_did()

Very simple right? This is how one backtesting system works, that runs a momentum strategy:

<script src="https://gist.github.com/jonromero/125cbca28067f0aefb2c.js"></script>

So, what is the problem? 

1. Very difficult to scale (horizontally) 
2. Needs lots of work to keep your apply_strategy() working on backtesting and production 
3. You need to have everything in the same programming language

Let's dive into these, one by one.

*Scalability*. 
I was experimenting a couple a weeks ago with a [hill-climbing](https://en.wikipedia.org/wiki/Hill_climbing) algorithm to optimize one of my strategies. It is still running. After two weeks. And I build uber-scalable systems for a living.
Why is it still running? You can use [multiprocessing](https://docs.python.org/2/library/multiprocessing.html), [Disco](http://discoproject.org/), producer/consumer (using [ZeroMQ](http://zeromq.org/)) or just threads to speed this up but some problems are not "[embarrassing parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel)" (yes, this is an actual term, not one of my made-up words). The amount of work to scale a backtester like this (especially when you want to do same machine learning on top of it) is huge. You can do it but it is the wrong way.

*Production and backtesting in sync*
This. The times I have been bitten by this. I can recall the lost trades where I was "hm, why I entered this trade?" or my old time favorite "WHY TRAILING STOP WAS APPLIED NOW?".

Story time: I had an idea in order to optimize my strategy, to run a backtester to see what would happen if I could put a trailing stop AFTER the trade was profitable in order to always secure profits. Backtesting worked like a charm at a 13% increase of earnings and *production lost every single trade*. I figured it out after my algo lost $3400 in a couple of hours (a very expensive lesson).

Keeping the apply_strategy in sync is very difficult and becomes almost impossible when you want to do it in a distributed fashion. And you don't want to have two version of your strategy that are "almost" identical. Unless you have $3400 to spare.

*Using different languages*
I love Python. And Erlang. And Clojure. And J. And C. And R. And Ruby (no actually I hate Ruby). I want to be able to leverage the strength of other languages in my system. I want to try out strategies in R where there are very well-tested libraries and there is a huge community behind it. I want to have Erlang to scale my code and C to crunch data. If you want to be succesful (not only in trading), you need to be able to use all the available resources without prejudices. I have learnt tons of stuff from hanging out with R developers regarding how you can delta hedge bonds and visualize them or why Sharpe ratio can be a lie. Every language has a different crowd and you want as many people pouring ideas into your system.
If you try to have apply_strategy in different language then good luck with (2).

Are you convinced now? Well, I am not trying to convince you as for-loopers is a great way to run your initial tests. It is how I started and for many strategies I don't send them down to the pipeline. A "better" way (so you can sleep at night) is the event generators.

Coming up next, sharing and discussing my simplest (but most successful) backtester!

If you have more feedback, ping me at [jonromero](http://www.twitter.com/jonromero) or signup to the [newsletter](http://eepurl.com/bGbOnb). 

Legal outro. This is an engineering tutorial on how to build an algotrading platform for experimentation and FUN. Any suggestions here are not financial advices. 
If you lose any (or all) you money because you followed any trading advices or deployed this system in production, you cannot blame this random blog (and/or me). Enjoy at your own risk. 


