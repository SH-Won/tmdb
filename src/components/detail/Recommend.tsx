import { useHelper, useI18nTypes } from '@/hooks'
import { Notification, PosterCard } from 'my-react-component'
import { BaseItem } from 'types/interface'
import ItemList from '../common/ItemList'

interface RecommendProps {
  items: BaseItem[]
  title: string
  notification: string
}

const Recommend = ({ items }: RecommendProps) => {
  const { goDetailPage, isValidImage } = useHelper()
  const { t } = useI18nTypes()
  return (
    <div className="list-container-right-fade">
      <h3>{t('app.detail.recommend.title')}</h3>
      {items.length ? (
        <div className="item-container">
          <ItemList
            className="item-list recommend"
            items={items}
            renderItem={(item) => (
              <div className="recommend-item-container" key={item.id}>
                <PosterCard
                  click={() => goDetailPage(item)}
                  imageUrl={isValidImage(item.backdrop_path)}
                  ratio={0.564}
                  voteAverage={Math.floor(item.vote_average * 10)}
                  title={item.title ?? item.name}
                />
              </div>
            )}
          />
        </div>
      ) : (
        <Notification text={t('app.detail.recommend.no_recommends')} height="100px" />
      )}
    </div>
  )
}

export default Recommend
