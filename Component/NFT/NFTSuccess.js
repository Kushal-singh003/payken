import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import SideBar from "../../Component/SideBar";
import { local } from "web3modal";


const NFTSuccess = () => {
  const [contractAbi, setContractAbi] = useState();
  const [contractName, setContractName] = useState(null);
  const [selectedFunction, setSelectedFuntion] = useState(null);
  const router = useRouter();
  const [addData, setAddData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let abi = JSON.parse(localStorage.getItem("abi"));
    let d = abi?.filter((item) => item.stateMutability == "payable");
    console.log(abi);
    setContractAbi(d);
    let name = localStorage.getItem("contractName");
    setContractName(name);
  }, []);

  async function onContinue(e) {
    e.preventDefault();
    setLoading(true)
    if (selectedFunction == null) {
      toast.error('Please select NFT mint function')
      setLoading(false)
      return;
    } ;

    console.log(
      selectedFunction,
      addData,
      "jghhghggfh"
    );
    let q = {
      function: JSON.stringify(selectedFunction),
      contractName,
      ...addData,
    };

    console.log(q);
    console.log(JSON.stringify([q]));
    localStorage.setItem("function", JSON.stringify(q));
    setLoading(false)
    router.push({
      pathname: "/nftPages/nftBfrAmt",
      // query: { pay: JSON.stringify(q) },
    });
  }

  useEffect(() => {
    const dataStorage = JSON.parse(localStorage.getItem("data"));
    console.log(dataStorage);
    setAddData(dataStorage);
  }, []);

  console.log(addData?.value, "value");
  console.log(addData?.contractAddress, "contractAddress");
  console.log(selectedFunction, "to check the function name");

  //  const data = {
  //   value: addData?.value,
  //   contractAddress: addData?.contractAddress,
  //   function: selectedFunction,
  //  }

  //  console.log(data, "to store data to local storage")

  //  const storage = localStorage.setItem('data',data);
  //  console.log(storage)

  return (
    <div id="NFTSuccess-inner">
      <div className="new-dashboard">
        <section className="profile-sec profile-sects" id="nft-profile-sec">
          <div className="container">
            <div className="row">
              <SideBar />
              <form className="funds-sec">
                <ToastContainer />

                <div className="col-head mt-1 ">
                  <h3 className="nft-text">ADD a new NFT collection</h3>

                  <div className="link-head  " id="nft-section">
                    <div className="nft-part">
                      <div
                        className="alert alert-info "
                        id="alert-message"
                        role="alert"
                      >
                        We found the <b>{contractName} </b> contract!
                      </div>

                      <h4 className="nft-heading">
                        {" "}
                        Which function should we call to mint NFTs?
                      </h4>
                      <p className="nft-para">
                        We found the following compatible function(s) in your
                        contract.{" "}
                      </p>

                      <div className="radio-section">
                        {contractAbi?.map((items, i) => {
                          console.log(items);
                          return (
                            <div className="form-check" key={i}>
                              <>
                                <input
                                  onChange={(e) => setSelectedFuntion(items)}
                                  className="form-check-input"
                                  type="radio"
                                  value={i}
                                  name="flexRadioDefault"
                                  id={"flexRadioDefault1" + i}
                                />
                                <label
                                  className="form-check-label"
                                  id="mint-text"
                                  htmlFor={"flexRadioDefault1" + i}
                                >
                                  function {items.name} payable
                                </label>
                              </>
                            </div>
                          );
                        })}
                      </div>
                      <div className="nft-btnsec">
                        <button className="btn back-nftbtn" type="button">
                          Cancel
                        </button>
                        {/* <Link href="/nftAmt"> */}
                        <button
                          className="btn next-nftbtn"
                          disabled={loading}
                          onClick={onContinue}
                          type="button"
                        >
                           {loading ? "Loading..." : "Continue"}
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NFTSuccess;
