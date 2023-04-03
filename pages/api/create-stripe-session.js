const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      console.log(paymentIntent, "paymentInternt");
      // await axios(config).then(function (response) {
      //   res.status(200).json({ data: response.data });
      // });
    } catch (err) {
      res.status(400).json({ Error: err });
    }
  }
}
