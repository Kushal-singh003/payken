import axios from "axios";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  const { data } = req.body;
  let { token } = req.body;

  console.log(token, data, "token is here");
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.ceil(100 * data?.amount),
    // shipping: {
    //   name: "test",
    //   address: {
    //     line1: "mohali",
    //     postal_code: "98140",
    //     city: "mohali",
    //     state: "Punjab",
    //     country: "India",
    //   },
    // },
    currency: "usd",
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    payment_method_types: ["card", "cashapp", "us_bank_account"],
  });
  console.log(paymentIntent, "payment intent");

  var config = {
    method: "post",
    url: "http://52.9.60.249:5000/api/v1/marchent/productbuyrequest",
    data: {
      amount: data?.amount,
      tokenId: data?.tokenId,
      quantity: data?.quantity,
      paymentIntentId: paymentIntent?.id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  console.log(response, "response is here");

  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    response: response.error,
  });
}
