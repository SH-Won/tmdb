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
