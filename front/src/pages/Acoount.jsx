import AccountComponent1 from '../components/AccountComponent1'
import AccountComponent2 from '../components/AccountComponent2'

const Account = () => {
  return (
    <div className="m-auto w-full bg-[#1b1c22] px-10 pb-10">
      <AccountComponent1 />
      <AccountComponent2 />
    </div>
  )
}

export default Account
