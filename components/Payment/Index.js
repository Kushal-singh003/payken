import React from "react";
import Step1 from "./Modal/Step2";
import Link from "next/link";
import { useState,useEffect } from "react";
import { withAuth } from "../Utils/Functions";
import supabase from "../Utils/SupabaseClient";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);

const stripePromise = loadStripe("pk_test_51MYlX2JhZEv5n0fUmXp4uTj3oLEEWxnMAXdIU5LoW1odTriiIm4vMZ7Vzk3aHf0YWOul4TFYpQU2JsR759vmsP0J00YDXzZqOm");



export default function Payment() {

  // const [cardId,setCardId] = useState();
  // const [cId,setCId] = useState();
  // const [paymentIntentId,setPaymentIntentId] = useState();
  const [token,setToken] = useState();
  // const elements = useElements();

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      'session'
    );
    setToken(session?.access_token)

    // const email = session?.user?.email

    // const response = await withAuth({ data: { email: email }, query: 'registerwithemail' })
    // console.log(response,'response');
    // const cid = response?.data?.data?.cId;
    // setCId(cid)
    // const paymentMethods = await stripe.paymentMethods.list({
    //   customer: `${cid}`,
    //   type: 'card',
    // });

    // console.log(paymentMethods,'paymentMEthods');
    // setCardId(paymentMethods?.data[0]?.id)



   

    // const card = stripe.Customer.create_source(
    //   cid,
    //   source='visa'
    // )

    // console.log(card);

    // const charge = await stripe.charges.create({
    //   amount: 2000,
    //   currency: 'usd',
    //   source: "visa",
    //   description: 'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
    // });

    // console.log(charge,'charge')
   
  }


  // async function createPaymentIntent(e){
  //   e.preventDefault();
    
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: 2000,
  //     currency: 'usd',
  //     customer: cId,
  //     payment_method: cardId,
  //   });

  //   console.log(paymentIntent);
  //   setPaymentIntentId(paymentIntent?.id)
  // }

  useEffect(() => {
    getSession();
  }, [])

  // async function createPaymentCashAppFn(e){
  //   e.preventDefault();
  //   var options = {
  //     method: 'POST',
  //     url: 'https://api.cash.app/customer-request/v1/requests',
  //     headers: {'Content-Type': 'application/json', Authorization: ` EAAAEHejrLvgh2AkB8FkcJWDHKGj4mFJrPpwnWIDDKbIYx3RhoRFjwvIE5zrbsto`},
  //     data: {
  //       idempotency_key: 'e345c3fb-1caa-46fd-b0d3-aa6c7b00ab19',
  //       request: {
  //         actions: [
  //           {
  //             amount: 2500,
  //             currency: 'USD',
  //             scope_id: 'MMI_4vxs5egfk7hmta3qx2h6rp91x',
  //             type: 'ONE_TIME_PAYMENT'
  //           }
  //         ],
  //         channel: 'IN_PERSON',
  //         redirect_url: 'https://example.com',
  //         reference_id: 'string',
  //         metadata: {},
  //         customer_metadata: {reference_id: 'string'}
  //       }
  //     }
  //   };
    
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }

  // async function payWithCashApp(){

  //   try {
  //     const response = await client.paymentsApi.createPayment({
  //       sourceId: 'EAAAEHejrLvgh2AkB8FkcJWDHKGj4mFJrPpwnWIDDKbIYx3RhoRFjwvIE5zrbsto',
  //       idempotencyKey: 'ddf4b7c6-a640-420a-b53e-1a3254d0f417',
  //       amountMoney: {
  //         amount: 10000,
  //         currency: 'USD'
  //       }
  //     });
    
  //     console.log(response.result);
  //   } catch(error) {
  //     console.log(error);
  //   }

  // }
 


  // async function confirmPaymentIntent(){
  //   const {error} = await stripe.confirmPayment(
  //     {
  //       elements,
  //       confirmParams: {
  //         // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
  //         return_url: 'https://example.com',
  //       },
  //     }
  //   );

  //   if(error){
  //     console.log(error);
  //   }
  // }

  // async function retrievePaymentIntent(e){
  //   e.preventDefault();
  //   const paymentIntent = await stripe.paymentIntents.retrieve(
  //     paymentIntentId
  //   );

  //   console.log(paymentIntent,'paymentIntent retrieved');
  // }

  // const options = {
  //   clientSecret,
  //   appearance,
  // };






  async function applePaySessionFn(e){
  
    const response = await axios.post('/api/create-stripe-session');
    console.log(response,'response');
  }


 async function onApplePayButtonClicked() {
    const merchantIdentifier = 'your-merchant-identifier';
    const paymentRequest = {
      countryCode: 'US',
      currencyCode: 'USD',
      supportedNetworks: ['visa', 'masterCard', 'amex'],
      merchantCapabilities: ['supports3DS'],
      total: {
        label: 'Total',
        amount: '1.00'
      }
    };

    const session = new window.ApplePaySession(1, paymentRequest);

    session.onvalidatemerchant = (event) => {
      // Call your server to get the Apple Pay merchant session
      const merchantSession = 'your-merchant-session';
      session.completeMerchantValidation(JSON.parse(merchantSession));
    };

    session.onpaymentauthorized = (event) => {
      const payment = event.payment;
      // Call your server to process the payment
      const paymentToken = 'your-payment-token';
      const paymentData = {
        token: paymentToken,
        amount: payment.total.amount
      };
      // Complete the payment
      session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
    };

    session.onpaymentmethodselected = (event) => {
      const paymentMethod = event.paymentMethod;
      // Update the payment summary to reflect the selected payment method
      const updatedTotal = {
        label: 'Total',
        amount: '1.00'
      };
      session.completePaymentMethodSelection(updatedTotal);
    };

    session.begin();
  }

  // const sessionData =  response.json();
    // const session =  stripe.applePay.buildSession(sessionData);

    // const button = document.getElementById('apple-pay-button');




  // useEffect(() => {
  //   const applePayButton = document[0].getElementById('apple-pay-button');
  //   applePayButton.addEventListener('click', startApplePaySession);
  
  //   return () => {
  //     applePayButton.removeEventListener('click', startApplePaySession);
  //   };
  // }, []);


  


  return (
    <div>
      <section className="payment">
        <div className="container">
          <h2>
            {" "}
            <Link href=""> </Link> Payment
          </h2>
          <div className="payment-content">
            <div className="payment-box">
              <h5>Connect Account</h5>
              <div className="btn-group-vertical" role="group" id="payment-btn">
                <input
                  type="radio"
                  className="btn-check"
                  name="vbtn-radio"
                  id="vbtn-radio1"
                  autocomplete="off"
                  checked
                />
                <label
                  className="btn btn-outline-danger label-btn"
                  for="vbtn-radio1"
                >
                  <img src="/img/paypal (1).png" alt="" />
                  Paypal
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="vbtn-radio"
                  id="vbtn-radio2"
                  autocomplete="off"
                />
                <label
                  className="btn btn-outline-danger label-btn"
                  for="vbtn-radio2"
                >
                  <div className="credit-card">
                    <div className="credit-left">
                      <img src="/img/credit-card.png" alt="" />
                      Credit Card
                    </div>
                    <div className="credit-right">
                      <img src="/img/credit-card (1).png" alt="" />
                      <img src="/img/credit-card.png" alt="" />
                      <img src="/img/visa.png" alt="" />
                    </div>
                  </div>
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="vbtn-radio"
                  id="vbtn-radio3"
                  autocomplete="off"
                />
                <label
                  className="btn btn-outline-danger label-btn"
                  for="vbtn-radio3"
                >
                  <div className="credit-card">
                    <div className="credit-left">
                      <img src="/img/credit-card.png" alt="" />
                      Debit Card
                    </div>
                    <div className="credit-right">
                      <img src="/img/credit-card (1).png" alt="" />
                      <img src="/img/credit-card.png" alt="" />
                      <img src="/img/visa.png" alt="" />
                    </div>
                  </div>
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="vbtn-radio"
                  id="vbtn-radio4"
                  autocomplete="off"
                />
                <label
                  className="btn btn-outline-danger label-btn"
                  for="vbtn-radio4"
                >
                  <img src="/img/transfer.png" alt="" />
                  Bank Transfer
                </label>

                {/* <button onClick={(e)=> createPaymentCashAppFn(e)}>cash app</button> */}

                {/* <button onClick={(e)=> createPaymentIntent(e)}>Make a Payment</button>
                <button onClick={(e)=> retrievePaymentIntent(e)}> retrieve a payment</button> */}
                {/* <Elements options={options} stripe={stripePromise}>

                <button onClick={(e)=> confirmPaymentIntent(e)}>COnfirm Payment</button>
                </Elements> */}
                <button id="apple-pay-button" onClick={(e)=> applePaySessionFn(e)}>apple pay</button>
                <button onClick={onApplePayButtonClicked}>
        <img src="apple-pay-button.png" alt="Apple Pay" />
      </button>
              </div>
            </div>
          </div>
        </div>


        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
                </button>
              <Step1/> */}
      </section>
          
    </div>
  );
}






// import axios from 'axios';
// import { useState } from 'react';
// import Stripe from 'stripe';
// const stripe = new Stripe('<your_stripe_api_key>');

// const ApplePayButton = () => {
//   const [sessionData, setSessionData] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState(null);

//   const startApplePaySession = async () => {
//     try {
//       // const response = await fetch('/api/create-stripe-session', {
//       //   method: 'POST',
//       //   // headers: {
//       //   //   'Content-Type': 'application/json'
//       //   // },
//       //   body: JSON.stringify({
//       //     amount: 100, // replace with the amount you want to charge in cents
//       //     currency: 'usd' // replace with the currency you want to charge in
//       //   })
//       // });

//       const response = await axios.post('/api/create-stripe-session',{
//         method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             amount: 100, // replace with the amount you want to charge in cents
//             currency: 'usd' // replace with the currency you want to charge in
//           })

//       })

//       const sessionData = await response.json();
//       setSessionData(sessionData);

//       const session = await stripe.applePay.buildSession(sessionData);

//       const button = document.getElementById('apple-pay-button');
//       const result = await stripe.applePay.checkAvailability();
//       if (result) {
//         await stripe.applePay.createButton(button, {
//           onClick: () => {
//             session.begin();
//           }
//         });

//         session.on('paymentauthorized', async (event) => {
//           const result = await stripe.applePay.completePayment(event.payment);
//           if (result.error) {
//             setPaymentStatus('Error');
//           } else {
//             setPaymentStatus('Success');
//           }
//         });

//         session.on('cancel', () => {
//           setPaymentStatus('Cancelled');
//         });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button style={{height:'100vh'}} id="apple-pay-button" onClick={startApplePaySession}></button>
//       {paymentStatus === 'Success' && <p>Payment successful!</p>}
//       {paymentStatus === 'Error' && <p>Payment error. Please try again.</p>}
//       {paymentStatus === 'Cancelled' && <p>Payment cancelled.</p>}
//     </div>
//   );
// };


// export default ApplePayButton;





