import { Notification, RatioImage } from 'my-react-component'
import { useNavigate } from 'react-router-dom'
import { BaseCast, BaseItemDetail } from 'types/interface'
import ItemList from '../common/ItemList'
import CastItem from './CastItem'

interface Props {
  casts: BaseCast[]
}

const Cast = ({ casts }: Props) => {
  const navigate = useNavigate()
  const goActorPage = (id: BaseCast['id']) => {
    navigate(`/person/${id}`)
  }
  return (
    <div className="cast-container cast">
      <h3 style={{ margin: 0 }}>주요 출연진</h3>
      {casts.length ? (
        <ItemList
          items={casts}
          renderItem={(item) => <CastItem item={item} click={goActorPage} key={item.id} />}
        />
      ) : (
        <Notification text="배우 정보가 없어요" height="100px" />
      )}
    </div>
  )
}

export default Cast
