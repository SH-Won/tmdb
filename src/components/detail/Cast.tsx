import { BaseCast, BaseItemDetail } from 'types/interface'
import ItemList from '../common/ItemList'
import RatioCard from '../common/RatioCard'

interface Props {
  casts: BaseCast[]
}

const Cast = ({ casts }: Props) => {
  return (
    <div className="cast-list">
      <h3 style={{ margin: 0 }}>주요 출연진</h3>
      <ItemList
        items={casts}
        renderItem={(item) => (
          <div key={item.id} className="cast-item-container">
            {/* <RatioCard
              imageUrl={import.meta.env.VITE_BASE_IMAGE_URL + item.profile_path}
              ratio={1.5 / 1}
            /> */}
            <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.profile_path}></img>
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
