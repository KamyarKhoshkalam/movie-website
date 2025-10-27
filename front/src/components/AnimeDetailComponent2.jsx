// note : typo
// note : responsive

import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'

const AnimeDetailComponent2 = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState({})
  const [relations, setRelations] = useState([])

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) => {
      console.log(res.data.data)
      setDetail(res.data.data)
    })
  }, [id])

  useEffect(() => {
    if (!detail.relations) return

    const fetchRelations = async () => {
      try {
        const animeEntries = detail.relations
          .flatMap((r) => r.entry)
          .filter((entry) => entry.type === 'anime')

        const results = []

        for (const entry of animeEntries) {
          const res = await axios.get(`https://api.jikan.moe/v4/anime/${entry.mal_id}/full`)
          results.push(res.data.data)

          await new Promise((resolve) => setTimeout(resolve, 750))
        }

        setRelations(results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching related anime:', error)
        setLoading(false)
      }
    }

    fetchRelations()
  }, [detail.relations])

  if (loading) {
    return <p>Loading</p>
  }

  return (
    // *** component ***

    <div className="mx-auto flex flex-col rounded-xl px-[15px] pt-10 min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1250px]">
      {/* *** anime detail *** */}
      <div className="mb-5 flex flex-col gap-4 rounded-lg bg-[#23242a] px-4 pt-8 pb-20">
        <h2 className="text-2xl text-gray-300">Related</h2>
        <hr className="text-gray-400" />
        <div className="scrollbar-hide flex gap-3 overflow-x-auto p-2">
          {relations.map((item) => (
            <NavLink
              to={`/anime/${item.mal_id}`}
              key={item.mal_id}
              className="flex w-[140px] flex-shrink-0 flex-col justify-between gap-2 sm:w-[180px] md:w-[200px]"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="line-clamp-2 text-center text-sm text-gray-200">{item.title}</p>
            </NavLink>
          ))}
        </div>
      </div>
      {/* *** End anime detail *** */}
    </div>
  )
}

export default AnimeDetailComponent2
