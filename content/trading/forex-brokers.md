Title: Placing your first Forex trade with Python
Tags: algotrading
Date: 2015-10-20 22:48

Update: I updated the code so it works with Oanda's new API. Get it [here](https://github.com/jonromero/forex_algotrading)

Time to talk about brokers, how to place a trade programmatically and most importantly how not to get scammed.

This is the third part of the series: [How to build your own algotrading platform](how-to-build-your-own-algorithmic-trading-platform.html).

A broker is nothing more than a company that lets you trade (buy or sell) assets on a market through their platform. What is very important for algotrading is: 

1. The broker offers an API in order for us to place orders
2. You can have a demo account to run your staging environment and experiment
3. The spread is as small as possible

In our case, we don't really care about spread as we won't be doing High Frequency Trading any time soon.

Even though brokers are regulated, there have been incidents in the past couple of years, were brokers folded due to certain conditions. Be *very* wary if 

1. There are no reviews of the broker on the internet (or most of them are bad)
2. If the broker offers you some crazy leverage (like 1:200)
3. If the broker seems to be in a very strange country


What could happen is that you start making some money and you aren't be able to pull them out. Seriously. Super stressful situation.

But let's switch to a happier note which is opening an account and placing our first programmatic trade. Whooha!

I am using [Oanda](http://www.oanda.com/) as a broker (I am not affiliated with them) and they offer a pretty decent API, libraries on github and a free demo account. 

Go and open a free [fxTrade Practice account](https://www.oanda.com/register/#/sign-up/demo) and then [sign in](https://www.oanda.com/demo-account/login).

After you get your sign in to your demo account, go to **Manage API Access**. There you can find your API key which we are going to use in our system to place trades. **MAKE SURE YOU DON'T SHARE THIS KEY**.

The code for this is and all other posts is on my [github](https://github.com/jonromero/Forex-algotrading) and you can install it and run it pretty easily.

Update: Oanda released a new (kickass) execution engine called **v20** and they have released a new (improved) API. This post has been updated in order to use the new API but if (for any reason) you want to check the old code, it is [right here](https://github.com/jonromero/forex_algotrading/blob/86db3f7f567897ad74c1e611cf2d6f337f4a9c24/post3/runner.py). You lucky you!


Connecting to Oanda needs a conf file - which you can generate using a script that Oanda provides [here](https://github.com/oanda/v20-python-samples) *or* you can just create it yourself. Why would you want that? First of all when it comes to credentials (and my money), I prefer to know everything that is going on. And I don't like having to install PyYAML just to read a conf file. Feel free to use either method. 

Now, prepare to be amazed. The code is straight-forward. We initialize our API:

	:::python
    import v20

    api = v20.Context(
            'api-fxpractice.oanda.com',
            '443',
            args.port,
            token='HERE GOES YOUR API KEY')

and now let's place an order (buy 5000 units of EURUSD)

	:::python

    response = api.order.market(
                 'ACCOUNT ID',
                 instrument='EUR_USD',
                 units=5000)

   print("Response: {} ({})".format(response.status, response.reason))

   >Response: 201 (Created)


We print the buy price and then we place a *market* order. 
	:::python
    from datetime import datetime

    latest_price_time = datetime.utcnow().isoformat('T')+'Z',

    response = api.pricing.get(
                    account_id,
                    instruments='EUR_USD',
                    since=latest_price_time,
                    includeUnitsAvailable=False)

    for price in response.get("prices", 200):
            if latest_price_time is None or price.time > latest_price_time:
                print "Buy at", price.bids[0].price


Super easy. Don't worry about what EURUSD is or how many units we are buying or what a market order is. For now, we have placed our first trade from our laptop and we are going to build our own API to place trades. Exciting stuff!

You can read Oanda's documentation [here](http://developer.oanda.com/) to see what else you can do with their API and find the Python library [here](https://github.com/oanda/v20-python).Tons of examples are available from Oanda's github page [here](https://github.com/oanda/v20-python-sample).

Coming up next, connecting to a real **LIVE** algotrading system, running from my RaspberryPI at home. 

<img src="https://dl.dropboxusercontent.com/u/757245/jonio/trades-nov.jpg" />

You'll be able to see the (almost) final program running and we'll talk more about Forex and strategies. 

If you have more feedback, ping me at [jonromero](http://www.twitter.com/jonromero) or signup to the [newsletter](http://eepurl.com/bGbOnb). 

Legal outro. This is an engineering tutorial on how to build an algotrading platform for experimentation and FUN. Any suggestions here are not financial advices. 
If you lose any (or all) you money because you followed any trading advices or deployed this system in production, you cannot blame this random blog (and/or me). Enjoy at your own risk. 


