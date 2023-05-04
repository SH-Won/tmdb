import { useI18nTypes } from '@/hooks/useI18nTypes'
import '@/styles/Navigation.scss'
import { useNavigate } from 'react-router-dom'

const Navigation = (props: any) => {
  const { t } = useI18nTypes()
  const navigate = useNavigate()

  const items = [
    {
      id: '1',
      name: t('app.navigation.product'),
      onClick() {
        navigate('/movie')
      },
    },
    {
      id: '2',
      name: t('app.navigation.subProduct'),
      onClick() {
        navigate('/tv')
      },
    },
  ]
  return (
    <div className={`navigation ${props.isNotDesktop ? 'footer' : ''}`}>
      {items.map((item) => (
        <div key={item.id} className="navi-item" onClick={item.onClick}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Navigation
