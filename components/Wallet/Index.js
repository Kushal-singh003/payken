import axios from "axios";
import React, { useState, useEffect } from "react";
import supabase from "../Utils/SupabaseClient";
import { withToken } from "../Utils/Functions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Wallet() {
  const [address, setAddress] = useState();
  const [coinsData, setCoinsData] = useState();
  const [lengthOfData, setLengthOfData] = useState(null);
  const [open, setOpen] = useState(false);

  async function getAddress(token) {
    try {
      const response = await withToken({ token: token, query: "getprofile" });
      console.log(response, "address");
      setAddress(response.data.data[0].address);

      const response2 = await axios.get(
        `https://api.covalenthq.com/v1/80001/address/${response?.data?.data[0]?.address}/balances_v2/?key=ckey_1da37247acc240e6aaace13ffcc`
      );
      console.log(response2, "response2");
      setCoinsData(response2?.data?.data?.items);
      setLengthOfData(response2?.data?.data?.items?.length);
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

    getAddress(session?.access_token);
  }

  useEffect(() => {
    setOpen(true);
    getSession();
  }, []);
  return (
    <div>
      <section className="Wallet">
        <Backdrop
          sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="container">
          <h2>Wallet</h2>
          <div className="wallet-table">
            <table className="table table-striped-columns">
              <thead>
                <tr className="wallethead-stripped">
                  <th scope="col">Wallet Activity</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  {/* <th scope="col"></th> */}
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {coinsData?.map((item, idx) => {
                  return (
                    <>
                      <tr key={idx} className="wallet-stripped">
                        <th>
                          <img
                            className="transaction-img"
                            src={item?.logo_url}
                            alt=""
                          />
                        </th>
                        <td>
                          <div className="wallet-data">
                            <span>Token</span>
                            <span>
                              <strong>{item.contract_ticker_symbol}</strong>
                            </span>
                          </div>
                        </td>
                        <td className="mnbvfrr">
                          <div className="wallet-data">
                            <span>Amount</span>
                            <span>
                              <strong>
                                {item.balance /
                                  Math.pow(10, item.contract_decimals)}
                              </strong>
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
                            <span>contract address</span>
                            <span>
                              <strong>{item?.contract_address}</strong>
                            </span>
                          </div>
                        </td>
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
            {lengthOfData == null || lengthOfData == 0 ? (
              <div className="not-found">
                <span>Not Found</span>
              </div>
            ) : null}
            <div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
