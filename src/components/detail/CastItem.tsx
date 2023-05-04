import { useHelper } from '@/hooks'
import { RatioCardImage } from 'my-react-component'
import { BaseCast } from 'types/interface'
interface Props {
  item: BaseCast
  click: (id: BaseCast['id']) => void
}
const CastItem = ({ item, click }: Props) => {
  const { isValidImage } = useHelper()
  return (
    <div key={item.id} className="cast-item-container" onClick={() => click(item.id)}>
      <RatioCardImage imageUrl={isValidImage(item.profile_path)} ratio={1.3} />
      <div className="cast-info">
        <span>{item.name}</span>
        <span>{item.character}</span>
      </div>
    </div>
  )
}

export default CastItem
