import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useRef }from "react-bootstrap";
import supabase from "../../utils/SupabaseClient";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const SuccessPage = () => {
  const router = useRouter();
  const [id, setId] = useState();
  const [data, setData] =useState();
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const [open, setOpen] = React.useState(false);

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
    const access_token = session?.access_token

    updateTransaction(access_token)
    // getNftFinalData(access_token)
  }

  useEffect(() => {
    setOpen(true)
    getToken();
  }, [router.query]);

  async function updateTransaction(access_token){
    const data = {
      clientSecret:router.query.payment_intent,
    }
    try{
      let res = await axios.post("/api/updateTransaction", { token: access_token, data: data })
      const response = res.data;
      console.log(response,"update trasactiion")
      setData(response.data.data.data)
      setOpen(false)
    }catch(err){
      console.log(err)
      toast.error('Trasaction Failed !Please try again')
      setOpen(false)
      return
    }
  }

  
 

  async function getNftFinalData(access_token){
    try {
      let res = await axios.post("/api/getNftFinalData",{token:access_token})
      const response = res.data;
      console.log(response.data,"to get the final of Purchased Nft")
      setData(response.data)
    }catch(err) {
      console.log(err)
    }
  }


  return (
    <div id="Success-inner">
      <Backdrop  open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    <ToastContainer/>
      {data?.map((item, idx) => {
        return (
          <div className="successPage">
            <div className="column1">
              <div>
                <img
                 
                  className='nft-img'
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
                <h4 className="successPage-head ">
                  SuperDope is a demo NFT project by NFTpay.xyz.
                </h4>
                <span className="nft-details">DETAILS</span>
              </div>
              <hr />
              <div>
                
                <ul className="listItems">
                  <li className="list-li"><span className="span1-li">Token Id</span><span className="span-li">test@yopmail.com</span> </li>
                  <li className="list-li"><span className="span1-li">BlockChain</span><span className="span-li">Ethereum Goerli</span> </li>
                  <li className="list-li"><span className="span1-li">Metadata</span><span className="span-li"> View metadata </span> </li>
                  <li className="list-li"><span className="span1-li">Tx hash</span><span className="span-li"> 0x48...7370 </span> </li>
                  <li className="list-li"><span className="span1-li">Contract</span><span className="span-li"> 0x8DfBca683b15924116c8eAcc25A212e2eeDA6ef3 </span> </li>
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
