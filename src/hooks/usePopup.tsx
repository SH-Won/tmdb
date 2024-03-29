import { RegisterRouter, RouteHistory, RouterPushParams } from '@/types/popup/RouterTypes'
import { Suspense, useCallback, useState } from 'react'
// import Event from 'eventemitter3'
import { useBreakPoints } from './useBreakPoints'
import BasicPopup from '@/components/BasicPopup'
import { LoadingSpinner } from 'my-react-component'

// Popup 을 class 를 만들어 eventemitter 로 이벤트를 처리하고
// class 속에서 history 를 처리하고 싶었지만 eact 는 state 불변성으로 Object.defineProperty 가 불가능
const usePopup = (registedRoutes: RegisterRouter[]) => {
  const { breakPointsClass } = useBreakPoints()
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [CurrentRoute, setCurrentRoute] = useState(registedRoutes[0].component)
  const [history, setHistory] = useState<RouteHistory[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('팝업')
  const push = (route: RouterPushParams): void => {
    const findRoute = registedRoutes.find((r) => r.name === route.name)
    setCurrentIndex((prev) => prev + 1)
    const historyObj = {
      name: route.name,
      props: route.props,
      title: findRoute?.title ?? '팝업',
      events: route.events,
      component: findRoute?.component,
      maxProgress: findRoute?.maxProgress,
      progress: findRoute?.progress,
    }
    setHistory((prev) => [...prev, historyObj])
    setTitle(historyObj.title)
    setCurrentRoute(findRoute?.component)
    setOpen(true)
  }
  const go = (index: number) => {
    let calcIndex = currentIndex + index
    if (calcIndex < 0) {
      calcIndex = 0
    } else if (calcIndex >= history.length) {
      calcIndex = history.length - 1
    }
    setCurrentIndex((prev) => calcIndex)
    setCurrentRoute(history[calcIndex].component)
    setHistory((prev) => prev.slice(0, -1))
    // setProgress(history.length - 1)
    setTitle(history[calcIndex].title)
  }
  const back = (index = -1) => {
    if (currentIndex === 0) {
      return
    }
    go(-1)
  }
  const close = () => {
    setCurrentIndex(-1)
    setHistory([])
    setCurrentRoute(registedRoutes[0].component)
    setOpen(false)
  }

  const PopupRouter = useCallback(() => {
    const routeProps = {
      ...history[currentIndex]?.props,
      push,
      close,
    }
    const maxProgress = history[currentIndex]?.maxProgress
    const progress = history[currentIndex]?.progress
    return (
      <BasicPopup
        isMobile={breakPointsClass === 'mobile'}
        isOpen={open}
        back={back}
        close={close}
        title={title}
        maxProgress={maxProgress}
        progress={progress}
      >
        <Suspense fallback={<LoadingSpinner opacity={0} />}>
          <CurrentRoute {...routeProps} />
        </Suspense>
      </BasicPopup>
    )
  }, [breakPointsClass, open, CurrentRoute])
  return {
    PopupRouter,
    push,
  }
}
export { usePopup }
