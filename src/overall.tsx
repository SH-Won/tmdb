import { HeaderBar } from 'my-react-component'
import { useLayoutEffect, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useBreakPoints, useI18nTypes } from './hooks'

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
      <HeaderBar title={t('app.dashboard.title')} back={isNotDashBoardPage ? goBack : undefined} />
      <Outlet />
    </div>
  )
}

export default Overall
