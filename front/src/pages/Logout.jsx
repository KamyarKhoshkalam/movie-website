import { Navigate } from 'react-router-dom'

const Logout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')

  return <Navigate to="/"></Navigate>
}

export default Logout
