import { useEffect } from 'react'
interface EventHookProps {
  confirm?: () => void
  cancel?: () => void
}
const useEventListener = ({ confirm, cancel }: EventHookProps) => {
  function keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      confirm?.()
    } else if (event.keyCode === 27) {
      cancel?.()
    }
  }
  useEffect(() => {
    window.addEventListener('keyup', keyUpEvent)

    return () => {
      window.removeEventListener('keyup', keyUpEvent)
    }
  }, [confirm, cancel])
}
export { useEventListener }
