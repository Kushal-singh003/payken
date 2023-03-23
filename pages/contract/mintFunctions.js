import MintFunctions from '@/components/Contract/MintFunctions'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function mintFunctions() {
  return (
    <div>
      <NavBar/>
        <MobileLogo/>
        <MintFunctions/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}
