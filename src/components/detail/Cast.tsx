import { RatioImage } from 'my-react-component'
import { useNavigate } from 'react-router-dom'
import { BaseCast, BaseItemDetail } from 'types/interface'
import ItemList from '../common/ItemList'
import RatioCard from '../common/RatioCard'

interface Props {
  casts: BaseCast[]
}

const Cast = ({ casts }: Props) => {
  const navigate = useNavigate()
  const goActorPage = (id: BaseCast['id']) => {
    navigate(`/person/${id}`)
  }
  return (
    <div className="cast-list">
      <h3 style={{ margin: 0 }}>주요 출연진</h3>
      <ItemList
        items={casts}
        renderItem={(item) => (
          <div key={item.id} className="cast-item-container" onClick={() => goActorPage(item.id)}>
            <RatioImage
              imageUrl={import.meta.env.VITE_BASE_IMAGE_URL + item.profile_path}
              ratio={1.3}
            />
            <div className="cast-info">
              <span>{item.name}</span>
              <span>{item.character}</span>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default Cast
