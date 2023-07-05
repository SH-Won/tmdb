export const popupRouter = 1

// import { markRaw } from 'vue'
// import Event from 'eventemitter3'
import type { RouterPushParams, RouteHistory, RegisterRouter } from './RouterTypes'

class PopupRouter {
  // eventEmitter: Event
  registeredRoutes: RegisterRouter[]
  history: RouteHistory[]
  currentRoute: RouteHistory | undefined
  currentRouteIndex: number

  constructor(public registerRoutes: RegisterRouter[]) {
    this.registeredRoutes = registerRoutes
    // this.eventEmitter = new Event()
    this.history = []
    this.currentRoute
    this.currentRouteIndex = -1
  }
  push(route: RouterPushParams) {
    const component = this.registeredRoutes.find((r) => r.name === route.name)?.component
    if (route.props) {
      // markRaw(route.props)
    }
    const historyObject = {
      name: route.name,
      component,
      props: route.props,
      events: route.events,
      title: '',
    }
    // this.currentRouteIndex = this.currentRouteIndex + 1
    Object.defineProperty(this, 'currentRouteIndex', {
      value: this.currentRouteIndex++,
      writable: true,
    })
    this.history.push(historyObject)
    this.currentRoute = historyObject
    // this.eventEmitter.emit('changeRoute', this.currentRoute)
  }
  go(index: number) {
    this.currentRouteIndex += index
    if (this.currentRouteIndex < 0) {
      this.currentRouteIndex = 0
    } else if (this.currentRouteIndex >= this.history.length) {
      this.currentRouteIndex = this.history.length - 1
    }
    this.currentRoute = this.history[this.currentRouteIndex]
    // this.eventEmitter.emit('changeRoute', this.history[this.currentRouteIndex])
  }
  back(index = -1) {
    this.go(index)
  }
  close() {
    this.currentRoute = undefined
    this.currentRouteIndex = -1
    this.history = []
    // this.eventEmitter.emit('close')
  }
}
export { PopupRouter }
