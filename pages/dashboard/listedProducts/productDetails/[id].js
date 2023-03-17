
import ProductDetails from '@/components/Dashboard/ListedProducts/ProductDetails/Index';
import Footer from '@/components/ui/Footer';
import NavBar from '@/components/ui/NavBar';
import React from 'react'

export default function buyProduct(props) {
  return (
    <div>
        <NavBar/>
        <ProductDetails/>
        <Footer/>
    </div>
  )
}

export async function getServerSideProps(context) {
  let { params } = await context;
  console.log(params,'params');
  let id = await params.id;
  

  return {
    props: {
      id
    },
  };
}
