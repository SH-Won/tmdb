import { Navigation } from 'my-react-component'
import { useEffect, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useBreakPoints, useI18nTypes } from './hooks'
import '@/components/filter/Filter.scss'
import HeaderItem from './components/header/HeaderItem'
import { HEADER_MOVIE_OPTION, HEADER_PERSON_OPTION, HEADER_TV_OPTION } from './const/overall'
import { isMobile } from './networks'

const Overall = () => {
  const { t } = useI18nTypes()
  const navigate = useNavigate()
  const { breakPointsClass } = useBreakPoints()
  const mobile = isMobile() || breakPointsClass === 'mobile'
  const isNotDashBoardPage = useMemo(() => {
    return location.pathname !== '/'
  }, [location.pathname])

  const goBack = (isMain: boolean) => {
    if (isMain) {
      navigate('/')
    } else {
      navigate(-1)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <div className={`${breakPointsClass}`}>
      <Navigation
        title={t('app.dashboard.title')}
        back={isNotDashBoardPage ? goBack : undefined}
        isMobile={breakPointsClass === 'mobile'}
      >
        <HeaderItem
          items={HEADER_MOVIE_OPTION}
          click={(item) => navigate(item.value)}
          title="영화"
          isMobile={mobile}
        />
        <HeaderItem
          items={HEADER_TV_OPTION}
          click={(item) => navigate(item.value)}
          title="TV"
          isMobile={mobile}
        />
        <HeaderItem
          items={HEADER_PERSON_OPTION}
          click={(item) => navigate(item.value)}
          title="인물"
          isMobile={mobile}
        />
      </Navigation>
      <Outlet />
    </div>
  )
}

export default Overall
