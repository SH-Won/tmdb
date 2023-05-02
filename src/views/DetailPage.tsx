import { MOVIE_CATEGORY } from '@/const'
import { TV_CATEGORY } from '@/const/movie'
import { useBreakPoints } from '@/hooks'
import BackEnd from '@/networks'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { BaseItemDetail } from 'types/interface'
import '@/styles/DetailPage.scss'
import Intro from '@/components/detail/Intro'
import { useMemo } from 'react'
import Cast from '@/components/detail/Cast'
import Information from '@/components/detail/Information'
import { LoadingSpinner } from 'my-react-component'
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
      const response = await BackEnd.getInstance().common.getItems(url)
      return response
    }
  )
  // if (!isLoading)
  //   console.log(
  //     Object.fromEntries(Object.entries(item!).map(([key, value]) => [key, typeof value]))
  //   )
  console.log(item!)
  console.log(credits)
  console.log(recommends)
  const crews = useMemo(() => {
    const directors = credits?.crew.filter((crew: any) => crew.job === 'Director')
    const writers = credits?.crew.filter((crew: any) => crew.job === 'Writer')
    return {
      directors,
      writers,
    }
  }, [credits])
  if (isLoading || creditsLoading || recommendLoading) {
    return <LoadingSpinner opacity={0.6} />
  }
  return (
    <div className={`detail-page ${breakPointsClass}`}>
      <Intro item={item!} crews={crews} />
      <div className="detail-content">
        <Cast casts={credits.cast} />
        <Information item={item!} />
      </div>
    </div>
  )
}

export default DetailPage
