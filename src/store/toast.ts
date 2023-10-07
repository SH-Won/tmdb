import ToastController from '@/types/toast'
import { atom } from 'recoil'

export interface IToastItem {
  id: string
  type: 'success' | 'error'
  text: string
}
export const toast = atom<ToastController>({
  key: 'toast',
  default: undefined,
})
export const toastItems = atom<IToastItem[]>({
  key: 'toastItems',
  default: [],
})
