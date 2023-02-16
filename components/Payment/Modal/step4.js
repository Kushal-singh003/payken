import React, { useEffect, useState } from "react";
import $ from "jquery";
import Modal from 'react-bootstrap/Modal';
import { useRouter } from "next/router";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withAuth } from "@/components/Utils/Functions";
import supabase from "@/components/Utils/SupabaseClient";

const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);


export default function Step4() {
 const [show,setShow] = useState(false);
 const [email,setEmail] = useState();
 const [open,setOpen] = useState(false)
//  const [data,setData] = useState();
 const router = useRouter();


 async function getSession() {
   const {
     data: { session },
   } = await supabase.auth.getSession();
   console.log(
     session,
     "to get the session from supabase to upload the Avatar"
   );

   updateTransaction(session?.access_token)
   
 }

 useEffect(() => {
   setOpen(true)
   setShow(true)
   setEmail(localStorage.getItem('buyerEmail'))
   getSession();
 }, [router.query]);

 async function updateTransaction(){
   const data = {
     clientSecret:router.query.payment_intent,
     email
   }
   try{
     let response = await withAuth({data:data,query:'updatetransaction'})
     console.log(response,"zettaaaaaaaaaaaaaaaaaaa")
    //  setData(response.data.data.data)
    setOpen(false)
   }catch(err){
     console.log(err)
     toast.error('Trasaction Failed !Please try again')
     setOpen(false)
     return
   }
 }



 useEffect(()=>{  
  card()
 },[])


 async function card(){
 const cid = localStorage.getItem('cid')
  const paymentMethods = await stripe.paymentMethods.list({
    customer: `${cid}`,
    type: 'card',
  });

console.log(paymentMethods)
 }
 
  return (
    <div>
      <Backdrop  open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer/>
<section className="not-imp">
        <div className="container">
      <Modal show={show} aria-labelledby="contained-modal-title-vcenter"
 centered >
              <div className="modal-content">
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
           
            </div>
             
      </Modal>
      </div>
      </section>


      
    </div>
  );
}
