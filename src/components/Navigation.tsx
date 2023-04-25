import { useI18nTypes } from '@/hooks/useI18nTypes'
import '@/styles/Navigation.scss'

const Navigation = (props: any) => {
  const { t } = useI18nTypes()

  const items = [
    {
      id: '1',
      name: t('app.navigation.product'),
    },
    {
      id: '2',
      name: t('app.navigation.subProduct'),
    },
  ]
  return (
    <div className={`navigation ${props.isNotDesktop ? 'footer' : ''}`}>
      {items.map((item) => (
        <div key={item.id} className="navi-item">
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Navigation
