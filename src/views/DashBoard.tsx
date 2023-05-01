import '@/styles/DashBoard.scss'
// import { _popularMovies, _topRatedMovies, _trendingMovies } from '@/store/movie'
// import { useRecoilValue } from 'recoil'
import { useBreakPoints } from '@/hooks'
import PopularMovie from '@/components/movies/PopularMovie'
import { TOGGLE_MOVIE_ITEM, TOGGLE_TV_ITEM, TOGGLE_TRENDING_ITEMS } from '@/const/toggleBar'
import SearchBox from '@/components/main/SearchBox'

const DashBoard = () => {
  const { breakPointsClass } = useBreakPoints()
  // const popularMovies = useRecoilValue(_popularMovies)
  // const topRatedMovies = useRecoilValue(_topRatedMovies)
  // const trendingMovies = useRecoilValue(_trendingMovies)

  return (
    <div>
      <SearchBox />
      <div className={`dashboard ${breakPointsClass}`}>
        <PopularMovie toggleItems={TOGGLE_TRENDING_ITEMS} title={'트렌딩'} />
        <PopularMovie toggleItems={TOGGLE_MOVIE_ITEM} title={'영화'} />
        <PopularMovie toggleItems={TOGGLE_TV_ITEM} title={'TV'} />
      </div>
    </div>
  )
}

export default DashBoard
