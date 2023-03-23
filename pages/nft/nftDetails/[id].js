import NftDetail from '@/components/Nft/NftDetail';
import BottomNav from '@/components/ui/BottomNav';
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo';
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function nftDetail(props) {
  return (
    <div>
      <NavBar/>
      <MobileLogo/>
      <NftDetail props={props?.id}/>
      <BottomNav/>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps(context) {
  let { params } = await context;
  let id = await params.id;
  console.log(id);
  return {
    props: {
      id,
    },
  };
}