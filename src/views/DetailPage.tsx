import { MOVIE_CATEGORY } from '@/const'
import { TV_CATEGORY } from '@/const/movie'
import { useBreakPoints } from '@/hooks'
import BackEnd from '@/networks'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { BaseCrew, BaseItem, BaseItemDetail } from 'types/interface'
import '@/styles/DetailPage.scss'
import Intro from '@/components/detail/Intro'
import { useMemo } from 'react'
import Cast from '@/components/detail/Cast'
import Information from '@/components/detail/Information'
import { LoadingSpinner } from 'my-react-component'
import Recommend from '@/components/detail/Recommend'
import { KeyWordResponse, MovieResponse } from '@/types/network/response'
const DetailPage = () => {
  const { breakPointsClass } = useBreakPoints()
  const { media_type, id } = useParams()
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
    [key, id, 'keword'],
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
  const crews = useMemo(() => {
    const directors = credits?.crew.filter((crew: BaseCrew) => crew.job === 'Director')
    const writers = credits?.crew.filter((crew: BaseCrew) => crew.job === 'Writer')
    return {
      directors,
      writers,
    }
  }, [credits])
  console.log(recommends)
  if (isLoading || creditsLoading || recommendLoading || keywordLoading) {
    return <LoadingSpinner opacity={0.6} />
  }
  return (
    <div className={`detail-page ${breakPointsClass}`}>
      <Intro item={item!} crews={crews} />
      <div className="detail-content">
        <div className="content-cast-recommend">
          <Cast casts={credits.cast} />
          <Recommend items={recommends!.results} />
        </div>
        <Information item={item!} keywords={keyword!.keywords ?? keyword!.results} />
      </div>
    </div>
  )
}

export default DetailPage
