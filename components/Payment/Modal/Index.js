import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Modal from "react-bootstrap/Modal";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

export default function Index({ props, price }) {
  const [show, setShow] = useState(false);
  const [show0, setShow0] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const [customer, setCustomer] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  console.log(props?.data?.contractIdentity, "contract identity");

  useEffect(() => {
    setShow(true);
  }, []);
  
  console.log(customer, "customer");

  return (
    <div>
      <NavBar/>
      <section className="signup">
        <div className="container">
          <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <div className="modal-content">
              <div className="modal-body" id="payken-body">
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
      <Footer/>
    </div>
  );
}
