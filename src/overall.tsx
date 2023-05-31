import { HeaderBar } from 'my-react-component'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useBreakPoints, useI18nTypes } from './hooks'
import '@/components/filter/Filter.scss'
import HeaderItem from './components/header/HeaderItem'
import { HEADER_MOVIE_OPTION, HEADER_PERSON_OPTION, HEADER_TV_OPTION } from './const/overall'
// import { useRecoilValue } from 'recoil'
// import { toast } from '@/store/toast'

const Overall = () => {
  const { t } = useI18nTypes()
  const navigate = useNavigate()
  const { breakPointsClass } = useBreakPoints()
  // const toastInstance = useRecoilValue(toast)

  const isNotDashBoardPage = useMemo(() => {
    return location.pathname !== '/'
  }, [location.pathname])

  const goBack = (isMain: boolean) => {
    if (isMain) {
      navigate('/')
    } else {
      navigate(-1)
    }
    // window.scrollTo(0, 0)
  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <div className={`${breakPointsClass}`}>
      <HeaderBar title={t('app.dashboard.title')} back={isNotDashBoardPage ? goBack : undefined}>
        <div style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
          <HeaderItem
            items={HEADER_MOVIE_OPTION}
            click={(item) => navigate(item.value)}
            title="영화"
          />
          <HeaderItem items={HEADER_TV_OPTION} click={(item) => navigate(item.value)} title="TV" />
          <HeaderItem
            items={HEADER_PERSON_OPTION}
            click={(item) => navigate(item.value)}
            title="인물"
          />
        </div>
      </HeaderBar>
      <Outlet />
    </div>
  )
}

export default Overall
