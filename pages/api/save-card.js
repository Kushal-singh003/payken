app.post("/save-card", async (req, res) => {
    const customer = await stripe.customers.create();
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: customer.id,
    });
  
    // Save the customer ID and PaymentMethod ID to your database
    // or otherwise associate them with the user's account
  });


//   import axios from "axios";

// export default async function handler(req, res) {
 

//   if (req.method === "POST") {
//         try {
//             const customer = await stripe.customers.create();
//             await stripe.paymentMethods.attach(req.body.paymentMethodId, {
//               customer: customer.id,
//             });
//         } catch (error) {
//             console.log(error)
//         }
//   }
// }
