---
title: I Like Baseball
date: 2022-04-19T04:49:38.332Z
layout: blog
path: baseball-api
featuredImage: ask-history-who-invented-baseball-2.jpeg
description: I thought it might be fun to build a baseball stats web
  application. Here's a look at how I went about it.
---
I've loved baseball since the day my dad gave me a whiffle-ball bat; playing, watching, and talking about it. As a software engineer looking for a portfolio project, I thought it might be fun to use my love of baseball to build something that's a little bit more interesting than a rote coding bootcamp assignment. Specifically, I wanted to build a web app that would allow a fun way to look up and compare historical baseball data. For example, what year did Clayton Kershaw have his best ERA? Which team(s) have never won a World Series? Which team has won the most World Series?

First things first, I need the data. While I love baseball, I certainly haven't been compiling and maintaining decades of MLB statistics on my own. Luckily, there are some delightfully generous and committed baseball data fiends doing the work and making it available for someone like me.. for free. I found [this webpage](https://sabr.org/sabermetrics/data) from SABR (Society for American Baseball Research) that listed a number of different resources for raw data, and decided to go with the [Lehman database](https://www.seanlahman.com/baseball-archive/statistics) whose data is made publicly accessible and accurate by [Ted Turocy](https://twitter.com/theodoreturocy) of the [Chadwick Baseball Bureau (CBB)](http://www.chadwick-bureau.com/) via [github](https://github.com/chadwickbureau/baseballdatabank).

Since the github repo makes the data available via CSV files, I would need to build my own database to host the data and an API so my web app can fetch the data. Eventually, it'd be cool if I could set up some way to programmatically fetch the CSV files from the github repo and update my DB with any changes, since new data is continuously being added to the repo for each new year of data... but for now let's make that a stretch goal, ok? So, for now, our steps are...

1. Create a SQL database.
2. Populate the database with CSV files from the CBB github repo.
3. Build an API to query the database.
4. Build a frontend web app that utilizes the API (features TBD).

