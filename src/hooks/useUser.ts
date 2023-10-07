import { useOutletContext } from 'react-router-dom'
import { useI18nTypes } from '@/hooks'
import { getSession, _user } from './../store/user'
import { loadingState } from './../store/loading'
import { useRecoilState } from 'recoil'
import BackEnd from '@/networks'
import { ILoginProvider, IOutletContext } from 'types/interface'
import { useToast } from './useToast'
import { Media } from '@/const/overall'
const useUser = () => {
  const { t } = useI18nTypes()
  const [loading, setLoading] = useRecoilState(loadingState)
  const [loginUser, setLoginUser] = useRecoilState(_user)
  const { showToast } = useToast()
  const checkLogin = async () => {
    // toast 가 생성되기전에 이미 checkLogin 이 실행 됨
    // useEffect 에 의존성 배열에 toastInstance class 여부를 확인해서
    // checkLogin 하는것이 어색해 toast 구조를 전역스토어를 사용하는 방식으로 변경
    setLoading(true)
    try {
      const isSession = getSession()
      if (isSession) {
        await BackEnd.getInstance()
          .user.checkLogin()
          .then((user) => {
            if (user) {
              setLoginUser(user)
              showToast({
                type: 'success',
                text: t('app.toast.keep_login'),
              })
            }
          })
      }
    } catch (e) {
      // checkLogin()
    } finally {
      setLoading(false)
    }
  }
  const logout = async () => {
    try {
      await BackEnd.getInstance()
        .user.logout()
        .then(() =>
          showToast({
            type: 'success',
            text: t('app.toast.logout'),
          })
        )
      setLoginUser(null)
    } catch (e) {
      if (e instanceof Error)
        showToast({
          type: 'error',
          text: t('app.toast.logout_fail'),
        })
    }
  }
  const login = async (providerName: ILoginProvider['name'], callback?: () => void) => {
    try {
      const result = await BackEnd.getInstance()
        .user.login(providerName)
        .then((response) => {
          const { user, token, credential } = response
          const obj = {
            displayName: user.displayName as string,
            email: user.email as string,
            emailVerified: user.emailVerified as boolean,
            uid: user.uid as string,
            // accessToken: user.stsTokenManager.accessToken as string,
            // expirationTime: user.stsTokenManager.expirationTime as number,
            // refreshToken: user.stsTokenManager.refreshToken as string,
            photoURL: user.photoURL as string,
            favorites: [],
            favoritesMap: new Set<string>(),
          }
          return obj
        })
      if (result) {
        callback?.()
        setLoginUser(result)
        showToast({
          type: 'success',
          text: t('app.toast.login'),
        })
      }
    } catch (e) {
      callback?.()
      if (e instanceof Error)
        showToast({
          type: 'error',
          text: t('app.toast.login_fail'),
        })
    }
  }
  const getUserFavorites = async () => {
    if (!loginUser) return
    try {
      const userFavorites = await BackEnd.getInstance().user.getUserFavorites(loginUser.uid)
      setLoginUser({
        ...loginUser,
        favorites: userFavorites?.favorites ?? [],
        favoritesMap: new Set(userFavorites?.favorites ?? []),
      })
    } catch (e) {
      if (e instanceof Error)
        showToast({
          type: 'error',
          text: t('app.toast.fail_user_info'),
        })
    }
  }
  const addFavorite = async (media_type: Media, id: string) => {
    if (!loginUser?.uid) {
      // login popup 띄우는걸 어떻게 처리하는게 좋을까
      const userConfirm = confirm('로그인이 필요합니다')
      if (userConfirm) return 'needLogin'
      return
    }
    try {
      let response

      if (!loginUser.favorites.length) {
        response = await BackEnd.getInstance().user.createFavorite(
          loginUser!.uid,
          `${media_type}:${id}`
        )
      } else {
        response = await BackEnd.getInstance().user.addFavorite(
          loginUser!.uid,
          `${media_type}:${id}`
        )
      }
      if (response) {
        const newFavorites = [...loginUser.favorites, `${media_type}:${id}`]
        setLoginUser({
          ...loginUser,
          favorites: newFavorites,
          favoritesMap: new Set(newFavorites),
        })
        showToast({
          type: 'success',
          text: t('app.toast.success_add_favorite'),
        })
      }
    } catch (e) {
      // if (e instanceof Error) toastInstance.error(e.message)
    }
  }
  const removeFavorite = async (media_type: Media, id: string) => {
    if (!loginUser) return
    try {
      const response = await BackEnd.getInstance().user.removeFavorite(
        loginUser!.uid,
        `${media_type}:${id}`
      )

      if (response) {
        const newFavoritesMap = new Set(loginUser.favorites)
        newFavoritesMap.delete(`${media_type}:${id}`)
        setLoginUser({
          ...loginUser,
          favorites: Array.from(newFavoritesMap),
          favoritesMap: newFavoritesMap,
        })
        showToast({
          type: 'success',
          text: t('app.toast.success_remove_favorite'),
        })
      }
    } catch (e) {
      // if (e instanceof Error) toastInstance.error(e.message)
    }
  }

  return {
    loading,
    loginUser,
    login,
    logout,
    checkLogin,
    getUserFavorites,
    addFavorite,
    removeFavorite,
  }
}
export { useUser }
