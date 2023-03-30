import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import supabase from "@/components/Utils/SupabaseClient";
import { withToken } from "@/components/Utils/Functions";
import { MerchantApi } from "@/components/Utils/Functions";
import QRCode from "qrcode.react";
import { Modal } from "@nextui-org/react";
import dynamic from "next/dynamic";

const DynamicQRCode = dynamic(() => import("@/components/Utils/QR"), {
  ssr: false,
});

export default function ProductDetails({ props }) {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState();
  const [address, setAddress] = useState();
  const [visible, setVisible] = React.useState(false);
  const router = useRouter();

  console.log(props, "props");

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    const d = session?.access_token;
    getProductsFn(d);
  }

  useEffect(() => {
    // setOpen(true)
    getSession();
  }, []);

  async function getProductsFn(d) {
    const response = await MerchantApi({
        data: { id: router?.query?.id },
        token: d,
        query: "getpurchasesbyid",
      });
      console.log(response,'res')
      setProductData(response?.data?.data[0])
  }

  function nextFn(e) {
    e.preventDefault();
    router.push({
      pathname: "/dashboard/allProducts/placeOrder",
      query: { id: props },
    });
  }

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  function modalFn(e) {
    e.preventDefault();
    setVisible(true);
  }

  return (
    <div>
      <section className="nft-detail section-product">
        {/* <Backdrop  open={open}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
        <ToastContainer />
        <div className="container">
          <h2> Product Details</h2>
          <div className="detail-box">
            <div className="detail-left">
              <img
                src={productData?.image || "/img/Mask Group -1.png"}
                alt=""
              />
            </div>
            <div className="detail-right">
              <div className="detail-row">
                <h6>{productData?.productName}</h6>
                <span>{productData?.price == 999999999 ? 0 : productData?.price} MATIC </span>
              </div>
              <p className="super-dope">{productData?.description}</p>
              <div className="accordion" id="accordionPanelsStayOpenExample">
                {/* <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      <img src="/img/down-arrow.png" alt="" />
                      Properties
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body">
                      <div className="detail-row2">
                        <p>
                          Spend <span>20</span>
                        </p>
                        <p>
                          Power <span>27</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingTwo"
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      // data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      {/* <img src="/img/down-arrow.png" alt="" /> */}
                      Details
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse "
                    aria-labelledby="panelsStayOpen-headingTwo"
                  >
                    <div className="accordion-body">
                      <div className="detail-row3">
                        <div className="mint">
                          <ul>
                            <li> Name</li>
                            <li>Token ID</li>
                            <li>Link</li>
                            <li>Price</li>
                            <li>Supply</li>
                          </ul>
                        </div>
                        <div className="address">
                          <ul>
                            <li>{productData?.productName || <span className="input-null">null</span>}</li>
                            <li>{productData?.id || <span className="input-null">null</span>}</li>
                            <li>{productData?.link || <span className="input-null">null</span>}</li>
                            <li>{productData?.price == 999999999 ? <> 0 MATIC </>: productData?.price ? <> {productData?.price} MATIC </> : <span className="input-null">null</span>}</li>
                            <li> {productData?.quantity == 999999999 ? <> 0  </>: productData?.quantity ? <> {productData?.quantity}  </> : <span className="input-null">null</span>}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="detail-row4">
                <p>
                  You can transfer your NFT to your personal crypto wallet if
                  you choose. We require an ID check before any transfer can
                  proceed.
                </p>
              </div> */}
              {/* <div className="detail-row5">
              <QRCode size={250} value={address} />
              <button onClick={handleDownloadQRCode}>Download QR code</button>
              </div> */}
              {/* <div className="detail-row6 make-payment">
                <button onClick={(e) => nextFn(e)} className="transfer-detail">
                  Make a Payment
                </button>
                <button className="generate-QR" onClick={modalFn}>
                  Generate QR code
                </button>
              </div> */}
            </div>
          </div>
          {/* <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Body>
              <div className="merchant-pop">
           

                <DynamicQRCode props={address} />
              </div>
            </Modal.Body>
          </Modal> */}
        </div>
      </section>
    </div>
  );
}
