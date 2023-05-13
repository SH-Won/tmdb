import { atom, selector } from 'recoil'

export const _toastState = atom({
  key: '_toastState',
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
  set: ({ set }, newToastState) => {
    set(_toastState, newToastState)
  },
})
