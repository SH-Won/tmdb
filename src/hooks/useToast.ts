import { IToastItem, toastItems } from '@/store/toast'
import { useRecoilState } from 'recoil'
const useToast = () => {
  const [items, setItems] = useRecoilState(toastItems)

  const showToast = (toastItem: Omit<IToastItem, 'id'>) => {
    setItems((prev) => {
      return [
        ...prev,
        {
          ...toastItem,
          id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
        },
      ]
    })
  }
  const removeToast = () => {
    setItems((prev) => {
      return prev.slice(1)
    })
  }
  return {
    items,
    showToast,
    removeToast,
  }
}

export { useToast }
