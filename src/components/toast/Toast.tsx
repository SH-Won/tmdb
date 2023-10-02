import { useI18nTypes } from '@/hooks'
import { toast } from '@/store/toast'
import ToastController, { ToastItem } from '@/types/toast'
import { Colors, Element } from 'my-react-component'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import './Toast.scss'
interface ToastItemProps {
  item: ToastItem
  duration?: number
  isStartAnimation: boolean
  deleteItem: (id: ToastItem['id']) => void
}
const ToastItemComponent = ({ deleteItem, item, isStartAnimation }: ToastItemProps) => {
  const duration = 3000

  useEffect(() => {
    let removeTimer: NodeJS.Timeout
    if (isStartAnimation) {
      removeTimer = setTimeout(() => {
        deleteItem(item.id)
      }, duration - 200)
    }

    return () => {
      clearTimeout(removeTimer)
    }
  }, [isStartAnimation])
  const animation = {
    animation: 'appearAndHide 3s linear',
    WebkitAnimation: 'appearAndHide 3s linear',
  }
  return (
    <div
      className={`toast-item ${item.type === 'error' ? 'error' : ''}`}
      style={isStartAnimation ? animation : {}}
    >
      <Element name="Check" size="medium" color={Colors.white} />
      <span>{item.text}</span>
    </div>
  )
}
export const Toast = () => {
  const [toastInstance, setToastInstance] = useRecoilState(toast)
  const [toastItems, setToastItems] = useState<ToastItem[]>([])
  const { t } = useI18nTypes()
  useEffect(() => {
    setToastInstance(new ToastController(setToastItems, t))
  }, [])
  return (
    <div className="toast">
      {toastItems.length > 0 &&
        toastItems.map((item, index) => (
          <ToastItemComponent
            key={item.id}
            item={item}
            deleteItem={toastInstance.delete}
            isStartAnimation={index === 0}
          />
        ))}
    </div>
  )
}
