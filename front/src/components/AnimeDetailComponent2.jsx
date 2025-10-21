// note : typo
// note : responsive

import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'

const AnimeDetailComponent2 = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [relationLoading, setRelationLoading] = useState(true)
  const [detail, setDetail] = useState({})
  const [relations, setRelations] = useState([])

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) => {
      console.log(res.data.data)
      setDetail(res.data.data)
      setLoading(false)
    })
  }, [id])

  useEffect(() => {
    if (!detail.relations) return

    const fetchRelations = async () => {
      setRelationLoading(true)
      try {
        const animeEntries = detail.relations
          .flatMap((r) => r.entry)
          .filter((entry) => entry.type === 'anime')

        const promises = animeEntries.map((entry) =>
          axios.get(`https://api.jikan.moe/v4/anime/${entry.mal_id}/full`)
        )

        const results = await Promise.all(promises)

        const list = results.map((res) => res.data.data)

        setRelations(list)
      } catch (error) {
        console.error('Error fetching related anime:', error)
      } finally {
        setRelationLoading(false)
      }
    }

    fetchRelations()
  }, [detail])

  if (loading || relationLoading) {
    return <p>Loading</p>
  }

  return (
    // *** component ***

    <div className="mx-auto flex flex-col rounded-xl pt-10 min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1250px]">
      {/* *** anime detail *** */}
      <div className="mb-5 flex flex-col gap-4 rounded-lg bg-[#23242a] p-4 pt-8 pb-20">
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
