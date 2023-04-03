import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import CheckoutForm from "./CheckoutForm";
import supabase from "@/components/Utils/SupabaseClient";

// const stripePromise = loadStripe(`${process.env.STRIPE_SECRET_KEY}`);

const stripePromise = loadStripe(`${process.env.STRIPE_SECRET_KEY}`);

export default function CartCheckout({ clientSecret }) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const router = useRouter();

  const appearance = {
    theme: "flat",
  };

  const options = {
    clientSecret,
    appearance,
  };

  console.log(options, "options are here");

  function backFn(e) {
    e.preventDefault();

    router.back();
  }

  useEffect(() => {
    setShow(true);
    setShow1(true);
    getSession();
  }, []);

  console.log(hell, "private key");

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");

    const token = session?.access_token;
  }

  return (
    <>
      <section className="signup">
        <div className="container">
          <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <div className="modal-content">
              <div className="modal-body" id="payken-body">
                <i onClick={backFn} className="bi bi-x cross"></i>
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={show1 ? "nav-link active" : "nav-link "}
                      id="circle"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    ></button>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                    <button
                      className={show2 ? "nav-link active" : "nav-link "}
                      id="circle"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    ></button>
                  </li> */}
                  {/* <li className="nav-item" role="presentation">
                    <button
                      className={show3 ? "nav-link active" : "nav-link "}
                      id="circle"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    ></button>
                  </li> */}
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className={
                      show1 ? "tab-pane fade show active" : "tab-pane fade "
                    }
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabindex="0"
                  >
                    <div className="pay">
                      {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                          <CheckoutForm />
                        </Elements>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
}
