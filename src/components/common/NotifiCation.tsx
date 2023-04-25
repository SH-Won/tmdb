import { Colors, Element } from 'my-react-component'
import './styles/Notification.scss'
interface NotifiCationProps {
  children?: JSX.Element | JSX.Element[] | string
  text?: string
  title?: string
  height?: string
}
const NotifiCation = (props: NotifiCationProps) => {
  return (
    <div className="notification">
      {props.children}
      <div className="info" style={{ height: props.height }}>
        <Element name="Caution" size="small" color={Colors.grey_bbb} />
        <span>{props.text}</span>
      </div>
    </div>
  )
}

export default NotifiCation
