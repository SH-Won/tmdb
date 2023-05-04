import { useTranslation } from 'react-i18next'

const useI18nTypes = () => {
  const { t } = useTranslation()
  return { t }
}
export { useI18nTypes }
