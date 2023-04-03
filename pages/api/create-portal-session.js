import axios from "axios";

const stripe = require("stripe")(
  "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"
);

const YOUR_DOMAIN = "http://localhost:3000";

export default async function handler(req, res) {
  const { data } = req.body;

  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
}
