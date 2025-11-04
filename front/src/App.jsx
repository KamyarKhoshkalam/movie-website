import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import AnimeDetail from './pages/AnimeDetail'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'
import Account from './pages/Acoount'

function App() {
  return (
    <BrowserRouter>
      {/* *** Routes *** */}

      <Routes>
        {/* *** Home Route *** */}

        <Route path="/" element={<Home></Home>} />

        {/* *** Login Route *** */}

        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />

        {/* *** Logout Route ***  */}

        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />

        {/* *** Register Route *** */}

        <Route
          path="/register"
          element={
            <RedirectIfAuthenticated>
              <Register />
            </RedirectIfAuthenticated>
          }
        />

        {/* *** Anime Page Route *** */}

        <Route
          path="/anime/:id"
          element={
            <ProtectedRoute>
              <AnimeDetail />
            </ProtectedRoute>
          }
        />

        {/* *** Acount *** */}

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* *** End Routes*** */}
    </BrowserRouter>
  )
}

export default App
