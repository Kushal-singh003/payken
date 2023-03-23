import DirectCheckout from '@/components/Dashboard/DirectPay/Pay/Index'
import BottomNav from '@/components/ui/BottomNav'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function index(props) {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <DirectCheckout clientSecret={props?.clientSecret}/>
        <BottomNav/>
    </div>
  )
}

export async function getServerSideProps(context) {
  let { params } = await context;
  console.log(params,'params');
  let clientSecret = await params.id;
  

  return {
    props: {
      clientSecret
    },
  };
}