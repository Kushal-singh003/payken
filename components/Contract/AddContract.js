import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Alert } from "react-bootstrap";
import { getAbi } from "../Utils/Functions";

const AddContract = () => {
  const [data, setData] = useState();
  const [value, setValue] = useState(1);
  const [type, setType] = useState();
  const contractAddressRef = useRef();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmitHandler(e) {
    e.preventDefault();
    setLoading(true)
    try {
      setError(null);
      console.log("f")

      let contractAddress = contractAddressRef.current?.value;
      localStorage.setItem("contractAddress", contractAddress)
      localStorage.setItem("value",value)
      console.log(type,"type hhere")
      localStorage.setItem("type",type)

    
;      let res = await axios.post("/api/getAbi", {
        contractAddress: contractAddress,
        chain: value,
        contractType:type,

      });

      const data = {
        contractAddress,
        value,
        type
      }

      localStorage.setItem("data", JSON.stringify(data))
      const response = res.data.data;
      
      console.log(res);
      console.log(response.result[0].ABI, "Contract abi");
      console.log(response.status)
      if (

        response.result[0].ABI == "Contract source code not verified" ||  response.status==0
      ) {
        setError(response.result[0].ABI || "Invalid address");
                setLoading(false);

        return;
      }
      if (response.status == 1) {
        localStorage.setItem("abi", response.result[0].ABI);
        localStorage.setItem("contractName", response.result[0].ContractName);
        setLoading(false);

        router.push("/contract/mintFunctions");
      }
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  return (
    <div id="NFTPage-inner" >
      <div className="new-dashboard">
        <section className="profile-sec profile-sects" id="nft-profile-sec">
          <div className="container">
            <div className="row">
              {/* <SideBar/> */}
              <form className="funds-sec">
                <ToastContainer />

                <div className="col-head mt-1 " id="col-head">
                  <h3 className="nft-text">ADD a new NFT collection</h3>

                  <div className="link-head  " id="nft-section">
                    <div className="nft-part">
                      <h4 className="nft-heading">
                        {" "}
                        Which network are you using?
                      </h4>
                      <p className="nft-para">
                        Only test networks can be used in sanbox if you are
                        using a mainnet, please go to NFtpay Live.
                      </p>
                      <div
                        className="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <select
                          onChange={(e) => setValue(e.currentTarget.value)}
                          className="form-select form-border"
                          aria-label="Default select example"
                        >
                          <option defaultValue="1">
                            Binance Smart Chain TeastNet
                          </option>
                          <option value="2">Polygon Test Mumbai</option>
                          <option value="3">Ethereum Ropsten</option>
                          <option value="4">Ethereum Goerli</option>
                        </select>
                      </div>
                    </div>
                   

                    <div className="nft-part pt-0">
                      <h4 className="nft-heading">
                        {" "}
                        What's your smart contract address?
                      </h4>
                      <p className="nft-para">
                        Your contract must implement at least one payable
                        function which mints NFTs, and which takes a quantity
                        parameter. Other parameters are permitted. <br />
                        If you don't have a smart contract, NFTpay can provide
                        one. Email support to find out how we can help.
                      </p>
                      <div
                        className="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <input
                          type="text"
                          ref={contractAddressRef}
                          placeholder="Enter your smart contract address"
                          className="form-control form-border"
                        />
                      </div>

                      <div className="nft-part" id="padding-left-nftPage">
                      <h4 className="nft-heading">
                        {" "}
                        What's your smart contract type?

                      </h4>
                      {/* <p className="nft-para">
                        Only test networks can be used in sanbox if you are
                        using a mainnet, please go to NFtpay Live.
                      </p> */}
                      <div
                        className="input-group height-set flex-nowrap mt-0 "
                        id="mb-set"
                      >
                        <select
                          onChange={(e) => setType(e.currentTarget.value)}
                          className="form-select form-border"
                          aria-label="Default select example"
                        >
                          <option defaultValue="1">
                            Select type ...
                          </option>
                          <option value="ERC20">ERC20</option>
                          <option value="ERC1155">ERC1155</option>
                          <option value="ERC71">ERC71</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>


                      <div className="nft-btnsec">
                      {error && <Alert variant="danger">{error}</Alert>}

                      <Link href={"/contract/collection"}>
                        <button className="btn back-nftbtn" type="button">
                          Back to collection
                        </button>
                        </Link>


                        <button
                          className="btn next-nftbtn"
                          disabled={loading}
                          onClick={onSubmitHandler}
                          type="button"
                        >
                          {loading ? 'Loading...' : "Continue"}
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
          tabIndex="-1"
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

export default AddContract;
