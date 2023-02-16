import React, { useState } from 'react'
import { withAuth } from '@/components/Utils/Functions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);

export default function CustomerCheck({setShow1,setShow0,setFormData,setCustomer,formData}) {
//   const [formData,setFormData] = useState({
//     name:'',
//     email:'',
//     address:'',
//     city:'',
//     state:'',
//     country:''
//   });
const [email,setEmail] = useState();


 async function submitHandler(e){
    e.preventDefault();
    console.log(email,'email')


   
try {
  const response = await withAuth({data:{email:email},query:'registerwithemail'})
  console.log(response.data.data.cId,'response')
  setCustomer(response?.data?.data?.cId)
  localStorage.setItem('buyerEmail',email)
  setFormData({...formData,email:email})
  if(response.data?.data?.data?.user != null){
  setFormData({...formData,name:'',address:'helo',city:'hello',state:'hi',country:'fd'})}
  setShow0(false)
  setShow1(true)  

} catch (error) {
  console.log(error);
  toast.error('Something went wrong! Please try again')
}



  }



  return (
    <div>
      <div className="debit-card">
        <ToastContainer/>
                        <h3>Payment-info</h3>
                        <form onSubmit={submitHandler}>
                          <div className="mb-3">
                           
                          <div className="mb-3">
                            <input
                              type="email"
                              className="form-control debit__input"
                              placeholder="email"
                              onChange={(e)=> setEmail(e.target.value)}

                            />
                          </div>
                        </div>
                  
                          <button type='submit' className="card-continue">Continue</button>
                        </form>
                      </div>
    </div>
  )
}
