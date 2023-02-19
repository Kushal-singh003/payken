import React from "react";
import Step1 from "./Modal/Step2";
import Link from "next/link";
import { useState,useEffect } from "react";
import { withAuth } from "../Utils/Functions";
import supabase from "../Utils/SupabaseClient";

const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);


export default function Payment() {

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

    const paymentMethods = await stripe.paymentMethods.list({
      customer: `${cid}`,
      type: 'card',
    });

    console.log(paymentMethods,'paymentMEthods');
   
  }

  useEffect(() => {
    getSession();
  }, [])


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
