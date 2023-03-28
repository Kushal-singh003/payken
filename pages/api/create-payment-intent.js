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
  let {
    amount,
    quantity,
    description,
    userId,
    contractIdentity,
    data,
    name,
    email,
    address,
    city,
    state,
    country,
    customer,
  } = req.body;
  const dataNE = req.body;
  console.log(dataNE, "new Data");

  let { token } = req.body;
  console.log(token, "token is here");
  console.log(customer, "customer");
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.ceil(100 * 1),
    shipping: {
      name: name || 'test',
      address: {
        line1: address,
        postal_code: "98140",
        city: city,
        state: state,
        country: country,
      },
    },
    currency: "usd",
    description,
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    payment_method_types: ['card', 'cashapp','us_bank_account'],

    customer: `${customer}`,
    // setup_future_usage: "off_session",
  });
  console.log(paymentIntent, "payment intent");

  var config = {
    method: "post",
    url: "http://52.9.60.249:5000/api/v1/auth/token",
    data: {
      userId: userId,
      tokenId: 1,
      email: email,
      quantity,
      amount,
      transactionCc: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      contractIdentity,
      data,
    },
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  };
  const response = await axios(config);
  console.log(response,'response is here')
  // userId,tokenId,quantity,amount,transactionCc,transactionStatus,status

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
