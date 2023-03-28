import React, { useState, useEffect, useRef, use } from "react";
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
import { withAuth } from "@/components/Utils/Functions";
import LoginModal from "@/components/ui/LoginModal";

const DynamicQRCode = dynamic(() => import("@/components/Utils/QR"), {
  ssr: false,
});

export default function NftDetail({ props }) {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState();
  const [address, setAddress] = useState();
  const [visible, setVisible] = React.useState(false);
  const [session,setSession] = useState(null)
  const [showModal,setShowModal] = useState(false)
  const [buttonContent,setButtonContent] = useState();
  const router = useRouter();
  const [showText,setShowText] = useState(false)

  console.log(props, "props");

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    setSession(session)
    const d = session?.access_token;
    getProductsFn(d);
  }

  useEffect(() => {
    setOpen(true);
    getSession();
  }, []);

  async function getProductsFn(d) {
    const response = await withAuth({query:'getsalebyid',data:{id:props}});
    console.log(response?.data?.data[0],'response')

    setProductData(response?.data?.data[0]);
    setAddress(
      `http://52.9.60.249:3000/dashboard/allProducts/placeOrder?price=${response?.data?.data[0]?.price}&id=${props}`
    );
    setButtonContent(`<a href="http://52.9.60.249:3000/dashboard/allProducts/placeOrder?id=${response?.data?.data[0]?.id}>Pay with payken </a>`)
    setOpen(false);
  }

  function nextFn(e) {
    e.preventDefault();
    router.push({
      pathname: "/dashboard/allProducts/placeOrder",
      query: { id: props },
    });
  }

  function handleDownloadQRCode() {
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "my-qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  function modalFn(e) {
    e.preventDefault();
    setVisible(true);
  }

  function handleModalFn(){
    setShowModal(true)
  }

  function copyTextFn(e) {
    e.preventDefault();
    navigator.clipboard.writeText(buttonContent);

    setShowText(true);

    setTimeout(() => {
      setShowText(false);
    }, [1000]);
  }

  return (
    <div>
      <section className="nft-detail section-product">
        <Backdrop
          sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                      data-bs-toggle="collapse"
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
                            <li>
                              {/* {!productData?.price == 999999999 || productData?.price   ? <>{productData?.price} MATIC </> : <span className="input-null">null</span>}  */}
                            {productData?.price == 999999999 ? <> 0 MATIC </>: productData?.price ? <> {productData?.price} MATIC </> : <span className="input-null">null</span>}
                            </li>
                            <li>
                              {/* {!productData?.quantity == 999999999 || productData?.quantity  ? <>{productData?.quantity} MATIC </> : <span className="input-null">null</span>} */}
                              {productData?.quantity == 999999999 ? <> 0  </>: productData?.quantity ? <> {productData?.quantity}  </> : <span className="input-null">null</span>}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div style={{ color: "white", marginTop: "20px" }}>
                        Add payment button to your website
                      </div>
                      <div id="embedded_code_div" className="embedded_code">
                         {/* &lt;!-- VOXI on Polygon Test Mumbai --&gt; <br />
                            &lt;link rel="stylesheet" type="text/css"
                            href="https://sandbox.nftpay.xyz/css/iframe_inject.css"
                            /&gt;
                            <br />
                            &lt;script id="creatify_script"
                            src="https://sandbox.nftpay.xyz/libs/iframe_inject.js?contract_uuid=5d30068d-6ab1-4e0f-8cdf-c055a2a9deaf"&gt;&lt;/script&gt;{" "}
                            <br />
                            <br />
                            &lt;button onclick="&gt;Buy
                            with card&lt; 
                            {`<a href='/dashboard/allProducts/placeOrder?id={tokenId}'></a>`} */}
                            {/* &lt;a href="/dashboard/allProducts/placeOrder?id=tokenId"&gt; Pay with payken &lt;/a&gt; */}
                            {buttonContent}
                        {/* {`

                            function clickHandlerFn(e)={ `}
                        <br />

                        {` router.push({
                                pathname: "/dashboard/allProducts/placeOrder",
                                query: { id: token id of your product },
                              });
                              `}
                        <br />
                        {` 
                            } `}
                        <br />
                        {`<button onClick={clickHandlerFn}>pyament with payken</button>
                            
                            `} */}
                      </div>
                      <br />

                      <button
                        id="copy_to_clipboard_script_button"
                        onclick="copy_to_clipboard(this, 'embedded_code_textarea')"
                        className="tertiary compact pad"
                        onClick={copyTextFn}
                      >
                        {showText ? 'Copied!' : 'Copy'}
                      </button>
                     
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
              <div className="detail-row6 make-payment">
                <button onClick={session ? (e) => nextFn(e) : handleModalFn} className="transfer-detail">
                  Make a Payment
                </button>
                <button className="generate-QR" onClick={session ? modalFn : handleModalFn}>
                  Generate QR code
                </button>
              </div>
            </div>
          </div>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Body>
              <div className="merchant-pop">
                {/* <QRCode size={250} value={address} />
         
                      <div className='merchant-btn downloadQR'>
                      <button onClick={handleDownloadQRCode}>Download QR code</button>

            </div> */}

                <DynamicQRCode props={address} />
              </div>
            </Modal.Body>
          </Modal>

          <LoginModal showModal={showModal} setShowModal={setShowModal} />
        </div>
      </section>
    </div>
  );
}
