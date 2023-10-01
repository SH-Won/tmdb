import { getAuth } from 'firebase/auth'
// import { auth } from '@/networks/firebase'
import { atom, selector } from 'recoil'

// const getUser = () => {
//   const auth = getAuth()
//   if (auth.currentUser) {
//     return auth.currentUser
//   } else {
//     return undefined
//   }
// }
// export const _user = atom({
//   key: '_user',
//   default: getUser,
// })
const getSession = () => {
  const sessionKey = `firebase:authUser:${import.meta.env.VITE_FIREBASE_API_KEY}:[DEFAULT]`
  const session = sessionStorage.getItem(sessionKey)
  const userSessionInfo = {
    displayName: '',
    email: '',
    emailVerified: false,
    uid: '',
    // accessToken: '',
    // refreshToken: '',
    // expirationTime: 0,
    photoURL: '',
  }
  if (session) {
    const sessionInfo = JSON.parse(session)
    userSessionInfo.displayName = sessionInfo.displayName
    userSessionInfo.email = sessionInfo.email
    userSessionInfo.emailVerified = sessionInfo.emailVerified
    userSessionInfo.uid = sessionInfo.uid
    userSessionInfo.photoURL = sessionInfo.photoURL
    //   (userSessionInfo.accessToken = sessionInfo.stsTokenManager.accessToken)
    //   (userSessionInfo.refreshToken = sessionInfo.stsTokenManager.refreshToken)
    //   (userSessionInfo.expirationTime = sessionInfo.stsTokenManager.expirationTime)
  }
  return session ? userSessionInfo : null
}
export const _user = atom({
  key: '_user',
  default: getSession(),
})
export const user = selector({
  key: 'user',
  get: ({ get }) => {
    return get(_user)
  },
  set: ({ set }, newValue) => {
    set(_user, newValue)
  },
})
