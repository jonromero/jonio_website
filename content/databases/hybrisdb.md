Title: HybrisDB
Tags: databases, hybrisdb
Date: 2014-10-20 22:48

I love Forex because:

1. It has enormous amount of data (volume)
2. These data are coming extremely fast (velocity)
3. You need to consider multiple resources when you are building your strategy (variety)

My definition of BigData is that you have volume-velocity-variety information **and** you need to react on it right now (realtime). It is one of the main reasons why I don't like Hadoop (ok, the other is because I don't like Java:). 

Forex is the best place if you want to start playing with BigData. You have (at least) one data channel, hitting you with data, you need to keep running algorithms on this stream (sometimes doing correlations up to a week) and you need be able to respond very fast. If a garbage collector kicks in or if you need to grab data from a database (even if this DB is in memory - long live Redis) then you will have issues.

That's the reason why most of the "trading" databases have all their data in the same memory space and have custom languages doing the analysis (like [Kdb](http://kx.com)).

That was the inspiration for LDB.

Millions of data sources (mobile phones), hitting your database and calculating/updating for each one of the requests thousands of counters and running all sorts of algorithms. Per request. In realtime.

But let's face it. The vast majority of users/companies will never have millions (or even thousands) of requests hitting their servers. That's why I started a new opensource database with codename: HybrisDB.

HDB has the following characteristics:

1. Simple to install (no moving parts)
2. Simple to use (pre-defined dashboards)
3. It will be perfect for the 99% of users/companies but not for the 1% like Facebook or Google (sacrificing Enterprise features)

The concept is to have a dashboard, to watch indicators going on/off and then (maybe) connect to a system to place an order.

Sounds like an interesting cool hobby project and I still try to decide between using Erlang or Clojure for this.

Ping me on [twitter](http://www.twitter.com/jonromero) if you have any ideas!

Cheers!
 
JR

