import Transition from '@/layout/Transition'
import { Notification, PosterCard } from 'my-react-component'
import { useNavigate } from 'react-router-dom'
import { BaseItem } from 'types/interface'

interface RecommendProps {
  items: BaseItem[]
}

const Recommned = (props: RecommendProps) => {
  const navigate = useNavigate()
  const goDetailPage = (item: BaseItem) => {
    let url = item.release_date ? '/movie/' : '/tv/'
    url += item.id
    navigate(url)
  }
  return (
    <div className="recommend-container">
      <h3>추천</h3>
      {props.items.length ? (
        <Transition className="recommend-list">
          {props.items.map((item) => (
            <div
              className="recommend-item-container"
              key={item.id}
              onClick={() => goDetailPage(item)}
            >
              <PosterCard
                imageUrl={import.meta.env.VITE_BASE_IMAGE_URL + item.backdrop_path}
                ratio={0.564}
                voteAverage={Math.floor(item.vote_average * 10)}
                title={item.title ?? item.name}
              />
            </div>
          ))}
        </Transition>
      ) : (
        <Notification text="추천 할만한 작품이 없어요" height="100px" />
      )}
    </div>
  )
}

export default Recommned
