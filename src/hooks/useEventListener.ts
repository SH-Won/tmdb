import { useEffect } from 'react'
interface EventHookProps {
  confirm?: () => void
  cancel?: () => void
}
const useEventListener = ({ confirm, cancel }: EventHookProps) => {
  // 클로저 이용해서 하는 방식도 좋을꺼같음
  // input 에 key event 를 넣을지
  // 전역으로 event 를 등록할지는 고민이 좀 필요함
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
