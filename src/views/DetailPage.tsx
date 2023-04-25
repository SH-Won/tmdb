import { MOVIE_CATEGORY } from '@/const'
import BackEnd from '@/networks'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
  const { movieId } = useParams()
  const { data: movie, isLoading } = useQuery(
    [MOVIE_CATEGORY.prefix, movieId],
    async () => {
      const response = await BackEnd.getInstance().movie.getDetailMovie(parseInt(movieId!))
      return response.data
    },
    {
      staleTime: 30000,
      enabled: !!movieId,
    }
  )

  return <div>DetailPage</div>
}

export default DetailPage
