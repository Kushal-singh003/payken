import React, { useState } from 'react'
import { withAuth } from '@/components/Utils/Functions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      console.log(response.data.data.cId, 'response')
      setCustomer(response?.data?.data?.cId)
      localStorage.setItem('buyerEmail', email)
      setFormData({ ...formData, email: email })
      setLoading(false)
      setShow0(false)
      setShow1(true)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error('Something went wrong! Please try again')
    }
  }



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
