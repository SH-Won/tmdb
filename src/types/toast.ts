import { t, TFunction } from 'i18next'
import { Dispatch, SetStateAction } from 'react'

interface IToast {
  add: ({ text, type }: Omit<ToastItem, 'id'>) => void
  delete: (id: ToastItem['id']) => void
  login: () => void
  logout: () => void
  keepLogin: () => void
  successAddFavorite: () => void
  successRemoveFavorite: () => void
  error: (message: string) => void
}
export interface ToastItem {
  id: string
  text: string
  type?: string
}

export default class ToastController implements IToast {
  setState: Dispatch<SetStateAction<ToastItem[]>> = () => {
    return null
  }
  constructor(setState: Dispatch<SetStateAction<ToastItem[]>> | null, t: TFunction) {
    if (setState) {
      this.setState = setState
    }
  }

  add = ({ text, type }: Omit<ToastItem, 'id'>) => {
    this.setState((prev) => [
      ...prev,
      { id: Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(), type, text },
    ])
  }

  delete = (id: ToastItem['id']) => {
    this.setState((prev) => {
      const findIndex = prev.findIndex((item) => item.id === id)
      if (findIndex > -1) {
        return [...prev.slice(0, findIndex), ...prev.slice(findIndex + 1)]
      }
      return prev
    })
  }
  keepLogin = () => {
    this.add({
      text: t('app.toast.keep_login'),
      type: 'keepLogin',
    })
  }
  login = () => {
    this.add({
      text: t('app.toast.login'),
      type: 'login',
    })
  }

  logout = () => {
    this.add({
      text: t('app.toast.logout'),
      type: 'logout',
    })
  }
  test = () => {
    this.add({
      text: t('app.toast.test'),
      type: 'error',
    })
  }
  successAddFavorite = () => {
    this.add({
      text: t('app.toast.success_add_favorite'),
      type: 'success_add_favorite',
    })
  }
  successRemoveFavorite = () => {
    this.add({
      text: t('app.toast.success_remove_favorite'),
      type: 'success_remove_favorite',
    })
  }
  error = (message: any) => {
    this.add({
      text: t(message),
      type: 'error',
    })
  }
}
