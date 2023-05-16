import { PopupRouter } from '@/types/popup/popupRouter'
import { RegisterRouter } from '@/types/popup/RouterTypes'
import { atom, atomFamily, selector, selectorFamily } from 'recoil'

export const popupStore = atom<Record<number, PopupRouter>>({
  key: 'popupStore',
  default: {},
})
// Record<number,RegisterRouter[]>
export const createPopupRoute = selector<Record<number, PopupRouter>>({
  key: 'createPopupRoute',
  // get: ({ get }) => {
  //   const popupRouterIndexArr = Object.keys(get(popupStore))
  //   return popupRouterIndexArr
  // },
  get: ({ get }) => {
    return []
  },
  set: ({ get, set }, routerConfig) => {
    const popupRoutes = get(popupStore)
    // const popupRouterIndex = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    // const popupRouter = new PopupRouter(routerConfig as RegisterRouter[])
    set(popupStore, {
      ...popupRoutes,
      // [popupRouterIndex]: routerConfig as RegisterRouter[],
      // [popupRouterIndex]: popupRouter,
      ...routerConfig,
    })
  },
})
export const currentRoute = selectorFamily({
  key: 'currentRouter',
  get:
    (popupRouterIndex: number) =>
    ({ get }) => {
      const _currentRoute = get(popupStore)[popupRouterIndex]
      return _currentRoute
    },
})
