import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const stripePromise = loadStripe("pk_live_51MYlX2JhZEv5n0fUzSLjLGdoeM2ySsP6gOTUN6PnFNzT2mql3nn0gvxJYTXq9sEYKlf6gsI9um48dx74KIyrYJ8P00RsSmzjd1");

const stripePromise = loadStripe(
  "pk_live_51MYlX2JhZEv5n0fUzSLjLGdoeM2ySsP6gOTUN6PnFNzT2mql3nn0gvxJYTXq9sEYKlf6gsI9um48dx74KIyrYJ8P00RsSmzjd1"
);

export default function Step4({ clientSecret, customer }) {
  //   const [clientSecret, setClientSecret] = React.useState("");

  const appearance = {
    theme: "flat",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm customer={customer} />
        </Elements>
      )}
    </div>
  );
}
