import { MOVIE_CATEGORY } from '@/const'
import { useBreakPoints, useHelper, useI18nTypes } from '@/hooks'
import BackEnd from '@/networks'
import { useQuery } from 'react-query'
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
  const { media_type, id } = useLoaderData() as { media_type: string; id: string }
  const { breakPointsClass } = useBreakPoints()
  const { isValidImage } = useHelper()
  const { t } = useI18nTypes()
  const { data: item, isLoading } = useQuery(
    [media_type, id],
    async () => {
      if (media_type === MOVIE_CATEGORY.prefix) {
        const response = await BackEnd.getInstance().movie.getDetailMovie<BaseItemDetail>(
          parseInt(id)
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
    [media_type, id, 'credits'],
    async () => {
      const url = `/${media_type}/${id}/credits`
      const response = await BackEnd.getInstance().common.getItems<BaseCredits>({
        url,
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!id && !!media_type,
    }
  )
  const { data: recommends, isLoading: recommendLoading } = useQuery(
    [media_type, id, 'recommends'],
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
    [media_type, id, 'keyword'],
    async () => {
      const url = `/${media_type}/${id}/keywords`
      const response = await BackEnd.getInstance().common.getItems<KeyWordResponse>({
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
    [media_type, id, 'images'],
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
    // return <LoadingSpinner opacity={0.6} />
    return <PageLoadingSpinner text="please wait a second" />
  }
  return (
    <div className={`detail-page ${breakPointsClass}`}>
      <Intro item={item!} crews={crews} />
      {/* <Button
        border={Colors.grey_111}
        fontColor={Colors.grey_111}
        color={Colors.white}
        click={isAlreadyUserFavorite ? removeFavorite : addFavorite}
      >
        {isAlreadyUserFavorite ? '해제' : '추가'}
      </Button>
      <Button
        border={Colors.grey_111}
        fontColor={Colors.grey_111}
        color={Colors.white}
        click={() => toastInstance.test()}
      >
        토스트
      </Button> */}
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
            <AutoCarousel<BasicImage>
              time={2000}
              items={
                images && images.length >= 2
                  ? images!.slice(1, 10)
                  : images!.length === 0
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
                  : images!.slice(0)
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
