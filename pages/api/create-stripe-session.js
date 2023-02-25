const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });
      console.log(paymentIntent,'paymentInternt')
      // await axios(config).then(function (response) {
      //   res.status(200).json({ data: response.data });
      // });
    } catch (err) {
      res.status(500).json({ Error: err });
    }
  }
}




