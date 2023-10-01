import './UserPopup.scss'
import { useRecoilValue } from 'recoil'
import { _user } from '@/store/user'
import { Colors, Element } from 'my-react-component'
import { PopupComponentProps } from '@/types/popup/RouterTypes'
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
  const onHandleLogout = () => {
    close?.()
    logout()
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
        <div className="logout" onClick={onHandleLogout}>
          로그아웃 <Element name="Right" size="small" color={Colors.grey_333} />
        </div>
      </div>
    </div>
  )
}

export default UserProfilePopup
