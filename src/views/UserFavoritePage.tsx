import { MOVIE_CATEGORY } from '@/const'
import { TV_CATEGORY } from '@/const/movie'
import { useHelper, useI18nTypes } from '@/hooks'
import BackEnd from '@/networks'
import { _user } from '@/store/user'
import '@/styles/UserFavoritePage.scss'
import { Notification, OptionList, PageLoadingSpinner, PosterCard } from 'my-react-component'
import DropDown from 'my-react-component/src/components/dropdown/DropDown'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { IOutletContext, BaseItemDetail } from 'types/interface'
const UserFavoritePage = () => {
  const { login } = useOutletContext<IOutletContext>()
  const { t } = useI18nTypes()
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
      onSuccess: () => {
        //
      },
    }
  )
  const items = [
    {
      name: t('app.navigation.total'),
      value: '',
    },
    {
      name: t('app.navigation.movie'),
      value: MOVIE_CATEGORY.prefix,
    },
    {
      name: t('app.navigation.tv'),
      value: TV_CATEGORY.prefix,
    },
  ]
  const [selected, setSelected] = useState<{ name: string; value: string }>(items[0])
  const filteredData = useMemo(() => {
    if (!selected.value) return data
    return data?.filter((_, idx) => {
      return user?.favorites[idx].split(':')[0] === selected.value
    })
  }, [selected, data])

  if (isLoading) return <PageLoadingSpinner text="목록을 불러오는 중입니다" />
  return (
    <div className="user-favorites-container">
      <h1>{t('app.user.favorites')}</h1>
      <div className="user-favorites-option">
        <DropDown selected={selected.name}>
          <OptionList items={items} click={(item) => setSelected(item)} itemSize="small" />
        </DropDown>
      </div>
      {filteredData?.length ? (
        <div className="user-favorites-items">
          {filteredData?.map((d) => {
            return (
              <PosterCard
                key={d.id}
                imageUrl={isValidImage(d.poster_path)}
                ratio={1.2}
                title={d.title ?? d.name}
                releaseDate={getConvertedDate(d.release_date ?? d.first_air_date)}
                voteAverage={Math.floor(d.vote_average * 10)}
                click={() => goDetailPage(d)}
              />
            )
          })}
        </div>
      ) : (
        <Notification
          text={t('app.user.notification_no_favorite')}
          height="30vh"
          color="transparent"
        />
      )}
    </div>
  )
}

export default UserFavoritePage
