import { Button, Colors, LoadingSpinner, Navigation } from 'my-react-component'
import { useEffect, useMemo } from 'react'
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
import BackEnd from './networks'
import upCommingPopupConfig from './views/upcomming_popup/upCommingPopupConfig'
import { BaseItem } from 'types/interface'
import { toast } from './store/toast'
import HeaderItem from './components/header/HeaderItem'
import { HEADER_MOVIE_OPTION, HEADER_PERSON_OPTION, HEADER_TV_OPTION } from './const/overall'
import '@/components/filter/Filter.scss'
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

  const goBack = (isMain: boolean) => {
    if (isMain) {
      navigate('/')
    } else {
      navigate(-1)
    }
  }

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
        <Navigation
          title={t('app.dashboard.title')}
          isMobile={breakPointsClass === 'mobile'}
          back={isNotDashBoardPage ? goBack : undefined}
        >
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
          {!loginUser ? (
            <div style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
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
              {/* <HeaderSearchBox isNotDashBoardPage={isNotDashBoardPage} /> */}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
              <Button
                color={Colors.white}
                fontColor={Colors.grey_111}
                border={Colors.grey_bbb}
                click={logout}
              >
                {t('app.button.logout')}
              </Button>
              <HeaderSearchBox isNotDashBoardPage={isNotDashBoardPage} />
            </div>
          )}
        </Navigation>

        <Outlet context={outletContext} />
        <LoginPopupRouter />
        <SignUpPopupRouter />
        <UpCommingTrailerPopupRouter />
        {loading && <LoadingSpinner opacity={0.6} />}
      </div>
    </>
  )
}

export default App

// <HeaderBar
//           title={t('app.dashboard.title')}
//           isMobile={breakPointsClass === 'mobile'}
//           back={isNotDashBoardPage ? goBack : undefined}
//         >
// {!loginUser ? (
//   <div style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
//     <Button
//       color={Colors.main}
//       fontColor={Colors.white}
//       click={() =>
//         login({
//           name: 'Login',
//         })
//       }
//     >
//       {t('app.button.login')}
//     </Button>
//     <Button
//       color={Colors.white}
//       fontColor={Colors.grey_111}
//       border={Colors.grey_bbb}
//       click={() =>
//         signup({
//           name: 'Signup',
//         })
//       }
//     >
//       {t('app.button.signup')}
//     </Button>
//     <HeaderSearchBox isNotDashBoardPage={isNotDashBoardPage} />
//     {/* <Button
//       color={Colors.white}
//       fontColor={Colors.grey_111}
//       border={Colors.grey_bbb}
//       click={toastInstance?.login}
//     >
//       Test1
//     </Button>
//     <Button
//       color={Colors.white}
//       fontColor={Colors.grey_111}
//       border={Colors.grey_bbb}
//       // click={toast.test}
//       click={toastInstance?.test}
//     >
//       Test2
//     </Button> */}
//   </div>
// ) : (
//   <div style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
//     <Button
//       color={Colors.white}
//       fontColor={Colors.grey_111}
//       border={Colors.grey_bbb}
//       click={logout}
//     >
//       {t('app.button.logout')}
//     </Button>
//     <HeaderSearchBox isNotDashBoardPage={isNotDashBoardPage} />
//   </div>
// )}
//         </HeaderBar>
