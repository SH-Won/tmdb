import { toastStack } from '@/store/toast'
import ToastController, { ToastItem } from '@/types/toast'
import { Colors, Element } from 'my-react-component'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import './Toast.scss'
interface ToastProps {
  toastState: {
    key: string
    value: string
  }
}
interface ToastItemProps {
  item: ToastItem
  deleteItem: (id: ToastItem['id']) => void
}
export let toast: ToastController = new ToastController(null)
const ToastItemComponent = ({ deleteItem, item }: ToastItemProps) => {
  const duration = 2500
  useEffect(() => {
    const removeTimer = setTimeout(() => {
      deleteItem(item.id)
    }, duration - 200)

    return () => {
      clearTimeout(removeTimer)
    }
  }, [item, deleteItem])
  return (
    <div className="toast-item">
      <Element name="Check" size="medium" color={Colors.white} />
      <span>{item.text}</span>
    </div>
  )
}
export const Toast = () => {
  const [toastItem, setToastItem] = useRecoilState(toastStack)

  useEffect(() => {
    toast = new ToastController(setToastItem)
  }, [])
  return (
    <div className="toast">
      {toastItem.map((item) => (
        <ToastItemComponent key={item.id} item={item} deleteItem={toast.delete} />
      ))}
    </div>
  )
}
