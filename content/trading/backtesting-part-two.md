Title: Building the simplest backtesting system in Python
Tags: algotrading
Date: 2016-02-01 22:30

*This is the another post of the series: [How to build your own algotrading platform](how-to-build-your-own-algorithmic-trading-platform.html).*

Last time we talked about [The "for-looper" backtester](asda) (as I love to call them). Now it's time to see some code!

We said that we have something like that:

:::python
	for each element of readhistoricaldata(): 
		apply_strategy() 
		how_our_strategy_did()


Sweet, let's load our strategy, load some [historical]() data, run our algorithm and print some results!

def main(strategy_file):
    order_book = []

    strategy_data = read_strategy(strategy_file)

	  # read csv files with daily data per second
    data = pandas.read_pickle("../Data/EUR_USD.csv-OHLC-1M.pkl")
    stats_days = run_algo(order_book, strategy_data, data)

    save_trade_book()

    #print_stats(stats_days)
    #plot_wins_and_loss_per_day(stats_days)


I prefer to have my strategies in a JSON format that contains the name of the strategy and some specs (like how many pips for stop_loss or take_profit etc). By that way, when we'll start using an event-based backtester, we can pass the strategy through a machine learning algorithm and try to optimize it.

Next line is loading our data in. I know people don't like pickle and there other ways to load data (and we are going to talk about Bcolz at some point) but for now, just bare with me.

The next line is self-explanatory. We pass the historical data to our algo and we get back some stats to print.

Let's focus on the algorithm a little bit and we can discuss plotting etc at a later point.

*The magic of the simple backtesting system*

Prepare to be amazed by how ridiculously easy to do this.

    row_iterator = data.iterrows()
    (i, previous_price) = row_iterator.next()
    for (timestamp, current_price) in row_iterator:
        if not in_trade and (previous_price['Buy']['high'] - previous_price['Buy']['low'] > pips(strategy_data['pips_to_trigger'])):
            # Triggered
            # place a sell order, a TP and a SL
            add_order(order_book, timestamp, current_price['Sell']['open'], "SELL")
            write_trade(current_price.name, 0, "trade", current_price['Sell']['open'])

            in_trade = True
            open_trade = 1
            
            days_open[timestamp.weekday()] = days_open[timestamp.weekday()] + 1
            
        if in_trade and (current_price['Buy']['high'] - order_book[-1]['Close'] > pips(strategy_data['pips_to_sl'])) :
            # SL
            write_trade(current_price.name, -strategy_data['pips_to_sl'], "sl", current_price['Buy']['close'])
            winnings -= strategy_data['pips_to_sl']
            in_trade = False
            #print "lose"
            #print "current", current_price['Buy']['close']
            #print "order", order_book[-1]['Close']
            #print "----"
            open_trade = 0            
            loses += 1
            loses_in_a_row += 1
            wins_in_a_row = 0
            if loses_in_a_row > max_loses:
                max_loses = loses_in_a_row
            days_close_lose[timestamp.weekday()] = days_close_lose[timestamp.weekday()] + 1

*Short comings*
What happens with this type of backtesting is that 
1. [you'll probably make mistakes when you want to using the exact same algorithm]
2. You won't be able to write a very complex strategy (at least that easy)
3. Very difficult to scale (compared to event-based)
4. You need to have your simulation and execution in the same language
5. More stuff

BUT remember that this is the BEST and fastest way to start out and figure out how all these things work. 


Coming up next, using other well-known backtesters in Python and adding graphs to our own!

If you have more feedback, ping me at [jonromero](http://www.twitter.com/jonromero) or signup to the [newsletter](http://eepurl.com/bGbOnb). 

Legal outro. This is an engineering tutorial on how to build an algotrading platform for experimentation and FUN. Any suggestions here are not financial advices. 
If you lose any (or all) you money because you followed any trading advices or deployed this system in production, you cannot blame this random blog (and/or me). Enjoy at your own risk. 


