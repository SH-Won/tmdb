import { useI18nTypes } from '@/hooks'
import { Colors, Element } from 'my-react-component'
import './UserFavoritButton.scss'

interface UserFavoirteButtonProps {
  addFavorite: () => void
  removeFavorite: () => void
  isAlreadyUserFavorite: boolean | undefined
}

const UserFavoriteButton = ({
  removeFavorite,
  addFavorite,
  isAlreadyUserFavorite,
}: UserFavoirteButtonProps) => {
  const { t } = useI18nTypes()
  return (
    <div
      className="user-favorite-button"
      onClick={isAlreadyUserFavorite ? removeFavorite : addFavorite}
    >
      <Element name={isAlreadyUserFavorite ? 'Check' : 'Plus'} color={Colors.white} size="medium" />
      <span className="explain">
        {isAlreadyUserFavorite
          ? t('app.button.remove_user_favorite')
          : t('app.button.add_user_favorite')}
      </span>
    </div>
  )
}

export default UserFavoriteButton
