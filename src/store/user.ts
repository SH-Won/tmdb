import { atom, selector } from 'recoil'

export interface IUser {
  displayName: string
  email: string
  emailVerified: boolean
  uid: string
  photoURL: string
  favorites: string[]
  favoritesMap: Set<string>
}
export const getSession = () => {
  const sessionKey = `firebase:authUser:${import.meta.env.VITE_FIREBASE_API_KEY}:[DEFAULT]`
  const session = sessionStorage.getItem(sessionKey)
  return session ? true : false
}
export const _user = atom<IUser | null>({
  key: '_user',
  default: null,
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
