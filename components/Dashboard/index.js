import Link from "next/link";
import React, { useState, useEffect } from "react";
import Footer from "../ui/Footer";
import NavBar from "../ui/NavBar";
import { Modal } from "@nextui-org/react";
import { withToken } from "../Utils/Functions";
import supabase from "../Utils/SupabaseClient";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Dashboard() {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vMerchant, setVMerchant] = useState();
  const [token, setToken] = useState();
  const [open, setOpen] = useState(false);
  const [pop2, setPop2] = useState(false);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };

  function modalFn(e) {
    e.preventDefault();
    if (pop2) {
      setVisible2(true);
    } else setVisible(true);
  }

  async function beMerchantFn(e) {
    e.preventDefault();
    setLoading(true);

    const response = await withToken({
      data: { status: 1 },
      token: token,
      query: "marchant",
    });
    console.log(response, "response");
    setLoading(false);
    setVisible(false);
    window.location.reload();
  }

  async function launchDemoFn() {
    console.log("launch a demo");
    setVisible(false);
  }

  async function getMerchant(d) {
    const response = await withToken({ token: d, query: "getmarchant" });
    console.log(response, "response get merchant");
    setVMerchant(response?.data?.data[0]?.isMarchent);
    if (response?.data?.data[0]?.isMarchent == 1) {
      setPop2(true);
    }
    setOpen(false);
  }

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "to get the session from supabase");

    const d = session?.access_token;
    setToken(d);
    getMerchant(d);
  }

  useEffect(() => {
    setOpen(true);
    getSession();
  }, []);

  return (
    <div>
      <NavBar />
      <Backdrop
        sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="sent">
        <div className="container">
          <h2>
            <a href=""> </a> Dashboard
          </h2>
          <div className="sent-box">
            {/* {vMerchant == 1 ?
              <Link className='link' href='/contract/collection'>
                <div className="sent-card">
                  <img src="img/data-collection.png" alt="" />
                  <span>Collection</span>
                </div>
              </Link> :
              <button onClick={modalFn} className='link link-btn' >
                <div className="sent-card ">
                  <img src="img/data-collection.png" alt="" />
                  <span className='beMerchant'>Become a Merchant</span>
                  <span>Collection</span>
                </div>
              </button>}
         

            {vMerchant == 1 ?
              <Link className='link' href='/dashboard/allProducts'>
                <div className="sent-card">
                  <img src="img/shopping-bag.png" alt="" />
                  <span>Products</span>
                </div>
              </Link> :
              <button onClick={modalFn} className='link link-btn' >
                <div className="sent-card">
                  <img src="img/shopping-bag.png" alt="" />
                  <span className='beMerchant'>Become a Merchant</span>

                  <span>Products</span>
                </div>
              </button>}
              {vMerchant == 1 ?
              <Link className='link' href='/dashboard/listedProducts'>
                <div className="sent-card">
                  <img src="img/shop.png" alt="" />
                  <span>Sell Products</span>
                </div>
              </Link> :
              <button onClick={modalFn} className='link link-btn' >
                <div className="sent-card">
                  <img src="img/shop.png" alt="" />
                  <span className='beMerchant'>Become a Merchant</span>
                  <span>Sell Products</span>
                </div>
              </button>} */}

            <Link className="link" href="/nft">
              <div className="sent-card">
                <img src="img/nft (1).png" alt="" />
                <span>NFT</span>
              </div>
            </Link>

            <Link className="link" href="/wallet">
              <div className="sent-card">
                <img src="img/wallet (1).png" alt="" />
                <span>Wallet</span>
              </div>
            </Link>
            <Link className="link" href="/sendReceive">
              <div className="sent-card">
                <img src="img/cash-back.png" alt="" />
                <span>Send/Receive</span>
              </div>
            </Link>
            {/* <Link className='link' href='/payment'>
          <div className="sent-card">
            <img src="img/hand.png" alt="" />
            <span>Payment</span>
          </div>
          </Link> */}

            <Link className="link" href="/dashboard/purchases">
              <div className="sent-card">
                <img src="img/purchase.png" alt="" />
                <span>Purcahses</span>
              </div>
            </Link>

            {vMerchant == 2 ? (
              <>
                <Link className="link" href="/contract/collection">
                  <div className="sent-card">
                    <img src="img/data-collection.png" alt="" />
                    <span>Collection</span>
                  </div>
                </Link>
                <Link className="link" href="/dashboard/allProducts">
                  <div className="sent-card">
                    <img src="img/shopping-bag.png" alt="" />
                    <span>Products</span>
                  </div>
                </Link>

                <Link className="link" href="/dashboard/listedProducts">
                  <div className="sent-card">
                    <img src="img/shop.png" alt="" />
                    <span>Sell Products</span>
                  </div>
                </Link>
              </>
            ) : (
              <button onClick={modalFn} className="link link-btn">
                <div className="sent-card ">
                  <img src="img/data-collection.png" alt="" />
                  <span className="beMerchant">Become a Merchant</span>
                  <span>Collection</span>
                </div>
              </button>
            )}

            {/* <Link className='link' href='/dashboard/listedProducts'>
          <div className="sent-card">
            <img  src="img/shop.png" alt="" />
            <span>Sell Products</span>
          </div>
          </Link> */}

            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Body>
                <div className="merchant-pop">
                  <p>
                    Do you want to become a merchant ? As a merchant You can add
                    your smart contracts and Integrate a Payken Payment
                    interface into your own website.
                  </p>
                  <div className="merchant-btn">
                    <button type="button" onClick={beMerchantFn}>
                      {loading ? "Loading..." : "Become a Merchant"}
                    </button>
                    <button type="button" onClick={launchDemoFn}>
                      Try a Demo
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={visible2}
              onClose={closeHandler2}
            >
              <Modal.Body>
                <div className="merchant-pop pop2">
                  <h3>Admin approval pending</h3>
                  <p>
                    {" "}
                    Your Profile is under verification process . After
                    verification you are able to access these features.
                  </p>
                  <div className="merchant-btn">
                    <button type="button" onClick={closeHandler2}>
                      Alright!
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
