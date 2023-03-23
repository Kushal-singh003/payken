import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import React from 'react'
import CartCheckout from '@/components/Dashboard/CartCheckout/Index'
import MobileLogo from '@/components/ui/MobileLogo'

export default function completePayment(props) {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <CartCheckout clientSecret={props?.clientSecret}/>
        <BottomNav/>
        <Footer/>
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