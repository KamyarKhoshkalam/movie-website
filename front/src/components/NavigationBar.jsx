import { Link } from 'react-router-dom'
import LogoYM from '../assets/LogoYM.png'
import { FaChevronDown, FaChevronRight, FaMoon, FaSearch } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useState } from 'react'

const NavigationBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  return (
    <div
      className={`navbar start-0 top-0 w-full bg-[#23242a] bg-gradient-to-b from-black/40 to-transparent`}
    >
      <div className={`navbar__container container mx-auto ${openMenu && 'open-menu'}`}>
        <span className="close-menu" onClick={() => setOpenMenu(false)}></span>
        <div className="navbar__items flex items-center justify-between">
          <div className="navbar__start-items">
            <div className="navbar__menu-btn" onClick={toggleMenu}>
              {openMenu ? <IoClose /> : <HiMenu />}
            </div>
            <Link to="/" className="pe-2">
              <img src={LogoYM} alt="" />
            </Link>
            <ul className="navbar__links">
              <li className="navbar__links__link">
                <Link to="/">Home</Link>
              </li>
              <li className="navbar__links__link">
                <Link to="#">
                  Anime <FaChevronDown />
                </Link>
                <ul className="navbar__links__sublinks">
                  <li className="navbar__links__link">
                    <Link href="/MovieAnime">Movie Anime</Link>
                  </li>
                  <li className="navbar__links__link">
                    <Link href="#">
                      Series Anime
                      <FaChevronRight />
                    </Link>
                    <ul className="navbar__links__sublinks__sublinks">
                      <li className="navbar__links__link">
                        <Link href="/A">A</Link>
                      </li>
                      <li className="navbar__links__link">
                        <Link href="/B">B</Link>
                      </li>
                      <li className="navbar__links__link">
                        <Link href="/C">C</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="navbar__links__link">
                    <Link href="/TopRated">Top Rated</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="navbar__end-items">
            <Link to={'/change-theme'} className="btn-link btn-link-icon">
              <FaMoon />
            </Link>
            <Link to={'/search'} className="btn-link btn-link-icon">
              <FaSearch />
            </Link>
            <Link to={'/account'} className="btn-link">
              Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
