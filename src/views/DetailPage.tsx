import { MOVIE_CATEGORY } from '@/const'
import { TV_CATEGORY } from '@/const/movie'
import { useBreakPoints, useHelper, useI18nTypes } from '@/hooks'
import BackEnd from '@/networks'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { BaseCrew, BaseItem, BaseItemDetail, RelativeImageResponse } from 'types/interface'
import '@/styles/DetailPage.scss'
import Intro from '@/components/detail/Intro'
import { useMemo } from 'react'
import Cast from '@/components/detail/Cast'
import Information from '@/components/detail/Information'
import { LoadingSpinner, RatioCardImage, BasicCarousel, AutoCarousel } from 'my-react-component'
import Recommend from '@/components/detail/Recommend'
import { KeyWordResponse, MovieResponse } from '@/types/network/response'

const DetailPage = () => {
  const { breakPointsClass } = useBreakPoints()
  const { media_type, id } = useParams()
  const { isValidImage } = useHelper()
  const { t } = useI18nTypes()
  const key = media_type === MOVIE_CATEGORY.prefix ? MOVIE_CATEGORY.prefix : TV_CATEGORY.prefix
  const { data: item, isLoading } = useQuery(
    [key, id],
    async () => {
      if (media_type === MOVIE_CATEGORY.prefix) {
        const response = await BackEnd.getInstance().movie.getDetailMovie<BaseItemDetail>(
          parseInt(id!)
        )
        return response
      } else {
        const response = await BackEnd.getInstance().tv.getDetailTv<BaseItemDetail>(parseInt(id!))
        return response
      }
    },
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
  const { data: credits, isLoading: creditsLoading } = useQuery(
    [key, id, 'credits'],
    async () => {
      const url = `/${media_type}/${id}/credits`
      const response = await BackEnd.getInstance().common.getCredits<any>(url)
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
  const { data: recommends, isLoading: recommendLoading } = useQuery(
    [key, id, 'recommends'],
    async () => {
      const url = `/${media_type}/${id}/recommendations`
      const response = await BackEnd.getInstance().common.getItems<MovieResponse<BaseItem[]>>({
        url,
        page: 1,
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
  const { data: keyword, isLoading: keywordLoading } = useQuery(
    [key, id, 'keyword'],
    async () => {
      const url = `/${media_type}/${id}/keywords`
      const response = await BackEnd.getInstance().common.getSearch<KeyWordResponse>({
        url,
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
  const { data: images, isLoading: imageLoading } = useQuery(
    [key, id, 'images'],
    async () => {
      const url = `/${media_type}/${id}/images`
      const response = await BackEnd.getInstance().common.getSearch<RelativeImageResponse>({
        url,
      })
      return response.backdrops
    },
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
  const crews = useMemo(() => {
    const directors = credits?.crew.filter((crew: BaseCrew) => crew.job === 'Director')
    const writers = credits?.crew.filter((crew: BaseCrew) => crew.job === 'Writer')
    return {
      directors,
      writers,
    }
  }, [credits])

  if (isLoading || creditsLoading || recommendLoading || keywordLoading || imageLoading) {
    return <LoadingSpinner opacity={0.6} />
  }

  return (
    <div className={`detail-page ${breakPointsClass}`}>
      <Intro item={item!} crews={crews} />
      <div className="detail-content">
        <div className="content-cast-recommend">
          <Cast
            casts={credits.cast}
            title={t('app.detail.cast.title')}
            notification={t('app.detail.cast.no_actors')}
          />
          <Recommend
            items={recommends!.results}
            title={t('app.detail.recommend.title')}
            notification={t('app.detail.recommend.no_recommends')}
          />
          <div style={{ padding: '20px' }}>
            <h3>{t('app.detail.image.background')}</h3>
            <AutoCarousel
              time={2000}
              items={images ? images?.slice(1, 10) : []}
              renderItems={(item, index) => (
                <RatioCardImage
                  key={index}
                  ratio={1 / item.aspect_ratio}
                  eager={true}
                  imageUrl={isValidImage(item.file_path)}
                />
              )}
            />
          </div>
        </div>
        <Information item={item!} keywords={keyword!.keywords ?? keyword!.results} />
      </div>
    </div>
  )
}

export default DetailPage
