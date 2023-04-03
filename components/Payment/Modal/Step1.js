import React, { useState, useEffect } from "react";
import { withAuth } from "@/components/Utils/Functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "@/components/Utils/SupabaseClient";
const stripe = require("stripe")(
  "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"
);

export default function Step1({
  setShow1,
  setShow0,
  setFormData,
  setCustomer,
  formData,
}) {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await withAuth({
        data: { email: email },
        query: "registerwithemail",
      });
      const cusId = response?.data?.data?.cId;

      setCustomer(cusId);
      console.log(email, "email is here");
      setFormData({ ...formData, email: email });

      if (cusId) {
        const cus = await stripe.customers.retrieve(cusId);

        setFormData({
          ...formData,
          address: cus?.address?.line1,
          city: cus?.address?.city,
          state: cus?.address?.state,
          country: cus?.address?.country,
          name: cus?.name,
          email: cus?.email,
        });
      }

      localStorage.setItem("buyerEmail", email);

      setLoading(false);
      setShow0(false);
      setShow1(true);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong! Please try again");
    }
  }

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setEmail(session?.user?.email);
  }

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div>
      <div className="debit-card">
        <ToastContainer />
        <h3>Email Verification</h3>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <div className="mb-3">
              <input
                type="email"
                className="form-control debit__input"
                placeholder="email"
                required
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button disabled={loading} type="submit" className="card-continue">
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
