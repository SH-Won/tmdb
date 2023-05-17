export interface RegisterRouter {
  name: string
  title?: string
  maxProgress?: number
  progress?: number
  component: any
}
export interface RouterPushParams {
  name: string
  props?: Record<string, any>
  events?: Record<string, any>
}

export interface RouteHistory {
  name: string
  component: any
  title: string
  progress?: number
  maxProgress?: number
  props?: Record<string, any>
  events?: Record<string, any>
}
export interface PopupComponentProps {
  close: () => void
  push: (route: RouterPushParams) => void
}
