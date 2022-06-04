const stripe = require("stripe")(process.env.STRIPE_SK);

exports.handler = async function (event, context) {
  console.log("/getProducts", event.body);

  const products = await stripe.products.list({});

  return {
    statusCode: 200,
    body: JSON.stringify(products.data),
  };
};
