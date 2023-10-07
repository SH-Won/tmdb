import { Colors, LoadingSpinner, Navigation, PageLoadingSpinner } from 'my-react-component'
import { Suspense, useCallback, useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useBreakPoints, usePopup, useUser } from './hooks'
import { useI18nTypes } from './hooks/useI18nTypes'
import '@/styles/app.scss'
import '@/components/common/styles/common.scss'
import signupPopupConfig from './views/signup_popup/signupPopupConfig'
import loginPopupConfig from './views/login_popup/loginPopupConfig'
import { isMobile } from './networks'
import upCommingPopupConfig from './views/upcomming_popup/upCommingPopupConfig'
import { BaseItem } from 'types/interface'
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
  const { logout, getUserFavorites, checkLogin, loading, loginUser } = useUser()
  const isNotDashBoardPage = useMemo(() => {
    return location.pathname !== '/'
  }, [location.pathname])
  const mobile = isMobile() || breakPointsClass === 'mobile'
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  useEffect(() => {
    checkLogin()
  }, [])
  useEffect(() => {
    getUserFavorites()
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
