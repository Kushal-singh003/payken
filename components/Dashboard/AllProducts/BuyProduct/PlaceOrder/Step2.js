import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51MYlX2JhZEv5n0fUmXp4uTj3oLEEWxnMAXdIU5LoW1odTriiIm4vMZ7Vzk3aHf0YWOul4TFYpQU2JsR759vmsP0J00YDXzZqOm");

export default function Step2({ clientSecret }) {
  const appearance = {
    theme: 'flat',
  };

  const options = {
    clientSecret,
    appearance,
  };

  console.log(options,'options are here')

  return (
    <div className="pay">
      
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          
          <CheckoutForm  />
        </Elements>
      ) 
      }
   
    </div>
  );
}