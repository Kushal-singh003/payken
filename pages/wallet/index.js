import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import Wallet from '@/components/Wallet/Index'
import React from 'react'

export default function index() {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <Wallet/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}
