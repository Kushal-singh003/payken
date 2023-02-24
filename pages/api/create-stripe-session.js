import axios from "axios";

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);



export default async function handler(req, res) {

    if(req == 'POST'){
    console.log('object');
        try {
            const session = await stripe.applePay.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                  label: 'My Product',
                  amount: 100, // Replace with the amount you want to charge in cents
                  pending: false,
                  type: 'final'
                }],
                total: {
                  label: 'My Store',
                  amount: 100, // Replace with the amount you want to charge in cents
                },
                currency: 'usd' // Replace with the currency you want to charge in
              });
              
              console.log(session);
        } catch (error) {
            console.log(error);
            
        }

        
}
}




// app.post('/applepay/session', async (req, res) => {
  
//     try {
//       const session = await stripe.applePay.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [{
//           label: 'My Product',
//           amount: 1,
//           pending: false,
//           type: 'final'
//         }],
//         total: {
//           label: 'My Store',
//           amount: 1,
//         },
//         currency: 'usd'
//       });
  
//       res.status(200).json(session);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
