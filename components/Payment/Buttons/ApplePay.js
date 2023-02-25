// import { useStripe } from '@stripe/react-stripe-js';



// export default function ApplePayButton() {
//   const stripe = useStripe();

//   const handleClick = async () => {
//     // Call Stripe API to create a PaymentIntent
//     const response = await fetch('/api/create-stripe-session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: 1000 }),
//     });

//     const { clientSecret } = await response.json();

//     // Create Apple Pay session
//     const { error } = await stripe.redirectToCheckout({
//       sessionId: clientSecret,
//     });

//     if (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <button onClick={handleClick}>
//       Pay with Apple Pay
//     </button>
//   );
// }




import { useStripe, useElements, ApplePayButton } from '@stripe/react-stripe-js';

export  function ApplePayButtonComponent() {
  const stripe = useStripe();
  const elements = useElements();

  const handleClick = async () => {
    // Create a PaymentIntent with the amount and currency
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000, currency: 'usd' }),
    });

    const { clientSecret } = await response.json();

    // Create an Apple Pay payment request
    const paymentRequest = {
      country: 'US',
      currencyCode: 'USD',
      total: {
        label: 'My Store',
        amount: 10.00,
      },
    };

    // Create an Apple Pay payment method
    const paymentMethod = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: 'John Doe',
      },
    });

    // Confirm the PaymentIntent with the Apple Pay payment method
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.paymentMethod.id,
      payment_method_options: {
        apple_pay: true,
      },
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <ApplePayButton onClick={handleClick} />
  );
}
