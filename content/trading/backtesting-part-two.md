Title: Building the simplest backtesting system in Python
Tags: algotrading
Date: 2016-02-01 22:30

*This is the another post of the series: [How to build your own algotrading platform](how-to-build-your-own-algorithmic-trading-platform.html).*

Last time we talked about [The "for-looper" backtester](building-a-backtesting-system-in-python-or-how-i-lost-3400-in-two-hours.html) (as I love to call them). Now it's time to see some code!

We said that we have something like that:

:::python
	for each element of readhistoricaldata(): 
		apply_strategy() 
		how_our_strategy_did()


Sweet, let's load our strategy, load some [historical](downloading-historical-forex-tick-data-and-importing-them-in-to-python-using-pandas.html) data, run our algorithm and print some results!

<script src="https://gist.github.com/jonromero/72428f085a41ddf85259.js"></script>

I prefer to have my strategies in a JSON format that contains the name of the strategy and some specs (like how many pips for stop_loss or take_profit etc). That way, when we'll start using an event-based backtester, we can pass the strategy through a machine learning algorithm and try to optimize it.

Next line is loading our data in. I know people don't like pickle and there other ways to load data (and we are going to talk about BColz at some point) but for now, just bare with me.

The next line is self-explanatory. We pass the historical data to our algo and we get back some stats to print.

Let's focus on the algorithm a little bit and we can discuss plotting etc at a later point.

*The magic of the simple backtesting system*

Prepare to be amazed by how ridiculously easy to do this.

<script src="https://gist.github.com/jonromero/7792e71e9079f75ce9a5.js"></script>

*Short comings*
What happens with this type of backtesting is that 
1. [you'll probably make mistakes when you want to using the exact same algorithm](building-a-backtesting-system-in-python-or-how-i-lost-3400-in-two-hours.html)
2. You won't be able to write a very complex strategy (at least that easy)
3. Very difficult to scale (compared to event-based)
4. You need to have your simulation and execution in the same language

BUT remember that this is the BEST and fastest way to start out and figure out how all these things work. 

Coming up next, using other well-known backtesters in Python and adding graphs to our own!

If you have more feedback, ping me at [jonromero](http://www.twitter.com/jonromero) or signup to the [newsletter](http://eepurl.com/bGbOnb). 

Legal outro. This is an engineering tutorial on how to build an algotrading platform for experimentation and FUN. Any suggestions here are not financial advices. 
If you lose any (or all) you money because you followed any trading advices or deployed this system in production, you cannot blame this random blog (and/or me). Enjoy at your own risk. 


