import { HeaderBar } from 'my-react-component'
import { useLayoutEffect, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useBreakPoints, useI18nTypes } from './hooks'
import '@/components/filter/Filter.scss'
import HeaderItem from './components/header/HeaderItem'
import { HEADER_MOVIE_OPTION, HEADER_TV_OPTION } from './const/overall'

const Overall = () => {
  const { t } = useI18nTypes()
  const navigate = useNavigate()
  const { breakPointsClass } = useBreakPoints()
  const isNotDashBoardPage = useMemo(() => {
    return location.pathname !== '/'
  }, [location.pathname])

  const goBack = () => {
    navigate(-1)
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className={`${breakPointsClass}`}>
      <HeaderBar title={t('app.dashboard.title')} back={isNotDashBoardPage ? goBack : undefined}>
        <HeaderItem
          items={HEADER_MOVIE_OPTION}
          click={(item) => navigate(item.value)}
          title="영화"
        />
        <HeaderItem items={HEADER_TV_OPTION} click={(item) => navigate(item.value)} title="TV" />
      </HeaderBar>
      <Outlet />
    </div>
  )
}

export default Overall
