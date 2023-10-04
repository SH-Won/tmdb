import { MOVIE_CATEGORY } from '@/const'
import { useHelper } from '@/hooks'
import BackEnd from '@/networks'
import { _user } from '@/store/user'
import '@/styles/UserFavoritePage.scss'
import { PageLoadingSpinner, PosterCard } from 'my-react-component'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { IOutletContext, BaseItemDetail } from 'types/interface'
const UserFavoritePage = () => {
  const { login } = useOutletContext<IOutletContext>()
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  const { isValidImage, getConvertedDate, goDetailPage } = useHelper()
  const user = useRecoilValue(_user)
  useEffect(() => {
    if (!user) {
      const userConfirmLogin = confirm('로그인이 필요합니다')
      if (userConfirmLogin) login()
      else navigate('/')
    }
  }, [])
  const { data, isLoading } = useQuery(
    ['user_favorites', count],
    async () => {
      return Promise.all(
        user!.favorites.map((favorite) => {
          const [media, id] = favorite.split(':')
          if (media === MOVIE_CATEGORY.prefix) {
            return BackEnd.getInstance().movie.getDetailMovie<BaseItemDetail>(parseInt(id))
          } else {
            return BackEnd.getInstance().tv.getDetailTv<BaseItemDetail>(parseInt(id))
          }
        })
      )
    },
    {
      staleTime: Infinity,
      enabled: user?.favorites.length !== 0,
      cacheTime: 0,
    }
  )
  if (isLoading) return <PageLoadingSpinner text="목록을 불러오는 중입니다" />
  return (
    <div className="user-favorites-container">
      {data?.map((d) => {
        return (
          <PosterCard
            key={d.id}
            imageUrl={isValidImage(d.poster_path)}
            ratio={1.2}
            title={d.original_title ?? d.original_name}
            releaseDate={getConvertedDate(d.release_date ?? d.first_air_date)}
            voteAverage={Math.floor(d.vote_average * 10)}
            click={() => goDetailPage(d)}
          />
        )
      })}
    </div>
  )
}

export default UserFavoritePage
