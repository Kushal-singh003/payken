import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import supabase from "../Utils/SupabaseClient";
import { withToken } from "../Utils/Functions";

const Collection = () => {
  const router = useRouter();
  const [collection, setCollection] = useState(null);

  async function getAvatar() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    // setEmail(session?.user?.email)
    getFinalData(session?.access_token);
  }

  useEffect(() => {
    // console.log(session)
    getAvatar();
  }, []);

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
      console.log(response, "to get the response from api to get Final Data");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="home-inner" className="profile-sects">
      <div className="container" id="res-top-set">
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
                    onClick={(e) => onClickHandler(e)}
                    className="inner-btn mb-3"
                  >
                    In Review
                  </button>
                  <span className="delete-span">
                    <svg
                      id="delete-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 mb-3"
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
      </div>
    </div>
  );
};

export default Collection;
