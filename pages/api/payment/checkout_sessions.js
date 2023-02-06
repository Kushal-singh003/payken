// const stripe = require("stripe")(
//   "sk_test_51LxThRSIs5MqMViAZ3OsgBvRZGDXLfPt8O79TceEoz48GRh3XirNYWocF8kS0TX6DfUu2rYVpZH5eUOssrGLAuej00fU6fWPr2"
// );

// export default async function handler(req, res) {
//   if (req.method == "POST") {
//     try {
//       console.log(req.body.data);
//       let { amount, quantity, description, email } = req.body.data;

//       console.log(amount, quantity);
//       const session = await stripe.checkout.sessions.create({
//         customer_email: email,
//         payment_method_types: ["card"],

//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               unit_amount: Math.ceil(100 * amount),
//               product_data: {
//                 name: "NFT",
//                 description,
//                 images: [
//                   "https://media.geeksforgeeks.org/wp-content/uploads/20200412121906/skeleton-loading.gif",
//                 ],
//               },
//             },
//             quantity,
//           },
//         ],

//         mode: "payment",
//         payment_method_types: ["card"],
//         success_url: `${req.headers.origin}/?successPage=true`,
//         cancel_url: `${req.headers.origin}/nftPages/nftDashboard`,
//       });
//       res.status(200).json(session);
//       ipe.checkout.sessions.create(session);
//     } catch (err) {
//       console.log("first");
//       console.log(err);
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     console.log("F");
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }

const stripe = require("stripe")(
  "sk_test_51LxThRSIs5MqMViAZ3OsgBvRZGDXLfPt8O79TceEoz48GRh3XirNYWocF8kS0TX6DfUu2rYVpZH5eUOssrGLAuej00fU6fWPr2"
);

export default async function handler(req, res) {
  if(req.method == "POST"){
    const {amount, quantity, description, email} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      customer_email:email,
      amount:amount,
      currency: "USD",
      description:description,
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      quantity,
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
}
