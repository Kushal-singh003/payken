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

const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);

const stripePromise = loadStripe("pk_test_51MYlX2JhZEv5n0fUmXp4uTj3oLEEWxnMAXdIU5LoW1odTriiIm4vMZ7Vzk3aHf0YWOul4TFYpQU2JsR759vmsP0J00YDXzZqOm");



export default function Payment() {

  const [cardId,setCardId] = useState();
  const [cId,setCId] = useState();
  const [paymentIntentId,setPaymentIntentId] = useState();
  // const elements = useElements();

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      'session'
    );

    const email = session?.user?.email

    const response = await withAuth({ data: { email: email }, query: 'registerwithemail' })
    console.log(response,'response');
    const cid = response?.data?.data?.cId;
    setCId(cid)
    const paymentMethods = await stripe.paymentMethods.list({
      customer: `${cid}`,
      type: 'card',
    });

    console.log(paymentMethods,'paymentMEthods');
    setCardId(paymentMethods?.data[0]?.id)



   

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


  async function createPaymentIntent(e){
    e.preventDefault();
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      customer: cId,
      payment_method: cardId,
    });

    console.log(paymentIntent);
    setPaymentIntentId(paymentIntent?.id)
  }

  useEffect(() => {
    getSession();
  }, [])


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

  async function retrievePaymentIntent(e){
    e.preventDefault();
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    console.log(paymentIntent,'paymentIntent retrieved');
  }

  // const options = {
  //   clientSecret,
  //   appearance,
  // };


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


                {/* <button onClick={(e)=> createPaymentIntent(e)}>Make a Payment</button>
                <button onClick={(e)=> retrievePaymentIntent(e)}> retrieve a payment</button> */}
                {/* <Elements options={options} stripe={stripePromise}>

                <button onClick={(e)=> confirmPaymentIntent(e)}>COnfirm Payment</button>
                </Elements> */}
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
