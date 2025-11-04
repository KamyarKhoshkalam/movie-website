import { Link } from 'react-router-dom'

const AccountComponent1 = () => {
  return (
    <div className="flex items-center px-4 py-10 md:px-10">
      {/* Link to the homepage */}
      <Link to="/" className="text-gray-300 transition-colors duration-200 hover:text-white">
        Home
      </Link>
    </div>
  )
}

export default AccountComponent1
