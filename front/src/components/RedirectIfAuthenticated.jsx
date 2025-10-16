import { Children, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import privateApi from '../../privateApi'

const RedirectIfAuthenticated = ({ children }) => {
  const [authStatus, setAuthStatus] = useState('checking')

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) {
      setAuthStatus('unauthenticated')
      return
    }

    const verifyToken = async () => {
      try {
        await privateApi.get('me/')
        setAuthStatus('authenticated')
      } catch (error) {
        console.warn('Token invalid or expired:', error.response?.status)
        setAuthStatus('unauthenticated')
      }
    }

    verifyToken()
  }, [])

  if (authStatus === 'checking') {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    )
  }

  if (authStatus === 'authenticated') {
    return <Navigate to="/" replace />
  }

  return children
}

export default RedirectIfAuthenticated
