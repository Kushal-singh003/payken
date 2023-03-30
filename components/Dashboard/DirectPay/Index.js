import React, { useEffect, useState, useRef } from 'react'
import dynamic from "next/dynamic";
import { Modal } from "@nextui-org/react";
import CurrencyInput from 'react-currency-input-field';
import { toast, ToastContainer } from 'react-toastify';
import supabase from '@/components/Utils/SupabaseClient';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RecentQR from './RecentQR';
import TransactionHistory from './TransactionHistory';


export const DirectPay = () => {
  const [visible, setVisible] = useState(false);
  const [url,setUrl] = useState(null);
  const [tokenData,setTokenData] = useState(null);
  const [amount,setAmount] = useState();
  const [note,setNote] = useState();
  const [loading,setLoading] = useState(false)
  const [errMsg,setErrMsg] = useState(false);
  const [instantAmount,setInstantAmount] = useState(10);
  const inputRef = useRef(null)

  const DynamicQRCode = dynamic(() => import("@/components/Utils/DirectPayQr"), {
    ssr: false,
  });

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "session");
    const token = session?.access_token;
    setTokenData(session?.access_token);
  }

  async function requestFn(e) {
    e.preventDefault()
    setLoading(true)
    setErrMsg(false)

    if(!amount){
      setErrMsg(true)
      setLoading(false)
      return;
    }

    const data = {
      amount: amount,
      note: note || 'test',
      quantity: 1,
  }

  console.log(data,'data')
  let req = await axios.post("/api/create-directPayment-intent",{data:data,token:tokenData});
  console.log(req,'res');
 
  
  if(req?.Error){
    console.log('error')
    setLoading(false)
    toast.error('Failed to genrate payment! Please try again')
  }

  if(!req?.Error){
    setUrl('http://52.9.60.249:3000/dashboard/directPay/pay/'+req?.data?.clientSecret)
    console.log('success')
    setVisible(true)
    setLoading(false)
    // router.push('/dashboard/cartCheckout/completePayment/'+req?.data?.clientSecret)
  }
 
   
  }

  async function instantPaymentFn(e){
      e.preventDefault();

    console.log(e.target.value,'hello')
    setAmount(e.target.value)
  }


  useEffect(() => {
    inputRef.current.focus()
    getSession()
  }, [])

  console.log(amount,note,'amount')

  return (      <section className='direct-pay' id='directPay'>
        <ToastContainer/>
        <div className='container'>
          <div className='directPay-form'>
            <form>
              {/* <div className='amtDiv'> */}
              {/* <h2>$</h2> */}
              {/* <input className='amount' ref={inputRef} defaultValue="$" placeholder='$0' type='number' /> */}
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="$0"
                className='amount'
                allowNegativeValue={false}
                ref={inputRef}
                prefix="$"
                decimalsLimit={2}
                value={amount}
                required
                onValueChange={(value)=> setAmount(value)}
              />
              {errMsg && <span className='error-msg'>*Please enter amount!</span>}
              {/* </div> */}
              <input className='note' onChange={(e)=> setNote(e.target.value)} placeholder='Add note' type='text' />


              <button className='pay' type='submit' onClick={(e) => requestFn(e)}>{loading ? 'Loading...' : 'Generate Payment' }</button>
              {/* <DynamicQRCode props={'url'} /> */}
            </form>
            <div className='recent-payouts'>
            <div className='recent-card'>
              <button type='button' value={10} onClick={instantPaymentFn} className='grey-button' >10$</button> 
              <button type='button' value={100} onClick={instantPaymentFn} className='grey-button' >100$</button> 
              <button type='button' value={1000} onClick={instantPaymentFn} className='grey-button' >1000$</button> 

            </div>

            

          </div>
          <div className='directPay-history'>

            <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="home" title="Generated Payments">
        <RecentQR/>
      </Tab>
      <Tab eventKey="profile" title="Transaction History">
        <TransactionHistory/>
      </Tab>
 
    </Tabs>

            </div>
          </div>

        

          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Body>
              <div className="merchant-pop">
                {/* <QRCode size={250} value={address} />
         
                      <div className='merchant-btn downloadQR'>
                      <button onClick={handleDownloadQRCode}>Download QR code</button>

            </div> */}

                <DynamicQRCode props={url} />
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </section>
  )
}
