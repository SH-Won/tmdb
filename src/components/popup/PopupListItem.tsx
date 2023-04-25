import { Colors, Element } from 'my-react-component'
import './Popup.scss'
interface PopupListItemProps {
  item: any
}
const PopupListItem = ({ item }: PopupListItemProps) => {
  return (
    <div className="popup-list-item" onClick={item.onClick}>
      <span>{item.name}</span>
      <Element name="Right" color={Colors.grey_666} size="medium" />
    </div>
  )
}

export default PopupListItem
