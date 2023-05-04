import { BaseCast, BaseItem } from 'types/interface'
import { useNavigate } from 'react-router-dom'

const useHelper = () => {
  const navigate = useNavigate()

  const goDetailPage = (item: BaseItem) => {
    let url = item.release_date ? '/movie/' : '/tv/'
    url += item.id
    navigate(url)
  }
  const goActorPage = (id: BaseCast['id']) => {
    navigate(`/person/${id}`)
  }
  const isValidImage = (imagePath: string) => {
    if (!imagePath) return '/noImage.svg'
    return import.meta.env.VITE_BASE_IMAGE_URL + imagePath
  }

  return {
    goDetailPage,
    goActorPage,
    isValidImage,
  }
}
export { useHelper }
