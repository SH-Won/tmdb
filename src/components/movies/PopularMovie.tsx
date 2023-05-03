import { ItemType } from '@/const/toggleBar'
import BackEnd from '@/networks'
import { MovieResponse } from '@/types/network/response'
import { PosterCard } from 'my-react-component'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { BaseItem } from 'types/interface'
import ItemList from '../common/ItemList'
import SkeletonItemList from './SkeletonItemList'
import ToggleBar from './ToggleBar'

interface Props {
  title: string
  toggleItems: ItemType[]
  click: ((item: BaseItem) => void) | (() => void)
}
const PopularMovie = ({ toggleItems, title, click }: Props) => {
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

  const isValidImage = (imagePath: string) => {
    if (!imagePath) return imagePath
    return import.meta.env.VITE_BASE_IMAGE_URL + imagePath
  }
  return (
    <div className="list-container">
      <h3>{title}</h3>
      <ToggleBar items={toggleItems} onSelect={setSelectedItem} />
      {isLoading ? (
        <SkeletonItemList ratio={1.2} />
      ) : (
        <ItemList<BaseItem>
          items={data!.results}
          renderItem={(item) => (
            <div key={item.id} onClick={() => click(item)}>
              <PosterCard
                imageUrl={isValidImage(item.poster_path)}
                ratio={1.5}
                title={item.title ?? item.name}
                voteAverage={Math.floor(item.vote_average * 10)}
                releaseDate={item.release_date ?? item.first_air_date}
              />
            </div>
          )}
        />
      )}
      {/* {<SkeletonItemList ratio={1.2} />} */}
    </div>
  )
}

export default PopularMovie
