import NavigationBar from '../components/NavigationBar'
import ProtectedRoute from '../components/ProtectedRoute'
import AnimeDetailComponent from '../components/AnimeDetailComponent'

const AnimeDetail = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <AnimeDetailComponent></AnimeDetailComponent>
    </div>
  )
}

export default AnimeDetail
