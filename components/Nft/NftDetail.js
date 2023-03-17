import React, { useState,useEffect,useRef } from "react";
import Link from "next/link";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { withToken } from "../Utils/Functions";
import supabase from "../Utils/SupabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";

export default function NftDetail({props}) {
  const [open,setOpen] = useState(false)
  const [data,setData] = useState();
  const dataFetchedRef = useRef(false);
  const router = useRouter();

  console.log(props,'props')


  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    const token= session?.access_token;
    getContractFn(token)
    
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setOpen(true)
    getSession();
  }, []);

  async function getContractFn(token){
    const response = await withToken({token:token,query:'getusernftbyid',data:{id:props}})
    console.log(response,'getpg')
    const newResponse = response?.data?.data;

    if(!response?.Error){
      const id = newResponse[0].tokenId;
          const uri = newResponse[0].uri;
          const d = uri?.split("$");

          const response2 = await axios.post("/api/nftData", {
            data: { id: id, uri: d[0] },
          });

          console.log(response2?.data?.data,'resjjj')
          let newValue = response2?.data?.data;
          newValue.amount = newResponse[0].amount;
          newValue.address = newResponse[0].address;
          newValue.chain = newResponse[0].network;
          newValue.tokenId = newResponse[0].tokenId;
          newValue.quantity = newResponse[0].quantity;
          newValue.transactionHash = newResponse[0].transactionHash;

          setData(newValue)
          setOpen(false)

  }

  if(response?.Error){
    toast.error('Something went wrong! Please try again')
    setOpen(false);
  }

    
  }

  console.log(data,'data  ')

  

  return (
    <div>
      <section className="nft-detail">
      <Backdrop
        sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer/>
        <div className="container">
          <h2> NFT's Details</h2>
          <div className="detail-box">
            <div className="detail-left">
              <img src={data?.image || "/img/Mask Group -1.png"} alt="" />
            </div>
            <div className="detail-right">
              <div className="detail-row">
                <h6>{data?.name}</h6>
                <span>
                {data?.amount} MATIC
                </span>
              </div>
              <p className="super-dope">
               {data?.descritpion}
              </p>
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
                      <img src="/img/down-arrow.png" alt="" />
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
                            <li>Mint Address</li>
                            <li> Price</li>
                            <li>Token ID</li>
                            <li>Blockchain</li>
                            <li>Quantity</li>
                            <li> Status</li>
                           
                          </ul>
                        </div>
                        <div className="address">
                          <ul>
                            <li>{data?.address}</li>
                            <li>{data?.amount}</li>
                            <li>{data?.tokenId}</li>
                            <li>{data?.chain}</li>
                            <li>{data?.quantity}</li>
                            <li style={{wordBreak:'break-all'}}>{data?.transactionHash}</li>
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
