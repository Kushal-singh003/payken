import MintFunctions from '@/components/Contract/MintFunctions'
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function mintFunctions() {
  return (
    <div>
      <NavBar/>
        <MintFunctions/>
        <Footer/>
    </div>
  )
}
