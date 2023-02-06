import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckOutForm";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LxThRSIs5MqMViAdKdpIT57Qgx7wgxC34MBxRUofCRsIl6DYak8752zIBemujzjTPG5dmX5RSBTYe32DQjn7ot300ICSJGUXN");

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