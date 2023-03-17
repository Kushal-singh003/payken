import NftDetail from '@/components/Nft/NftDetail';
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function nftDetail(props) {
  return (
    <div>
      <NavBar/>
      <NftDetail props={props?.id}/>
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