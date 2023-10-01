import {
  Button,
  Colors,
  Element,
  LoadingSpinner,
  Navigation,
  PageLoadingSpinner,
} from 'my-react-component'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
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
import UserProfilePopup from './views/user_popup/UserProfilePopup'
const App = () => {
  const { t } = useI18nTypes()
  const { breakPointsClass } = useBreakPoints()
  const location = useLocation()
  const navigate = useNavigate()
  const loading = useRecoilValue(loadingState)
  const [loginUser, setLoginUser] = useRecoilState(user)
  const toastInstance = useRecoilValue(toast)
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

  const logout = async () => {
    await BackEnd.getInstance().user.logout()
    toastInstance.logout()
    setLoginUser(null)
  }

  useEffect(() => {
    if (loginUser && toastInstance) {
      toastInstance.keepLogin()
    }
  }, [toastInstance])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const intersectingNavi = useRef<HTMLDivElement>(null)

  const { push: signup, PopupRouter: SignUpPopupRouter } = usePopup(signupPopupConfig)
  const { push: login, PopupRouter: LoginPopupRouter } = usePopup(loginPopupConfig)
  const { push: openTrailerPopup, PopupRouter: UpCommingTrailerPopupRouter } =
    usePopup(upCommingPopupConfig)
  const { push: openUserStatusPopup, PopupRouter: UserStatusPopup } = usePopup([
    {
      name: 'UserStatus',
      title: '내 정보',
      component: () => (props: any) => <UserProfilePopup {...props} />,
    },
  ])
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
              <Button
                color={Colors.main}
                fontColor={Colors.white}
                click={() =>
                  login({
                    name: 'Login',
                  })
                }
              >
                {t('app.button.login')}
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
                {t('app.button.signup')}
              </Button>
            </div>
          ) : (
            <div className="user-button-container">
              <Button
                color={Colors.white}
                fontColor={Colors.grey_111}
                border={Colors.grey_bbb}
                click={() => {
                  openUserStatusPopup({
                    name: 'UserStatus',
                    props: {
                      logout,
                    },
                  })
                }}
              >
                {/* {t('app.button.user_status')} */}
                <Element size="medium" name="Gear" color={Colors.grey_111} />
              </Button>
              {/* <Button
                color={Colors.white}
                fontColor={Colors.grey_111}
                border={Colors.grey_bbb}
                click={logout}
              >
                {t('app.button.logout')}
              </Button> */}
              <HeaderSearchBox isNotDashBoardPage={isNotDashBoardPage} />
            </div>
          )}
        </Navigation>
        <div className="intersecting-navi" ref={intersectingNavi}></div>

        <Suspense fallback={<PageLoadingSpinner text="please wait a second" />}>
          <Outlet context={outletContext} />
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
