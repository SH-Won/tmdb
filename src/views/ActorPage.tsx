import BackEnd from '@/networks'
import { PageLoadingSpinner, RatioCardImage, RatioImage } from 'my-react-component'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { BaseActorItem, BaseCombineCredit } from 'types/interface'
import '@/styles/ActorPage.scss'
import { useCallback, useMemo, useRef } from 'react'
import ItemList from '@/components/common/ItemList'
import ColumnExplain from '@/components/common/ColumnExplain'
import { useBreakPoints, useHelper, useI18nTypes } from '@/hooks'
const ActorPage = () => {
  const { personId } = useParams()
  const { breakPointsClass } = useBreakPoints()
  const { goDetailPage, isValidImage } = useHelper()
  const { t } = useI18nTypes()
  // http://localhost:3000/person/3857938
  const { data, isLoading } = useQuery(
    ['actor', personId],
    async () => {
      const response = await BackEnd.getInstance().common.getSearch<BaseActorItem>({
        url: `/person/${personId}`,
        query: {
          language: 'en-US',
        },
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!personId,
    }
  )
  //combined_credits
  const { data: movies, isLoading: loading } = useQuery(
    ['actor', 'movies', personId],
    async () => {
      const response = await BackEnd.getInstance().common.getSearch<BaseCombineCredit>({
        url: `/person/${personId}/combined_credits`,
        query: {
          language: 'ko-KR',
        },
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!personId,
    }
  )

  const biography = useRef<HTMLDivElement>(null)
  const readMore = useRef<HTMLDivElement>(null)
  const onClickReadMore = () => {
    if (biography.current?.style) {
      biography.current.className = 'actor-biography-show'
      readMore.current?.classList.add('hide')
    }
  }
  const sortMovies = useMemo(() => {
    if (!movies) return []
    return [...movies!.cast].sort((a, b) => b.popularity - a.popularity).slice(0, 10)
  }, [movies])

  const RenderPopularMovies = useCallback(() => {
    return (
      <div className="list-container appearance">
        <ItemList
          items={sortMovies}
          renderItem={(item) => (
            <div key={item.id + item.popularity} onClick={() => goDetailPage(item)}>
              <RatioCardImage imageUrl={isValidImage(item.backdrop_path)} ratio={1.5} />
              <div>{item.title ?? item.name}</div>
            </div>
          )}
        />
      </div>
    )
  }, [sortMovies])

  if (loading || isLoading) return <PageLoadingSpinner />
  return (
    <div className={`actor-page ${breakPointsClass}`}>
      <div className="actor-profile">
        <RatioImage
          imageUrl={import.meta.env.VITE_BASE_IMAGE_URL + data?.profile_path}
          ratio={1.5}
        />
        <div className="actor-explain">
          <h3>인물 정보</h3>
          <ColumnExplain
            title={t('app.actor_detail.known_for_department')}
            explain={data!.known_for_department}
          />
          <ColumnExplain
            title={t('app.actor_detail.works_number')}
            explain={movies!.cast.length.toString()}
          />
          <ColumnExplain title={t('app.actor_detail.name')} explain={data!.name} />
          <ColumnExplain
            title={t('app.actor_detail.gender')}
            explain={data?.gender === 1 ? '여자' : '남자'}
          />
          <ColumnExplain title={t('app.actor_detail.birthday')} explain={data!.birthday} />
          <ColumnExplain
            title={t('app.actor_detail.place_of_birth')}
            explain={data!.place_of_birth}
          />
          <ColumnExplain
            title={t('app.actor_detail.also_known_as')}
            explain={data!.also_known_as}
          />
        </div>
      </div>
      <div className="actor-detail-info">
        <h2>{data?.name}</h2>
        <div className="actor-biography-container">
          <p className="actor-biography" ref={biography}>
            {data?.biography}
          </p>
          <div className="read-more" ref={readMore}>
            <span onClick={onClickReadMore}>{t('app.actor_detail.load_more')}</span>
          </div>
        </div>
        <RenderPopularMovies />
      </div>
    </div>
  )
}

export default ActorPage
