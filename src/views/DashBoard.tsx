import '@/styles/DashBoard.scss'
// import { _popularMovies, _topRatedMovies, _trendingMovies } from '@/store/movie'
// import { useRecoilValue } from 'recoil'
import { useBreakPoints, usePopup } from '@/hooks'
import PopularMovie from '@/components/movies/PopularMovie'
import {
  TOGGLE_MOVIE_ITEM,
  TOGGLE_TV_ITEM,
  TOGGLE_TRENDING_ITEMS,
  TOGGLE_UPCOMMING,
} from '@/const/toggleBar'
import SearchBox from '@/components/main/SearchBox'
import { useNavigate } from 'react-router-dom'
import { BaseItem } from 'types/interface'
import upCommingPopupConfig from './upcomming_popup/upCommingPopupConfig'

const DashBoard = () => {
  const { breakPointsClass } = useBreakPoints()
  // const popularMovies = useRecoilValue(_popularMovies)
  // const topRatedMovies = useRecoilValue(_topRatedMovies)
  // const trendingMovies = useRecoilValue(_trendingMovies)
  const navigate = useNavigate()
  const { push: openTrailerPopup, PopupRouter: UpCommingTrailerPopupRouter } =
    usePopup(upCommingPopupConfig)
  const goDetailPage = (item: BaseItem) => {
    // navigation(`detail/${movieId}`)
    if (item.release_date) {
      navigate(`/movie/${item.id}`)
    } else {
      navigate(`/tv/${item.id}`)
    }
  }
  const openUpcommingPopup = (item: BaseItem) => {
    openTrailerPopup({
      name: 'UpcommingVideo',
      props: {
        item,
      },
    })
  }
  return (
    <div>
      <SearchBox />
      <div className={`dashboard ${breakPointsClass}`}>
        <PopularMovie toggleItems={TOGGLE_TRENDING_ITEMS} title={'트렌딩'} click={goDetailPage} />
        <PopularMovie toggleItems={TOGGLE_MOVIE_ITEM} title={'영화'} click={goDetailPage} />
        <PopularMovie toggleItems={TOGGLE_TV_ITEM} title={'TV'} click={goDetailPage} />
        <PopularMovie
          toggleItems={TOGGLE_UPCOMMING}
          title={'최신 예고편'}
          click={openUpcommingPopup}
        />
      </div>
      <UpCommingTrailerPopupRouter />
    </div>
  )
}

export default DashBoard
