import { Media } from '@/const/overall'
import { useHelper, useI18nTypes, useQueryRecommends } from '@/hooks'
import { MovieResponse } from '@/types/network/response'
import { Notification, PageLoadingSpinner, PosterCard } from 'my-react-component'
import { BaseItem } from 'types/interface'
import ItemList from '../common/ItemList'

interface RecommendProps {
  media_type: Media
  id: string
}

const Recommend = ({ media_type, id }: RecommendProps) => {
  const { goDetailPage, isValidImage } = useHelper()
  const { t } = useI18nTypes()
  const { data: items, isLoading } = useQueryRecommends<MovieResponse<BaseItem[]>>(
    media_type,
    parseInt(id)
  )
  return (
    <div className="list-container-right-fade">
      <h3>{t('app.detail.recommend.title')}</h3>
      {isLoading ? (
        <PageLoadingSpinner text="추천 작품을 불러오고 있습니다" />
      ) : items?.results.length ? (
        <div className="item-container">
          <ItemList
            className="item-list recommend"
            items={items.results}
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
