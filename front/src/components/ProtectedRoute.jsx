import { useEffect, useState } from 'react'
import privateApi from '../../privateApi'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    privateApi
      .get('me/')
      .then((res) => {
        setLoading(false)
        setIsAuthenticated(true)
      })
      .catch((err) => {
        setLoading(false)
        setIsAuthenticated(false)
      })
  }, [])

  if (loading) {
    return <p>loading</p>
  }

  if (isAuthenticated) {
    return children
  }

  return <Navigate to="/login"></Navigate>
}

export default ProtectedRoute
