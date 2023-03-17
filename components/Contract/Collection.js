import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import supabase from "../Utils/SupabaseClient";
import { withToken } from "../Utils/Functions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { MerchantApi } from "../Utils/Functions";
import { Modal } from "@nextui-org/react";

const Collection = () => {
  const router = useRouter();
  const [collection, setCollection] = useState(null);
  const [lengthOfData, setLengthOfData] = useState(null);
  const [token, setToken] = useState();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(0);

  async function getAvatar() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    // setEmail(session?.user?.email)
    setToken(session?.access_token);
    getFinalData(session?.access_token);
  }

  useEffect(() => {
    setOpen(true);
    getAvatar();
  }, [added]);

  async function formSubmitHandler(event) {
    event.preventDefault();

    const data = localStorage.getItem("function");
    console.log(data);
    router.push("/contract/addContract");
  }

  function onClickHandler(event) {
    event.preventDefault();
    console.log(event.target.value);
    const id = event.target.value;
    console.log(id, "to get the id of the nft");
    router.push({
      pathname: "/nft/buyNft/" + id,
    });
  }

  async function getFinalData(token) {
    try {
      console.log(token);
      //   let res = await axios.post("/api/getFinalData", { id:id });
      let res = await withToken({ token: token, query: "getpg" });
      console.log(res, "to get the response 1");
      const response = res.data.result;
      setCollection(response);
      setLengthOfData(response?.length);
      console.log(response, "to get the response from api to get Final Data");
      setOpen(false);
    } catch (err) {
      console.log(err);
      setOpen(false);
    }
  }

  async function deleteCollectionFn(e) {
    e.preventDefault();
    setLoading(true);
    const response = await MerchantApi({
      data: { id: id },
      token: token,
      query: "deletepg",
    });
    console.log(response, "deletePg");
    setLoading(false);
    if (!response?.Error) {
      console.log("delete");
      setVisible(false);
      setAdded(added + 1);
      toast.success("Deleted successfully!");
    }

    if (response?.Error) {
      console.log("error");
      toast.error("Failed to delete! Please try again");
    }
  }

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const closeHandler2 = () => {
    setVisible2(false);
    console.log("closed");
  };

  async function handleDeleteFn({ e, id }) {
    e.preventDefault();
    setId(id);
    setVisible(true);
  }

  function modalFn2(e) {
    e.preventDefault();

    setVisible2(true);
  }

  return (
    <div id="home-inner" className="profile-sects">
      <div className="container" id="res-top-set">
        <Backdrop
          sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ToastContainer />
        {/* <SideBar /> */}
        <h1 className="nft-main--heading">NFT-PAY</h1>
        <div className="nftHeadingDiv">
          <h3 className="nftHeading" style={{ fontSize: "40px" }}>
            {" "}
            Your NFT Collection{" "}
          </h3>
          <button
            onClick={formSubmitHandler}
            className="nftHeadingBtn"
            style={{
              border: "none",
              width: "300px",
              height: "50px",
              borderRadius: "30px",
            }}
          >
            Add a new Collection
          </button>
        </div>

        <div className="section-card">
          {collection?.map((item) => (
            <div className="card-body" id="nftstart-body">
              <p className="card-body--heading" id="nft-card-body-text">
                <img
                  src="/img/polygon.png"
                  style={{
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                />
                Polygon Test Mumbai
              </p>
              <div className="card-body-div">
                <p className="card-body-text ">
                  {item?.contractName || "undefined"}
                </p>
                <div className="inner-div">
                  <p className="inner-text ">Total Transactions</p>
                  <span className="inner-number">0</span>

                  <button
                    value={item.id}
                    onClick={
                      item.adminApproved == 0
                        ? (e) => modalFn2(e)
                        : (e) => onClickHandler(e)
                    }
                    className="inner-btn mb-3"
                  >
                    {item.adminApproved == 0 ? "In Review" : "Use Contract"}
                  </button>
                  <span
                    onClick={(e) => handleDeleteFn({ e, id: item.id })}
                    className="delete-span"
                  >
                    <svg
                      id="delete-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mb-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {lengthOfData == null || lengthOfData == 0 ? (
          <div className="not-found">
            <span>Not Found</span>
          </div>
        ) : null}

        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Body>
            <div className="merchant-pop">
              <p>Do you want to delete this Contract?</p>
              <div className="merchant-btn">
                <button onClick={(e) => deleteCollectionFn(e)}>
                  {loading ? "Loading..." : "Delete"}
                </button>
                <button onClick={closeHandler}>Cancel</button>
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
                Your Contract is under verification process . After verification
                you are able to access this contract.
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
  );
};

export default Collection;
