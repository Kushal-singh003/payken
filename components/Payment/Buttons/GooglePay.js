import { CardElement, useStripe } from "@stripe/react-stripe-js";

export  function GooglePayButton() {
  const stripe = useStripe();

  const handleClick = async () => {
    // Call Stripe API to create a PaymentIntent
    const response = await fetch("/api/create-stripe-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }),
    });

    const { clientSecret } = await response.json();

    // Confirm the PaymentIntent with Google Pay
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          token: {
            // Use Google Pay's token as the card token
            id: "googlepay",
          },
        },
      },
    });

    if (error) {
      console.log(error);
    }
  };

  return <button onClick={handleClick}>Pay with Google Pay</button>;
}
