import { Colors, LoadingSpinner, Navigation, PageLoadingSpinner } from 'my-react-component'
import { Suspense, useCallback, useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useBreakPoints, usePopup } from './hooks'
import { useI18nTypes } from './hooks/useI18nTypes'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loadingState } from './store/loading'
import '@/styles/app.scss'
import '@/components/common/styles/common.scss'
import signupPopupConfig from './views/signup_popup/signupPopupConfig'
import loginPopupConfig from './views/login_popup/loginPopupConfig'
import { getSession, user } from './store/user'
import BackEnd, { isMobile } from './networks'
import upCommingPopupConfig from './views/upcomming_popup/upCommingPopupConfig'
import { BaseItem } from 'types/interface'
import { toast } from './store/toast'
import HeaderItem from './components/header/HeaderItem'
import {
  HEADER_MOVIE_OPTION,
  HEADER_PERSON_OPTION,
  HEADER_TV_OPTION,
  IOption,
} from './const/overall'
import '@/components/filter/Filter.scss'
import userPopupConfig from './views/user_popup/userPopupConfig'
import IconButton from './components/common/Iconbutton'
import UserImage from './components/user/UserImage'
const App = () => {
  const { t } = useI18nTypes()
  const { breakPointsClass } = useBreakPoints()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useRecoilState(loadingState)
  const [loginUser, setLoginUser] = useRecoilState(user)
  const toastInstance = useRecoilValue(toast)
  const isNotDashBoardPage = useMemo(() => {
    return location.pathname !== '/'
  }, [location.pathname])
  const mobile = isMobile() || breakPointsClass === 'mobile'
  const desktop = breakPointsClass === 'desktop'
  const goBack = (isMain: boolean) => {
    if (isMain) {
      navigate('/')
    } else {
      navigate(-1)
    }
  }
  const goPage = useCallback((item: IOption) => {
    navigate(item.value)
  }, [])

  const logout = async () => {
    try {
      await BackEnd.getInstance()
        .user.logout()
        .then(() => toastInstance.logout())

      setLoginUser(null)
    } catch (e) {
      if (e instanceof Error) toastInstance.error(e.message)
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const isSession = getSession()
        if (isSession) {
          await BackEnd.getInstance()
            .user.checkLogin()
            .then((user) => {
              if (user) {
                setLoginUser(user)
                toastInstance.keepLogin()
              }
            })
        }
      } catch (e) {
        // error 처리 + app.tsx useEffect 리팩토링 필요함
      } finally {
        setLoading(false)
      }
    })()
  }, [toastInstance])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (!loginUser) return
    ;(async () => {
      try {
        const userFavorites = await BackEnd.getInstance().user.getUserFavorites(loginUser.uid)
        setLoginUser({
          ...loginUser,
          favorites: userFavorites?.favorites ?? [],
          favoritesMap: new Set(userFavorites?.favorites ?? []),
        })
      } catch (e) {
        if (e instanceof Error) toastInstance.error(e)
      }
    })()
  }, [loginUser?.uid])

  const { push: signup, PopupRouter: SignUpPopupRouter } = usePopup(signupPopupConfig)
  const { push: login, PopupRouter: LoginPopupRouter } = usePopup(loginPopupConfig)
  const { push: openUserStatusPopup, PopupRouter: UserStatusPopup } = usePopup(userPopupConfig)
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
      login: () => {
        login({
          name: 'Login',
        })
      },
    }
  }, [])

  return (
    <>
      <div className={`main-container ${breakPointsClass}`}>
        <Navigation
          title={t('app.dashboard.title')}
          isMobile={mobile}
          back={isNotDashBoardPage ? goBack : undefined}
          fixed={true}
        >
          <div className="header-items">
            <HeaderItem items={HEADER_MOVIE_OPTION} click={goPage} title="영화" isMobile={mobile} />
            <HeaderItem items={HEADER_TV_OPTION} click={goPage} title="TV" isMobile={mobile} />
            <HeaderItem
              items={HEADER_PERSON_OPTION}
              click={goPage}
              title="인물"
              isMobile={mobile}
            />
          </div>
          {!loginUser ? (
            <div className="user-button-container">
              <IconButton
                iconName="Login"
                iconSize={mobile ? 'medium' : 'small'}
                iconPosition="back"
                iconColor={Colors.grey_111}
                fontColor={Colors.grey_111}
                buttonBorder="transparent"
                click={() =>
                  login({
                    name: 'Login',
                  })
                }
              >
                {!mobile ? t('app.button.login') : null}
              </IconButton>
              <IconButton
                iconName="Signup"
                iconSize={mobile ? 'medium' : 'small'}
                iconPosition="back"
                iconColor={Colors.grey_111}
                fontColor={Colors.grey_111}
                buttonBorder="transparent"
                click={() =>
                  signup({
                    name: 'Signup',
                  })
                }
              >
                {!mobile ? t('app.button.signup') : null}
              </IconButton>
            </div>
          ) : (
            <div className="user-button-container">
              <UserImage
                imageUrl={loginUser.photoURL}
                click={() =>
                  openUserStatusPopup({
                    name: 'UserStatus',
                    props: {
                      logout,
                    },
                  })
                }
              />
            </div>
          )}
        </Navigation>
        <Suspense fallback={<PageLoadingSpinner text="please wait a second" />}>
          {!loading && <Outlet context={outletContext} />}
        </Suspense>
        <LoginPopupRouter />
        <SignUpPopupRouter />
        <UpCommingTrailerPopupRouter />
        <UserStatusPopup />
        {loading && <LoadingSpinner opacity={0.6} />}
      </div>
    </>
  )
}

export default App
