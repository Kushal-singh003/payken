import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { useRouter } from "next/router";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { withToken } from "@/components/Utils/Functions";
import { MerchantApi } from "@/components/Utils/Functions";
import supabase from "@/components/Utils/SupabaseClient";
import axios from "axios";


export default function Index() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [clientSecret, setClientSecret] = useState();
  const [customer, setCustomer] = useState();
  const [price, setPrice] = useState();
  const [max, setMax] = useState();
  const [tokenId, setTokenId] = useState();
  const [maticPrice,setMaticPrice] = useState();
  const router = useRouter();

  useEffect(() => {
    setShow(true);
    getSession();
    getMaticPriceFn();
  }, [router?.query]);

  console.log(clientSecret, "clientSecret");

  function backFn(e) {
    e.preventDefault();

    router.back();
  }

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");
 
    const token = session?.access_token;
    getProductDataFn(token);
  }

  async function getProductDataFn(token) {
    const response = await MerchantApi({
      data: { id: router?.query?.id },
      token: token,
      query: "getsalebyid",
    });
    console.log(response, "response getsalebyid");
    setMax(response?.data?.data[0]?.quantity);
    setPrice(response?.data?.data[0]?.price);
    setTokenId(response?.data?.data[0]?.tokenId);
  }

  async function getMaticPriceFn(){
    try {
      const response = await axios.get('https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=3DP8EIJ53A49TPYD6WWUCVE919S7W7N2RU');
      console.log(response,'matic price')
      setMaticPrice(response?.data?.result?.maticusd)
    } catch (error) {
      console.log(error,'error')
    }
   
  }

  

  return (
    <div>
      <NavBar />
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
                    <Step1
                      setClientSecret={setClientSecret}
                      setShow1={setShow1}
                      setShow2={setShow2}
                      maticPrice={maticPrice}
                      price={price}
                      max={max}
                      tokenId={tokenId}
                    />
                  </div>

                  <div
                    className={
                      show2 ? "tab-pane fade show active" : "tab-pane fade "
                    }
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabindex="0"
                  >
                    <Step2
                      clientSecret={clientSecret}
                      setShow2={setShow2}
                      setShow3={setShow3}
                    />
                  </div>
                  {/* <div
                    className={
                      show3 ? "tab-pane fade show active" : "tab-pane fade "
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
                  </div> */}
                  {/* <div
                    className={
                      show3 ? "tab-pane fade show active" : "tab-pane fade "
                    }
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                    tabindex="0"
                  >
                    <Step4 clientSecret={clientSecret} customer={customer} />
                  </div> */}

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
