Title: Mapping and processing data in Clojure
Tags: databases, clojure

I have to admit that I have a thing for DSLs. You can see it at [music-as-data](https://github.com/jonromero/music-as-data) were notes and rhythm/beat is "mapped" to data and you can apply data transformations. 

The same thing I want to do with [data at-rest](http://en.wikipedia.org/wiki/Data_at_Rest).

Here is a scenario:
I have lots of data sitting as CSV on my hard-drive and I want to process them. Not query them. Process them.

What would be really interesting is to be able to define (dynamically) a schema like that:
	
	:::clojure
	(defschema "EURUSD" 
  		(tokenizer #(.split % ":"))  
  		;; the mapping is done here
  		(columns |time| |open| |high| |low| |close| |volume|))

Let me explain.
First of all, a "tokenize" function. Each dataline is tokenized based on a function. Do you want regex? Something more complex? You are free to write anything you like. I really hate frameworks that you must write a complex regular expression or use a compicated system just to tokenize a line.

As you can imagine, tokenize returns a list of data that are mapped to "columns".

Now, the interesting stuff. 

You can write scripts like the following:

	:::clojure
	(if (> |close| 1.45)
		(place-order :buy)
		(place-order :sell))

Thoughts? 

ping me here -> [JR](http://www.twitter.com/jonromero)

