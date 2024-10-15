# Project setup

##Introduction 
This is a nodejs api project tha consumes the paystack subscriptions api using axios, the mini project comsumes important parts of the paytack subscription api like;
* customer creation
* plan creations
* subscription creation and webhook handling
while this mini project is a work in progress it gives a solid foundation of how most platforms manage subscriptions, ranging from streaming platforms to so many other applications
that require subscription of some sought.

 ##Requirement
 * NodeJS -> v22.6.0
 * A workiing paystack account
 * A running redis server

   # Setup Environment

 * Let's clone the repo with the snippet below.
    ````
    
    git clone https://github.com/emmieIO/subscription_management_nodejs
    
    `````
 2. then install necessary modules
    ````
    cd subscription_management_nodejs
    
    npm install
    ````
 4. after that rename the env.example to .env
    ````
    
    cp .env.example .env
    
    ````
5. Seed the database with stock data
   ````
   npm run db:fresh
   ````
6. Finally let's run our project
   ````
   npm run dev
   ````
