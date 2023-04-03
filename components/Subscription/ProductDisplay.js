import axios from "axios";
import { useState } from "react";
import Logo from "./Logo";

// const stripe = require("stripe")(
//   process.env.STRIPE_SECRET_KEY
// );

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { useRouter } from "next/router";

const YOUR_DOMAIN = "http://localhost:3000";

const ProductDisplay = () => {
  const [key, setKey] = useState("price_1Mp4qWJhZEv5n0fU64NkVkDh");
  const router = useRouter();

  async function getCheckoutSession(e) {
    e.preventDefault();

    // try {
    //   const response = await axios.post('/api/create-checkout-session',{data:{priceID:"price_1Mp5BXJhZEv5n0fUNrxWPZIz"}})
    //   console.log(response,'response checkout session')
    // } catch (error) {
    //   console.log(error,'error')
    // }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: "price_1Mpa18JhZEv5n0fU1pCfOlEy",
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    // res.redirect(303, session.url);
    console.log(session.url, session, "heyy");

    router.push(session.url);
  }

  return (
    <section>
      <div className="product">
        <Logo />
        <div className="description">
          <h3>Starter plan</h3>
          <h5>$20.00 / month</h5>
        </div>
      </div>
      <form onSubmit={getCheckoutSession}>
        {/* Add a hidden field with the lookup_key of your Price */}
        <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
    </section>
  );
};

export default ProductDisplay;
