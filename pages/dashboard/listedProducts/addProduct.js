import AddProduct from '@/components/Dashboard/ListedProducts/AddProduct'
import Footer from '@/components/ui/Footer'
import NavBar from '@/components/ui/NavBar'


export default function addProduct() {
  return (
    <div>
        <NavBar/>
        <AddProduct/>
        <Footer/>
    </div>
  )
}