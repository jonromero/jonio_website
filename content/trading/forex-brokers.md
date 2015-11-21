Title: Brokers | Placing your first Forex trade with Python
Tags: algotrading
Status: draft
Date: 2015-10-20 22:48

Time to talk about brokers, how to place a trade programmatically and most importantly how not to get scammed.

This is the third part of the series: [How to build your own algotrading platform](how-to-build-your-own-algorithmic-trading-platform.html).

A broker is nothing more than a company that lets you trade (buy or sell) assets on a market through the platform. What is very important for algotrading is: 
1. The broker offers an API in order for us to place orders
2. You can have a demo account to run your staging environment and experiment
3. The spread is as small as possible

In our case, we don't really care about spread as we won't be doing Ultra High Frequency trading (for now).

Even though brokers are regulated, there have been incidents in the past couple of years, were brokers folded due to certain conditions. Be *very* wary if 
1. There are no reviews of the broker on the internet (or most of them are bad)
2. If the broker offers you some crazy leverage (like 1:200)
3. If the broker seems to be in a very strange country

What could happen is that you start making some money and you wouldn't be able to pull them out. Seriously. Super stressful situation.

But let's switch to a happier note which is opening an account and placing our first programmatic trade!

I am using Oanda as a broker (http://www.oanda.com/) and I am not affiliated with them but they offer a pretty decent API, libraries on github and a free demo account. Go and open a fxTrade Practice account (https://fxtrade.oanda.com/your_account/fxtrade/register/gate)

After you get your free demo account, go to your profile <img> and you can change your leverage (switch it to 50:1) and then go back to your <Manage API Access>. There you can find your API key which we are going to use in our system to place trades on your behaf. *MAKE SURE YOU DON'T SHARE THIS KEY*.

The code for this is at https://github.com/jonromero/Forex-algotrading and you can install it and run (it is pretty easy).

What are we doing is straigh forward. We connect to Oanda, to a practise account with our token and we are asking the prices (bid/ask) for the pair EUR_USD. We print the buy price and then we place a *market* trade. Super easy. Don't worry about what EURUSD is or how many units we are buying or what a market trade is. For now, we have placed our first trade from our laptop and we are going to build our own API to place trades. Exciting stuff!

You can read Oanda's documentation here:http://developer.oanda.com/ to see what else you can do with their API.

Coming up next, connecting to a real *LIVE* algotrading system, running from my RaspberryPI at home. You'll be able to see the (almost) final program running and we'll talk more about Forex and strategies.

If you have more feedback, ping me at [jonromero](http://www.twitter.com/jonromero) or signup to the [newsletter](http://eepurl.com/bGbOnb). 

Legal outro. This is an engineering tutorial on how to build an algotrading platform for experimentation and FUN. Any suggestions here are not financial advices. 
If you lose any (or all) you money because you followed any trading advices or deployed this system in production, you cannot blame this random blog (and/or me). Enjoy at your own risk. 


