import '@/styles/DashBoard.scss'
import MovieList from '@/components/movies/MovieList'
import { _popularMovies, _topRatedMovies, _trendingMovies } from '@/store/movie'
import { useRecoilValue } from 'recoil'
import { useBreakPoints } from '@/hooks'

const DashBoard = () => {
  const { breakPointsClass } = useBreakPoints()
  const popularMovies = useRecoilValue(_popularMovies)
  const topRatedMovies = useRecoilValue(_topRatedMovies)
  const trendingMovies = useRecoilValue(_trendingMovies)

  return (
    <div className={`dashboard ${breakPointsClass}`}>
      <MovieList movies={popularMovies} />
      <MovieList movies={topRatedMovies} />
      <MovieList movies={trendingMovies} />
    </div>
  )
}

export default DashBoard
