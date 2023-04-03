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
  const [loading,setLoading] = useState(false);
  const [tokenData,setTokenData] = useState(null);
  const [wallet,setWallet] = useState();
  const [price,setPrice] = useState();
  const [errMsg,setErrMsg] = useState(false);
  const [errMsg2,setErrMsg2] = useState(false)
  const [errMsg3,setErrMsg3] = useState(null)
  const [successMsg,setSuccessMsg] = useState(false)
  const [added,setAdded] = useState(0)
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
    setTokenData(d)
    getProductsFn(d);
  }

  useEffect(() => {
    // setOpen(true)
    getSession();
  }, [added]);

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

  async function transferNftFn(e){
    e.preventDefault();
    setLoading(true)
    setErrMsg(false)
    setErrMsg2(false)
    setSuccessMsg(false)
    setErrMsg3(null)

    if(!price || !wallet){
      setErrMsg(true)
      setLoading(false);
      return;
    }

    if(price <= 0){
      setErrMsg3('less')
      setLoading(false)
      return;
    } 

    if(price > productData?.quantity){
      setErrMsg3('greater');
      setLoading(false)
      return;
    }

    const data = {
      amount:price,
      to:wallet,
      id:productData?.tokenId
    }
    
    const response = await MerchantApi({data:data,query:'transferNft',token:tokenData});
    console.log(response,'transfer nft response')
      setLoading(false)

    if(!response?.Error){
      console.log('success')
      setSuccessMsg(true)

      setTimeout(()=>{
        setSuccessMsg(false)
        setVisible(false)
        setAdded(added+1)
      },[1000])
      
    }

    if(response?.Error){
      setErrMsg2(true);
      console.log('error')
    }

    
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
                <span>{productData?.price == 999999999 ? 0 : parseFloat(productData?.price).toFixed(3)} MATIC </span>
              </div>
              <p className="super-dope">{productData?.description}</p>
              <div className="accordion" id="accordionPanelsStayOpenExample">
              
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingTwo"
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
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
                            <li>{productData?.price == 999999999 ? <> 0 MATIC </>: productData?.price ? <> {parseFloat(productData?.price).toFixed(3)} MATIC </> : <span className="input-null">null</span>}</li>
                            <li> {productData?.quantity == 999999999 ? <> 0  </>: productData?.quantity ? <> {productData?.quantity}  </> : <span className="input-null">null</span>}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="detail-row4">
                <p>
                  You can transfer your NFT to your personal crypto wallet if
                  you choose. We require an ID check before any transfer can
                  proceed.
                </p>
              </div>
              <div className="detail-row5">
                <img src="/img/qr.png" alt="" />
              </div>
              <div className="detail-row6">
                <button onClick={modalFn} className="transfer-detail">
                  Transfer this NFT
                </button>
              </div>
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
              <div className="withdraw-pop">
                <form className="withdraw-form" onSubmit={transferNftFn}  >
                  <h2 className="withdraw-text">Transfer NFT</h2>
                  <div className="inputFields">
                <input className="withdraw-input" placeholder="Wallet address" onChange={(e)=> setWallet(e.target.value)}  />
                <input className="withdraw-amount" step={"1"} type='number' placeholder="Quantity" onChange={(e)=> setPrice(e.target.value)} />


                {errMsg && <span style={{color:'red',textAlign:'center'}}>*Please provide all credential!</span>}
                {errMsg2 && <span style={{color:'red',textAlign:'center'}}>*Failed to transfer! Please try again!!</span>}
                {errMsg3 == 'less' && <span style={{color:'red',textAlign:'center'}}>*Minmum Quantity must be 1</span>}
                {errMsg3 == 'greater' && <span style={{color:'red',textAlign:'center'}}>*Quantity is more than supply amount</span>}
                {successMsg && <span style={{color:'green',textAlign:'center'}}>NFT transfered succussfully</span>}

                </div>
                <button type="submit" disabled={loading} className="withdraw-btn">{loading ? 'Loading...' : 'Transfer' }</button>
                </form>

               
              </div>
            </Modal.Body>
          </Modal>
        
        </div>
      </section>
    </div>
  );
}
