import { ItemType } from '@/const/toggleBar'
import { useBreakPoints, useQueryCommon } from '@/hooks'
import { useHelper } from '@/hooks/useHelper'
import { MovieResponse } from '@/types/network/response'
import { PosterCard, ToggleBar } from 'my-react-component'
import { useState } from 'react'
import { BaseItem } from 'types/interface'
import ItemList from '../common/ItemList'
import SkeletonItemList from './SkeletonItemList'

interface Props {
  title: string
  toggleItems: ItemType[]
  click: ((item: BaseItem) => void) | (() => void)
}
const ToggleItemSection = ({ toggleItems, title, click }: Props) => {
  const { breakPointsClass } = useBreakPoints()
  const { isValidImage, getConvertedDate } = useHelper()
  const [selectedItem, setSelectedItem] = useState<ItemType>(toggleItems[0])
  const { data, isLoading } = useQueryCommon<MovieResponse<BaseItem[]>>(selectedItem, 1)
  return (
    <div className="list-container">
      <div className="header">
        <h2>{title}</h2>
        <ToggleBar items={toggleItems} onSelect={setSelectedItem} screen={breakPointsClass} />
      </div>

      {isLoading ? (
        <SkeletonItemList ratio={1.5} />
      ) : (
        <div className="item-container">
          <ItemList<BaseItem>
            className="item-list"
            items={data!.results}
            renderItem={(item) => (
              <div key={item.id}>
                <PosterCard
                  imageUrl={isValidImage(item.poster_path)}
                  ratio={1.5}
                  click={() => click(item)}
                  title={item.title ?? item.name}
                  voteAverage={Math.floor(item.vote_average * 10)}
                  releaseDate={getConvertedDate(item.release_date ?? item.first_air_date)}
                />
              </div>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default ToggleItemSection
