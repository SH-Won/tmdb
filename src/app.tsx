import { Button, Colors, HeaderBar, LoadingSpinner } from 'my-react-component'
import { useCallback, useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import { useBreakPoints, usePopup } from './hooks'
import { useI18nTypes } from './hooks/useI18nTypes'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loadingState } from './store/loading'
import '@/styles/app.scss'
import '@/components/common/styles/common.scss'
import HeaderSearchBox from './components/common/HeaderSearchBox'
import signupPopupConfig from './views/signup_popup/signupPopupConfig'
import loginPopupConfig from './views/login_popup/loginPopupConfig'
import { user } from './store/user'
import { toastState } from './store/toast'
import { Toast, toast } from './components/toast/Toast'
import BackEnd from './networks'
import upCommingPopupConfig from './views/upcomming_popup/upCommingPopupConfig'
import { BaseItem } from 'types/interface'
const App = () => {
  const { t } = useI18nTypes()
  const { breakPointsClass } = useBreakPoints()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useRecoilState(loadingState)
  const [loginUser, setLoginUser] = useRecoilState(user)
  // const [toast, setToast] = useRecoilState(toastState)
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
  const logout = async () => {
    await BackEnd.getInstance().user.logout()
    // setToast({
    //   key: 'logout',
    //   value: '로그아웃 되었습니다',
    // })
    toast.logout()
    setLoginUser(null)
  }
  const onClick = () => {
    toast.keepLogin()
  }
  useEffect(() => {
    if (loginUser) {
      // setToast({
      //   key: 'alreadyLogin',
      //   value: '로그인 된 상태 입니다',
      // })
      toast.keepLogin()
    }
  }, [])
  // const RenderToast = useCallback(() => {
  //   if (!toast.value) return null
  //   return <Toast toastState={toast} />
  // }, [toast.value])
  const { push: signup, PopupRouter: SignUpPopupRouter } = usePopup(signupPopupConfig)
  const { push: login, PopupRouter: LoginPopupRouter } = usePopup(loginPopupConfig)
  const { push: openTrailerPopup, PopupRouter: UpCommingTrailerPopupRouter } =
    usePopup(upCommingPopupConfig)

  const outletContext = useMemo(() => {
    return {
      openTrailerPopup: (item: BaseItem) => {
        openTrailerPopup({
          name: 'UpcommingVideo',
          props: {
            item,
          },
        })
      },
    }
  }, [])
  return (
    <>
      <div className={`main-container ${breakPointsClass}`}>
        <Navigation isNotDesktop={breakPointsClass !== 'desktop'} />
        <HeaderBar
          title={t('app.dashboard.title')}
          isMobile={breakPointsClass === 'mobile'}
          back={isNotDashBoardPage ? goBack : undefined}
        >
          {!loginUser ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                color={Colors.main}
                fontColor={Colors.white}
                click={() =>
                  login({
                    name: 'Login',
                  })
                }
              >
                로그인
              </Button>
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
              <Button
                color={Colors.white}
                fontColor={Colors.grey_111}
                border={Colors.grey_bbb}
                click={toast.login}
              >
                Test1
              </Button>
              <Button
                color={Colors.white}
                fontColor={Colors.grey_111}
                border={Colors.grey_bbb}
                click={toast.test}
              >
                Test2
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                color={Colors.white}
                fontColor={Colors.grey_111}
                border={Colors.grey_bbb}
                click={logout}
              >
                로그아웃
              </Button>
              <HeaderSearchBox isNotDashBoardPage={isNotDashBoardPage} />
            </div>
          )}
        </HeaderBar>
        {/* <Button color={Colors.white} ></Button> */}
        <Outlet context={outletContext} />
        <LoginPopupRouter />
        <SignUpPopupRouter />
        {loading && <LoadingSpinner opacity={0.6} />}
        {/* <RenderToast /> */}
        <Toast />
        {/* {toast.value && <Toast toastState={toast} />} */}
      </div>
      <UpCommingTrailerPopupRouter />
    </>
  )
}

export default App
