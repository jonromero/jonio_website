Title: Databases for trading
Tags: databases, trading
Status: draft

MapReduce (divide and conquer) model might be pretty brilliant when you have to process huge chunks of data but what happens when these data:

1. Keeping coming (as a stream)
2. You are interested only for sliding-window calculations 
3. You need the answer fast 

Generating previews can be done by "reducing" 