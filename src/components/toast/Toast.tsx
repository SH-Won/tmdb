import { Colors, Element } from 'my-react-component'
import React from 'react'
import './Toast.scss'
interface ToastProps {
  toastState: {
    key: string
    value: string
  }
}
const Toast = ({ toastState }: ToastProps) => {
  return (
    <div className="toast">
      <div className="toast-item">
        <Element name="Check" size="medium" color={Colors.white} />
        <span>{toastState.value}</span>
      </div>
    </div>
  )
}

export default Toast
