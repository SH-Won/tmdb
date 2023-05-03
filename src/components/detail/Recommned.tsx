import Transition from '@/layout/Transition'
import { PosterCard, RatioCardImage } from 'my-react-component'
import { useNavigate } from 'react-router-dom'
import { BaseItem } from 'types/interface'
// import ColumnExplain from '../common/ColumnExplain'
// import ItemList from '../common/ItemList'

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
    </div>
  )
}

export default Recommned
