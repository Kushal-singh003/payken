import axios from "axios";
import React, { useState, useEffect } from "react";
import supabase from "../Utils/SupabaseClient";
import { withToken } from "../Utils/Functions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal } from "@nextui-org/react";
import { MerchantApi } from "../Utils/Functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Wallet() {
  const [address, setAddress] = useState();
  const [coinsData, setCoinsData] = useState();
  const [lengthOfData, setLengthOfData] = useState(null);
  const [open, setOpen] = useState(false);
  const [visible,setVisible] = useState(false);
  const [price,setPrice] = useState();
  const [wallet,setWallet] = useState();
  const [tokenData,setTokenData] = useState();
  const [loading,setLoading] = useState();
  const [errMsg,setErrMsg] = useState(false);
  const [errMsg2,setErrMsg2] = useState(null);
  const [successMsg,setSuccessMsg] = useState(null);

  async function getAddress(token) {
    try {
      const response = await withToken({ token: token, query: "getprofile" });
      console.log(response, "address");
      setAddress(response.data.data[0].address);

      const response2 = await axios.get(
        `https://api.covalenthq.com/v1/80001/address/${response?.data?.data[0]?.address}/balances_v2/?key=ckey_85b75af419dc4631b51d2de859f`
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
    setTokenData(session?.access_token)
    getAddress(session?.access_token);
  }

  useEffect(() => {
    setOpen(true);
    getSession();
  }, []);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  function handleModalFn(e){
    setVisible(true)

  }

  async function withdrawFn(e){
    e.preventDefault();
    setLoading(true)
    setErrMsg2(null)
    setSuccessMsg(null)

    if(!price || !wallet){
      setErrMsg(true)
      setLoading(false)
      return
    }

    const data = {
      address:wallet,
      price:price,
    }
    const response = await MerchantApi({data:data,token:tokenData,query:'sendmatic'});
    setLoading(false)

    if(response.Error){
      setErrMsg2(response?.Error?.error?.message?.reason)
    }

    if(!response.Error){
      setSuccessMsg(response?.data?.message)

      setTimeout(()=>{
        setSuccessMsg(null)
        setVisible(false)
      },[1000])
    }

    console.log(response,'withdraw response')
  }

  return (
    <div>
      <section className="Wallet">
        <ToastContainer/>
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
                                {parseFloat(item.balance /
                                  Math.pow(10, item.contract_decimals)).toFixed(3)}
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

                        <td>
                          <div className="wallet-data">
                            <span>
                              <button onClick={(e)=>handleModalFn(e)} >Withdraw</button>
                            </span>
                          </div>
                        </td>

                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>

            <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Body>
              <div className="withdraw-pop">
                <form className="withdraw-form" onSubmit={withdrawFn}  >
                  <h2 className="withdraw-text">Withdraw</h2>
                  <div className="inputFields">
                <input className="withdraw-input" placeholder="Wallet address" onChange={(e)=> setWallet(e.target.value)}  />
                <input className="withdraw-amount" step={"0.001"} type='number' placeholder="Amount" onChange={(e)=> setPrice(e.target.value)} />
                {errMsg && <span style={{color:'red',textAlign:'center'}}>*Please provide all credential</span>}
                {errMsg2 && <span style={{color:'red',textAlign:'center'}}>{errMsg2}</span>}
                {successMsg && <span style={{color:'green',textAlign:'center'}}>{successMsg}</span>}

                </div>
                <button type="submit" disabled={loading} className="withdraw-btn">{loading ? 'Loading...' : 'Withdraw' }</button>
                </form>

               
              </div>
            </Modal.Body>
          </Modal>
            
			  {lengthOfData == 0 ? <div className="not-found">
				<span>Not found</span>
			  </div>
			  : null}

			  {lengthOfData == null ? <div className="loading-div">
				<span></span>
			  </div>:null}
          </div>
        </div>
      </section>
    </div>
  );
}
