import { ItemType } from '@/const/toggleBar'
import { useHelper } from '@/hooks/useHelper'
import BackEnd from '@/networks'
import { MovieResponse } from '@/types/network/response'
import { PosterCard } from 'my-react-component'
import { useState } from 'react'
import { useQuery } from 'react-query'
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
  const { isValidImage } = useHelper()
  const [selectedItem, setSelectedItem] = useState<ItemType>(toggleItems[0])
  const { data, isLoading } = useQuery(
    [selectedItem.id, 1],
    async () => {
      const response = await BackEnd.getInstance().common.getItems<MovieResponse<BaseItem[]>>({
        url: selectedItem?.url,
        page: 1,
      })
      return response
    },
    {
      staleTime: 30000,
      enabled: !!selectedItem,
    }
  )
  return (
    <div className="list-container">
      <div className="header">
        <h2>{title}</h2>
        <ToggleBar items={toggleItems} onSelect={setSelectedItem} />
      </div>

      {isLoading ? (
        <SkeletonItemList ratio={1.5} />
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
    </div>
  )
}

export default PopularMovie
