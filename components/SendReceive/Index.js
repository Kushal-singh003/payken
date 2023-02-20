import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react';
import { withToken } from '../Utils/Functions';
import supabase from '../Utils/SupabaseClient';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SendReceive() {
    const [address,setAddress] = useState();
    const [open,setOpen] = useState(false);

    async function getAddress(token){
        try {
            const response = await withToken({token:token,query:'getprofile'})
            console.log(response,'address');
            setAddress(response.data.data[0].address)
            setOpen(false)
        } catch (error) {
            setOpen(false)
            console.log(error);
        }
     
    
    }

    async function getSession() {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log(session,'session');

        getAddress(session?.access_token)
    
    }

    useEffect(()=>{
        setOpen(true)
        getSession()
        
    },[])

   

    // const qrCodeValue = `bitcoin:${address}`;
    

  return (
    <div className='qr-code'>
         <Backdrop  open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
        <div className='qr-container'>
     <QRCode size={250} value={address} />
     <p className='qr-text'> {address}</p>
     </div>
    </div>
  )
}
