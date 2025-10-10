import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Logout from './pages/Logout'




function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/logout' element={<Logout></Logout>}></Route>
    </Routes>
  </BrowserRouter>)
}

export default App
