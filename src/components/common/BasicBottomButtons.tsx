import './styles/BasicBottomButtons.scss'
import { Button as PopupButton, Colors } from 'my-react-component'
import { useI18nTypes } from '@/hooks/useI18nTypes'
interface BasicBottomButtonsProps {
  close?: () => void
  confirm?: (() => void) | (() => Promise<void>)
  disable?: boolean
}
const BasicBottomButtons = ({ close, confirm, disable }: BasicBottomButtonsProps) => {
  const { t } = useI18nTypes()
  return (
    <div className="button-wrapper">
      <PopupButton
        click={() => close?.()}
        width="auto"
        color={Colors.white}
        border={Colors.grey_ccc}
      >
        {t('app.button.cancel')}
      </PopupButton>
      <PopupButton
        click={disable ? undefined : confirm}
        fontColor={Colors.white}
        color={Colors.main}
        width="auto"
        disable={disable}
      >
        {t('app.button.confirm')}
      </PopupButton>
    </div>
  )
}

export { BasicBottomButtons }
