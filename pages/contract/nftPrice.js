import NftPrice from '@/components/Contract/NftPrice'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function nftPrice() {
  return (
    <div>
      <NavBar/>
      <MobileLogo/>
        <NftPrice/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}
