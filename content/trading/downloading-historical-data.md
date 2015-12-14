Title: Downloading historical Forex tick data and importing them in to Python using Pandas
Tags: algotrading
Date: 2015-12-03 22:48

*This is the another post of the series: [How to build your own algotrading platform](how-to-build-your-own-algorithmic-trading-platform.html).*

Before running any live algotrading system, it is a good practice to backtest (that means run a simulation) our algorithms. Have in mind that this doesn't mean that if your system is killing it for the last 5 years/months/days it will make a profit but it is a good indicator that you might be on to something.

There are four things that we need to take into consideration when we do our backtesting:

1. The quality of the data
2. How to load them efficiently 
3. How to built our backtesting system
4. Try to have our backtesting and our live system share as much code as we can

Today, we are going to focus on (1) and (2).

For Forex data, I am using [GainCapital](http://ratedata.gaincapital.com/). Their data are in the form of [ticks](http://www.investopedia.com/terms/t/tick.asp). For a free source it is good enough. I used to use Oanda's historical data service but it seems that they moved it to a premium product. Too bad. Make sure that you use GainCapital's data only for experimentation.

For any other kind of paid historical data (ETFs, stocks, options stc), I am using [eoddata.com](http://eoddata.com/) (they also have some forex historical data but I haven't used them).

Let's download data for a week and experiment a little bit.
The link to the data is [http://ratedata.gaincapital.com/2015/11%20November/EUR_USD_Week1.zip](http://ratedata.gaincapital.com/2015/11%20November/EUR_USD_Week1.zip) for the first week of November 2015.

First we need to unzip the file
	:::python
	>unzip EUR_USD_Week1.zip

and you'll get a *25MB* file named EUR_USD_Week1.csv. These are data for one week for one currency pair. You can imagine the amount of data you need to process for all currencies for the last five years (hint: a lot!). But don't worry, we are going optimize this. For now, let's open the file and inspect.

	:::python
	>head EUR_USD_Week1.csv

| lTid       | cDealable | CurrencyPair | RateDateTime                  | RateBid  | RateAsk  |
|------------|-----------|--------------|-------------------------------|----------|----------|
| 4464650058 | D         | EUR/USD      | 2015-11-01 17:00:06.490000000 | 1.103380 | 1.103770 |
| 4464650061 | D         | EUR/USD      | 2015-11-01 17:00:06.740000000 | 1.103400 | 1.103760 |
| 4464650072 | D         | EUR/USD      | 2015-11-01 17:00:07.990000000 | 1.103390 | 1.103750 |
| 4464650083 | D         | EUR/USD      | 2015-11-01 17:00:08.990000000 | 1.103400 | 1.103750 |

the things that we care about is the RateDateTime, RateBid and RateAsk. As you can understade each line has a timestamp and the how much was the price to buy or sell. Formats downloaded by other services are pretty similar.

There are many ways to load these data into Python but the most preferable when it comes to data slicing and manipulating is using [Pandas](http://pandas.pydata.org/).
We can always use the [csv](https://docs.python.org/2/library/csv.html) library to load data (and it might be faster) but we need to do some optimizations and processing first that as you will see it is pretty easy with pandas. 

Another great tool to load TONS of GBs pretty efficiently and very fast is using [Bcolz](http://bcolz.blosc.org/), covered in a much later post (or you can read a preview if you have signed up in the [newsletter](http://eepurl.com/bGbOnb).

*Manipulating data using Pandas*
The data we downloaded are in ticks. Unless we are building an UHFT (ultra high frequency trading) algorithm, it is much more efficient (memory, storage and processing-wise) to
"group" these ticks into seconds (or minutes or hours depending on your strategy). This will make our download scale down from 25MB to just *35KB* which translate to HUGE performance and memory benefits.

Let's group all these data in 15 minutes. How? Time to fall in love with resample.

	::python
	df = pandas.read_csv(filename, parse_dates={'DateTime'}, index_col='DateTime', names=['Tid', 'Dealable', 'Pair', 'DateTime', 'Buy', 'Sell'], date_parser=parse)
    
	# let's erase the columns we don't need
	del df['Tid'] 
	del df['Dealable']
	del df['Pair']
    
	# group every 15 minutes and create an OHLC bar
	grouped_data = df.resample('15Min', how='ohlc')

	
The resampled the dataset looks like this:

| DateTime            | Buy | Open | Buy | High | Buy | Low | Buy | Close | Sell | Open | Sell | High | Sell | Low | Sell | Close |
|---------------------|------------|------------|-----------|-------------|-------------|-------------|------------|--------------|
| 2015-08-02 17:00:00 | 1.09706    | 1.09821    | 1.09706   | 1.09735     | 1.09752     | 1.09853     | 1.09740    | 1.09762      |
| 2015-08-02 17:15:00 | 1.09731    | 1.09825    | 1.09731   | 1.09769     | 1.09762     | 1.09843     | 1.09758    | 1.09808      |

This is called OHLC (Open High Low Close) bar for every *15 minutes*. You can see now that the ticks are grouped in 15 minute segments and you have the highest and lowest point that the price reached during these 15 minutes and also the open/close for buy and sell. Pure gold! Not only you have all the information you need but now it is extremely fast to load it. You just need to save the data:

	:: python
	# save to file
	grouped_data.to_pickle(filename+'-OHLC.pkl')


and then you can reuse this 35kb file. 

We can write a simple momentum algorithm that checks if there was a huge movement the last 15 minutes and if that was the case, let's buy. We will dive into this in a later post.

You can see the code as always on [github](https://github.com/jonromero/forex_algotrading/blob/master/post4/create_OHLC.py).
 
Coming up next, [building a backtesting system from scratch](http://jon.io/building-a-backtesting-system-in-python-or-how-i-lost-3400-in-two-hours.html)!

If you have more feedback, ping me at [jonromero](http://www.twitter.com/jonromero) or signup to the [newsletter](http://eepurl.com/bGbOnb). 

Legal outro. This is an engineering tutorial on how to build an algotrading platform for experimentation and FUN. Any suggestions here are not financial advices. 
If you lose any (or all) you money because you followed any trading advices or deployed this system in production, you cannot blame this random blog (and/or me). Enjoy at your own risk. 


