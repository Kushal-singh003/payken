import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { withToken } from "../Utils/Functions";
import supabase from "../Utils/SupabaseClient";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import dynamic from "next/dynamic";


export default function SendReceive() {
  const [address, setAddress] = useState();
  const [open, setOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState();
  const [lengthOfData,setLengthOfData] = useState(null);

  async function getAddress(token) {
    try {
      const response = await withToken({ token: token, query: "getprofile" });
      console.log(response, "address");
      setAddress(response.data.data[0].address);

      const response2 = await axios.get(
        `https://api.covalenthq.com/v1/80001/address/${response?.data?.data[0]?.address}/transactions_v2/?key=ckey_85b75af419dc4631b51d2de859f`
      );
      setTransactionHistory(response2?.data?.data?.items);
      setLengthOfData(response2?.data?.data?.items?.length);
      console.log(response2, "response2");
      setOpen(false);
    } catch (error) {
      setOpen(false);
      console.log(error);
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

  function copyTextFn(e) {
    e.preventDefault();
    // navigator.clipboard.writeText(address);

    const textArea = document.createElement("textarea");
    textArea.value = address;
    document.body.appendChild(textArea);
    // textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);

    setShowText(true);

    setTimeout(() => {
      setShowText(false);
    }, [1000]);
  }


  return (
    <div className="send-recieve">
      <div className="qr-code">
      <Backdrop
        sx={{ color: "green", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <div className="qr-container">
          <QRCode size={250} style={{border:'1px solid'}} value={address} />

          <div className="copy-address">
            <span className="qr-text"> {address}</span>
            <img  className="copy-icon" onClick={copyTextFn} src="/img/copy.png" />
            {showText ? <p style={{color:'green'}}>Text Copied!</p> : null}
          </div>
        </div>
      </div>

      <div className="wallet-table">
        <table className="table table-striped-columns">
          <thead>
            <tr className="wallethead-stripped">
              <th scope="col">Wallet Activity</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">From Address</th>
              <th scope="col">To Address</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory?.map((item, idx) => {
              return (
                <>
                  <tr className="wallet-stripped">
                    <th>
                      <img
                        className="transaction-img"
                        src={item?.log_events[0]?.sender_logo_url}
                        alt=""
                      />
                    </th>
                    <td>
                      <div className="wallet-data">
                        <span>{parseFloat(item.value / Math.pow(10, 18)).toFixed(3)}</span>
                      </div>
                    </td>
                    <td className="mnbvfrr">
                      <div className="wallet-data">
                        <span
                          style={{
                            color: item.successful == true ? "green" : "red",
                            fontWeight: "600",
                          }}
                        >
                          {item.successful == true ? "Successful" : "Failed"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="wallet-data">
                        <span>{item.from_address}</span>
                      </div>
                    </td>
                    <td>
                      <div className="wallet-data">
                        <span>{item.to_address}</span>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
         
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
    </div>
  );
}
