import NavigationBar from '../components/NavigationBar'
import FirstComponent from '../components/FirstComponent'
import SecondComponent from '../components/secondComponent'
const Home = () => {
  return (
    <div className="bg-[#1b1c22]">
      <NavigationBar></NavigationBar>
      <FirstComponent></FirstComponent>
      <SecondComponent></SecondComponent>
    </div>
  )
}

export default Home
