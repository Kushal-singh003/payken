import Cart from '@/components/ui/Cart'
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function index() {
  return (
    <div>
      <NavBar/>
        <Cart/>
        <Footer/>
    </div>
  )
}
