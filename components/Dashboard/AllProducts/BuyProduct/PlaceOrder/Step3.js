import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import supabase from "@/components/Utils/SupabaseClient";
import { withToken } from "@/components/Utils/Functions";

export default function Step3({ props, response }) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [hash, setHash] = useState();
  const [nftData, setNftData] = useState();
  const [nftImage, setNFtImage] = useState();
  const router = useRouter();
  console.log(props, response, "props");

  useEffect(() => {
    setOpen(true);
    setShow(true);

    if (!response?.error) {
      setOpen(false);
      setHash(response?.data?.transactionHash);
      setNftData(response?.data?.final[0]);
      setNFtImage(response?.data?.final[0]?.image);
      return;
    }

    if (response?.error) {
      setHash(response?.error?.message);
      setErrMsg(true);
      setOpen(false);
      return;
    }

    // getSession();
  }, []);

  function nextFn(e) {
    e.preventDefault();

    router.push(
      "/dashboard/listedProducts/productDetails/" + response?.data?.final[0]?.id
    );
  }

  //   async function getSession() {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();

  //     console.log(session, "session");
  //     const token = session?.access_token;
  //     updateTransaction(token);
  //   }

  //   async function updateTransaction(token) {
  //     const data = {
  //       clientSecret: props?.payment_intent,
  //     };

  //     try {
  //       let response = await withToken({
  //         data: data,
  //         token: token,
  //         query: "updatebuyrequest",
  //       });

  //       console.log(response, "res is here");

  //       if (!response?.Error) {
  //         setOpen(false);
  //         setHash(response?.data?.data?.transactionHash);
  //         setNftData(response?.data?.data?.final[0]);
  //         setNFtImage(response?.data?.data?.final[0]?.image);
  //         return;
  //       }

  //       if (response?.Error) {
  //         setHash(response?.Error?.error?.message);
  //         setErrMsg(true);
  //         setOpen(false);
  //         return;
  //       }
  //     } catch (error) {
  //       console.log(error, "error");
  //       setErrMsg(true);
  //       setOpen(false);
  //     }
  //   }

  function backFn(e) {
    e.preventDefault();

    router.back();
  }

  return (
    <div>
      <Backdrop
        sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <section className="not-imp">
        <div className="container">
          {open ? null : (
            <Modal
              show={show}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <div className="modal-content">
                <i onClick={backFn} className="bi bi-x cross"></i>
                {!errMsg ? (
                  <div className="modal-body" id="purchasenft-body">
                    <div className="purchasenft-head">
                      <img
                        className="nftImg"
                        src={nftImage || "/img/Mask Group -1.png"}
                        alt=""
                      />
                    </div>
                    <h2>Congratulations on your purchase!</h2>
                    <h6>Your NFT is ready!</h6>
                    <div className="some-text">
                      {/* <p>Your receipt was sent to:</p> */}
                      <p>{nftData?.name}</p>
                      <span>{hash}</span>
                    </div>
                    <button onClick={nextFn} className="view">
                      View your NFT now
                    </button>
                  </div>
                ) : (
                  <div className="Failed-modal">
                    <img className="failed-img" src="/img/Failed.png" />
                    <h2>Transaction Failed! Please try again later</h2>
                    <span>{hash}</span>
                  </div>
                )}
              </div>
            </Modal>
          )}
        </div>
      </section>
    </div>
  );
}
