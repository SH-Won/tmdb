import BackEnd from '@/networks'
import { PageLoadingSpinner, PosterCard, RatioCardImage, RatioImage } from 'my-react-component'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { BaseActorItem, BaseCast, BaseCombineCredit } from 'types/interface'
import '@/styles/ActorPage.scss'
import { useCallback, useMemo, useRef } from 'react'
import ItemList from '@/components/common/ItemList'
import ColumnExplain from '@/components/common/ColumnExplain'
import { useBreakPoints } from '@/hooks'
const ActorPage = () => {
  const { personId } = useParams()
  const { breakPointsClass } = useBreakPoints()

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
  // console.log(data)
  // console.log(movies)

  const biography = useRef<HTMLDivElement>(null)
  const readMore = useRef<HTMLDivElement>(null)
  const onClickReadMore = () => {
    if (biography.current?.style) {
      biography.current.className = 'actor-biography-show'
      readMore.current?.classList.add('hide')
    }
  }
  const isValidImage = (imagePath: string) => {
    if (!imagePath) return imagePath
    return import.meta.env.VITE_BASE_IMAGE_URL + imagePath
  }
  const sortMovies = useMemo(() => {
    if (!movies) return []
    console.log(movies)
    return [...movies!.cast].sort((a, b) => b.popularity - a.popularity)
  }, [loading])
  // const popularMovies = useMemo(() => {
  //   // console.log(sortMovies)
  //   return sortMovies
  // }, [breakPointsClass, sortMovies])
  const RenderPopularMovies = useCallback(() => {
    console.log('render popular movies')
    return (
      <div className="appearance-work">
        <ItemList
          items={sortMovies!.slice(0, 10)}
          renderItem={(item) => (
            <div key={item.id}>
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
          <ColumnExplain title="분야" explain={data!.known_for_department} />
          <ColumnExplain title="참여 작품수" explain={movies!.cast.length.toString()} />
          <ColumnExplain title="이름" explain={data!.name} />
          <ColumnExplain title="성별" explain={data?.gender === 1 ? '여자' : '남자'} />
          <ColumnExplain title="생일" explain={data!.birthday} />
          <ColumnExplain title="출생지" explain={data!.place_of_birth} />
          <ColumnExplain title="다른 명칭" explain={data!.also_known_as} />
        </div>
      </div>
      <div className="actor-detail-info">
        <h2>{data?.name}</h2>
        <div className="actor-biography-container">
          <p className="actor-biography" ref={biography}>
            {data?.biography}
          </p>
          <div className="read-more" ref={readMore}>
            <span onClick={onClickReadMore}>더보기 {'>'} </span>
          </div>
        </div>
        <RenderPopularMovies />
      </div>
    </div>
  )
}

export default ActorPage
