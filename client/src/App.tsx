import { Route, Routes } from 'react-router-dom';
import AdminRouter from './router/AdminRouter';
import UserRouter from './router/UserRouter';


function App() {
  
  return (
    <Routes>
      <Route path='/*' element={<UserRouter/>}/>
      <Route path='/admin/*' element={<AdminRouter/>}/>
    </Routes>
  )
}

export default App
