import Transition from '@/layout/Transition'
import { Card } from 'my-react-component'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { BaseItem, IMovie } from 'types/interface'

interface MovieListProps {
  movies: BaseItem[]
}
const MovieList = ({ movies }: MovieListProps) => {
  const navigate = useNavigate()
  //movieId: IMovie['id']
  const goDetailPage = (item: BaseItem) => {
    // navigation(`detail/${movieId}`)
    if (item.release_date) {
      navigate(`/movie/${item.id}`)
    } else {
      navigate(`/tv/${item.id}`)
    }
  }
  const isValidImage = (imagePath: string) => {
    if (!imagePath) return imagePath
    return import.meta.env.VITE_BASE_IMAGE_URL + imagePath
  }
  const RenderList = useCallback(() => {
    return (
      <Transition className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => goDetailPage(movie)}>
            <Card
              // key={movie.id}
              imageUrl={isValidImage(movie.poster_path)}
              height="250px"
              objectFit="fill"
            />
          </div>
        ))}
      </Transition>
    )
  }, [movies])
  return <RenderList />
}

export default MovieList
