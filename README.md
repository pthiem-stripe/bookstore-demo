# pthiem's Written IE Project 
The web application developed for this demo is a simple web shop that allows customers to buy one Stripe Press book at a time. Customers are able to pick their book of choice, select a payment method, provide the respective payment method details and submit their order. After the payment has been handled, a confirm will be shown incl. order and payment details.  


## Repo
The public Github Repo can be found at https://github.com/pthiem-stripe/bookstore-demo

## Live Demo
Try out the live demo at https://pthiem-bookstoredemo.netlify.app/

## Getting Started Locally

Install Netlify CLI at version 9.6.5
```
npm install -g netlify-cli@9.6.5  
```


Install dependencies

```
npm install 
```

Start netlify
```
netlify dev
```

## Solution Details

### Overview

### Tech Stack
The demo is developed as a react-based **Next.js** app using **Tailwind CSS** and hosted on **Netlify**. 

**Next.js** is a lightweight, react-based, hybrid SSG/SSR framework with (among other things) built-in routing, image optimization, internationalization, and a zero-config approach. This allows to spin up a working app with out-of-the-box routing without requiring any boilerplate code.   

**Tailwind CSS** is a utility-first, configurable CSS framework. It provides CSS helper classess to describe how items should be styled, rather than providing pre-defined components like frameworks such as Bootstrap.

**Netlify** is a cloud computing Company from San Francisco providing web-hosting and automation services primarily for JAMstack websites. Netlify has native support for **Next.js** and built-in integration with Github. Their service offering allows to have a Github-hosted Next.js app up and running without any configuration changes in less than 5 minutes. Another feature worth-mentioning is Netlify Functions, which allows to setup serverless functions that can be deployed together with the frontend, therefore significantly reducing the effort/overhead in cases where small-scale backend functionality is required. 
### User flow

### API Calls

### Extensions & Improvements
#### Cart Functionality
#### Customer Accounts
#### Storing and reusing Payment Methods
#### Subscriptions
#### Discount Codes
#### Product API
#### Order API

### Challenges