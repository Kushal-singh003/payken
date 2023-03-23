import EditProduct from '@/components/Dashboard/ListedProducts/EditProduct'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function editProduct() {
  return (
    <div>
      <NavBar/>
      <MobileLogo/>
        <EditProduct/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}
