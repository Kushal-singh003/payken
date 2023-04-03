import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { ApplePay } from "react-square-web-payments-sdk";
// const stripe = require("stripe")(
//   "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"
// );

const stripe = require("stripe")(
  "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"
);
// import { Square, CashApp, Payments } from "@square/web-sdk";
// import { Payments } from "@square/web-sdk";

export default function CheckoutForm({ customer }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentRequest, setPaymentRequest] = useState();

  console.log(customer);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          console.log(paymentIntent.status, "--------");
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://52.9.60.249:3000/payment/step5`,
      },
    });
    console.log(error, "payment error");
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
    //  paymentMethod: "pm_1MbkAgJhZEv5n0fUUl60jgo1",
  };

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Demo total",
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on("paymentmethod", async (e) => {
        const { clientSecret } = await fetch("/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodType: "card",
            currency: "usd",
          }),
        }).then((r) => r.json());

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: e.payerEmail.id,
          },
          {
            handleActions: false,
          }
        );
        if (error) {
          e.complete("fail");
          return;
        }

        e.complete("success");
        if (paymentIntent.status == "requires_action") {
          stripe.confirmCardPayment(clientSecret);
        }
      });
    }
  }, [stripe]);

  //  async function card(){
  //   const cid = localStorage.getItem('cid')
  //    const paymentMethods = await stripe.paymentMethods.list({
  //      customer: `${customer}`,
  //      type: 'card',
  //    });

  //  console.log(paymentMethods)
  //   }

  //   useEffect(()=>{
  //       card()
  //   },[])

  // useEffect(()=>{
  //     getCusListFn()
  // },[customer])

  //   async function getCusListFn(){
  //     const cid = localStorage.getItem('cid')
  //     console.log(cid);
  //   const paymentMethods = await stripe.paymentMethods.list({
  //     customer: `${cid}`,
  //     type: 'card',
  //   });

  //   console.log(paymentMethods,'payment METhods');
  // }

  // const payments = Square.payments(
  //   "sandbox-sq0idb-w-eEbWJIaNm40jrqUq48qw",
  //   "LY4S4C5K49ZPT"
  // );

  // const paymentRequest = payments.paymentRequest({
  //   countryCode: 'US',
  //   currencyCode: 'USD',
  //   requestBillingContact: true,
  //   requestShippingContact: true,
  //   lineItems: [
  //      { amount: '2.00', label: 'Item Cost' },
  //      { amount: '0.00', label: 'Shipping' },
  //      { amount: '0.00', label: 'Tax' },
  //   ],
  //   shippingOptions: [
  //      {
  //        amount: '0.00',
  //        id: 'shipping-option-1',
  //        label: 'Free',
  //      },
  //   ],
  //   total: {
  //     amount: '1.00',
  //     label: 'Total',
  //   }
  // });

  // const applePay = await payments.applePay(paymentRequest);
  // const googlePay = await payments.googlePay(paymentRequest);

  // function buildPaymentRequest() {
  //   const paymentRequest = payments.paymentRequest({
  //     countryCode: "US",
  //     currencyCode: "USD",
  //     total: {
  //       amount: "1.00",
  //       label: "Total",
  //     },
  //   });
  //   return paymentRequest;
  // }

  // async function initializeCashApp() {
  //   const paymentRequest = buildPaymentRequest(payments);
  //   const cashAppPay = await payments.cashAppPay(paymentRequest, {
  //     redirectURL: "https://my.website/checkout",
  //     referenceId: "my-website-00000001",
  //   });
  //   await cashAppPay.attach("#cash-app-pay");
  //   return cashAppPay;
  // }

  async function ClickFn(e) {
    e.preventDefault();
    console.log(e, "do something...");
  }

  return (
    <>
      <div className="link-pay">
        {paymentRequest ? (
          <PaymentRequestButtonElement
            options={{
              type: "applePay",
              theme: {
                style: "dark",
                height: "64px",
                label: "Pay Now",
                icon: "auto",
                logo: "auto",
              },
              onClick: (e) => {
                ClickFn(e);
              },
              paymentRequest,
            }}
          />
        ) : null}
      </div>

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
