Title: HugCoin: Build your own cryptocurrency (coin)
Tags: ethereum
Date: 2016-08-17 22:34

This is a departure from our [how to build your own algotrading platform](how-to-build-your-own-algorithmic-trading-platform.html) series but I think it is interesting and fun.

** HugCoin **

<img src="theme/images/hugcoin.png" class="" alt="" />

It all started after experimenting building a DAO that works like the democracy in Ancient Greece. Automated taxation, basic income and tons of other cool stuff.
While optimizing the DAO code, I had some cool ideas that I wanted to try out. One of them ended up in HugCoin.

HugCoin is a cryptocurrency, running on the Ethereum blockchain. The code is tight so you can experiment pretty easily. It is also an awesome way to see how sending coins works, how to put your name on the blockchain, call functions etc. 


** Features **

One coin = One hug. You can send/transfer AS many hugs as you want. You will never run out. 
If you use the function *giveHugTo*, you also get to name the hugged person and his/her name will always exist in the public chain. Awesome right?

HugCoin also keeps track how many people have been hugged.

Let's see how many huggers are out there!


** Time to hug people and get some free coins! **

Easy. Too easy! Open Ethereum-Wallet (or Mist), go to *Contracts* ->  *Watch Contract* and add these:

      CONTRACT NAME: HugCoin
      CONTRACT ADDRESS: 0x6B365Fe592881E916dc77Ef410e5f9CE4654369A
      JSON INTERFACE: [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "HugCoin" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "totalHuggers", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "receipient_name", "type": "string" }, { "name": "_to", "type": "address" } ], "name": "giveHugTo", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "🤗" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "hugged", "outputs": [ { "name": "member", "type": "address", "value": "0x6b365fe592881e916dc77ef410e5f9ce4654369a" }, { "name": "name", "type": "string", "value": "Jon V" }, { "name": "memberSince", "type": "uint256", "value": "1471932635" } ], "type": "function" }, { "inputs": [ { "name": "sym", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "sym", "template": "elements_input_string", "value": "🤗" } ], "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]

<img src="theme/images/contract.png" class="" alt="" />


and press OK.


There you'll be able to see all the available functions.


<img src="theme/images/functions.png" class="" alt="" />


If you don't know how to use EthereumWallet, Mist or the command line, ping me on twitter and I'll send you some hugs! 


<img src="theme/images/forever_on_the_chain.png" class="" alt="" />


** Where is the code? **
The code is [here](https://github.com/jonromero/ethereum_contracts/blob/master/HugCoin.eth).

Enjoy!


If you have any feedback, ping me at [jonromero](http://www.twitter.com/jonromero) or signup to the [newsletter](http://eepurl.com/bGbOnb). 

Legal outro. This is an engineering tutorial on how to build an algotrading platform for experimentation and FUN. Any suggestions here are not financial advices. 
If you lose any (or all) you money because you followed any trading advices or deployed this system in production, you cannot blame this random blog (and/or me). Enjoy at your own risk. 


