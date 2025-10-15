import PosterYM from "../assets/PosterYM.jpg"
import { NavLink } from "react-router-dom"

const LoginRegister = ()=>{
  return <div className="relative h-full bg-cover bg-center rounded-3xl" style={{backgroundImage:`url(${PosterYM})`}}>
    <NavLink to={"/"} className={"absolute left-10 top-5 text-white"}>Back to Website</NavLink>
  </div>
}

export default LoginRegister