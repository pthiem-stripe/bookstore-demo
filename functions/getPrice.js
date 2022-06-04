const stripe = require("stripe")(process.env.STRIPE_SK);

exports.handler = async function (event, context) {
  console.log("/getPrice", event.body);
  let reqBody = JSON.parse(event.body);

  price = await stripe.prices.retrieve(
    reqBody.priceId
  )

  console.log(price, "price");

  return {
    statusCode: 200,
    body: JSON.stringify({currency: price.currency, unit_amount: price.unit_amount}),
  };
};
