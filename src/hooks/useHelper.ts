import { BaseCast, BaseItem, BaseItemDetail } from 'types/interface'
import { useNavigate } from 'react-router-dom'

const useHelper = () => {
  const navigate = useNavigate()

  const goDetailPage = (item: BaseItem | BaseItemDetail) => {
    let url = item.release_date ? '/movie/' : '/tv/'
    url += item.id
    navigate(url)
  }
  const goSearchPage = (searchText: string) => {
    navigate(`/search?language=ko&query=${searchText}`)
  }
  const goActorPage = (id: BaseCast['id']) => {
    navigate(`/person/${id}`)
  }
  const isValidImage = (imagePath: string) => {
    if (!imagePath) return '/noImage.svg'
    return import.meta.env.VITE_BASE_IMAGE_URL + imagePath
  }
  const getConvertedDate = (date: string | undefined) => {
    if (!date || date === '') return ''
    const [year, month, day] = date.split('-')
    return `${month}월 ${day}, ${year}`
  }

  return {
    goDetailPage,
    goSearchPage,
    goActorPage,
    isValidImage,
    getConvertedDate,
  }
}
export { useHelper }
