import Transition from '@/layout/Transition'
import { Card } from 'my-react-component'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMovie } from 'types/interface'
import './MovieList.scss'

interface MovieListProps {
  movies: IMovie[]
}
const MovieList = ({ movies }: MovieListProps) => {
  const navigation = useNavigate()
  const goDetailPage = (movieId: IMovie['id']) => {
    navigation(`detail/${movieId}`)
  }
  const RenderList = useCallback(() => {
    return (
      <Transition className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => goDetailPage(movie.id)}>
            <Card
              // key={movie.id}
              imageUrl={import.meta.env.VITE_BASE_IMAGE_URL + movie.backdrop_path}
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
