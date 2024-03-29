import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Modal from "react-bootstrap/Modal";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/router";
import supabase from "@/components/Utils/SupabaseClient";
import { withAuth } from "@/components/Utils/Functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const stripe = require("stripe")(
//   `${process.env.STRIPE_SECRET_KEY}`
// );

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default function Index({ props, price }) {
  const [show, setShow] = useState(false);
  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const [customer, setCustomer] = useState();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    setShow(true);
    getSession();
  }, []);

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setShow0(true);
      return;
    }

    const email = session?.user?.email;
    const name = session?.user?.user_metadata?.name;
    const address = session?.user?.user_metadata?.address;
    const city = session?.user?.user_metadata?.city;
    const country = session?.user?.user_metadata?.country;
    setFormData({
      ...formData,
      name: name,
      address: address,
      city: city,
      country: country,
      email: email,
    });
    localStorage.setItem("buyerEmail", email);
    getCustomerFn(email, name, address, city, country);
  }

  async function getCustomerFn(email, name, address, city, country) {
    // try {
    const response = await withAuth({
      data: { email: email },
      query: "registerwithemail",
    });
    const cusId = response?.data?.data?.cId;
    console.log(response, cusId, "cusId response");

    if (cusId) {
      setCustomer(cusId);
      setShow0(false);
      setShow1(false);
      setShow2(true);
      // setShow3(true)
      return;
    }

    if (!cusId || cusId == "" || cusId == "undefined") {
      const cid = await stripe.customers.create({
        address: {
          city: city,
          country: country,
          line1: address,
        },
        email: email,
        name: name,
      });

      const createCid = cid?.id;
      console.log(createCid, "cid");
      setCustomer(createCid);
      const response2 = await withAuth({
        data: { email: email, cId: createCid },
        query: "updatecid",
      });
      console.log(response2, "response2");

      if (!response2?.Error) {
        setShow0(false);
        setShow1(false);
        setShow2(true);
        // setShow3(true)
      }

      if (response2?.Error) {
        toast.error("Something went wrong! Please try again");
      }
    }

    // } catch (error) {
    //   toast.error('Something went wrong! Please try again')
    // }
  }

  function backFn(e) {
    e.preventDefault();

    router.back();
  }

  return (
    <div>
      <NavBar />
      <ToastContainer />
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
                  <li className="nav-item" role="presentation">
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
                  </li>
                  <li className="nav-item" role="presentation">
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
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className={
                      show0 ? "tab-pane fade show active" : "tab-pane fade "
                    }
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabindex="0"
                  >
                    <Step1
                      setShow0={setShow0}
                      setShow1={setShow1}
                      setFormData={setFormData}
                      setCustomer={setCustomer}
                      formData={formData}
                    />
                  </div>

                  <div
                    className={
                      show1 ? "tab-pane fade show active" : "tab-pane fade "
                    }
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabindex="0"
                  >
                    <Step2
                      setShow1={setShow1}
                      setShow2={setShow2}
                      setShow3={setShow3}
                      formData={formData}
                      setFormData={setFormData}
                      setCustomer={setCustomer}
                      customer={customer}
                    />
                  </div>
                  <div
                    className={
                      show2 ? "tab-pane fade show active" : "tab-pane fade "
                    }
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                    tabindex="0"
                  >
                    <Step3
                      setShow1={setShow1}
                      setShow2={setShow2}
                      setShow3={setShow3}
                      formData={formData}
                      customer={customer}
                      contractIdentity={props?.data?.contractIdentity}
                      setClientSecret={setClientSecret}
                    />
                  </div>
                  <div
                    className={
                      show3 ? "tab-pane fade show active" : "tab-pane fade "
                    }
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                    tabindex="0"
                  >
                    <Step4 clientSecret={clientSecret} customer={customer} />
                  </div>

                  {/* <div
                              className={show3 ? "tab-pane fade show active": "tab-pane fade "}
                              id="pills-success"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              <Step4
                              setShow2={setShow2}
                              setShow3={setShow3}
                              clientSecret={clientSecret}
                             
                              />
                              
                            </div> */}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </section>
      <Footer />
    </div>
  );
}
