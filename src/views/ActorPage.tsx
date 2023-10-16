import { AutoCarousel, PageLoadingSpinner, RatioCardImage, RatioImage } from 'my-react-component'
import { useLoaderData } from 'react-router-dom'
import {
  BaseActorItem,
  BaseCombineCredit,
  BasicImage,
  RelativeImageResponse,
} from 'types/interface'
import '@/styles/ActorPage.scss'
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import ItemList from '@/components/common/ItemList'
import ColumnExplain from '@/components/common/ColumnExplain'
import {
  useBreakPoints,
  useFetch,
  useHelper,
  useI18nTypes,
  useQueryDetail,
  useQueryCredits,
  useQueryImages,
} from '@/hooks'
const ActorPage = () => {
  const { media_type, personId } = useLoaderData() as { media_type: 'person'; personId: string }
  const { goDetailPage, isValidImage } = useHelper()
  const { t } = useI18nTypes()
  const { data, isLoading } = useQueryDetail<BaseActorItem>(media_type, parseInt(personId))
  const { data: movies, isLoading: movieLoading } = useQueryCredits<BaseCombineCredit>(
    media_type,
    parseInt(personId)
  )
  const { data: images, isLoading: imageLoading } = useQueryImages<RelativeImageResponse>(
    media_type,
    parseInt(personId)
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
  useLayoutEffect(() => {
    const biographyHeight = biography.current?.scrollHeight as number
    if (biographyHeight < 240) {
      onClickReadMore()
    }
  }, [biography.current, data])
  const RenderPopularMovies = useCallback(() => {
    return (
      <div className="list-container">
        <ItemList
          className="item-list appearance"
          items={sortMovies}
          renderItem={(item) => (
            <div key={item.credit_id}>
              <RatioCardImage
                imageUrl={isValidImage(item.backdrop_path)}
                ratio={1.5}
                click={() => goDetailPage(item)}
              />
              <div>{item.title ?? item.name}</div>
            </div>
          )}
        />
      </div>
    )
  }, [sortMovies])
  if (movieLoading || isLoading || imageLoading)
    return <PageLoadingSpinner text="please wait a second" />

  return (
    <div className="actor-page">
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
        <div style={{ width: '50%', alignSelf: 'center' }}>
          <AutoCarousel<BasicImage>
            time={2000}
            items={
              images?.profiles && images.profiles.length > 0 ? images.profiles?.slice(0, 10) : []
            }
            renderItems={(item, index) => (
              <RatioCardImage
                key={index}
                ratio={1 / (item.aspect_ratio ?? 1)}
                eager={true}
                imageUrl={isValidImage(item.file_path)}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default ActorPage
