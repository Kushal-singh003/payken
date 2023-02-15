import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import Wallet from '@/components/Wallet/Index'
import React from 'react'

export default function index() {
  return (
    <div>
        <NavBar/>
        <Wallet/>
        <Footer/>
    </div>
  )
}
