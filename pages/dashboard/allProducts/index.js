import AllProducts from '@/components/Dashboard/AllProducts/Index'
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function index() {
  return (
    <div>
        <NavBar/>
        <AllProducts/>
        <Footer/>
    </div>
  )
}
