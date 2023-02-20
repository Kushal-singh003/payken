import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useRouter } from "next/router";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { withAuth } from "@/components/Utils/Functions";


const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);


export default function Step5() {
 const [show,setShow] = useState(false);
 const [email,setEmail] = useState();
 const [open,setOpen] = useState(false)
 const [errMsg,setErrMsg] = useState(false);
//  const [data,setData] = useState();
 const router = useRouter();


 useEffect(() => {
   setOpen(true)
   setShow(true)
   setEmail(localStorage.getItem('buyerEmail'))

   updateTransaction()
   card()
 }, [router.query]);



 async function updateTransaction(){
   const data = {
     clientSecret:router.query.payment_intent,
     email
   }
   try{
     let response = await withAuth({data:data,query:'updatetransaction'})
     

     if(response?.Error){
      setErrMsg(true)
     }
    setOpen(false)
   }catch(err){
     
     setErrMsg(true)
     setOpen(false)
     return
   }
 }


 async function card(){
 const cid = localStorage.getItem('cid')
  const paymentMethods = await stripe.paymentMethods.list({
    customer: `${cid}`,
    type: 'card',
  });


 }

 function backFn(e){
  e.preventDefault();
  
  router.back();
 }
 
  return (
    <div>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

<section className="not-imp">
        <div className="container">
      {open ? null :    
      <Modal show={show} aria-labelledby="contained-modal-title-vcenter"
 centered >
              <div className="modal-content">
              <i onClick={backFn} class="bi bi-x cross"></i>
                {!errMsg ? 
                <div className="modal-body" id="purchasenft-body">
                  <div className="purchasenft-head">
                    <img src="/img/Mask Group -1.png" alt="" />
                  </div>
                  <h2>Congratulations on your purchase!</h2>
                  <h6>Your NFT is ready!</h6>
                  <div className="some-text">
                    <p>Your receipt was sent to:</p>
                    <p>{email}</p>
                  </div>
                  <button className="view">View your NFT now</button>
                </div>
              :
                <div className="Failed-modal">
                  <img className="failed-img" src="/img/Failed.png"/>
                <h2>Transaction Failed! Please try again later</h2>

                </div>
              }
           
            </div>
             
      </Modal>
      }
      </div>
      </section>

      
    </div>
  );
}
