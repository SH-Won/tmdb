import { useTranslation } from "react-i18next"
import type ko from '@/i18n/ko.json'

const useI18nTypes = () => {
  const {t} = useTranslation()
  return {t}
}
export {useI18nTypes}