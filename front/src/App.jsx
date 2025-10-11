import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'




function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/logout' element={<Logout></Logout>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
    </Routes>
  </BrowserRouter>)
}

export default App
