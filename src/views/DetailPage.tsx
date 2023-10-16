import { useQueryDetail, useQueryCredits, useI18nTypes, useUser } from '@/hooks'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import { BaseCredits, BaseCrew, BaseItemDetail, IOutletContext } from 'types/interface'
import '@/styles/DetailPage.scss'
import Intro from '@/components/detail/Intro'
import { useMemo } from 'react'
import Cast from '@/components/detail/Cast'
import Information from '@/components/detail/Information'
import Recommend from '@/components/detail/Recommend'
import UserFavoriteButton from '@/components/user/UserFavoriteButton'
import MediaImageCarousel from '@/components/detail/MediaImageCarousel'

const DetailPage = () => {
  const { login } = useOutletContext<IOutletContext>()
  const { loginUser, addFavorite, removeFavorite } = useUser()
  const { media_type, id } = useLoaderData() as { media_type: 'movie' | 'tv'; id: string }
  const { t } = useI18nTypes()
  const { data: item, isLoading } = useQueryDetail<BaseItemDetail>(media_type, parseInt(id))
  const { data: credits, isLoading: creditsLoading } = useQueryCredits<BaseCredits>(
    media_type,
    parseInt(id)
  )

  const crews = useMemo(() => {
    const directors = credits?.crew.filter((crew: BaseCrew) => crew.job === 'Director') ?? []
    const writers = credits?.crew.filter((crew: BaseCrew) => crew.job === 'Writer') ?? []
    return {
      directors,
      writers,
    }
  }, [credits])

  const isAlreadyUserFavorite = useMemo(() => {
    return loginUser?.favoritesMap?.has(`${media_type}:${id}`)
  }, [loginUser, item])

  const userAddFavorite = async () => {
    const response = await addFavorite(media_type, id)
    if (response === 'needLogin') login()
  }

  // if (isLoading) {
  //   return <PageLoadingSpinner text="please wait a second" />
  // }

  return (
    <div className="detail-page">
      <Intro item={item!} crews={crews} />
      <div className="detail-content">
        <div className="content-cast-recommend">
          <Cast
            casts={credits?.cast}
            title={t('app.detail.cast.title')}
            notification={t('app.detail.cast.no_actors')}
          />
          <Recommend media_type={media_type} id={id} />
          <div className="content-carousel">
            <MediaImageCarousel media_type={media_type} id={id} />
          </div>
        </div>
        <Information media_type={media_type} id={id} />
      </div>
      <UserFavoriteButton
        addFavorite={userAddFavorite}
        removeFavorite={() => removeFavorite(media_type, id)}
        isAlreadyUserFavorite={isAlreadyUserFavorite}
      />
    </div>
  )
}

export default DetailPage
