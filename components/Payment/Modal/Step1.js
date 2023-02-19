import React, { useState,useEffect } from 'react'
import { withAuth } from '@/components/Utils/Functions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from '@/components/Utils/SupabaseClient';
const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);

export default function Step1({ setShow1, setShow0, setFormData, setCustomer, formData }) {

  const [email, setEmail] = useState();
  const [loading,setLoading] = useState(false);


  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true)
    console.log(email, 'email')

    try {
      const response = await withAuth({ data: { email: email }, query: 'registerwithemail' })
      const cusId = response?.data?.data?.cId;
      console.log(cusId, 'cusId')
      setCustomer(cusId)
      setFormData({ ...formData, email: email })

      if(cusId){
        const cus = await stripe.customers.retrieve(
          cusId
        );


      console.log(cus,'customer dtls');
      setFormData({...formData,address:cus?.address?.line1,city:cus?.address?.city,state:cus?.address?.state,country:cus?.address?.country,name:cus?.name})
      }


      localStorage.setItem('buyerEmail', email)
      setLoading(false)
      setShow0(false)
      setShow1(true)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error('Something went wrong! Please try again')
    }
  }

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(
      session,
      'session'
    );

    setEmail(session?.user?.email)
  }

  useEffect(() => {
    getSession();
  }, [])



  return (
    <div>
      <div className="debit-card">
        <ToastContainer />
        <h3>Email Verification</h3> 
       
        <form onSubmit={submitHandler}>
          <div className="mb-3">

            <div className="mb-3">
              <input
                type="email"
                className="form-control debit__input"
                placeholder="email"
                required
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}

              />
            </div>
          </div>

          <button disabled={loading} type='submit' className="card-continue">{loading ? 'Loading...' : 'Continue' }</button>
        </form>
      </div>
    </div>
  )
}
