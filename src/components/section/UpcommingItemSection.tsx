import { ItemType } from '@/const/toggleBar'
import { useBreakPoints, useHelper, useQueryCommon } from '@/hooks'
import { MovieResponse } from '@/types/network/response'
import { PosterCard, ToggleBar } from 'my-react-component'
import { useLayoutEffect, useRef, useState } from 'react'
import { BaseItem } from 'types/interface'
import ItemList from '../common/ItemList'
import SkeletonItemList from './SkeletonItemList'
interface Props {
  title: string
  toggleItems: ItemType[]
  click: ((item: BaseItem) => void) | (() => void)
}

const UpcommingItemSection = ({ toggleItems, title, click }: Props) => {
  const { breakPointsClass } = useBreakPoints()
  const { isValidImage } = useHelper()
  const [selectedItem, setSelectedItem] = useState<ItemType>(toggleItems[0])
  const { data, isLoading } = useQueryCommon<MovieResponse<BaseItem[]>>(selectedItem, 1)
  const getBackGroundImageUrl = (backdropPath: string) => {
    return `url(${import.meta.env.VITE_BASE_IMAGE_URL + backdropPath})`
  }
  const container = useRef<HTMLDivElement>(null)
  const onMouseEnter = (item: BaseItem) => {
    if (container.current?.style) {
      container.current.style.backgroundImage = getBackGroundImageUrl(item.backdrop_path)
    }
  }
  useLayoutEffect(() => {
    if (container.current && data) {
      container.current.style.backgroundImage = getBackGroundImageUrl(data.results[0].backdrop_path)
    }
  }, [data])
  return (
    <div className="list-container upcomming" ref={container}>
      <div className="background"></div>
      <div className="header">
        <h2>{title}</h2>
        <ToggleBar items={toggleItems} onSelect={setSelectedItem} screen={breakPointsClass} />
      </div>

      {isLoading ? (
        <SkeletonItemList ratio={0.564} category="upcomming" />
      ) : (
        <div className="item-container">
          <ItemList
            className="item-list upcomming"
            items={data!.results}
            renderItem={(item) => (
              <div key={item.id} onMouseEnter={(e) => onMouseEnter(item)}>
                <PosterCard
                  click={() => click(item)}
                  imageUrl={isValidImage(item.backdrop_path)}
                  ratio={0.564}
                  title={item.title ?? item.name}
                  voteAverage={Math.floor(item.vote_average * 10)}
                />
              </div>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default UpcommingItemSection
