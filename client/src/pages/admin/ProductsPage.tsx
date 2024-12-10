import Product from "../../components/admin/Product"
import SideNavAdmin from "../../components/admin/SideNavAdmin"


const ProductsPage = () => {
  return (
    <div className="bg-gradient-to-r from-slate-700 to-slate-900 min-h-screen p-3 flex">
    <SideNavAdmin/>
    <div className="flex-1 ml-2">
      
    <Product/>
    </div>
</div>
  )
}

export default ProductsPage