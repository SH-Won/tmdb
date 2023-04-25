import { Button, Element } from 'my-react-component'

interface IconButtonProps {
  iconName: string
  iconSize: 'big' | 'medium' | 'small' | 'custom'
  iconColor: string
  ButtonColor?: string
  fontColor?: string
  buttonBorder?: string
  buttionWidth?: string
  children?: JSX.Element | JSX.Element[] | string
  click: (() => void) | (() => Promise<void>)
}
const Iconbutton = (props: IconButtonProps) => {
  // const {
  //   iconName,
  //   iconSize,
  //   iconColor,
  //   buttonColor,
  //   fontcolor,
  //   buttonBorder,
  //   buttonWidth,
  //   click,
  // } = props
  return (
    <Button
      click={props.click}
      width={props.buttionWidth!}
      fontColor={props.fontColor}
      color={props.ButtonColor!}
      border={props.buttonBorder!}
    >
      <div
        style={{
          display: 'flex',
          width: '80%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Element name={props.iconName} color={props.iconColor} size={props.iconSize!} />
        {props.children}
      </div>
    </Button>
  )
}

export default Iconbutton
