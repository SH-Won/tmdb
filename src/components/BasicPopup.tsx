import { Popup, PopupBasicHeader } from 'my-react-component'

interface Props {
  popupRouterIndex?: number
  isOpen: boolean
  isMobile: boolean
  children: JSX.Element
  back?: () => void
  close: () => void
  title?: string
  progress?: number
  maxProgress?: number
}
const BasicPopup = (props: Props) => {
  return (
    <Popup isOpen={props.isOpen} isMobile={props.isMobile}>
      <PopupBasicHeader
        back={props.back}
        close={props.close}
        title={props.title!}
        maxProgress={props.maxProgress}
        progress={props.progress}
      />
      {props.children}
    </Popup>
  )
}

export default BasicPopup
