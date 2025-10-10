import LoginComponent from "../components/LoginComponent"
import NavigationBar from "../components/NavigationBar"
import { Navigate } from "react-router-dom"
import RedirectIfAuthenticated from "../components/RedirectIfAuthenticated"

const Login = ()=>{
  return (
    <div>
      <RedirectIfAuthenticated>
        <NavigationBar></NavigationBar>
        <LoginComponent></LoginComponent>
      </RedirectIfAuthenticated>
    </div>
  )
}

export default Login