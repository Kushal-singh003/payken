import BottomNav from '@/components/ui/BottomNav'
import Cart from '@/components/ui/Cart'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function index() {
  return (
    <div>
      <NavBar/>
      <MobileLogo/>
        <Cart/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}
