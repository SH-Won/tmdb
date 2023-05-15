import { SetterOrUpdater } from 'recoil'

interface IToast {
  add: ({ text, type }: Omit<ToastItem, 'id'>) => void
  delete: (id: ToastItem['id']) => void
  login: () => void
  logout: () => void
  keepLogin: () => void
}
export interface ToastItem {
  id: string
  text: string
  type?: string
}

export default class ToastController implements IToast {
  setState: SetterOrUpdater<ToastItem[]> = () => {
    return null
  }
  constructor(setState: SetterOrUpdater<ToastItem[]> | null) {
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
      text: '로그인 된 상태입니다',
      type: 'keepLogin',
    })
  }
  login = () => {
    this.add({
      text: '로그인 되었습니다',
      type: 'login',
    })
  }

  logout = () => {
    this.add({
      text: '로그아웃 되었습니다',
      type: 'logout',
    })
  }
  test = () => {
    this.add({
      text: '테스트 토스트 입니다',
      type: 'test',
    })
  }
}
