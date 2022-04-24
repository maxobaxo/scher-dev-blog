---
title: I Like Baseball
date: 2022-04-19T04:49:38.332Z
layout: blog
path: baseball-api
featuredImage: images/uploads/ask-history-who-invented-baseball-2.jpeg
description: I thought it might be fun to build a baseball stats web
  application. Here's a look at how I went about it.
---
## General Idea

I've loved baseball since the day my dad gave me a whiffle-ball bat; playing, watching, and talking about it. As a software engineer looking for a portfolio project, I thought it might be fun to use my love of baseball to build something that's a little bit more interesting than a rote coding bootcamp assignment. Specifically, I wanted to build a web app that would allow a fun way to look up and compare historical baseball data. For example, what year did Clayton Kershaw have his best ERA? Which team(s) have never won a World Series? Which team has won the most World Series?

First things first, I need the data. While I love baseball, I certainly haven't been compiling and maintaining decades of MLB statistics on my own. Luckily, there are some delightfully generous and committed baseball data fiends doing the work and making it available for someone like me.. for free. I found [this webpage](https://sabr.org/sabermetrics/data) from SABR (Society for American Baseball Research) that listed a number of different resources for raw data, and decided to go with the [Lehman database](https://www.seanlahman.com/baseball-archive/statistics) whose data is made publicly accessible and accurate by [Ted Turocy](https://twitter.com/theodoreturocy) of the [Chadwick Baseball Bureau (CBB)](http://www.chadwick-bureau.com/) via [github](https://github.com/chadwickbureau/baseballdatabank).

Since the github repo makes the data available via CSV files, I would need to build my own database to host the data and an API so my web app can fetch the data. Eventually, it'd be cool if I could set up some way to programmatically fetch the CSV files from the github repo and update my DB with any changes, since new data is continuously being added to the repo for each new year of data... but let's make that a stretch goal, ok? So, for now, our steps are...

1. Create a SQL database.
2. Create a Web Server to communicate with the DB.
3. Populate the database with CSV files from the CBB github repo.
4. Build an API to query the database.
5. Build a frontend web app that utilizes the API (features TBD).

## Create a SQL Database

There are many ways to go about this, but I'm going to utilize [AWS RDS](https://aws.amazon.com/rds/) for hosting the database. If you're unfamiliar, RDS is Amazon Web Services' database management system, which is basically a collection of services that simplify the setup, operation, and scaling of databases. It's arguably overkill for this project, but the CSV file data is arranged relationally, so I need a relational database solution and I've used RDS before. Hopefully, my familiarity will help expedite configuration and set up.

Before setting up the DB instance, I need to create an IAM user that I'll use to connect to the RDS instance. It's best practice to use an IAM user rather than connecting using the root user. In order to create the user, I followed the [steps delineated here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).

Additionally, let's take a look at how this whole backend service is going to look. I'll be following a common pattern, utilizing a VPC with public subnet for the web server (where the api will be hosted) and a private subnet for the database.

!["sample layout", src/images/con-vpc-sec-grp.png]

### Creating a DB instance in RDS

Now, I'm ready to create my DB instance in RDS. In the RDS console, I select the region dropdown menu in the upper right corner and pick the region where I want my DB instance hosted. I don't imagine my baseball stats website is going to go viral, but since I'm in Portland, I'll select `us-west-2` for Oregon. 

In the navigation pane, I select "Databases" and then click the orange button reading "Create Database." In the creation window, I select "Easy Create" because I'm not afraid to admit I'm not an expert DB engineer. I'm choosing MySQL as the DB engine because I've used it before, and well I don't have a better explanation... like I just needlessly confessed... I'm not an expert DB engineer. I also select the 'free tier' for instance size because dollars and I've got kids to feed.  Next, I create master credentials for the DB instance and save them in 1password, and then I click the orange "Create Database" button.

Hooray! I created a database in AWS. It's incredible... except, it's empty and I need to connect to it.

### Connecting to the DB instance in RDS

In order to connect to my new RDS instance, I can use a GUI like MySQL Workbench or mysql in the command line. Using the endpoint and port for my new RDS instance along with the master username and password, I test the connection.

```
mysql -h <rds_endpoint> -P <port> -u <username> -p
```

The only reason I am able to successfully connect to my database instance is because my RDS instance is configured to be publicly accessible, which is not best practice. For security reasons, it makes sense for me to prevent exposing the database server to the internet. Instead, I'm going to create a VPC with a private and public subnet. This way, my web server can be accessed by the internet, but the database will not be. With the web server and the DB server hosted in the same VPC, the web server can easily access the DB server.

I followed [this tutorial on AWS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateVPC.html) to set it up.

## Create a Web Server to communicate with the DB


WAIT WAIT -- rewrite the order of things above. and recap more succinctly the setting up of the rds and ec2...

NEXT: installing a web server on the new ec2 instance...
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateWebServer.html