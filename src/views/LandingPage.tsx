import '@/styles/LandingPage.scss'
import { useHelper, useI18nTypes } from '@/hooks'
import ToggleItemSection from '@/components/section/ToggleItemSection'
import {
  TOGGLE_MOVIE_ITEM,
  TOGGLE_TV_ITEM,
  TOGGLE_TRENDING_ITEMS,
  TOGGLE_UPCOMMING,
} from '@/const/toggleBar'
import SearchBox from '@/components/main/SearchBox'
import { IOutletContext } from 'types/interface'
import UpcommingItemSection from '@/components/section/UpcommingItemSection'
import { useOutletContext } from 'react-router-dom'

const LandingPage = () => {
  const { t } = useI18nTypes()
  const { goDetailPage: goDetail } = useHelper()
  const { openTrailerPopup } = useOutletContext<IOutletContext>()
  return (
    <div>
      <SearchBox />
      <div className="dashboard">
        <ToggleItemSection
          toggleItems={TOGGLE_TRENDING_ITEMS}
          title={t('app.toggle.trendding')}
          click={goDetail}
        />
        <UpcommingItemSection
          toggleItems={TOGGLE_UPCOMMING}
          title={t('app.toggle.upcomming')}
          click={openTrailerPopup}
        />
        <ToggleItemSection
          toggleItems={TOGGLE_MOVIE_ITEM}
          title={t('app.toggle.movie')}
          click={goDetail}
        />
        <ToggleItemSection
          toggleItems={TOGGLE_TV_ITEM}
          title={t('app.toggle.tv')}
          click={goDetail}
        />
      </div>
    </div>
  )
}

export default LandingPage
