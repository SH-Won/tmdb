import { ItemType } from '@/const/toggleBar'
import BackEnd from '@/networks'
import { MovieResponse } from '@/types/network/response'
import { PosterCard } from 'my-react-component'
import { useLayoutEffect, useRef, useState } from 'react'
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

const UpcommingMovie = ({ toggleItems, title, click }: Props) => {
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
    if (!imagePath) return '/noImage.svg'
    return import.meta.env.VITE_BASE_IMAGE_URL + imagePath
  }
  const getBackGroundImageUrl = (backdropPath: string) => {
    return `url(${import.meta.env.VITE_BASE_IMAGE_URL + backdropPath})`
  }
  const container = useRef<HTMLDivElement>(null)
  const onMouseEnter = (item: BaseItem) => {
    console.log('enter')
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
        <ToggleBar items={toggleItems} onSelect={setSelectedItem} />
      </div>

      {isLoading ? (
        <SkeletonItemList ratio={0.564} />
      ) : (
        <ItemList
          items={data!.results}
          renderItem={(item) => (
            <div key={item.id} onClick={() => click(item)} onMouseEnter={(e) => onMouseEnter(item)}>
              <PosterCard
                imageUrl={isValidImage(item.backdrop_path)}
                ratio={0.564}
                title={item.title ?? item.name}
                voteAverage={Math.floor(item.vote_average * 10)}
              />
            </div>
          )}
        />
      )}
    </div>
  )
}

export default UpcommingMovie
