import { ItemType } from '@/const/toggleBar'
import BackEnd from '@/networks'
import { MovieResponse } from '@/types/network/response'
import { Card } from 'my-react-component'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { BaseItem, IMovie } from 'types/interface'
import ItemList from '../common/ItemList'
import RatioCard from '../common/RatioCard'
import LoadingSpinner from './LoadingSpinner'
import ToggleBar from './ToggleBar'

interface Props {
  title: string
  toggleItems: ItemType[]
}
const PopularMovie = ({ toggleItems, title }: Props) => {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState<ItemType>(toggleItems[0])
  const { data, isLoading } = useQuery(
    [selectedItem.id],
    async () => {
      const response = await BackEnd.getInstance().common.getItems<MovieResponse<BaseItem[]>>(
        selectedItem?.url
      )
      return response
    },
    {
      staleTime: 30000,
      enabled: !!selectedItem,
    }
  )

  const goDetailPage = (item: BaseItem) => {
    // navigation(`detail/${movieId}`)
    if (item.release_date) {
      navigate(`/movie/${item.id}`)
    } else {
      navigate(`/tv/${item.id}`)
    }
  }
  const isValidImage = (imagePath: string) => {
    if (!imagePath) return imagePath
    return import.meta.env.VITE_BASE_IMAGE_URL + imagePath
  }
  return (
    <div className="list-container">
      <h3>{title}</h3>
      <ToggleBar items={toggleItems} onSelect={setSelectedItem} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ItemList<BaseItem>
          items={data!.results}
          renderItem={(item) => (
            <div key={item.id} onClick={() => goDetailPage(item)}>
              {/* <Card imageUrl={isValidImage(item.poster_path)} height="250px" objectFit="fill" /> */}
              <RatioCard imageUrl={isValidImage(item.poster_path)} ratio={1.5 / 1} />
            </div>
          )}
        />
      )}
    </div>
  )
}

export default PopularMovie
