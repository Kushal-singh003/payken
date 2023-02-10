import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import PageOne from "./Payment/PageOne";
import PageTwo from "./Payment/PageTwo";
import PageThree from "./Payment/PageThree";
import { useRouter } from "next/router";
import supabase from "../../utils/SupabaseClient";

const stripePromise = loadStripe(
  "pk_test_51MYlX2JhZEv5n0fUmXp4uTj3oLEEWxnMAXdIU5LoW1odTriiIm4vMZ7Vzk3aHf0YWOul4TFYpQU2JsR759vmsP0J00YDXzZqOm"
);

const Purchase = ({ props, price }) => {
  const [page, setPage] = useState(1);
  const [upCount, setUpCount] = useState(1);
  console.log(props);
  const router = useRouter();
  console.log(router.query.uid)
  // console.log(props, price, "to see the contract Identity");
  // console.log(props?.data.maxPerMint, "to get the contract Identity");
  // console.log(props?.data.description, "to check the descriptioin");

  const [isLoading, setIsLoading] = useState(false);
  const [max, setMax] = useState(props?.data.maxPerMint);
  const [min, setMin] = useState(1);
  const [description, setDescription] = useState(props?.data?.description);
  const emailInputRef = useRef();
  const [checkEmail, setCheckEmail] = useState();

  const [check, setCheck] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [formValues, setFormValues] = useState({}
    //  { name: "", value:"",type:"" },
  );

  async function emailCheckHandler(e) {
    e.preventDefault();

    const email = emailInputRef.current.value;

    if (!email) {
      toast.error("Please Provide the payken email");
      return;
    }

    if (!email.includes(".com")) {
      toast.error("Please Provide valid Email");
      return;
    }

    setCheckEmail(email);
    setPage(2);
  }

  async function createPaymentIntent() {
    setPage(3);
   
    console.log(formValues,'formValues45')
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session);
    let req = await axios.post("/api/payment/create-payment-intent", {
      amount: price * upCount,
      description: description,
      email: checkEmail,
      quantity: 1,
      userId: session?.user.id,
      token: session?.access_token,
      contractIdentity: router.query.uid,
       data:Object.keys(formValues).length == 0 ? [] : formValues ,
    });
    // console.log(req.data.clientSecret)
    console.log(req,'clientsecret')
    setClientSecret(req.data.clientSecret);
  }

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   // setIsLoading(true);
  //   // let total = JSON.parse(localStorage.getItem("query"));

  //   try {
  //     console.log(Math.ceil(price));
  //     const response = await axios.post("/api/payment/checkout_sessions", {
  //       data: {
  //         amount: price,
  //         quantity: upCount,
  //         description: description,
  //         email: checkEmail,
  //       },
  //     });

  //     // let token =  localStorage.getItem('token')
  //     const stripe = await stripePromise;
  //     console.log(response, "id here for  you");
  //     setClientSecret(response.data.clientSecret)

  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId: response.data.id,
  //     });

  //     console.log(response.data.id, "id here for  you");
  //     if (error) {
  //       setIsLoading(false);
  //       console.log(error);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <emailCheckHandler />
      {/* <SideBar /> */}
      <div id="home-inner" className="profile-sects profile-sects2 pt-0">
        <div className="dark-overlay">
          <div className="container ">
            <div className="row">
              <ToastContainer />
              <div className="col" id="card-head">
                <div className="card text-center text-light card-form">
                  <div className="card-body " id="emalCheckId">
                    {/* <div className="purchase-heading">
                      <h3 className="purchase-txt">PURCHASE </h3>
                      <p>Set 2 of 3</p>
                    </div> */}
                    {/* <PageThree clientSecret={clientSecret} /> */}
                    {page == 1 && (
                      <PageOne
                        isLoading={isLoading}
                        emailInputRef={emailInputRef}
                        emailCheckHandler={emailCheckHandler}
                      />
                    )}
                    {page == 2 && (
                      <PageTwo
                        createPaymentIntent={createPaymentIntent}
                        max={max}
                        min={min}
                        price={price}
                        upCount={upCount}
                        setUpCount={setUpCount}
                        setFormValues={setFormValues}
                        formValues={formValues}
                      />
                    )}
                    {page == 3 && <PageThree clientSecret={clientSecret} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
