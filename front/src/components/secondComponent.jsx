import { useEffect, useState } from 'react'
import { searchAnime } from '../../movieapi'
import InfiniteScroll from 'react-infinite-scroll-component'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

const SecondComponent = () => {
  const [sort, setSort] = useState('desc')
  const [orderBy, setOrderBy] = useState(0)
  const [animeList, setAnimeList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const orders = [
    'score',
    'rank',
    'favorites',
    'popularity',
    'title',
    'start_date',
    'end_date',
    'episodes',
  ]
  const fetchAnime = async () => {
    try {
      const res = await searchAnime({ page, limit: 10, sort, order_by: orders[orderBy] })
      if (res.length === 0) {
        setHasMore(false)
      } else {
        setAnimeList((prev) => [...prev, ...res])
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setAnimeList([])
    setPage(0)
    setHasMore(true)
  }, [sort, orderBy])

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAnime()
    }, 500)
    return () => clearTimeout(timeout)
  }, [page, sort, orderBy])

  return (
    <div className="mx-auto flex w-full flex-col bg-[#23242a] px-[15px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1250px]">
      <div className="mb-4 flex justify-evenly">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': { m: 1 },
          }}
        >
          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button onClick={() => setOrderBy((prev) => (prev + 1) % orders.length)}>
              Order by : {orders[orderBy]}
            </Button>
            <Button onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>Sort : {sort}</Button>
          </ButtonGroup>
        </Box>
      </div>

      <InfiniteScroll
        dataLength={animeList.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {animeList.map((anime) => (
          <Link
            to={`/anime/${anime.mal_id}`}
            key={anime.mal_id}
            className="flex gap-7 border-b border-gray-700 p-2 text-white"
          >
            <div className="aspect-[3/4] w-40 overflow-hidden rounded-lg">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title || 'unknown'}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h2>Title : {anime.title || <span>unknown</span>}</h2>
              <p>Score : {anime.score || <span>unknown</span>}</p>
              <p>Score By : {anime.score_by || <span>unknown</span>}</p>
              <p>Rank : {anime.rank || <span>unknown</span>}</p>
              <p>Episodes : {anime.episodes || <span>unknown</span>}</p>
              <p>Start Date : {anime.aired.prop.from.year || <span>unknown</span>}</p>
              <p>End Date : {anime.aired.prop.to.year || <span>unknown</span>}</p>
              <p>Popularity : {anime.popularity || <span>unknown</span>}</p>
              <p>Favorites : {anime.favorites || <span>unknown</span>}</p>
            </div>
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default SecondComponent
