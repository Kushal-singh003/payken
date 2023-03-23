import AddProduct from '@/components/Dashboard/ListedProducts/AddProduct'
import BottomNav from '@/components/ui/BottomNav'
import Footer from '@/components/ui/Footer'
import MobileLogo from '@/components/ui/MobileLogo'
import NavBar from '@/components/ui/NavBar'


export default function addProduct() {
  return (
    <div>
        <NavBar/>
        <MobileLogo/>
        <AddProduct/>
        <BottomNav/>
        <Footer/>
    </div>
  )
}