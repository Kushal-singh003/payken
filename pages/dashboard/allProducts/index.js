import AllProducts from '@/components/Dashboard/AllProducts/Index'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function index() {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <AllProducts/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}
