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

I've loved baseball since the day my dad gave me a whiffle-ball bat; playing, watching, and talking about it. While ruminating on portfolio project ideas, I thought it might be fun to be build something baseball-related, while also learning more about backend configuration in AWS.  Specifically, I wanted to build a web app that would allow a fun way to look up and compare historical baseball data. For example, what year did Clayton Kershaw have his best ERA? Which team(s) have never won a World Series? Which team has won the most World Series?

First things first, I need the data. While I love baseball, I certainly haven't been compiling and maintaining decades of MLB statistics on my own. Luckily, there are some delightfully generous and committed baseball data fiends doing the work and making it available for someone like me.. for free. I found [this webpage](https://sabr.org/sabermetrics/data) from SABR (Society for American Baseball Research) that listed a number of different resources for raw data, and decided to go with the [Lehman database](https://www.seanlahman.com/baseball-archive/statistics) whose data is made publicly accessible and accurate by [Ted Turocy](https://twitter.com/theodoreturocy) of the [Chadwick Baseball Bureau (CBB)](http://www.chadwick-bureau.com/) via [github](https://github.com/chadwickbureau/baseballdatabank).

Since the Github repo makes the data available via CSV files, I would need to create my own database to host the data and an API so my web app can fetch the data. Eventually, it'd be cool if I could set up some way to programmatically fetch the CSV files from the Github repo and update my DB with any changes, since new data is continuously being added to the repo for each new year of data... but let's make that a stretch goal, ok?

## Configure the backend

There are many ways to go about this, but I'm going to utilize [AWS RDS](https://aws.amazon.com/rds/) for hosting the database. If you're unfamiliar, RDS is Amazon Web Services' database management system, which is basically a collection of services that simplify the setup, operation, and scaling of databases. It's arguably overkill for this project, but the CSV file data is arranged relationally, so I need a relational database solution and I've used RDS before.

Before setting up the DB instance, I need to create an IAM user that I'll use to connect to the RDS instance. It's best practice to use an IAM user rather than connecting using the root user. In order to create the user, I followed the [steps delineated here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html).

Additionally, let's take a look at how this whole backend service is going to look. I'll be following a common pattern, utilizing a VPC with public subnet for the web server (where the api will be hosted) and a private subnet for the database. The set up is going to look something like this...

![High Level Design Image for VPC](images/uploads/con-vpc-sec-grp.png)

To accomplish setting up the VPC, subnets, VPC security groups, and the RDS & EC2 instances, I followed bits and pieces of [this tutorial](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateVPC.html). Here's a recap of the important bits:

1. Create a VPC. Ensure there are two VPC subnets; 1 public for the web server, 2 private for the database. This way the internet can access the web server, but not the database; only the web server will be able to access the database since they're in the same VPC.
2. Create VPC security groups for your VPC subnets.

* 1 public for the web server; establish inbound rules for the group (http for the internet and ssh for developer access.
* 1 private for the database; establish one inbound rule - mysql/aurora for the web server to access the database.

3. Create a DB subnet group for the 2 VPC subnets; this will allow me to specify a particular VPC subnet when creating a DB instance in RDS.
4. Create a database instance in RDS

* MySQL
* Free Tier
* Save username/password for later use
* VPC: Choose the VPC from step 1
* Subnet Group: Choose the one created in step 3
* VPC Security Group: Choose the private one created in step 2
* Enable database authentication with password

5. Create a web server / Launch an EC2 instance

* Amazon Linux AMI
* t2.micro instance type
* Network: Choose the VPC created in step 1
* Subnet: Choose the public subnet created in step 1
* Auto-Assign Public IP: Choose Enable
* Storage/Tags: Default
* Security Group: Choose the public group created in step 2
* Create a new key pair, and save for later use

At this point, I have essentially configured the setup from the image above, but I stopped short of actually creating a web server on my EC2 instance, outlined [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateWebServer.html). Then, I ssh'd into my new ec2 instance using the key pair I created in during the RDS instance creation. Let's say I named my key-pair PEM file `admin.pem` and the public IP of my ec2 instance is `54.86.78.721` then I access the web server with the following command.

`$ ssh -i admin.pem ec2-user@54.86.78.721`

Now that I've successfully access my web server via SSH, I add my own public SSH ey to the .ssh/authorized_keys file so I don't need to use the `admin.pem` file every time I connect. Now, I need to configure the EC2 instance so that it can access my RDS instance. 

### Set up the API on the Web Server

A cursory search for articles on building APIs on an EC2 instance to communicate with an RDS instance reveals there are myriad strategies for accomplishing this part of the process. For example, I could build it with PHP, Node.JS, or Python. I have zero experience with Python, and while we are dealing with baseball statistics, I don't think w'll be doing any calculations so intense that Python will serve us better than the others. I've worked with both Node.JS and PHP (a la Laravel) before, but I want to stretch my object-oriented programming muscles a little, so PHP it is!

Let's configure the EC2 instance by installing some extra software:

```
$ sudo yum update -y
$ sudo amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2
$ sudo yum install -y httpd
$ sudo systemctl start httpd
$ sudo systemctl enable httpd
```

Then, we need to set file permissions for our web server so ec2-user can access/modify them

`$ sudo usermod -a -G apache ec2-user`

Then, I need to `exit` and reconnect to confirm permissions were set. After reconnecting, run the command `groups`, and I should see output like this: `ec2-user adm wheel apache systemd-journal`.

Next, I need to modify the `apache` group's permissions for the web server:]

<deckgo-highlight-go>
$ sudo chown -R ec2-user:apache /var/www
$ sudo chmod 2775 /var/www
$ find /var/www -type d -exec sudo chmod 2775 {} \;
$ find /var/www -type f -exec sudo chmod 0664 {} \;
</deckgo-highlight-go>

Now, my `ec2-user` along with other members of the `apache` group should be able to add, modify, and delete files on the web server. Additionally, the LAMP stack I installed should allow me to manually connect to my RDS instance from this EC2 instance:

`mysql -h <rds_endpoint> -u <rds_username> -p`

...and I enter the rds password I saved a while back, and voila. I'm connected.

![MySQL CLI Prompt](images/uploads/mysql-cli-prompt.jpg)

It's important to note that I'm able to connect because I'm running mysql from the web server within the same VPC as the DB instance. If I try the same command from my local development machine, I will have issues.

![MySQL Connection Error](images/uploads/mysql-cli-error.jpg)

### Build Basic PHP API and deploy to EC2 Instance