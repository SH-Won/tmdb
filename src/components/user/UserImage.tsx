import './UserImage.scss'
interface UserImageProps {
  imageUrl: string
  click: () => void
}
const UserImage = ({ imageUrl, click }: UserImageProps) => {
  return <img className="user-status-image" src={imageUrl} onClick={click} />
}

export default UserImage
