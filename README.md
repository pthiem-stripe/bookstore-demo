# pthiem's Written IE Project 
The web application developed for this demo is a simple web shop that allows customers to buy one Stripe Press book at a time. Customers are able to pick their book of choice, select a payment method, provide the respective payment method details and submit their order. To make a payment, one can select to user Credit Cards (incl. Google and Apple Pay), as well as GrabPay and Paynow. After the payment has been handled, a confirmation will be shown incl. order and payment details.  


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

Create a netlify.toml file in the root directory with the following contents and insert your Stripe keys
```
[functions]
  directory = "functions"

[build]
environment = {STRIPE_SK = "sk_test_xxx", NEXT_PUBLIC_STRIPE_PK = "pk_test_xxx", NEXT_PUBLIC_SUCCESS_URL = "http://localhost:8888/success"}
```


Start netlify
```
netlify dev
```

## Solution Details

### Tech Stack
The demo is developed as a react-based **Next.js** app using **Tailwind CSS** and is hosted on **Netlify**. 

**Next.js** is a lightweight, react-based, hybrid SSG/SSR framework with (among other things) built-in routing, image optimization, internationalization, and a zero-config approach. This allows to spin up a working app with out-of-the-box routing without requiring any boilerplate code.   

**Tailwind CSS** is a utility-first, configurable CSS framework. It provides CSS helper classess to describe how items should be styled, rather than providing pre-defined components like frameworks such as Bootstrap.

**Netlify** is a cloud computing company from San Francisco providing web-hosting and automation services primarily for JAMstack websites. Netlify has native support for Next.js and built-in integration with Github. Their service offering allows to have a Github-hosted Next.js app up and running without any configuration changes in less than 5 minutes. Another feature worth-mentioning is Netlify Functions, which allows to setup serverless functions that can be deployed together with the frontend, therefore significantly reducing the effort/overhead in cases where small-scale backend functionality is required. 

### Payment Element


### API Calls
The app makes 2 API calls in total during a purchase. The `/createPaymentIntent` call is necessary to create a [`PaymentIntent`](https://stripe.com/docs/api/payment_intents) and to get the `payment_intent_client_secret` that is required to initialize the Payment Element. The call to `/getPaymentIntentDetails` is done to retrieve additional information to be shown to the user to provide a better experience.
#### /createPaymentIntent

<p align="center">
<img src="./doc/apiflow_createPaymentIntent.png" >
</p>


As described, this call generates a `PaymentIntent` and passes the `payment_intent_client_secret` back to the frontend. This call has to be made from the backend as it requires the Secret Key to be passed along to Stripe. The Backend uses the Stripe Node SDK to create a `PaymentIntent` using the following call:
```
  const paymentIntent = await stripe.paymentIntents.create({
    amount: reqBody.amount,
    currency: reqBody.currency,
    metadata: {
        sku: reqBody.sku,
    },
    automatic_payment_methods: { enabled: true },
  });
```

Amount, currency, and metadata are passed in as parameters by the frontend. By setting `automatic_payment_methods` to `enabled=true`, we allow the Payment Element to render and accept all suitable payment methods (e.g. depending on browser) as configured in the Stripe Dashboard. With this option, it is possile to enable new payment methods without making any code changes (as long as they are supported by the Payment Element).



#### /getPaymentIntentDetails


<p align="center">
<img src="./doc/apiflow_getPaymentIntentDetails.png" >
</p>

The call to `/getPaymentIntentDetails` is made after the Payment Element redirected the user and is purely for informational purposes. The frontend passes the ID of the `PaymentIntent` to the Netlify Functions Backend and the Stripe SDK retrieves the `PaymentIntent`, afterwards the entire object is passed back to the Frontend. The Frontend uses this information to evaluate the status of the payment and to details of the payment method that was used. 


### User flow
As the app only allows to buy one book at a time, the user flow is very straightforward. A user will select a book and then continues to make payment. A success page with payment and order details is shown if the payment is successful. In case the payment fails, the user will be redirected to an error page where they can opt to go back to the Checkout page  (with their product still selected) to re-enter payment method details or select another payment method. The previously generated payment intent will be reused, if the users opts to try again.

<p align="center">
<img src="./doc/userflow_overview.png" height="650px">
</p>

The *Make payment* step can be further broken down into 
1. Selecting a payment method
2. If necessary, providing additional payment method details (such as credit card details)
3. Confirming the payment
4. If necessary, carrying out additional user actions (such as scanning the PayNow QR code, 3DS challenge, etc.)

<p align="center">
<img src="./doc/userflow_makepayment.png" height="870px">
</p>





### Extensions & Improvements
#### Cart Functionality
#### Customer Accounts
#### Storing and reusing Payment Methods
#### Subscriptions
#### Discount Codes
#### Product API
#### Order API
#### Error handling

### Challenges

### References used
- stripe payment intent api
- accepting a payment with element
- styling element