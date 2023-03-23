import FunctionValues from '@/components/Contract/FunctionValues'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function functionValues() {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <FunctionValues/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}
