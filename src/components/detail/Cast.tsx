import { useHelper } from '@/hooks'
import { Notification } from 'my-react-component'

import { BaseCast } from 'types/interface'
import ItemList from '../common/ItemList'
import CastItem from './CastItem'

interface Props {
  casts: BaseCast[]
  title: string
  notification: string
}

const Cast = ({ casts, title, notification }: Props) => {
  const { goActorPage } = useHelper()
  return (
    <div className="list-container-right-fade">
      <h3 style={{ margin: 0 }}>주요 출연진</h3>
      {casts.length ? (
        <div className="item-container">
          <ItemList
            className="item-list cast"
            items={casts}
            renderItem={(item) => <CastItem item={item} click={goActorPage} key={item.id} />}
          />
        </div>
      ) : (
        <Notification text="배우 정보가 없어요" height="100px" />
      )}
    </div>
  )
}

export default Cast
