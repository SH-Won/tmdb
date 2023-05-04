import '@/styles/DashBoard.scss'
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
import UpcommingMovie from '@/components/movies/UpcommingMovie'

const DashBoard = () => {
  const { breakPointsClass } = useBreakPoints()
  const navigate = useNavigate()
  const { push: openTrailerPopup, PopupRouter: UpCommingTrailerPopupRouter } =
    usePopup(upCommingPopupConfig)
  const goDetailPage = (item: BaseItem) => {
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
        <UpcommingMovie
          toggleItems={TOGGLE_UPCOMMING}
          title={'최신 예고편'}
          click={openUpcommingPopup}
        />
        <PopularMovie toggleItems={TOGGLE_MOVIE_ITEM} title={'영화'} click={goDetailPage} />
        <PopularMovie toggleItems={TOGGLE_TV_ITEM} title={'TV'} click={goDetailPage} />
      </div>
      <UpCommingTrailerPopupRouter />
    </div>
  )
}

export default DashBoard
