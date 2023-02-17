import React, { useEffect, useState } from 'react'
import { withAuth } from '@/components/Utils/Functions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const stripe = require("stripe")(
  "sk_test_51MYlX2JhZEv5n0fUZylGp229UUoT4iXdCCnjzUOhXr8r6uxhLG4GwpI9hQOnkSAIDrpzshq5jP0aQhbEibRrXGmq004SyTiGYl"
);



export default function Step2({ setShow1, setShow2, formData, setFormData, setCustomer, customer }) {
const [loading,setLoading] = useState(false)

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true)
    console.log(formData);
    let createCid;
    localStorage.setItem('cardHolder', JSON.stringify(formData))
    console.log(customer, 'cus');
    if (customer == null || customer == 'undedined') {
      const cid = await stripe.customers.create({
        address: {
          city: formData?.city,
          state: formData?.state,
          country: formData?.country,
          line1: formData?.address,
        },
        email: formData?.email,
        name: formData?.name,
      });
      console.log(cid);
      createCid = cid?.id
      setCustomer(createCid)
    }

    localStorage.setItem('cid', customer || createCid)

    if (customer == null || customer == 'undedined') {
      try {
        const response = await withAuth({ data: { email: formData?.email, cId: createCid }, query: 'updatecid' })
        console.log(response, 'response')
        setLoading(false)
        setShow1(false)
        setShow2(true)
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong! Please try again')
      }
    } else {
      setLoading(false)
      setShow1(false)
      setShow2(true)
    }

  }



  return (
    <div>
      <div className="debit-card">
        <ToastContainer />
        <h3>Address Details</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              type="text"
              required
              className="form-control debit__input"
              placeholder="name"
              defaultValue={formData?.name || null}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        
          <div className="mb-3">
            <input
              type="text"
              required
              className="form-control creditt-input"
              placeholder="Your Address"
              defaultValue={formData?.address || null}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}

            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              required
              className="form-control  creditt-input"
              placeholder="City"
              defaultValue={formData?.city || null}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}

            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              required
              className="form-control  creditt-input"
              placeholder="State"
              defaultValue={formData?.state || null}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}

            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              required
              className="form-control  creditt-input"
              placeholder="Country"
              defaultValue={formData?.country || null}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}

            />
          </div>
          <button disabled={loading} type='submit' className="card-continue"> {loading ? 'Loading...': 'Continue' }</button>
        </form>
      </div>
    </div>
  )
}
