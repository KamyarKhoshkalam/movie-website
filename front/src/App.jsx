import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import AnimeDetail from './pages/AnimeDetail'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login></Login>
            </RedirectIfAuthenticated>
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout></Logout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RedirectIfAuthenticated>
              <Register></Register>
            </RedirectIfAuthenticated>
          }
        ></Route>
        <Route
          path="/anime/:id"
          element={
            <ProtectedRoute>
              <AnimeDetail></AnimeDetail>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
