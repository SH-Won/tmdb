import { useI18nTypes, useToast } from '@/hooks'
import { toast, toastItems } from '@/store/toast'
import ToastController, { ToastItem } from '@/types/toast'
import { Colors, Element } from 'my-react-component'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import './Toast.scss'
interface ToastItemProps {
  item: ToastItem
  duration?: number
  isStartAnimation: boolean
  deleteItem: (id: ToastItem['id']) => void
}
const ToastItemComponent = ({ deleteItem, item, isStartAnimation }: ToastItemProps) => {
  const duration = 2000

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
  // const [toastInstance, setToastInstance] = useRecoilState(toast)
  // const [toastItems, setToastItems] = useState<ToastItem[]>([])
  // const { t } = useI18nTypes()
  // const items = useRecoilValue(toastItems)
  const { items, removeToast } = useToast()
  // useEffect(() => {
  //   setToastInstance(new ToastController(setToastItems, t))
  // }, [])
  return (
    <div className="toast">
      {items.length > 0 &&
        items.map((item, index) => (
          <ToastItemComponent
            key={item.id}
            item={item}
            deleteItem={removeToast}
            isStartAnimation={index === 0}
          />
        ))}
    </div>
  )
}
