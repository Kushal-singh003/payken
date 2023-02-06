import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useRef }from "react-bootstrap";
import supabase from "../../utils/SupabaseClient";

const SuccessPage = () => {
  const router = useRouter();
  const [id, setId] = useState();
  const [data, setData] =useState();
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  console.log(router.query,'query')
  async function getToken() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      "to get the session from supabase to upload the Avatar"
    );
    console.log(session?.user?.id, "to get the id from session")
    setId(session?.user?.id)
    setEmail(session?.user?.email)
    setToken(session?.access_token)

    // getNftFinalData({ token: session?.access_token })
    // formSubmitHandler({token:session?.access_token})
  }

  useEffect(() => {
    getNftFinalData();
    getToken();
    formSubmitHandler();
  }, [router.query]);

  async function updateTransaction(data){
    try{
      let res = await axios.post("/api/updateTransaction", { token: token, data: data })
      const response = res.data;
      console.log(response,"update trasactiion")
    }catch(err){
      console.log(err)
    }
  }

  async function formSubmitHandler(){
    // event.preventDefault();

    const data = {
      // userId:id,
      clientSecret:router.query.payment_intent,
    }

    console.log(data,"hey query data")

    updateTransaction(data);
  }

  async function getNftFinalData(){
    try {
      let res = await axios.post("/api/getNftFinalData",{token:token})
      const response = res.data;
      console.log(response.data,"to get the final of Purchased Nft")
      setData(response.data)
    }catch(err) {
      console.log(err)
    }
  }


  return (
    <div id="Success-inner">
      {data?.map((item, idx) => {
        return (
          <div className="successPage">
            <div className="column1">
              <div>
                <img
                  style={{
                    widht: "340px",
                    height: "340px",
                    borderRadius: "10px",
                  }}
                  src="/sadMonkey.png"
                />
              </div>
            </div>
            <div className="column2">
              <div className="successPage-heading--div">
                <h3 className="successPage-heading">Payken{id + 1}</h3>
                <p className="successPage-heading---content">Payken</p>
              </div>
              <hr />
              <div>
                <h4 className="successPage-heading--div">
                  SuperDope is a demo NFT project by NFTpay.xyz.
                </h4>
              </div>
              <hr />
              <div>
                <h4>DETAILS:-</h4>
                <ul className="listItems">
                  <li>Email-Id:-cmaurya477@gmail.com </li>
                  <li>Contract Name:-Chandra </li>
                  <li>Contract Address:-fgshkkkkkkkkkkkkkshsgs3547 </li>
                  <li>Contract-Id:-ncnnnnnnnnnnn,sjfjjdj </li>
                  <li>Amount:-30998</li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
     

    </div>
  );
};

export default SuccessPage;
