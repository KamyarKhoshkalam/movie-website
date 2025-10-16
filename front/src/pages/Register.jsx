import LoginComponent from '../components/LoginComponent'
import NavigationBar from '../components/NavigationBar'
import { Navigate } from 'react-router-dom'
import RedirectIfAuthenticated from '../components/RedirectIfAuthenticated'
import RegisterComponent from '../components/RegisterComponent'

const Register = () => {
  return (
    <div>
      <RedirectIfAuthenticated>
        <NavigationBar></NavigationBar>
        <RegisterComponent></RegisterComponent>
      </RedirectIfAuthenticated>
    </div>
  )
}

export default Register
