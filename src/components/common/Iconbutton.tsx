import { Button, Element } from 'my-react-component'
import { ComponentType } from 'react'

interface IconProps {
  name: string
  size: 'big' | 'medium' | 'small' | 'custom'
  color: string
}
interface IconButtonProps {
  iconName: string
  iconSize: 'big' | 'medium' | 'small' | 'custom'
  iconPosition?: 'front' | 'back'
  iconColor: string
  // Icon : ComponentType<IconProps>
  ButtonColor?: string
  fontColor?: string
  buttonBorder?: string
  buttionWidth?: string
  children?: JSX.Element | JSX.Element[] | string | null
  click: (() => void) | (() => Promise<void>)
}
const IconButton = (props: IconButtonProps) => {
  const isBack = props.iconPosition === 'back'
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
          width: '100%',
          justifyContent: 'space-around',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        {!isBack ? (
          <>
            <Element name={props.iconName} color={props.iconColor} size={props.iconSize!} />
            {props.children}
          </>
        ) : (
          <>
            {props.children}
            <Element name={props.iconName} color={props.iconColor} size={props.iconSize!} />
          </>
        )}
      </div>
    </Button>
  )
}

export default IconButton
