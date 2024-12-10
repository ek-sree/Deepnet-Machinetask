import { Route, Routes } from 'react-router-dom'
import PublicRouter from '../utils/admin/PublicRoute'
import PrivateRouter from '../utils/admin/PrivateRoute'
import LandingPage from '../pages/admin/LandingPage'
import LoginPage from '../pages/admin/LoginPage'
import CategoryPage from '../pages/admin/CategoryPage'
import ProductsPage from '../pages/admin/ProductsPage'


const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRouter/>}> 
        <Route path="/" element={<LoginPage/>}/>
      </Route>


    <Route element={<PrivateRouter/>}>
       <Route path='/dashboard' element={<LandingPage/>}/>
       <Route path='/category' element={<CategoryPage/>}/>
       <Route path='/products' element={<ProductsPage/>}/>
    </Route>
</Routes>
  )
}

export default AdminRouter