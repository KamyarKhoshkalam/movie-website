// Note : capcha is not secure
// Note : fix capcha input to get only number
// Note : add hover effect on button
// Note : add a way to use email too in same input
// Note : lower some opacity
// Note : error message style
// Note : responsive
// Note : add backend respond

// *** Imports ***
import { useState } from 'react'
import privateApi from '../../privateApi'
import { Navigate } from 'react-router-dom'
import LoginRegister from './LoginRegister'
import { NavLink } from 'react-router-dom'

const LoginComponent = () => {
  // *** Variables ***
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [capcha, setCapcha] = useState(Math.floor(Math.random() * (99999 - 10000 + 1) + 10000))
  const [userCapcha, setUserCapcha] = useState('')
  const [capchaError, setCapchaError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState()

  // *** Post Username and Password if they were correct ***
  const handleSubmit = async (username, password, e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setFormError('Username/email and password cannot be empty')
      return
    } else {
      setFormError()
    }
    if (parseInt(userCapcha) === capcha) {
      setCapchaError(false)
      try {
        setLoading(true)
        const res = await privateApi.post('token/', {
          username,
          password,
        })
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        setRedirect(true)
      } catch (err) {
        console.log(err)
        setCapcha(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000))
      } finally {
        setLoading(false)
      }
    } else {
      setCapchaError(true)
    }
  }

  // *** Redirect while already logged in
  if (redirect) {
    return <Navigate to="/"></Navigate>
  }

  return (
    <div className="flex h-screen w-screen items-center justify-between">
      {/* *** Form *** */}

      <form
        method="POST"
        className="m-auto flex w-2/5 flex-col justify-center gap-6 px-20"
        onSubmit={(e) => {
          handleSubmit(username, password, e)
        }}
      >
        <h2 className="text-2xl">Login to YekMovies</h2>

        {/* *** Username or Email Field *** */}

        <div className="relative rounded-md border-[2px] border-gray-600 p-2 transition-colors duration-300 focus-within:border-red-500">
          <label
            htmlFor="username"
            className="absolute top-[-13px] bg-white px-2 text-sm text-gray-600"
          >
            username
          </label>
          <input
            type="text"
            name="username"
            className="w-full border-none outline-none"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>

        {/* *** Password field *** */}

        <div className="relative rounded-md border-[2px] border-gray-600 p-2 transition-colors duration-300 focus-within:border-red-500">
          <label
            htmlFor="password"
            className="absolute top-[-13px] bg-white px-2 text-sm text-gray-600"
          >
            password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full border-none outline-none"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <button className="absolute top-0 right-0 flex h-full cursor-pointer items-center justify-center px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                if (showPassword) {
                  setShowPassword(false)
                } else {
                  setShowPassword(true)
                }
              }}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>

        {/* *** capcha field *** */}

        <div className="relative rounded-md border-[2px] border-gray-600 p-2 transition-colors duration-300 focus-within:border-red-500">
          <input
            type="text"
            maxLength={5}
            inputMode="numeric"
            pattern="\d*"
            autoComplete="off"
            className="w-full appearance-none border-none outline-none"
            placeholder="cahpcha"
            name="capcha"
            onChange={(e) => {
              setUserCapcha(e.target.value)
            }}
          />
          <label
            htmlFor="capcha"
            className="absolute top-0 right-0 flex h-full w-fit items-center rounded-md bg-gray-200 px-2"
          >
            {capcha}
          </label>
        </div>

        {/* *** Submit button *** */}

        <button type="submit" className="cursor-pointer rounded-lg bg-red-500 py-3 text-white">
          Login
        </button>

        {/* *** Errors *** */}

        {loading && <p>loading</p>}
        {capchaError && <p>fix your capcha</p>}
        {formError && <p className="text-sm text-red-500">{formError}</p>}

        {/* *** Redirects *** */}

        <div>
          <NavLink to={'/register'} className="rounded-lg bg-gray-200 px-3 py-2">
            Register
          </NavLink>
        </div>
      </form>

      {/* *** End Form *** */}

      {/* *** BackgroundPoster *** */}

      <div className="h-full w-3/5">
        <LoginRegister></LoginRegister>
      </div>
    </div>
  )
}

export default LoginComponent
