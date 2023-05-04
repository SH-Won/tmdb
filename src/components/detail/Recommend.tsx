import { useHelper } from '@/hooks'
import { Notification, PosterCard } from 'my-react-component'
import { BaseItem } from 'types/interface'
import ItemList from '../common/ItemList'

interface RecommendProps {
  items: BaseItem[]
}

const Recommend = ({ items }: RecommendProps) => {
  const { goDetailPage, isValidImage } = useHelper()
  return (
    <div className="list-container recommend">
      <h3>추천</h3>
      {items.length ? (
        <ItemList
          items={items}
          renderItem={(item) => (
            <div
              className="recommend-item-container"
              key={item.id}
              onClick={() => goDetailPage(item)}
            >
              <PosterCard
                imageUrl={isValidImage(item.backdrop_path)}
                ratio={0.564}
                voteAverage={Math.floor(item.vote_average * 10)}
                title={item.title ?? item.name}
              />
            </div>
          )}
        />
      ) : (
        <Notification text="추천 할만한 작품이 없어요" height="100px" />
      )}
    </div>
  )
}

export default Recommend
