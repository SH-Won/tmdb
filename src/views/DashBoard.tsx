import '@/styles/DashBoard.scss'
import { useBreakPoints, useHelper } from '@/hooks'
import ToggleItemSection from '@/components/section/ToggleItemSection'
import {
  TOGGLE_MOVIE_ITEM,
  TOGGLE_TV_ITEM,
  TOGGLE_TRENDING_ITEMS,
  TOGGLE_UPCOMMING,
} from '@/const/toggleBar'
import SearchBox from '@/components/main/SearchBox'
import { BaseItem } from 'types/interface'
import UpcommingItemSection from '@/components/section/UpcommingItemSection'
import { useOutletContext } from 'react-router-dom'

type ContextProps = {
  openTrailerPopup: (item: BaseItem) => void
}
const DashBoard = () => {
  const { breakPointsClass } = useBreakPoints()
  const { goDetailPage } = useHelper()
  const { openTrailerPopup } = useOutletContext<ContextProps>()

  return (
    <div>
      <SearchBox />
      <div className={`dashboard ${breakPointsClass}`}>
        <ToggleItemSection
          toggleItems={TOGGLE_TRENDING_ITEMS}
          title={'트렌딩'}
          click={goDetailPage}
        />
        <UpcommingItemSection
          toggleItems={TOGGLE_UPCOMMING}
          title={'최신 예고편'}
          click={openTrailerPopup}
        />
        <ToggleItemSection toggleItems={TOGGLE_MOVIE_ITEM} title={'영화'} click={goDetailPage} />
        <ToggleItemSection toggleItems={TOGGLE_TV_ITEM} title={'TV'} click={goDetailPage} />
      </div>
    </div>
  )
}

export default DashBoard
