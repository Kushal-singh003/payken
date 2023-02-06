import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import SideBar from '../../Component/SideBar'

let arr2 = [];
let list = [];
 
const NFTamt = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [selected, setSelected]= useState(false);
  const [selected1, setSelected1] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [errMsg, setErrMsg] = useState(false);
  const [formValues, setFormValues] = useState();


  useEffect(() => {
    let selected = JSON.parse(localStorage.getItem("function"));
    console.log(selected, "selected");
    //  console.log(selected.function.inputs[0].type, "to check the inputs")
    let input = JSON.parse(selected.function);
    let selectedData;

    if (input?.inputs == null) {
      setData([{ name: 'required', type: 'no parameter' }]);
       selectedData = input?.type;
    } else {
       console.log(input, "input parsed");
      setData(input.inputs);
       selectedData = input.inputs[0].type;
    }
       

    //  setSelected(selected.function.inputs[0].type)
    // const selectedData = input.inputs[0].type;
    if (selectedData == "uint256") {
      setSelected(true);
    }
    if (!(selectedData == "uint256")) {
      setSelected1(true);
    }
  }, []);

  // async function value (data) {
  //   try {
  //     let res =

  //   }catch (err) {
  //     console.log(err)
  //   }
  // }
  
 
  function parameterFn(e) {
    console.log(e)
  arr2.push(e)
    console.log(arr2, 'arr')
    // const unique2 = arr2.filter((obj, index) => {
    //   return (
    //     index === arr2.findIndex((o) => obj.name === o.name && obj.type === o.type)
    //   );
    // });

    // let uniqueArray = array.reduce((acc, current) => {
    //   let isDuplicate = acc.find((item) => item.name == current.name && item.type == item.type);
    //   if (!isDuplicate) {
    //     acc.push(current);
    //   }
    //   return acc;
    // }, []);
    // let unique2 = arr2.filter(
    //   (item, index) => arr2.indexOf(item) === index
    // );

    // let uniqueArray = arr2.reduce((acc, current) => {
    //   // let index = acc.indexOf(current);
    //   let index = acc.find(
    //     (item) => item.name == current.name && item.type == item.type
    //   );
    //   if (index === -1) {
    //     acc.push(current);
    //   } else {
    //     acc.splice(index, 1, current);
    //   }
    //   return acc;
    // }, []);

    let unique2 = arr2.reduce((acc, current) => {
      let index = acc.findIndex((item) => item.id === current.id);
      if (index === -1) {
        acc.push(current);
      } else {
        acc.splice(index, 1, current);
      }
      return acc;
    }, []);


    console.log(unique2, 'unique arr')
    
    localStorage.setItem('parameter',JSON.stringify(unique2))
    setParameters(unique2)


  }

  
  function nextFn(e) {
    e.preventDefault()
    console.log(data?.length  , parameters.length)
    if (data?.length == parameters?.length) {
      router.push("/nftPages/nftAmt");
    } else {
      toast.error('Please select all values');
      setErrMsg(true)
    }
    

}
  
  let handleChange = ({ index, e,name,type }) => {
     const {  value } = e.target;

    list[name] = value;
    

     // list[index][name] = value;
     // list.forEach(function (element, index) {
     //   element.id = index;
     // });

     setFormValues(list);
  };
  
  console.log(formValues)

  // console.log(parameters,'parameters')

  return (
    <div id="NFTBfrAmt-inner">
      <div className="new-dashboard">
        <section className="profile-sec profile-sects" id="nft-profile-sec">
          <div className="container">
            <div className="row">
              <SideBar />
              <form className="funds-sec">
                <ToastContainer />

                <div className="col-head mt-1 " id="col-head">
                  <h3 className="nft-text">ADD a new NFT collection</h3>

                  <div className="link-head  " id="nft-section">
                    <div className="nft-part">
                      <h4 className="nft-heading">
                        {" "}
                        What values should we pass to your function?
                      </h4>

                      {data?.map((item, index) => {
                        return (
                          <div
                            className="input-group  flex-nowrap mt-3 "
                            id="three-input"
                          >
                            <div>
                              <h6>Parameter</h6>
                            </div>
                            <div className="threeb-ones">
                              <div className="threeb-one">
                                <h4 key={index}>
                                  {item?.type} {item.name}
                                </h4>
                              </div>
                            </div>

                            {/* <div className="threeb-ones">
                          <h6>Parameter</h6>
                          <select className="threeb-one">
                            {data?.map((item, i) => {
                              return (
                                <option key={i}>
                                  {item?.type} {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div> */}
                            <div className="threeb-two">
                              <h6>Value</h6>
                              <select
                                onChange={(e) =>
                                  parameterFn({
                                    type: item?.type,
                                    name: item?.name,
                                    value: e.target.value,
                                    id: index
                                  })
                                }

                                // onChange={(e) => handleChange({ index, e, type:item.type,name: item.name })}
                                defaultValue="0"
                                className=" form-border w-100"
                              >
                                <option value="0" disabled >select</option>
                                <option
                                  value="1"
                                  // onChange={(e) =>
                                  //   parameterFn({
                                  //     type: item?.type,
                                  //     name: item?.name,
                                  //     value: e.target.value,
                                  //   })
                                  // }
                                  selected={selected}
                                >
                                  Quantity of mint
                                </option>
                                <option
                                  value="2"
                                  // onChange={(e) =>
                                  //   parameterFn({
                                  //     type: item?.type,
                                  //     name: item?.name,
                                  //     value: e.target.value,
                                  //   })
                                  // }
                                  selected={selected1}
                                >
                                  Receiving Wallet
                                </option>
                                <option
                                  value="3"
                                  // onChange={(e) =>
                                  //   parameterFn({
                                  //     type: item?.type,
                                  //     name: item?.name,
                                  //     value: e.target.value,
                                  //   })
                                  // }
                                >
                                  Dynamic Value
                                </option>
                              </select>
                            </div>
                            <div className="threeb-two"></div>
                          </div>
                        );
                      })}
                      
                    

                      <div className="grey-section">
                        <div className="grey-parts">
                          <p>
                            Specify the values that should be used for each
                            parameter. There are 3 types of parameter:
                          </p>
                        </div>

                        <div className="grey-parts">
                          <h6>
                            {" "}
                            <b> Quantity to Mint</b> (mandatory)
                          </h6>
                          <p>
                            NFTpay will set this parameter to the quantity to be
                            minted, which is chosen by the buyer. You must
                            include this field type as one of your parameters.
                          </p>
                        </div>
                        <div className="grey-parts">
                          <h6>
                            {" "}
                            <b> Receiving Wallet</b> (optional)
                          </h6>
                          <p>
                            our contract requires a parameter which specifies a
                            destination wallet address for NFTs, select the
                            receiving wallet type. NFTpay will set this
                            parameter to the msg.sender address, which will
                            always point to an NFTpay custodial wallet.
                          </p>
                        </div>

                        <div className="grey-parts">
                          <h6>
                            {" "}
                            <b> Dynamic Value</b> (optional)
                          </h6>
                          <p>
                            If you need to send any other parameters to your
                            contract, you can send them from your website to the
                            NFTpay payment form using a queryString. QueryString
                            names should match the parameter name to be
                            specified. We'll show you how to specify these
                            parameters when it's time to install the NFTpay
                            script on your site.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="nft-part pt-0 ">
                      <div className="nft-btnsec mt-0 pb-2 pt-0">
                        <button className="btn back-nftbtn" type="button">
                          Cancel
                        </button>
                        {/* <Link href="/nftPages/nftAmt"> */}
                          <button onClick={(e)=> nextFn(e)} className="btn next-nftbtn" type="button">
                            Add Collection
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

export default NFTamt;
