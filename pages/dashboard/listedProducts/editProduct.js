import EditProduct from '@/components/Dashboard/ListedProducts/EditProduct'
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'
import React from 'react'

export default function editProduct() {
  return (
    <div>
      <NavBar/>
        <EditProduct/>
        <Footer/>
    </div>
  )
}
