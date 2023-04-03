import React from "react";
import { useCallback } from "react";
// import { ApplePayButton } from "react-apple-pay-button";/
import Step1 from "./Modal/Step2";
import Link from "next/link";
import { useState, useEffect } from "react";
import { withAuth } from "../Utils/Functions";
import supabase from "../Utils/SupabaseClient";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
// import {SquarePaymentsForm, CreditCardInput} from 'react-square-web-payments-sdk'

// const stripe = require("stripe")(
//   `${process.env.STRIPE_SECRET_KEY}`
// );

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// const stripePromise = loadStripe(`${process.env.STRIPE_SECRET_KEY}`);

const stripePromise = loadStripe(`${process.env.STRIPE_SECRET_KEY}`);

export default function Payment() {
  // const [cardId,setCardId] = useState();
  // const [cId,setCId] = useState();
  // const [paymentIntentId,setPaymentIntentId] = useState();
  const [token, setToken] = useState();
  // const elements = useElements();

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");
    setToken(session?.access_token);
  }

  useEffect(() => {
    getSession();
  }, []);

  const paymentLink = async (amount, description) => {
    const data = {
      amount: amount,
      currency: "USD",
      note: description,
    };
    const token = "sandbox-sq0idb-w-eEbWJIaNm40jrqUq48qw";
    const response = await axios.post("/api/cashApp", {
      data: data,
      token: token,
    });
    console.log(response);
  };

  const [paymentUrl, setPaymentUrl] = useState("");

  const handlePayment = async () => {
    const url = await paymentLink(10, "Payment for goods");
    setPaymentUrl(url);
  };

  const onRequestApplePay = useCallback(() => console.log("done"), []);

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
                {/* <button id="apple-pay-button" onClick={(e)=> applePaySessionFn(e)}>apple pay</button> */}
                {/* <button onClick={onApplePayButtonClicked}>
        <img src="apple-pay-button.png" alt="Apple Pay" />
      </button> */}
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
