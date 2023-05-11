import { Button, Colors, HeaderBar, LoadingSpinner } from 'my-react-component'
import { useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import { useBreakPoints, usePopup } from './hooks'
import { useI18nTypes } from './hooks/useI18nTypes'
import { useRecoilState } from 'recoil'
import { loadingState } from './store/loading'
import '@/styles/app.scss'
import '@/components/common/styles/common.scss'
import HeaderSearchBox from './components/common/HeaderSearchBox'
import signupPopupConfig from './views/signup_popup/signupPopupConfig'
import loginPopupConfig from './views/login_popup/loginPopupConfig'
const App = () => {
  const { t } = useI18nTypes()
  const { breakPointsClass } = useBreakPoints()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useRecoilState(loadingState)
  const isNotDashBoardPage = useMemo(() => {
    return location.pathname !== '/'
  }, [location.pathname])

  const goBack = () => {
    navigate(-1)
  }
  // const movieQueries = useQueries([
  //   {
  //     queryKey: [MOVIE_CATEGORY.prefix, MOVIE_CATEGORY.POPULAR],
  //     queryFn: async () => {
  //       const response = await BackEnd.getInstance().movie.getMovies<IMovie[]>(
  //         MOVIE_CATEGORY.POPULAR
  //       )
  //       return response.data
  //     },
  //     onSuccess: (response: any) => {
  //       setPopularMovies(response.results)
  //     },
  //     staleTime: 50000,
  //   },
  //   {
  //     queryKey: [MOVIE_CATEGORY.prefix, MOVIE_CATEGORY.TOP_RATED],
  //     queryFn: async () => {
  //       const response = await BackEnd.getInstance().movie.getMovies(MOVIE_CATEGORY.TOP_RATED)
  //       return response.data
  //     },
  //     onSuccess: (response: any) => {
  //       setTopRatedMovies(response.results)
  //     },
  //     staleTime: 50000,
  //   },
  //   {
  //     queryKey: [MOVIE_CATEGORY.prefix, MOVIE_CATEGORY.TRENDING],
  //     queryFn: async () => {
  //       const response = await BackEnd.getInstance().movie.getTrendingMovies<IMovie[]>({
  //         media_type: 'all',
  //         time_window: 'day',
  //       })
  //       return response.data
  //     },
  //     onSuccess: (response: any) => {
  //       setTrendingMovies(response.results)
  //     },
  //     staleTime: 50000,
  //   },
  // ])
  // useEffect(() => {
  //   if (!movieQueries.some((query) => query.isLoading)) {
  //     setLoading(false)
  //   }
  // }, [movieQueries])

  // if (!isLoading) {
  //   console.log(
  //     Object.fromEntries(Object.entries(data.results[0]).map(([key, value]) => [key, typeof value]))
  //   )
  // }
  // setLoading(false)

  const { push: signup, PopupRouter: SignUpPopupRouter } = usePopup(signupPopupConfig)

  return (
    <div className={`main-container ${breakPointsClass}`}>
      <Navigation isNotDesktop={breakPointsClass !== 'desktop'} />
      <HeaderBar
        title={t('app.dashboard.title')}
        isMobile={breakPointsClass === 'mobile'}
        back={isNotDashBoardPage ? goBack : undefined}
      >
        <HeaderSearchBox isNotDashBoardPage={isNotDashBoardPage} />

        <Button
          color={Colors.white}
          fontColor={Colors.grey_111}
          border={Colors.grey_bbb}
          click={() =>
            signup({
              name: 'Signup',
            })
          }
        >
          회원가입
        </Button>
      </HeaderBar>
      {/* <Button color={Colors.white} ></Button> */}
      <Outlet />
      <SignUpPopupRouter />
      {loading && <LoadingSpinner opacity={0.6} />}
    </div>
  )
}

export default App
