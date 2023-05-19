import { useEffect, useRef } from 'react'

const useCloseEvent = (closeEvent: () => void) => {
  const ref = useRef(null)
  const onClick = (e: any) => {
    if (!ref.current) return
    const current = ref.current as Element
    const element = e.target.closest(`.${current.className}`)
    if (!element) {
      closeEvent()
    }
  }
  useEffect(() => {
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return {
    ref,
  }
}

export { useCloseEvent }
