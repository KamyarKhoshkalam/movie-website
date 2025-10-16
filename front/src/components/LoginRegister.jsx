import PosterYM from '../assets/PosterYM.jpg'
import { NavLink } from 'react-router-dom'

const LoginRegister = () => {
  return (
    <div
      className="relative h-full rounded-3xl bg-cover bg-center"
      style={{ backgroundImage: `url(${PosterYM})` }}
    >
      <NavLink to={'/'} className={'absolute top-5 left-10 text-white'}>
        Back to Website
      </NavLink>
    </div>
  )
}

export default LoginRegister
