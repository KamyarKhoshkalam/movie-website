import { searchAnime } from '../../movieapi'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Link, NavLink } from 'react-router-dom'

const FirstComponent = () => {
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [swiperIndex, setSwiperIndex] = useState(0)

  useEffect(() => {
    searchAnime({ order_by: 'score', sort: 'desc', limit: 7 })
      .then((res) => {
        console.log(res)
        setAnime(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>loading</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="flex h-[620px] items-center justify-between bg-black text-white">
      <div
        className="flex h-full w-2/3 flex-col items-start justify-center gap-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),url(${anime[swiperIndex].images.jpg.large_image_url})`,
        }}
      >
        <NavLink to={`http://localhost:5173/anime/${anime[swiperIndex].mal_id}`}>
          <p className="text-3xl transition-colors duration-300 hover:text-orange-500">
            {anime[swiperIndex].title}{' '}
            <span className="border px-1 text-base">{anime[swiperIndex].rating}</span>
          </p>
        </NavLink>
        <p className="text-2xl">
          {anime[swiperIndex].genres.map((element) => element.name).join(' - ')}
        </p>
        <p className="line-clamp-2 w-2/3">{anime[swiperIndex].synopsis}</p>
        <div className="flex items-end justify-center gap-4">
          <p>
            <span className="text-2xl text-orange-500">{anime[swiperIndex].score}</span>
            /10
          </p>
          <p>{anime[swiperIndex].duration}</p>
          <p>{anime[swiperIndex].year}</p>
        </div>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={4}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={(swiper) => {
          setSwiperIndex(swiper.realIndex)
        }}
        loop={true}
        autoplay={{ disableOnInteraction: false, delay: 2500, pauseOnMouseEnter: true }}
        className="w-1/3"
        spaceBetween={5}
      >
        {anime.map((element) => (
          <SwiperSlide>
            <div className="flex h-auto flex-col items-center rounded-3xl">
              <NavLink to={`http://localhost:5173/anime/${element.mal_id}`}>
                <div className="relative flex h-auto rounded-full">
                  <img
                    src={element.images.jpg.image_url}
                    alt={element.title}
                    className="h-[190px] rounded-3xl"
                  />
                  <p className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs">
                    {element.score}
                  </p>
                </div>
              </NavLink>

              <p>{element.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default FirstComponent
