import './styles/BasicBottomButtons.scss'
import { Button as PopupButton, Colors } from 'my-react-component'
import { useI18nTypes } from '@/hooks/useI18nTypes'
interface BasicBottomButtonsProps {
  close?: () => void
  confirm?: (() => void) | (() => Promise<void>)
}
const BasicBottomButtons = ({ close, confirm }: BasicBottomButtonsProps) => {
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
      <PopupButton click={confirm} fontColor={Colors.white} color={Colors.main} width="auto">
        {t('app.button.confirm')}
      </PopupButton>
    </div>
  )
}

export { BasicBottomButtons }
