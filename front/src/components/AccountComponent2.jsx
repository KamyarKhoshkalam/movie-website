import { useEffect, useState } from 'react'
import privateApi from '../../privateApi'

const AnimeComponent2 = () => {
  // -----------------------------
  // State variables
  // -----------------------------
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [photo, setPhoto] = useState(null)

  // -----------------------------
  // Fetch user data on component mount
  // -----------------------------
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await privateApi.get('me/')
        const data = res.data

        setPhoto(data.photo || null)
        setEmail(data.email || '')
        setFirstName(data.first_name || '')
        setLastName(data.last_name || '')
        setUsername(data.username || '')
        setPhone(data.phone || '')
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  // -----------------------------
  // Submit profile changes
  // Only send fields that have a value to avoid "undefined"
  // -----------------------------
  const handleProfileSubmit = async () => {
    setLoading(true)
    try {
      const formData = new FormData()

      if (firstName) formData.append('first_name', firstName)
      if (lastName) formData.append('last_name', lastName)
      if (username) formData.append('username', username)
      if (phone) formData.append('phone', phone)
      if (photo instanceof File) formData.append('photo', photo)

      await privateApi.patch('me/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // -----------------------------
  // Change password
  // -----------------------------
  const handlePasswordSubmit = async () => {
    setLoading(true)
    try {
      await privateApi.post('me/change-password/', {
        oldPassword,
        newPassword: password,
        newPasswordCheck: passwordCheck,
      })

      alert('Password changed successfully!')
      setOldPassword('')
      setPassword('')
      setPasswordCheck('')
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="mx-auto max-w-7xl rounded-2xl bg-[#23242a] px-6 py-8 md:px-10 md:py-14">
      <form className="flex flex-col gap-8">
        {/* -----------------------------
            Profile Photo Section
        ----------------------------- */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={
              photo instanceof File ? URL.createObjectURL(photo) : photo || '/default-avatar.png'
            }
            alt="Profile"
            className="h-24 w-24 rounded-full border-2 border-gray-600 object-cover"
          />
          <label className="mt-2 text-sm text-gray-300">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            className="text-sm text-gray-300"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        {/* -----------------------------
            Profile Info Fields
        ----------------------------- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email (read-only) */}
          <div className="relative rounded-lg bg-[#1b1c22] px-3 pt-4 pb-2">
            <label className="absolute -top-2 left-2 bg-[#1b1c22] px-1 text-sm text-gray-400">
              Email
            </label>
            <input
              type="text"
              readOnly
              className="w-full border-none bg-transparent text-gray-300 outline-none"
              value={email}
            />
          </div>

          {/* First Name */}
          <div className="relative rounded-lg bg-[#1b1c22] px-3 pt-4 pb-2">
            <label className="absolute -top-2 left-2 bg-[#1b1c22] px-1 text-sm text-gray-400">
              First Name
            </label>
            <input
              type="text"
              className="w-full border-none bg-transparent text-gray-300 outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="relative rounded-lg bg-[#1b1c22] px-3 pt-4 pb-2">
            <label className="absolute -top-2 left-2 bg-[#1b1c22] px-1 text-sm text-gray-400">
              Last Name
            </label>
            <input
              type="text"
              className="w-full border-none bg-transparent text-gray-300 outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Username */}
          <div className="relative rounded-lg bg-[#1b1c22] px-3 pt-4 pb-2">
            <label className="absolute -top-2 left-2 bg-[#1b1c22] px-1 text-sm text-gray-400">
              Username
            </label>
            <input
              type="text"
              className="w-full border-none bg-transparent text-gray-300 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="relative rounded-lg bg-[#1b1c22] px-3 pt-4 pb-2">
            <label className="absolute -top-2 left-2 bg-[#1b1c22] px-1 text-sm text-gray-400">
              Phone
            </label>
            <input
              type="text"
              className="w-full border-none bg-transparent text-gray-300 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* -----------------------------
            Save Profile Button
        ----------------------------- */}
        <div className="flex justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={handleProfileSubmit}
            className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

        {/* -----------------------------
            Password Change Section
        ----------------------------- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Old Password */}
          <div className="relative rounded-lg bg-[#1b1c22] px-3 pt-4 pb-2">
            <label className="absolute -top-2 left-2 bg-[#1b1c22] px-1 text-sm text-gray-400">
              Old Password
            </label>
            <input
              type="password"
              className="w-full border-none bg-transparent text-gray-300 outline-none"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          {/* New Password */}
          <div className="relative rounded-lg bg-[#1b1c22] px-3 pt-4 pb-2">
            <label className="absolute -top-2 left-2 bg-[#1b1c22] px-1 text-sm text-gray-400">
              New Password
            </label>
            <input
              type="password"
              className="w-full border-none bg-transparent text-gray-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm New Password */}
          <div className="relative rounded-lg bg-[#1b1c22] px-3 pt-4 pb-2">
            <label className="absolute -top-2 left-2 bg-[#1b1c22] px-1 text-sm text-gray-400">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full border-none bg-transparent text-gray-300 outline-none"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
        </div>

        {/* -----------------------------
            Change Password Button
        ----------------------------- */}
        <div className="flex justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={handlePasswordSubmit}
            className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AnimeComponent2
