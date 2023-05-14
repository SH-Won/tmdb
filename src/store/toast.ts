import { ToastItem } from '@/types/toast'
import { atom, selector } from 'recoil'

export const _toastState = atom({
  key: 'toastObject',
  default: {
    key: '',
    value: '',
  },
})

export const toastState = selector({
  key: 'toastState',
  get: ({ get }) => {
    return get(_toastState)
  },
  set: ({ set, get }, newToastState) => {
    // const toast = get(_toastState)
    set(_toastState, newToastState)
  },
})

export const _toastStack = atom<ToastItem[]>({
  key: 'toastArray',
  default: [],
})

export const toastStack = selector<ToastItem[]>({
  key: 'toastStack',
  get: ({ get }) => {
    return get(_toastStack)
  },
  set: ({ set, get }, value) => {
    const prev = get(_toastStack)
    set(_toastStack, value)
  },
})
