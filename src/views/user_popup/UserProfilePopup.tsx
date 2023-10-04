import './UserPopup.scss'
import { useRecoilValue } from 'recoil'
import { _user } from '@/store/user'
import { Colors, Element } from 'my-react-component'
import { PopupComponentProps } from '@/types/popup/RouterTypes'
import { useI18nTypes } from '@/hooks'
import { useNavigate } from 'react-router-dom'
interface UserInfoDetailProps {
  title: string
  explain: string
}
const UserInfoDetail = ({ title, explain }: UserInfoDetailProps) => {
  return (
    <div className="user-info-detail">
      <span className="title">{title}</span>
      <span className="explain">{explain}</span>
    </div>
  )
}
interface UserProfilePopupProps extends PopupComponentProps {
  logout: () => void
}

const UserProfilePopup = ({ logout, close }: UserProfilePopupProps) => {
  const user = useRecoilValue(_user)
  const navigate = useNavigate()
  const { t } = useI18nTypes()
  const onHandleLogout = () => {
    close?.()
    logout()
  }
  const goFavoritePage = () => {
    navigate(`/${user?.displayName}/favorites`)
    close?.()
  }
  return (
    <div className="user-profile">
      <div className="user-img">
        <img src={user!.photoURL} />
        <span className="user-email">{user!.email}</span>
      </div>
      <div className="user-info">
        <UserInfoDetail title={'이름'} explain={user!.displayName} />
        <UserInfoDetail title={'로그인 상태'} explain={'로그인'} />
      </div>
      <div className="user-action">
        <div className="favorite" onClick={goFavoritePage}>
          <span>{t('app.button.user_favorite')}</span>
          <Element name="Right" size="small" color={Colors.grey_111} />
        </div>
        <div className="logout" onClick={onHandleLogout}>
          <span>{t('app.button.logout')}</span>{' '}
          <Element name="Logout" size="small" color={Colors.grey_333} />
        </div>
      </div>
    </div>
  )
}

export default UserProfilePopup
