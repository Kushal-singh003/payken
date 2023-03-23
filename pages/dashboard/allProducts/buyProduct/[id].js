import BuyProduct from '@/components/Dashboard/AllProducts/BuyProduct/Index'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function buyProduct(props) {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <BuyProduct props={props?.id}/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}

export async function getServerSideProps(context) {
  let { params } = await context;
  console.log(params,'params');
  let id = await params.id;
  

  return {
    props: {
      id
    },
  };
}
