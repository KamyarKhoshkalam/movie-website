// note : typo
// note : responsive

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AnimeDetailComponent1 = () => {
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

  return (
    // *** component ***

    <div className="mx-auto flex w-full flex-col rounded-xl px-[15px] pt-10 min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1250px]">
      {/* *** Top component *** */}
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)),url(${detail.images.jpg.image_url})`,
        }}
        className="flex flex-col rounded-t-lg bg-cover bg-center bg-no-repeat p-3"
      >
        <div className="flex flex-col gap-3 min-[580px]:flex-row">
          {/* *** Poster *** */}
          <div className="flex w-[120px] flex-col rounded-lg min-[580px]:w-[240px]">
            <img className="rounded-lg" src={detail.images.jpg.image_url} alt={detail.title} />
          </div>
          {/* *** End Poster *** */}

          {/* *** Detail *** */}
          <div className="flex flex-col gap-1.5">
            <p className="text-2xl text-white">
              Watch "{detail.title}" <span className="text-sm">({detail.title_english})</span>
            </p>
            <div className="flex w-fit flex-col items-center py-2.5">
              {detail.score && (
                <p className="text-lg text-orange-400">
                  {detail.score} <span className="text-xs text-gray-400">/10</span>
                </p>
              )}
              {detail.scored_by && (
                <p className="text-xs text-gray-300">
                  {parseInt(detail.scored_by).toLocaleString()}
                </p>
              )}
            </div>
            <p className="text-gray-300">
              <span className="text-gray-400">Genre :</span>{' '}
              {detail.genres.map((items) => items.name).join(', ')}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Release Date :</span> {detail.year}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Studios :</span>{' '}
              {detail.studios.map((items) => items.name).join(', ')}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Airing :</span> {detail.airing ? 'Yes' : 'No'}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Duration :</span> {detail.duration}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Season :</span> {detail.season}
            </p>
          </div>
          {/* *** End Detail *** */}
        </div>
        {/* *** summary *** */}
        <div>
          <p className="line-clamp-2 text-gray-300">{detail.synopsis}</p>
        </div>
        {/* *** End summary *** */}
      </div>
      {/* *** anime detail *** */}
      <div className="mb-5 flex flex-col gap-4 rounded-b-lg bg-[#23242a] p-4 pt-8 pb-20">
        <div className="flex w-full flex-col justify-evenly gap-4 min-[580px]:flex-row min-[580px]:gap-0">
          <div className="relative rounded-lg bg-[#1b1c22] px-[10px] pt-[15px] pb-[10px] min-[580px]:w-[22%]">
            <p className="text-gray-300">{detail.type}</p>
            <p className="absolute top-[-13px] bg-[#23242a] px-2 py-0 text-gray-400">Type</p>
          </div>
          <div className="relative rounded-lg bg-[#1b1c22] px-[10px] pt-[15px] pb-[10px] min-[580px]:w-[22%]">
            <p className="text-gray-300">{detail.popularity}</p>
            <p className="absolute top-[-13px] bg-[#23242a] px-2 py-0 text-gray-400">Popularity</p>
          </div>
          <div className="relative rounded-lg bg-[#1b1c22] px-[10px] pt-[15px] pb-[10px] min-[580px]:w-[22%]">
            <p className="text-gray-300">{detail.duration}</p>
            <p className="absolute top-[-13px] bg-[#23242a] px-2 py-0 text-gray-400">Duration</p>
          </div>
          <div className="relative rounded-lg bg-[#1b1c22] px-[10px] pt-[15px] pb-[10px] min-[580px]:w-[22%]">
            <p className="text-gray-300">{detail.aired.string}</p>
            <p className="absolute top-[-13px] bg-[#23242a] px-2 py-0 text-gray-400">Aired</p>
          </div>
        </div>
        <div className="flex w-full flex-col justify-evenly gap-4 min-[580px]:flex-row min-[580px]:gap-0">
          <div className="relative rounded-lg bg-[#1b1c22] px-[10px] pt-[15px] pb-[10px] min-[580px]:w-[22%]">
            <p className="text-gray-300">{detail.broadcast.string}</p>
            <p className="absolute top-[-13px] bg-[#23242a] px-2 py-0 text-gray-400">Broadcast</p>
          </div>
          <div className="relative rounded-lg bg-[#1b1c22] px-[10px] pt-[15px] pb-[10px] min-[580px]:w-[22%]">
            <p className="text-gray-300">{detail.season}</p>
            <p className="absolute top-[-13px] bg-[#23242a] px-2 py-0 text-gray-400">Season</p>
          </div>
          <div className="relative rounded-lg bg-[#1b1c22] px-[10px] pt-[15px] pb-[10px] min-[580px]:w-[22%]">
            <p className="text-gray-300">{detail.rating}</p>
            <p className="absolute top-[-13px] bg-[#23242a] px-2 py-0 text-gray-400">Rating</p>
          </div>
          <div className="relative rounded-lg bg-[#1b1c22] px-[10px] pt-[15px] pb-[10px] min-[580px]:w-[22%]">
            <p className="text-gray-300">{detail.title_japanese}</p>
            <p className="absolute top-[-13px] bg-[#23242a] px-2 py-0 text-gray-400">
              Title japanese
            </p>
          </div>
        </div>
      </div>
      {/* *** End anime detail *** */}
    </div>
  )
}

export default AnimeDetailComponent1
