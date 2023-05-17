import ToastController from '@/types/toast'
import { atom } from 'recoil'

export const toast = atom<ToastController>({
  key: 'toast',
  default: undefined,
})
