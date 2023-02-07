import axios from "axios";

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);

const calculateOrderAmount = (items) => {
  return 1400;
};

export default async function handler(req, res) {
  console.log("---------------");
  //   const { items } = req.body;
  let { amount, quantity, description, userId, contractIdentity, data } =
    req.body;
  const dataNE = req.body;
  console.log(dataNE, "new Data");

  let { token } = req.body;
  console.log(token, "token is here");

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.ceil(100 * amount),
    // shipping: {
    //   name: 'Jenny Rosen',
    //   address: {
    //     line1: '510 Townsend St',
    //     postal_code: '98140',
    //     city: 'San Francisco',
    //     state: 'CA',
    //     country: 'US',
    //   },
    // },
    currency: "usd",
    description,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log(paymentIntent, "payment intent");
  var config = {
    method: "post",
    url: "http://52.9.60.249:4000/api/v1/member/token",
    data: {
      userId: userId,
      tokenId: 1,
      quantity,
      amount,
      transactionCc: paymentIntent.clientSecret,
      paymentIntentId: paymentIntent.id,
      contractIdentity,
      data,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios(config);
  // userId,tokenId,quantity,amount,transactionCc,transactionStatus,status

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
