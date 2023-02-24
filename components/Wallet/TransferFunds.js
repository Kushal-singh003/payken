import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import Footer from '../ui/Footer'
import NavBar from '../ui/NavBar'
import { Modal } from "@nextui-org/react";
import { withToken } from '../Utils/Functions';
import supabase from '../Utils/SupabaseClient';


export default function TransferFunds() {
  const [visible, setVisible] = React.useState(false);
  const [loading,setLoading] = useState(false);
  const [vMerchant,setVMerchant] = useState();
  const [token,setToken] = useState();

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  function modalFn(e){
    e.preventDefault();
    setVisible(true)
  }

  async function beMerchantFn(){
    setLoading(true)

      
   const response = await withToken({data:{status: "true"},token:token,query:'marchant'})
   console.log(response,'response');
   setLoading(false)
   setVisible(false)
   window.location.reload();
  }

  async function launchDemoFn(){
    console.log('launch a demo');
    setVisible(false)
  }

  async function getMerchant(d){
    const response = await withToken({token:d,query:'getmarchant'})
    console.log(response,'response get merchant');
    setVMerchant(response?.data?.data[0].isMarchent)
    
   }

   async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session, "to get the session from supabase");
    
    const d = session?.access_token
    setToken(d)
    getMerchant(d)
  }
  
  useEffect(() => {
    getSession();
  }, []);

  
 
  return (
    <div>
      <NavBar/>
        <section className="sent">
      <div className="container">
        <h2><a href=""> </a> Dashboard</h2>
        <div className="sent-box">
          <Link className='link' href='/nft'>
          <div className="sent-card">
            <img src="img/nft (1).png" alt="" />
            <span>NFT</span>
          </div>
          </Link>
          <Link className='link' href='/wallet'>
          <div className="sent-card">
            <img src="img/wallet (1).png" alt="" />
            <span>Wallet</span>
          </div>
          </Link>
          <Link className='link' href='/payment'>
          <div className="sent-card">
            <img src="img/hand.png" alt="" />
            <span>Payment</span>
          </div>
          </Link>
          <Link className='link' href='/sendReceive'>
          <div className="sent-card">
            <img src="img/money-transfer.png" alt="" />
            <span>Send/Receive</span>
          </div>
          </Link>
          {vMerchant == 1 ?  <Link className='link' href='/contract/collection'>
          <div className="sent-card">
            <img src="img/money-transfer.png" alt="" />
            <span>Collection</span>
          </div>
          </Link> :
          <button onClick={modalFn} className='link link-btn' >
          <div className="sent-card ">
            <img src="img/money-transfer.png" alt="" />
            <span className='beMerchant'>Become a Merchant</span>
            <span>Collection</span>
          </div>
          </button>}


          <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
       
        <Modal.Body>
          <div className='merchant-pop'>
            <p>Do you want to become a merchant ? As a merchant You can add your smart contracts and Integrate a Payken Payment interface into your own website.</p>
            <div className='merchant-btn'>
              <button onClick={beMerchantFn}>{loading ? 'Loading...' : 'Become a Merchant'}</button>
              <button onClick={launchDemoFn}>Try a Demo</button>
            </div>
          </div>
       
        </Modal.Body>
      
      </Modal>
         
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  )
}
