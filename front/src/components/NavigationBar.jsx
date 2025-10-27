import { Link } from 'react-router-dom'
import LogoYM from '../assets/LogoYM.png'
import { FaChevronDown, FaChevronRight, FaMoon, FaSearch } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import privateApi from '../../privateApi'
import { searchAnime } from '../../movieapi'

const NavigationBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [searchItems, setSearchItems] = useState([])
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await privateApi.get('/me')
        setUser(res.data)
        setLoggedIn(true)
        console.log('Fetched user:', res.data)
      } catch (err) {
        console.error(err)
        setLoggedIn(false)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setSearchItems([])
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    if (search.trim() !== '') {
      searchAnime({ q: search, order_by: 'rank', limit: 3 }).then((res) => {
        setSearchItems(res)
      })
    } else {
      setSearchItems([])
    }
  }, [search])

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
            <div className="relative mx-4 flex w-72 rounded-md bg-gray-700 px-2 py-1">
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                value={search}
                placeholder="Search anime"
                className="w-full bg-transparent px-2 py-1 text-sm text-[#e1e1e1] placeholder-gray-400 outline-none focus:ring-0 focus:outline-none"
              />
              <div className="search-container absolute top-10 left-0 z-50 flex w-full flex-col bg-[#23242a] px-2 py-1">
                {searchItems.map((item) => (
                  <Link
                    key={item.mal_id}
                    to={`/anime/${item.mal_id}`}
                    className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-800/40"
                    onClick={() => {
                      setSearch('')
                      setSearchItems([])
                    }}
                  >
                    {/* Image container */}
                    <div className="aspect-[3/4] w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={item.images.jpg.image_url}
                        alt={item.title}
                        className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Text container */}
                    <div className="flex-1">
                      <h2 className="line-clamp-2 text-sm font-medium text-gray-200">
                        {item.title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Link to={'/account'} className="btn-link flex items-center justify-center">
              {loggedIn ? (
                <img src={user.photo} className="h-10 w-10 rounded-full object-cover" alt="" />
              ) : (
                <p>Account</p>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
