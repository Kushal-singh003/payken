import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Tab, Tabs, Sonnet } from "react-bootstrap";
// import Navbar from "../ui/Navbar";
import { useRef } from "react";
// import { Alert } from "react-bootstrap";
// import SideBar from '../../Component/SideBar'
// import Script from "next/script";
import supabase from "@/components/Utils/SupabaseClient";
import Modal from "@/components/Payment/Modal/Index";
import { withToken } from "@/components/Utils/Functions";

const BuyNft = (id) => {
  const [data, setData] = useState();
  const [value, setValue] = useState(1);
  // const [id, setId] = useState();
  const contractAddressRef = useRef();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dynamicValues, setDynamicValues] = useState();
  const [newValues, setNewValues] = useState([]);
  const [dynamicPrice, setDynamicPrice] = useState();

  // console.log(id,'to see user id hererejdkjfkdj')

  async function getAvatar() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    // setEmail(session?.user?.email)
    getFinalDataById(session?.access_token);
  }

  async function getFinalDataById(token) {
    console.log(token);
    try {
      //   let res = await axios.post ("/api/getFinalDataById", {token:token,id:id.userId})
      let res = await withToken({
        token: token,
        data: { id: id?.userId },
        query: "getpgbyid",
      });
      const response = res.data.data;
      console.log(response.data, "contract identity response ");
      localStorage.setItem("contractIdentity", response?.contractIdentity);
      setData(response);
      const d = JSON.parse(response?.data);
      console.log(d,'d')
      const filterData = d?.filter((item,idx)=>{
        if(item.value == 3){
          return item
        }
      })

      setDynamicValues(filterData);
    } catch (err) {
      console.log(err);
    }
  }

   console.log(dynamicValues,'dynamic values');

  useEffect(() => {
    console.log(id.userId, "htttt");
    getAvatar();
  }, []);

  async function contractIdentity(e) {
    e.preventDefault();
    setLoading(true);
    console.log(e.target.value, "id");
    console.log(data?.dynamicValue);
    const contract = e.target.value;
    router.push({
      pathname: "/payment/modal/" + contract,

      query: { parameters: `${JSON.stringify(newValues)}`, price:dynamicPrice },
    });
  }

  async function setValueFn({ e, item }) {
    // e.preventDefault();
    console.log(e, "eeeeeeeeeeee");
    const updateValues = [...newValues];

    updateValues[item.id] = { item, value: e.target.value };

    setNewValues(updateValues);
  }

  console.log(newValues);
  return (
    <div id="NFTDashboard-inner">
      <div className="new-dashboard">
        <section
          className="profile-sec profile-sects"
          id="nftDashboard-profile-sec"
        >
          <div className="container-fluid">
            <div className="row">
              {/* <SideBar/> */}
              <form className="funds-sec">
                <ToastContainer />

                <div className="col-head p-0" id="col-head">
                  <Link href="/contract/collection">
                    <div className="nft-btnsec pb-5 " id="nftDashboard-btnSec">
                      <button
                        style={{ background: "white", color: "black" }}
                        className="btn back-nftbtn "
                        type="button"
                      >
                        Back to collection
                      </button>{" "}
                    </div>
                  </Link>
                  <h3 className="nft-text">Your Collection</h3>
                  <div class="alert alert-light" id="alert-light" role="alert">
                    <h6 style={{ color: "black" }}>
                      {" "}
                      Your NFTpay integration is in review.
                    </h6>
                    <p className="mb-0" style={{ color: "black" }}>
                      We are reviewing your contract and will email you with an
                      update within 24 hours.
                    </p>
                  </div>

                  <Tabs
                    eventKey="Wallet"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab
                      eventKey="HOW TO USE NFTPAY"
                      className="btn-ajayaar nav-link active"
                      title="HOW TO USE NFTPAY"
                      style={{ height: "50px" }}
                    >
                      {/* <TokenPage/> */}
                      <div className="nftDashboard-tabhead">
                        <div className="nftDashboard-tab pt-0">
                          <h4>{data?.contractName || "Undefined"} contract</h4>

                          {dynamicValues?.map((item, idx) => {
                            // if(item.value == 3){
                            return (
                              <>
                                <div key={idx} className="dynamic--div">
                                  <span>{item.name}</span>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setValueFn({item,e})
                                    }
                                    placeholder="set Dynamic Value"
                                  />
                                </div>
                              </>
                            );
                            // }
                          })}

                          {!data?.nftPrice ? (
                            <div className="dynamic--div">
                              <span>Price</span>
                              <input
                                type="text"
                                onChange={(e) =>
                                  setDynamicPrice(e.target.value)
                                }
                                placeholder="set Dynamic Value"
                              />
                            </div>
                          ) : null}

                          <div className="nft-btnsec pt-0 pb-4 mt-2">
                            <button
                              className="btn back-nftbtn"
                              id="dashboardtab-buttons"
                              value={data?.contractIdentity}
                              onClick={(e) => contractIdentity(e)}
                              type="button"
                            >
                              {loading ? "Loading..." : "Load The NFTpay form"}
                            </button>
                          </div>
                        </div>

                        <div class="description">
                          {/* <!-- price  --> */}
                          <div id="price_read" class="property">
                            <div class="prompt">Price of one NFT</div>
                            <div class="value">
                              {data?.nftPrice} MATIC &nbsp;{" "}
                              <a
                                onclick="edit_contract_price()"
                                class="link under"
                              >
                                {/* change price */}
                              </a>
                            </div>
                          </div>

                          <div class="property">
                            <div class="prompt">Max per transaction</div>
                            <div class="value">{data?.maxPerMint}</div>
                          </div>
                          <div class="property">
                            <div class="prompt">Network</div>
                            <div class="value">{data?.network} Test Mumbai</div>
                          </div>
                          <div class="property">
                            <div class="prompt">Address</div>
                            <div class="value">{data?.smartContract}</div>
                          </div>
                          <div class="property">
                            <div class="prompt">Contract identifier</div>
                            <div class="value">{data?.contractIdentity}</div>
                          </div>
                          <div class="property">
                            <div class="prompt">Explorer</div>
                            <div class="value">
                              <a
                                target="_blank"
                                rel="no-reference"
                                href={data?.explorer}
                              >
                                explorer link
                                {/* <img src="/img/icons/launch.svg" /> */}
                              </a>
                            </div>
                          </div>
                          <div class="property">
                            <div class="prompt">Minting function name</div>
                            <div class="value">{data?.selectedFunction}</div>
                          </div>
                          <br />

                          <h2>How to add NFTpay to your website</h2>

                          <div class="standard">
                            There are 2 ways to add the NFTpay payment form to
                            your website. Both options involve copy-pasting some
                            code directly onto a webpage on your site.
                            <b>Select and use just one option below.</b>
                            <br />
                            <br />
                          </div>

                          <div
                            id="warn_contract_includes_dynamic_parms"
                            class="errorbox hidden"
                          >
                            This collection includes{" "}
                            <span
                              id="infobox_contract_name1"
                              class="infobox_key"
                            >
                              dynamic values
                            </span>{" "}
                            which you must modify at runtime.
                          </div>
                          <br />

                          <div class="contract_subhead">
                            Option 1: Embeddable credit card form code
                          </div>
                          <div class="standard">
                            <b>Option 1</b> provides an injected script which
                            adds a 'Buy with Card' button and displays the
                            payment form in a popup. This option may not always
                            work with third-party website building platforms.
                          </div>
                          <br />
                          <div>
                            Copy this code into your web page. You must replace
                            any{" "}
                            <span class="embedded_parm_val">
                              dynamic variables
                            </span>{" "}
                            at runtime.
                          </div>

                          <div id="embedded_code_div" class="embedded_code">
                            &lt;!-- VOXI on Polygon Test Mumbai --&gt; <br />
                            &lt;link rel="stylesheet" type="text/css"
                            href="https://sandbox.nftpay.xyz/css/iframe_inject.css"
                            /&gt;
                            <br />
                            &lt;script id="creatify_script"
                            src="https://sandbox.nftpay.xyz/libs/iframe_inject.js?contract_uuid=5d30068d-6ab1-4e0f-8cdf-c055a2a9deaf"&gt;&lt;/script&gt;{" "}
                            <br />
                            <br />
                            &lt;button onclick="show_creatify_popup()"&gt;Buy
                            with card&lt;
                          </div>
                          <br />

                          <button
                            id="copy_to_clipboard_script_button"
                            onclick="copy_to_clipboard(this, 'embedded_code_textarea')"
                            class="tertiary compact pad"
                            style={{ backgroundColor: "white", color: "black" }}
                          >
                            Copy
                          </button>
                          <br />
                          <br />
                          <br />

                          <div class="contract_subhead">
                            Option 2: Embeddable iFrame
                          </div>
                          <div class="standard">
                            <b>Option 2</b> provides an iframe that displays the
                            pay form. This option requires you to decide how and
                            when to display it but works with almost all
                            third-party website building platforms.
                          </div>
                          <br />
                          <div>
                            Copy this iframe into your web page. You must
                            replace any{" "}
                            <span class="embedded_parm_val">
                              dynamic variables
                            </span>{" "}
                            at runtime.
                          </div>
                          <textarea
                            rows="2"
                            id="embedded_iframe_textarea"
                            class="hidden"
                          ></textarea>
                          <div id="embedded_iframe_div" class="embedded_code">
                            &lt;!-- iframe version --&gt; <br />
                            &lt;iframe height="550" style="border:none"
                            src="https://sandbox.nftpay.xyz/iframe/iframe_pay/5d30068d-6ab1-4e0f-8cdf-c055a2a9deaf?"&gt;&lt;/iframe&gt;
                          </div>
                          <br />

                          <button
                            id="copy_to_clipboard_iframe_button"
                            onclick="copy_to_clipboard(this, 'embedded_iframe_textarea')"
                            class="tertiary compact pad"
                            style={{ backgroundColor: "white", color: "black" }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="YOUR SALES"
                      className="btn-ajayaar"
                      title="YOUR SALES"
                      style={{ height: "50px" }}
                    >
                      <div className="nftDashboard-tabhead">
                        <h2>Your NFTpay sales</h2>

                        <div
                          id="datatable_transactions_wrapper"
                          class="dataTables_wrapper no-footer"
                        >
                          <div
                            id="datatable_transactions_filter"
                            class="dataTables_filter"
                          >
                            <label>
                              Search:
                              <input
                                type="search"
                                class=""
                                placeholder=""
                                aria-controls="datatable_transactions"
                              />
                            </label>
                          </div>
                          <table
                            id="datatable_transactions"
                            class="admin_table dataTable no-footer"
                            role="grid"
                            aria-describedby="datatable_transactions_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Transaction UUID: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Transaction UUID
                                </th>
                                <th
                                  class="sorting_desc"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-sort="descending"
                                  aria-label="Timestamp: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Timestamp
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Hash: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Hash
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Status: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Status
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="datatable_transactions"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Status: activate to sort column ascending"
                                  style={{ width: "0px" }}
                                >
                                  Partner querystring
                                </th>
                              </tr>
                            </thead>
                            <tbody id="datarows_transactions">
                              <tr class="odd">
                                <td
                                  valign="top"
                                  colspan="5"
                                  class="dataTables_empty"
                                >
                                  No data available
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div
                            class="dataTables_info"
                            id="datatable_transactions_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing 0 to 0 of 0 entries
                          </div>
                          <div
                            class="dataTables_paginate paging_simple_numbers"
                            id="datatable_transactions_paginate"
                          >
                            <a
                              class="paginate_button previous disabled"
                              aria-controls="datatable_transactions"
                              data-dt-idx="0"
                              tabindex="0"
                              id="datatable_transactions_previous"
                            >
                              Previous
                            </a>
                            <span></span>
                            <a
                              class="paginate_button next disabled"
                              aria-controls="datatable_transactions"
                              data-dt-idx="1"
                              tabindex="0"
                              id="datatable_transactions_next"
                            >
                              Next
                            </a>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="TECH SUPPORT"
                      style={{ height: "50px" }}
                      title="TECH SUPPORT"
                    >
                      {/* <Sonnet /> */}
                      {/* <div className="nft-btnsec pt-0 pb-4 mt-2">
                        <button
                          className="btn back-nftbtn"
                          id="dashboardtab-buttons"
                          type="button"
                        >
                          Load The NFTpay form
                        </button>
                      </div> */}
                      <div className="nft-btnsec pt-0 pb-4 mt-2">
                        <button
                          className="btn back-nftbtn"
                          id="dashboardtab-buttons"
                          value={data?.contractIdentity}
                          onClick={(e) => contractIdentity(e)}
                          type="button"
                        >
                          Load The NFTpay form
                        </button>
                      </div>
                    </Tab>
                  </Tabs>
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
      {/* <Modal props={data?.contractIdentity}/> */}
    </div>
  );
};

export default BuyNft;
