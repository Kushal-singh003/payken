import SubmitKyc from '@/components/Settings/KYC/SubmitKyc'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function submitKyc() {
  return (
    <div>
      <NavBar/>
      <MobileLogo/>
        <SubmitKyc/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}
