import { Link } from "react-router-dom"
import LogoYM from "../assets/LogoYM.png"

const NavigationBar = ()=>{
  return(
    <div className="flex justify-center items-center">
      <Link to="/"><img src={LogoYM} alt="" /></Link>
      <div>
        <ul className="flex">
          <li><Link to="/">خانه</Link></li>
          <li>
            <ul>
              <li><Link>انیمه</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavigationBar
