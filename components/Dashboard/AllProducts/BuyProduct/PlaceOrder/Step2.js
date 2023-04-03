import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);

// const stripePromise = loadStripe(
//   `${process.env.STRIPE_PRIVATE_KEY}`
// );

const stripePromise = loadStripe(`${process.env.STRIPE_PRIVATE_KEY}`);

export default function Step2({ clientSecret }) {
  const appearance = {
    theme: "flat",
  };

  const options = {
    clientSecret,
    appearance,
  };

  console.log(options, "options are here");

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
