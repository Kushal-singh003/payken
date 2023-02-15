import SubmitKyc from '@/components/Settings/KYC/SubmitKyc'
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function submitKyc() {
  return (
    <div>
      <NavBar/>
        <SubmitKyc/>
        <Footer/>
    </div>
  )
}
