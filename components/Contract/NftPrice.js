import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
// import { data } from "jquery";
// import { faLowVision } from "@fortawesome/free-solid-svg-icons";
// import SideBar from "../SideBar";
// import { idText } from "typescript";
import supabase from "../Utils/SupabaseClient";
import { MerchantApi } from "../Utils/Functions";

// let dynamicValue = []

const NftPrice = () => {
  const nftPriceInputRef = useRef();
  const nftMintedInputRef = useRef();
  const webAddressInputRef = useRef();
  const tokenUriInputRef = useRef();
  const descriptionInputRef = useRef();
  const [finalData, setFinalData] = useState();
  const [id, setId] = useState();
  const [token, setToken] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dynamicCheck, setDynamicCheck] = useState(null);
  const [hideInput, setHideInput] = useState(false);
  const [maticPrice,setMaticPrice] = useState(null);

  async function getToken() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    console.log(session?.user?.id, "to get the id from session");
    setId(session?.user?.id);
    setToken(session?.access_token);
  }

  useEffect(() => {
    getToken();
    const data = localStorage.getItem("function");
    console.log(JSON.parse(data), "final data");
    setFinalData(JSON.parse(data));
    getMaticPriceFn();
  }, []);

  // useEffect(() => {
  //   const data = localStorage.getItem("function");
  //   console.log(JSON.parse(data), "final data");
  //   setFinalData(JSON.parse(data));
  // }, []);

  async function postFinalData(data) {
    try {
      //   let res = await axios.post ("/api/postFinalData",{token:token,data})
      let res = await MerchantApi({
        token: token,
        data: data,
        query: "createpg",
      });
      console.log(res, "with token res");
      const response = res.data;
      setLoading(false);
      console.log(response, "to get the response from api to post final data");
      localStorage.removeItem("dynamicValues");
      if (!res.Error) {
        toast.success("Contract deployed successfully");
        setTimeout(() => {
          router.push("/contract/collection");
        }, [1000]);
      }

      if (res.Error) {
        console.log("error");
        toast.error("Failed to deploy your contract! Please try again");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    setLoading(true);

    console.log(finalData, "to see the data to send to api");

    const newParameter = localStorage.getItem("parameter");
    // console.log(JSON.parse(newParameter),'newParameter')
    console.log(newParameter, "fkjdkfjkdjfkj");
    const nftPrice = nftPriceInputRef?.current?.value;
    console.log(nftPrice, "to see the value of nft price");
    const nftMinted = nftMintedInputRef.current.value;
    console.log(nftMinted, "to see the value of nft minted");
    const webAddress = webAddressInputRef.current.value;
    console.log(webAddress, "to see the description");
    const uri = tokenUriInputRef.current.value;
    console.log(tokenUriInputRef, "to see the description");

    const description = descriptionInputRef.current.value;
    console.log(description, "to see the description");

    console.log(JSON.parse(finalData?.function)?.name, "fucntion name");

    //  let  dynamicValue =[ localStorage.getItem('dynamicValues')]

    // console.log(JSON.parse(dynamicValue),'fkj');

    // if(dynamicCheck){
    //   // dynamicValue.push({price:dynamicCheck})

    // }

    // console.log(dynamicValue,'dynamic vlaue');

    const data = {
      network: finalData?.value,
      smartContract: finalData?.contractAddress,
      nftPrice: nftPrice || null,
      maxPerMint: nftMinted,
      webAddress: webAddress,
      uri: uri,
      description: description,
      selectedFunction: JSON.parse(finalData?.function)?.name,
      parameter: JSON.parse(finalData?.function),
      contractName: finalData?.contractName,
      userId: id,
      data1:
        newParameter == null ||
        newParameter == "undefined" ||
        newParameter.length == 0
          ? []
          : JSON.parse(newParameter),
      dynamicValue: `price = ${dynamicCheck}` || null,
    };

    console.log(data, "to check the data on local storage");
    postFinalData(data);
    // window.location="/nftPages/nftStart"
  }

  async function getTokenUri() {
    try {
      const res = await axios.post("/api/getTokenUri");
      const response = res.data;
      console.log(response, "token uri api data");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTokenUri();
  }, []);

  function backFn(e) {
    e.preventDefault();
    router.push("/contract/functionValues");
  }

  function dynamicCheckFn(e) {
    console.log(e.target.checked, "cehked");
    const Check = e.target.checked;

    if (Check == true) {
      setDynamicCheck(nftPriceInputRef.current.value);
      setHideInput(true);
    } else {
      setDynamicCheck(null);
      setHideInput(false);
    }
  }

  console.log(dynamicCheck);

  async function getMaticPriceFn(){
    try {
      const response = await axios.get('https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=3DP8EIJ53A49TPYD6WWUCVE919S7W7N2RU');
      console.log(response,'matic price')
      setMaticPrice(response?.data?.result?.maticusd)
    } catch (error) {
      console.log(error,'error')
    }
   
  }

  return (
    <div id="NFTAmt-inner">
      <div className="new-dashboard">
        <section className="profile-sec profile-sects" id="nft-profile-sec">
          <div className="container">
            <div className="row">
              {/* <SideBar/> */}
              <form className="funds-sec" onSubmit={formSubmitHandler}>
                <ToastContainer />

                <div className="col-head mt-1 " id="col-head">
                  <h3 className="nft-text">ADD a new NFT collection</h3>

                  <div className="link-head  " id="nft-section">
                    <div className="nft-part">
                      <h4 className="nft-heading">
                        {" "}
                        What's the price of one NFT?
                      </h4>
                      <p className="nft-para">
                        {/* Price is in the network currency (eg. Ethereum) For
                        TestNet contracts ensure the price is no more than 0.001
                        ETH. */}
                        Minimum Price must be {parseFloat(0.54/maticPrice).toFixed(3)} MATIC
                      </p>
                      <div
                        className="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        {hideInput ? null : (
                          <input
                            ref={nftPriceInputRef}
                            type="text"
                            className="form-control form-border"
                            // placeholder="0.01"
                            required
                          />
                        )}
                      </div>

                      <div className="price-dynamic">
                        <span>Send price as dynamic value:</span>
                        <input
                          onChange={(e) => dynamicCheckFn(e)}
                          type="checkbox"
                        />
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <h4 className="nft-heading">
                        What's the maximum quantity that can be minted in one
                        purchase?
                      </h4>
                      <p className="nft-para">
                        We may limit this futher,depending on the price of your
                        NFTs.
                      </p>
                      <div
                        className="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <input
                          ref={nftMintedInputRef}
                          type="text"
                          className="form-control form-border"
                          // placeholder="10"
                          required
                        />
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <h4 className="nft-heading">
                        What's your website address?
                      </h4>
                      <div
                        className="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <input
                          ref={webAddressInputRef}
                          type="text"
                          className="form-control form-border"
                          // placeholder="https://codepen.io/mr-beasy"
                          required
                        />
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <h4 className="nft-heading">
                        Add a description of your project
                      </h4>
                      <div
                        className="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <textarea
                          ref={descriptionInputRef}
                          type="text"
                          className="form-control "
                          // placeholder="https://codepen.io/mr-beasy"
                          id="textarea-nft"
                          required
                        />
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <h4 className="nft-heading">Token URI</h4>
                      <div
                        className="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <input
                          ref={tokenUriInputRef}
                          type="text"
                          className="form-control form-border"
                          placeholder=""
                          required
                        />
                      </div>
                      <p style={{ marginTop: "1rem" }}>
                        {
                          "Token URI must be of https://example.com/api/v1/nft/metadata/${id}. Here id is replaceable with nft token id, 'example.com' is the base URL for the API that serves the NFT metadata and  '/api/v1/nft/metadata' is the endpoint where NFT metadata is served"
                        }
                      </p>
                    </div>
                    <div className="nft-part pt-0">
                      <div className="form-check" id="check-froms">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckChecked"
                        >
                          I accept the NFTpay{" "}
                          <span className="terms-text">
                            terms and conditions
                          </span>{" "}
                          of use.
                        </label>
                      </div>
                    </div>

                    <div className="nft-part pt-0">
                      <div className="nft-btnsec mt-0 pt-0">
                        <button
                          onClick={backFn}
                          className="btn back-nftbtn"
                          type="button"
                        >
                          Back
                        </button>
                        <button
                          disabled={loading}
                          className="btn next-nftbtn"
                          type="submit"
                        >
                          {loading ? "Loading..." : "Add Collection"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabindex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel"></h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h4>5% to 10% Per month</h4>
                <p>Up to 3x with all work & non worthy incoms.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <a
                  href="/activateWallet"
                  type="button"
                  className="btn btn-primary"
                >
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftPrice;
