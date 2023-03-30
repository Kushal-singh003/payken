import axios from "axios";
import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { withToken } from "@/components/Utils/Functions";
import { MerchantApi } from "@/components/Utils/Functions";
import supabase from "@/components/Utils/SupabaseClient";
import { useRouter } from "next/router";

export default function TransactionHistory() {
  const [coinsData, setCoinsData] = useState();
  const [purchasesData, setPurchasesData] = useState();
  const [lengthOfData, setLengthOfData] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function getPurchases(token) {
    try {
      const response = await MerchantApi({
        token: token,
        query: "getdirectpayment",
      });
      console.log(response, "address");
      setPurchasesData(response?.data?.data);
      setLengthOfData(response?.data?.data?.length);

      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  }

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log(session, "session");

    getPurchases(session?.access_token);
  }

  useEffect(() => {
    setOpen(true);
    getSession();
  }, []);

  function nextFn({ e, id }) {
    e.preventDefault();

    router.push("/dashboard/listedProducts/productDetails/" + id);
  }

  return (
    <div>
      <section className="Wallet Transaction-History" id="transactionHistory">
        <Backdrop
          sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* <div className="container" id="trasactionTab"> */}
          {/* <h2 className="purchase-h2">Purcahses</h2> */}
          <div className="wallet-table" id="walletTable">
            <table className="table table-striped-columns">
              <thead>
                <tr className="wallethead-stripped">
                  <th scope="col">
                    <span className="spanD">#</span>
                  </th>
                  <th scope="col">user id</th>
                  <th scope="col">Price</th>
                  <th scope="col">status</th>
                  {/* <th scope="col"></th> */}
                </tr>
              </thead>
              <tbody>
                {purchasesData?.map((item, idx) => {
                  return (
                    <>
                      <tr key={idx} className="wallet-stripped">
                        <th>
                          {/* <img
                            className="transaction-img"
                            src={item?.image}
                            alt=""
                          /> */}
                             <div className="wallet-data">
                            <span>
                              <strong>{idx+1}</strong>
                            </span>
                          </div>
                        </th>
                        <td>
                          <div className="wallet-data">
                            {/* <span>Token</span> */}
                            <span>
                              <strong>{item?.userId}</strong>
                            </span>
                          </div>
                        </td>
                        <td className="mnbvfrr">
                          <div className="wallet-data">
                            {/* <span>Amount</span> */}
                            <span>
                              <strong>{item.amount}</strong>
                            </span>
                          </div>
                        </td>
                        {/* <td>
                    <div className="wallet-data">
                      <span>Referral Link</span>
                      <span>
                        <strong>--</strong>
                      </span>
                    </div>
                  </td> */}
                        <td>
                          <div className="wallet-data">
                            <span>
                              <strong>Successful</strong>
                            </span>
                          </div>
                        </td>

                        {/* <td>
                          <div className="wallet-data">
                            <button
                              type="button"
                              onClick={(e) => nextFn({ e, id: item.id })}
                            >
                              Details
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    </>
                  );
                })}

                {/* <tr className="wallet-stripped">
                  <th>
                    <img src="/img/crypto.png" alt="" />
                  </th>
                  <td>
                    <div className="wallet-data">
                      <span>Token</span>
                      <span>
                        <strong>0.00</strong>
                      </span>
                    </div>
                  </td>
                  <td className="mnbvfrr">
                    <div className="wallet-data">
                      <span>Price</span>
                      <span>
                        <strong>
                          <img src="/img/ethereum.png" alt="" />
                          0.00
                        </strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>Referral Link</span>
                      <span>
                        <strong>--</strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>contract address</span>
                      <span>
                        <strong>0x784578458542514784</strong>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <img src="/img/bitcoin.png" alt="" />
                  </th>
                  <td>
                    <div className="wallet-data">
                      <span>Token</span>
                      <span>
                        <strong>0.00</strong>
                      </span>
                    </div>
                  </td>
                  <td className="mnbvfrr">
                    <div className="wallet-data">
                      <span>Price</span>
                      <span>
                        <strong>
                          <img src="/img/ethereum.png" alt="" />
                          0.00
                        </strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>Referral Link</span>
                      <span>
                        <strong>--</strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>contract address</span>
                      <span>
                        <strong>0x784578458542514784</strong>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="wallet-stripped">
                  <th>
                    <img src="/img/tron.png" alt="" />
                  </th>
                  <td>
                    <div className="wallet-data">
                      <span>Token</span>
                      <span>
                        <strong>0.00</strong>
                      </span>
                    </div>
                  </td>
                  <td className="mnbvfrr">
                    <div className="wallet-data">
                      <span>Price</span>
                      <span>
                        <strong>
                          <img src="/img/ethereum.png" alt="" />
                          0.00
                        </strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>Referral Link</span>
                      <span>
                        <strong>--</strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>contract address</span>
                      <span>
                        <strong>0x784578458542514784</strong>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <img src="/img/crypto.png" alt="" />
                  </th>
                  <td>
                    <div className="wallet-data">
                      <span>Token</span>
                      <span>
                        <strong>0.00</strong>
                      </span>
                    </div>
                  </td>
                  <td className="mnbvfrr">
                    <div className="wallet-data">
                      <span>Price</span>
                      <span>
                        <strong>
                          <img src="/img/ethereum.png" alt="" />
                          0.00
                        </strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>Referral Link</span>
                      <span>
                        <strong>--</strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>contract address</span>
                      <span>
                        <strong>0x784578458542514784</strong>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="wallet-stripped">
                  <th>
                    <img src="/img/bitcoin.png" alt="" />
                  </th>
                  <td>
                    <div className="wallet-data">
                      <span>Token</span>
                      <span>
                        <strong>0.00</strong>
                      </span>
                    </div>
                  </td>
                  <td className="mnbvfrr">
                    <div className="wallet-data">
                      <span>Price</span>
                      <span>
                        <strong>
                          <img src="/img/ethereum.png" alt="" />
                          0.00
                        </strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>Referral Link</span>
                      <span>
                        <strong>--</strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>contract address</span>
                      <span>
                        <strong>0x784578458542514784</strong>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <img src="/img/tron.png" alt="" />
                  </th>
                  <td>
                    <div className="wallet-data">
                      <span>Token</span>
                      <span>
                        <strong>0.00</strong>
                      </span>
                    </div>
                  </td>
                  <td className="mnbvfrr">
                    <div className="wallet-data">
                      <span>Price</span>
                      <span>
                        <strong>
                          <img src="/img/ethereum.png" alt="" />
                          0.00
                        </strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>Referral Link</span>
                      <span>
                        <strong>--</strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>contract address</span>
                      <span>
                        <strong>0x784578458542514784</strong>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="wallet-stripped">
                  <th>
                    <img src="/img/bitcoin.png" alt="" />
                  </th>
                  <td>
                    <div className="wallet-data">
                      <span>Token</span>
                      <span>
                        <strong>0.00</strong>
                      </span>
                    </div>
                  </td>
                  <td className="mnbvfrr">
                    <div className="wallet-data">
                      <span>Price</span>
                      <span>
                        <strong>
                          <img src="/img/ethereum.png" alt="" />
                          0.00
                        </strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>Referral Link</span>
                      <span>
                        <strong>--</strong>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="wallet-data">
                      <span>contract address</span>
                      <span>
                        <strong>0x784578458542514784</strong>
                      </span>
                    </div>
                  </td>
                </tr> */}
              </tbody>
            </table>
            
			  {lengthOfData == 0 ? <div className="not-found">
				<span>Not found</span>
			  </div>
			  : null}

			  {lengthOfData == null ? <div className="loading-div">
				<span></span>
			  </div>:null}
          </div>
        {/* </div> */}
      </section>
    </div>
  );
}
