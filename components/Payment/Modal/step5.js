import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { withAuth } from "@/components/Utils/Functions";
import axios from "axios";
import supabase from "@/components/Utils/SupabaseClient";

export default function Step5() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [hash, setHash] = useState();
  const [nftImg, setNftImg] = useState();
  const [contractId, setContractId] = useState();
  const router = useRouter();

  useEffect(() => {
    setOpen(true);
    setShow(true);
    getSession()

    
    //  card()
  }, [router.query]);

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session inn contract update");
    const a = session?.user?.email;
    setEmail(a)
    console.log(a,'email session')

    updateTransaction(a);
  }

  async function updateTransaction(a) {
    const data = {
      clientSecret: router.query.payment_intent,
      email:a,
    };
    try {
      let response = await withAuth({ data: data, query: "updatetransaction" });

      console.log(response, "res is here");
      console.log(
        response?.data?.data?.error?.transactionHash,
        "transaction hash "
      );
      const id = response?.data?.data[0]?.tokenId;
      const uri = response?.data?.data[0]?.uri;
      const d = uri?.split("$");

      console.log(id, uri, d, "uri");

      if (!response?.data?.data?.error) {
        setHash(response?.data?.data[0]?.transactionHash);
        setContractId(response?.data?.data[0]?.ID);
        const response2 = await axios.post("/api/nftData", {
          data: { id: id, uri: d[0] },
        });
        console.log(response2, "response2");
        setNftImg(response2?.data?.data?.image);
        setOpen(false);
      }

      if (response?.data?.data?.error) {
        setHash(response?.data?.data?.error?.transactionHash);
        setErrMsg(true);
        setOpen(false);
      }
    } catch (err) {
      console.log(err, "error");
      setErrMsg(true);
      setOpen(false);
      return;
    }
  }

  function backFn(e) {
    e.preventDefault();

    router.back();
  }

  function nextFn({ e, id }) {
    e.preventDefault();

    router.push("/nft/nftDetails/" + id);
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
                        src={nftImg || "/img/Mask Group -1.png"}
                        alt=""
                      />
                    </div>
                    <h2>Congratulations on your purchase!</h2>
                    <h6>Your NFT is ready!</h6>
                    <div className="some-text">
                      {/* <p>Your receipt was sent to:</p> */}
                      <p>{email}</p>
                      <span>
                        <a href={hash}>{hash}</a>
                      </span>
                    </div>
                    <button
                      onClick={(e) => nextFn({ e, id: contractId })}
                      className="view"
                    >
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
