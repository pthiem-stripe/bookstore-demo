const stripe = require("stripe")(process.env.STRIPE_SK);

exports.handler = async function (event, context) {
  console.log("/getPaymentIntentDetails", event.body);
  let reqBody = JSON.parse(event.body);


  const paymentIntent = await stripe.paymentIntents.retrieve(
    reqBody.piId
  )

  console.log("paymentIntent", paymentIntent);
  return {
    statusCode: 200,
    body: JSON.stringify(paymentIntent),
  };
};
