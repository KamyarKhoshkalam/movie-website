import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AnimeDetailComponent = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState({})

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) => {
      console.log(res.data.data)
      setDetail(res.data.data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return <p>Loading</p>
  }

  return detail.title
}

export default AnimeDetailComponent
