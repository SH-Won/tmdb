import { getSession, _user } from './../store/user'
import { useCallback } from 'react'
import { loadingState } from './../store/loading'
import { useRecoilState, useRecoilValue } from 'recoil'
import { toast } from '@/store/toast'
import BackEnd from '@/networks'
import { ILoginProvider } from 'types/interface'
const useUser = () => {
  const [loading, setLoading] = useRecoilState(loadingState)
  const [loginUser, setLoginUser] = useRecoilState(_user)
  const toastInstance = useRecoilValue(toast)

  const checkLogin = useCallback(async () => {
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
      checkLogin()
    } finally {
      setLoading(false)
    }
  }, [toastInstance])
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
        toastInstance.login()
      }
    } catch (e) {
      callback?.()
      if (e instanceof Error) toastInstance.error(e.message)
    }
  }

  return {
    login,
    logout,
    checkLogin,
  }
}
export { useUser }
