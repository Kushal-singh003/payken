import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckOutForm";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MYlX2JhZEv5n0fUmXp4uTj3oLEEWxnMAXdIU5LoW1odTriiIm4vMZ7Vzk3aHf0YWOul4TFYpQU2JsR759vmsP0J00YDXzZqOm");

export default function pay({ clientSecret }) {
//   const [clientSecret, setClientSecret] = React.useState("");
  console.log(clientSecret,'clientsecret3')

  
  const appearance = { 
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {/* <CheckoutForm />
           */}
<CheckoutForm/>
        </Elements>
      )}
    </div>
  );
}