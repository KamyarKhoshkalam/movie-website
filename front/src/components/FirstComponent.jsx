import { searchAnime } from '../../movieapi';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Autoplay} from "swiper/modules"
import { Link } from 'react-router-dom';

const FirstComponent = () => {
  const [anime,setAnime] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const [swiperIndex,setSwiperIndex] = useState(0)

  useEffect(()=>{searchAnime({order_by:"score",sort:"desc",limit:7}).then((res)=>{console.log(res);setAnime(res);setLoading(false)}).catch((err)=>{setError(err);setLoading(false)})},[])

  if(loading){
    return <p>loading</p>
  }

  if(error){
    return <p>{error}</p>
  }

  return (
  <div className='flex h-[620px] justify-between items-center bg-black text-white'>
    <div className='w-2/3 h-full bg-cover bg-center bg-no-repeat flex flex-col items-start justify-center gap-4' style={{backgroundImage:`linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),url(${anime[swiperIndex].images.jpg.large_image_url})` }}>
        <Link>
          <p className='text-3xl hover:text-orange-500 transition-colors duration-300'>{anime[swiperIndex].title}  <span className='border text-base px-1'>{anime[swiperIndex].rating}</span></p>
        </Link>
        <p className='text-2xl'>{anime[swiperIndex].genres.map((element)=>element.name).join(" - ")}</p>
        <p className='line-clamp-2 w-2/3'>{anime[swiperIndex].synopsis}</p>
        <div className='flex justify-center items-end gap-4'>
          <p><span className='text-orange-500 text-2xl'>{anime[swiperIndex].score}</span>/10</p>
          <p>{anime[swiperIndex].duration}</p>
          <p>{anime[swiperIndex].year}</p>
        </div>
    </div>

    <Swiper
      modules={[Autoplay]}
      slidesPerView={4}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(swiper) => {setSwiperIndex(swiper.realIndex)}}
      loop={true}
      autoplay={{disableOnInteraction:false,delay:2500,pauseOnMouseEnter:true}}
      className='w-1/3'
      spaceBetween={5}
    >
      {anime.map((element)=>
      <SwiperSlide>
        <div className="flex flex-col items-center rounded-3xl h-auto">
          <Link>
          <div className='relative flex rounded-full h-auto'>
            <img src={element.images.jpg.image_url} alt={element.title} className='rounded-3xl h-[190px]' />
            <p className='absolute text-xs bg-green-600 rounded-full h-7 w-7 flex justify-center items-center left-2 top-2'>{element.score}</p>
          </div>
          </Link>
          
          <p>{element.title}</p>
        </div>
      </SwiperSlide>)}
      
    </Swiper>

    
    
  </div>
  )
}

export default FirstComponent