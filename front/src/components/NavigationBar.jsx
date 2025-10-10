import { Link } from "react-router-dom"
import LogoYM from "../assets/LogoYM.png"

const NavigationBar = ()=>{
  return(
    <div>
      <Link to="/"><img src={LogoYM} alt="" /></Link>
    </div>
  )
}

export default NavigationBar
