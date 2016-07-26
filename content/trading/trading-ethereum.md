Title: Trading Ethereum: or how I made 12x in a week
Tags: algotrading
Date: 2016-07-26 22:34
Status: draft

This is more of a "How to build your own algotrading strategy" - the Ethereum edition and not a "make money fast" blog post.
It is also a real example with real returns (and real production errors that cost me money) were you can see how to identify opportunities, why algotrading is awesome and why risk management can save your ass
.
*This is the another post of the series: [How to build your own algotrading platform](how-to-build-your-own-algorithmic-trading-platform.html).*

<img src="theme/images/bigShort.jpg" class="" alt="" />

I get this question almost on a daily basis. How can I find a good strategy? How can I built my own? Do I need to have a PhD in mathematics? Statistics?

Newsflash: If I can write a strategy, everybody can write a strategy. Trust me on that. The only trick is to **look for a simple one**.


**Cryptocurrencies**

Update: This post has been rewritten "at least" five times (as ["The DAO drama"](https://bitcoinmagazine.com/articles/ethereum-s-dao-forking-crisis-the-bitcoin-perspective-1467404395) escalated) and it is the perfect example of strategy doing a full circle.

I started getting involved with [Ethereum](https://www.ethereum.org/) early on as I really liked the "run your algorithms on the blockchain" thing. When [TheDAO](https://daohub.org/) came out, I read everything about it and loved the idea.
You don't need to understand what Ethereum, theDAO, blockchain is at this point (I promise I will ramble on a another post). The same ideas apply to Forex, Stocks even Pokemon balls.

As I said before, simple ideas turn into (simple?) strategies. Complex strategies turn into mayhem that is impossible to backtest and deploy without errors.

I personally, have a specific way that I work.

Step one: Identify an idea.
My idea here was that there are a couple of exchanges offering Ethereum and DAO tokens. What if there was an arbitrage between those?
Step two: Manually test the idea.
Then I manually test the idea. If something "kinda works" we are going to the next step.
Step three: Automate
I start writing a simple program that will replay all my manual steps. This program will crash and it is not more that 100 lines of code. This is the data collection stage where I see if there is an advantage that algorithms can give me. Advantages can be:

1. Something that be automated and run 1000 of times per seconds or 1000 times in parallel
2. Something that thinks faster than I can
3. Something that has no feelings to screw up my system

If there is one or more conditions met, I will start building and rewriting the algo.

Step four: All in
I am kidding and you'll see in a bit why risk management is super important in this business.

Let's see what I did:

The idea was: "I wonder whether Kraken and Shapeshift have different prices". This is a classic arbitrage case (Kraken and Shapeshift are "exchanges").
I could exchange DAO for ETH on Kraken, transfer ETH to Shapeshift, exchange ETH for DAO and send them back to Kraken. You can make money as long as
ETHDAO from Kraken  * DAOETH from ShapeShift > 1 (+ fees + gas). And these are going to be risk-free* money. The best kind of money.

Every circle I was doing, was making me from 2% to 10% of my capital. After a while when I was hitting the limits of Shapeshift I had to make this run in parallel and after a couple of days.

The question is what would you do if you had an algorithm that makes you 10% of your money every 20 minutes? The stupidest thing you could do is put tons of money into it.

**Hybris**

If you are not familiar with the Greek word hybris, consider yourself lucky. Hybris means when you think that you are invincible, better than gods. And this is the biggest "fault" you can do in trading.

After a couple of weeks, theDAO was hacked. 160 million dollars were stolen (or should I say frozen) and noone knew what was going to happen. For me, this happened, 10 minutes before boarding a plane to fly to New York.

I was smart(lucky?) enough to have good risk management habits (thank you Forex). I never, ever, ever risk more that 2% of my capital even if it seems that best kind of deal.

Luckily, the money were "restored" and I could withdraw/convert my DAO to Ethereum.

This whole experience is a remainder that there are always things that you cannot predict. This was a systematic risk and there was no way I could have seen it coming. Pushing buttons and building algorithms is not enough. Proper risk management and knowing when you need to take a chill pill is what can keep you in the game.

On the next post, I will post the whole algorithm and go line by line. I also plan to discuss a little bit more about theDAO and Ethereum. If you don't want to miss any of these and get some more additional info, feel free to sign up to my [newsletter](http://eepurl.com/bGbOnb) where I talk about fintech, algorithms and the markets.

** Diving into the ETHDAO algotrading program **

If you have more feedback, ping me at [jonromero](http://www.twitter.com/jonromero) or signup to the [newsletter](http://eepurl.com/bGbOnb). 

Legal outro. This is an engineering tutorial on how to build an algotrading platform for experimentation and FUN. Any suggestions here are not financial advices. 
If you lose any (or all) you money because you followed any trading advices or deployed this system in production, you cannot blame this random blog (and/or me). Enjoy at your own risk. 


