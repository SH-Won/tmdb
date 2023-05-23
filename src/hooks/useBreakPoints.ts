import { useCallback, useEffect, useMemo, useState } from 'react'
import { setTimeout } from 'timers'

type ClassType = 'mobile' | 'tablet' | 'desktop' | ''
const useBreakPoints = () => {
  const [currentClass, setCurrentClass] = useState<ClassType>('')
  const [breakPoints, setBreakPoints] = useState<number>(window.innerWidth)
  const defaultBreakPoinsts = {
    mobile: 500,
    tablet: 900,
    desktop: 1100,
  }
  const throttle = useCallback((func: () => void, time: number) => {
    let timer: ReturnType<typeof setTimeout>
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func()
      }, time)
    }
  }, [])
  const resize = useCallback(() => {
    if (window.innerWidth < defaultBreakPoinsts['mobile']) {
      setCurrentClass('mobile')
    } else if (
      window.innerWidth >= defaultBreakPoinsts['mobile'] &&
      window.innerWidth < defaultBreakPoinsts['tablet']
    ) {
      setCurrentClass('tablet')
    } else {
      setCurrentClass('desktop')
    }
    setBreakPoints(window.innerWidth)
  }, [])

  useEffect(() => {
    const windowResize = throttle(resize, 200)
    window.addEventListener('resize', windowResize)
    resize()
    return () => {
      window.removeEventListener('resize', windowResize)
    }
  }, [])
  const breakPointsClass = useMemo(() => {
    return currentClass
  }, [currentClass])

  return {
    breakPointsClass,
  }
}

export { useBreakPoints }
