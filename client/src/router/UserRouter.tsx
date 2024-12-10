import { Route, Routes } from "react-router-dom"
import MenuPage from "../pages/user/MenuPage"



const UserRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<MenuPage/>}/>
    </Routes>
  )
}

export default UserRouter