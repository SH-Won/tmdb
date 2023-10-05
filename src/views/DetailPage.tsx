import { useBreakPoints, useFetch, useHelper, useI18nTypes } from '@/hooks'
import BackEnd from '@/networks'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import {
  BaseCredits,
  BaseCrew,
  BaseItem,
  BaseItemDetail,
  BasicImage,
  IOutletContext,
  RelativeImageResponse,
} from 'types/interface'
import '@/styles/DetailPage.scss'
import Intro from '@/components/detail/Intro'
import { useMemo } from 'react'
import Cast from '@/components/detail/Cast'
import Information from '@/components/detail/Information'
import { RatioCardImage, AutoCarousel, PageLoadingSpinner } from 'my-react-component'
import Recommend from '@/components/detail/Recommend'
import { KeyWordResponse, MovieResponse } from '@/types/network/response'
import { useRecoilState, useRecoilValue } from 'recoil'
import { _user } from '@/store/user'
import { toast } from '@/store/toast'
import UserFavoriteButton from '@/components/user/UserFavoriteButton'
const DetailPage = () => {
  const [loginUser, setLoginUser] = useRecoilState(_user)
  const toastInstance = useRecoilValue(toast)
  const { login } = useOutletContext<IOutletContext>()
  const { media_type, id } = useLoaderData() as { media_type: 'movie' | 'tv'; id: string }
  const { breakPointsClass } = useBreakPoints()
  const { isValidImage } = useHelper()
  const { t } = useI18nTypes()

  const { data: item, isLoading } = useFetch<BaseItemDetail>(media_type, id, 'getDetail')

  const { data: credits, isLoading: creditsLoading } = useFetch<BaseCredits>(
    media_type,
    id,
    'getCredits'
  )
  const { data: recommends, isLoading: recommendLoading } = useFetch<MovieResponse<BaseItem[]>>(
    media_type,
    id,
    'getRecommends'
  )
  const { data: keyword, isLoading: keywordLoading } = useFetch<KeyWordResponse>(
    media_type,
    id,
    'getKeywords'
  )

  const { data: images, isLoading: imageLoading } = useFetch<RelativeImageResponse>(
    media_type,
    id,
    'getImages'
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

  const addFavorite = async () => {
    if (!loginUser?.uid) {
      const userConfirm = confirm('로그인이 필요합니다')
      if (userConfirm) login()
      return
    }
    try {
      let response

      if (!loginUser.favorites.length) {
        response = await BackEnd.getInstance().user.createFavorite(
          loginUser!.uid,
          `${media_type}:${id}`
        )
      } else {
        response = await BackEnd.getInstance().user.addFavorite(
          loginUser!.uid,
          `${media_type}:${id}`
        )
      }
      if (response) {
        const newFavorites = [...loginUser.favorites, `${media_type}:${id}`]
        setLoginUser({
          ...loginUser,
          favorites: newFavorites,
          favoritesMap: new Set(newFavorites),
        })
        toastInstance.successAddFavorite()
      }
    } catch (e) {
      if (e instanceof Error) toastInstance.error(e.message)
    }
  }
  const removeFavorite = async () => {
    if (!loginUser) return
    try {
      const response = await BackEnd.getInstance().user.removeFavorite(
        loginUser!.uid,
        `${media_type}:${id}`
      )

      if (response) {
        const newFavoritesMap = new Set(loginUser.favorites)
        newFavoritesMap.delete(`${media_type}:${id}`)
        setLoginUser({
          ...loginUser,
          favorites: Array.from(newFavoritesMap),
          favoritesMap: newFavoritesMap,
        })
        toastInstance.successRemoveFavorite()
      }
    } catch (e) {
      if (e instanceof Error) toastInstance.error(e.message)
    }
  }

  if (isLoading || creditsLoading || recommendLoading || keywordLoading || imageLoading) {
    return <PageLoadingSpinner text="please wait a second" />
  }

  return (
    <div className={`detail-page ${breakPointsClass}`}>
      <Intro item={item!} crews={crews} />
      <div className="detail-content">
        <div className="content-cast-recommend">
          <Cast
            casts={credits!.cast}
            title={t('app.detail.cast.title')}
            notification={t('app.detail.cast.no_actors')}
          />
          <Recommend
            items={recommends!.results}
            title={t('app.detail.recommend.title')}
            notification={t('app.detail.recommend.no_recommends')}
          />
          <div className="content-carousel">
            <h3>{t('app.detail.image.background')}</h3>
            {images?.backdrops && (
              <AutoCarousel<BasicImage>
                time={2000}
                items={
                  images.backdrops.length >= 2
                    ? images.backdrops.slice(1, 10)
                    : images.backdrops!.length === 0
                    ? [
                        {
                          file_path: item!.backdrop_path,
                          aspect_ratio: 1.576,
                          height: 0,
                          iso_639_1: '',
                          vote_average: 0,
                          vote_count: 0,
                          width: 0,
                        },
                      ]
                    : images.backdrops!.slice(0)
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
            )}
          </div>
        </div>
        <Information item={item!} keywords={keyword!.keywords ?? keyword!.results} />
      </div>
      <UserFavoriteButton
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        isAlreadyUserFavorite={isAlreadyUserFavorite}
      />
    </div>
  )
}

export default DetailPage
