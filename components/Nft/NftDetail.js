import React, { useState,useEffect } from "react";
import Link from "next/link";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { withToken } from "../Utils/Functions";
import supabase from "../Utils/SupabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function NftDetail() {
  const [open,setOpen] = useState(false)
  const [data,setData] = useState();
  const router = useRouter();


  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );

    updateTransaction(session?.access_token)
    
  }

  useEffect(() => {
    setOpen(true)
    getSession();
  }, [router.query]);

  async function updateTransaction(token){
    const data = {
      clientSecret:router.query.payment_intent,
    }
    try{
      let res = await withToken({token:token,data:data,query:'updatetransaction'})
      const response = res.data;
      console.log(response,"update trasactiion")
      setData(response.data.data.data)
      setOpen(false)
    }catch(err){
      console.log(err)
      toast.error('Trasaction Failed !Please try again')
      setOpen(false)
      return
    }
  }

  return (
    <div>
      <section className="nft-detail">
      <Backdrop  open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer/>
        <div className="container">
          <h2> NFT's Details</h2>
          <div className="detail-box">
            <div className="detail-left">
              <img src="/img/Mask Group -1.png" alt="" />
            </div>
            <div className="detail-right">
              <div className="detail-row">
                <h6>SuperDope #800</h6>
                <span>
                  SuperDope <img src="/img/ethereum.png" alt="" />
                </span>
              </div>
              <p className="super-dope">
                SuperDope is a demo NFT project by Payken
              </p>
              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
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
                </div>
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
                      <img src="/img/down-arrow.png" alt="" />
                      Details
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingTwo"
                  >
                    <div className="accordion-body">
                      <div className="detail-row3">
                        <div className="mint">
                          <ul>
                            <li>Mint Address</li>
                            <li>Token ID</li>
                            <li>Token Standard</li>
                            <li>Blockchain</li>
                            <li>Supply</li>
                          </ul>
                        </div>
                        <div className="address">
                          <ul>
                            <li>F63f9C624AF0E1Dd25e790Be8Ed23ac</li>
                            <li>1</li>
                            <li>ERC-1155</li>
                            <li>Polygon</li>
                            <li>77</li>
                          </ul>
                        </div>
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
                <Link href="" className="transfer-detail">
                  Transfer this NFT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
