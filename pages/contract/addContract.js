import AddContract from '@/components/Contract/AddContract'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import React from 'react'
import MobileLogo from '../../components/ui/MobileLogo'

export default function addContract() {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <AddContract/>
        <BottomNav/>
         <Footer/>
    </div>
  )
}
