import { ISearchFilter } from './../../types/interface'
import { useI18nTypes, useToast } from '@/hooks'
import { ItemType } from '@/const/toggleBar'
import { BaseCredits, BaseItem, BaseProvider, RelativeImageResponse } from '../../types/interface'
import BackEnd from '@/networks'
import { useQueries, useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { BaseItemDetail, IMedia, IMediaType } from 'types/interface'
import {
  CommonResponse,
  GenreResponse,
  KeyWordResponse,
  MovieResponse,
} from '@/types/network/response'
import { IFilterObj, Media, queryMapper } from '@/const/overall'

export const QUERY_KEY = {
  SEARCH: 'search',
  PROVIDER: 'provider',
  GENRE: 'genre',
  DETAIL: 'detail',
  CREDITS: 'credits',
  IMAGES: 'images',
  RECOMMENDS: 'recommends',
  KEYWORDS: 'keywords',
  VIDEO: 'video',
}
interface IFetchFuncParams {
  mediaType: IMediaType
  id: IMedia['id']
}

interface IQueryDiscoverParams {
  mediaType: Media
  category: keyof (typeof queryMapper)[Media]
  page: number
  filter: IFilterObj
}
interface IGenericQueryFn<U> {
  <T>(mediaType: U, ...arg: IMedia['id'][]): UseQueryResult<T>
}
// react-query staleTime, cacheTime
// staleTime 은 데이터가 fetching 되고 데이터가 fresh 한 시간이다
// staleTime 이 지나면 refetching 을 하게 되는데 이때 캐시가 남아있다면 cache 된 데이터를 먼저 보여줄 수 있다
// cacheTime은 데이터가 inactive 할때 부터 시간이 카운트 다운 된다
// cacheTime 이 지나면 메모리에서 삭제되므로 refetching
export const getQueryConfig = (staleTime: number, enabled: boolean, onSuccess?: () => void) => {
  return {
    staleTime,
    enabled,
    onSuccess: () => onSuccess?.(),
  }
}
export const getQueryString = (queryObj: IQueryDiscoverParams['filter']) => {
  return Object.entries(queryObj)
    .map(([key, value]) => {
      if (value === '' || value === null) return ''
      return `${key}=${value}`
    })
    .filter((el) => !!el)
    .join('&')
}
export const useQueryVideo: IGenericQueryFn<Media> = (mediaType, id) => {
  return useQuery(
    [mediaType, id, QUERY_KEY.VIDEO],
    () => BackEnd.getInstance()[mediaType].getVideo(id),
    getQueryConfig(Infinity, !!id)
  )
}

export const useQueryProvider = (
  mediaType: Exclude<IMediaType, 'person'>,
  onSuccess: () => void
): UseQueryResult<CommonResponse<BaseProvider[]>> => {
  const { t } = useI18nTypes()
  return useQuery(
    [mediaType, QUERY_KEY.PROVIDER],
    () =>
      BackEnd.getInstance().common.getProviders<CommonResponse<BaseProvider[]>>({
        media: mediaType,
        watch_region: t('app.query.watch_region'),
      }),
    getQueryConfig(Infinity, !!mediaType, onSuccess)
  )
}

export const useQueryCommon = <T>(queryInfo: ItemType, page: number): UseQueryResult<T> => {
  const { showToast } = useToast()
  return useQuery(
    [queryInfo.id, page],
    () =>
      BackEnd.getInstance().common.getItems({
        url: queryInfo.value,
        page,
      }),
    {
      ...getQueryConfig(300000, !!queryInfo),
      retry: 1,
      onError: (e) => {
        showToast({
          type: 'error',
          text: '정보를 가져오는데 실패했습니다. 다시 불러오는 중입니다',
        })
      },
    }
  )
}
export const useQuerySearch = <T>(
  mediaType: Exclude<IMediaType, 'person'>,
  filter: ISearchFilter,
  enable: boolean
): UseQueryResult<T> => {
  return useQuery(
    [mediaType, QUERY_KEY.SEARCH, filter.query, filter.page],
    () => BackEnd.getInstance()[mediaType].getSearch({ filter }),
    getQueryConfig(Infinity, enable)
  )
}
export const useQueryGenre = (mediaType: Exclude<IMediaType, 'person'>) => {
  const { t } = useI18nTypes()
  return useQuery(
    [mediaType, QUERY_KEY.GENRE],
    () => BackEnd.getInstance()[mediaType].getGenres<GenreResponse>(t('app.query.genre_language')),
    getQueryConfig(Infinity, !!mediaType)
  )
}

export const useQueryDiscover = ({
  mediaType,
  category,
  page,
  filter,
}: IQueryDiscoverParams): UseQueryResult<MovieResponse<BaseItem[]>> => {
  const query = getQueryString(filter)
  const { t } = useI18nTypes()
  filter['page'] = page
  filter['language'] = t('app.query.language')
  // const queryClient = useQueryClient()
  // const providerCache = queryClient.getQueryData([mediaType, 'provider'])
  return useQuery(
    [`${mediaType}_${category}`, page, query],
    () => BackEnd.getInstance()[mediaType].getDiscoverItems({ filter }),
    getQueryConfig(Infinity, true)
  )
}

export const useQueryDetail: IGenericQueryFn<IMediaType> = (mediaType, id) => {
  return useQuery(
    [mediaType, id, QUERY_KEY.DETAIL],
    () => BackEnd.getInstance()[mediaType].getDetail(id),
    // {
    //   suspense: true,
    //   ...getQueryConfig(Infinity, !!mediaType),
    // }
    getQueryConfig(Infinity, !!mediaType)
  )
}
export const useQueryCredits: IGenericQueryFn<IMediaType> = (mediaType, id) => {
  return useQuery(
    [mediaType, id, QUERY_KEY.CREDITS],
    () => BackEnd.getInstance()[mediaType].getCredits(id),
    getQueryConfig(Infinity, !!id)
  )
}
export const useQueryImages: IGenericQueryFn<IMediaType> = (mediaType, id) => {
  return useQuery(
    [mediaType, id, QUERY_KEY.IMAGES],
    () => BackEnd.getInstance()[mediaType].getImages(id),
    getQueryConfig(Infinity, !!id)
  )
}
export const useQueryRecommends: IGenericQueryFn<Exclude<IMediaType, 'person'>> = (
  mediaType,
  id
) => {
  return useQuery(
    [mediaType, id, QUERY_KEY.RECOMMENDS],
    () => BackEnd.getInstance()[mediaType].getRecommends(id),
    getQueryConfig(Infinity, !!id)
  )
}
export const useQueryKeywords: IGenericQueryFn<Exclude<IMediaType, 'person'>> = (mediaType, id) => {
  return useQuery(
    [mediaType, id, QUERY_KEY.KEYWORDS],
    () => BackEnd.getInstance()[mediaType].getKeywords(id),
    // {
    //   suspense: true,
    //   ...getQueryConfig(Infinity, !!mediaType),
    // }
    getQueryConfig(Infinity, !!mediaType)
  )
}
export const useQueryDetails = (mediaType: Exclude<IMediaType, 'person'>, id: IMedia['id']) => {
  const fetchArr = [
    {
      queryKey: 'detail',
      queryFn: () => BackEnd.getInstance()[mediaType].getDetail(id),
      staleTime: Infinity,
    },
    {
      queryKey: 'credits',
      queryFn: () => BackEnd.getInstance()[mediaType].getCredits(id),
      staleTime: Infinity,
    },
    {
      queryKey: 'recommends',
      queryFn: () => BackEnd.getInstance()[mediaType].getRecommends(id),
      staleTime: Infinity,
    },
    {
      queryKey: 'keywords',
      queryFn: () => BackEnd.getInstance()[mediaType].getKeywords(id),
      staleTime: Infinity,
    },
    {
      queryKey: 'images',
      queryFn: () => BackEnd.getInstance()[mediaType].getImages(id),
      staleTime: Infinity,
    },
  ]
  const data = useQueries(
    fetchArr.map((item) => {
      return {
        queryKey: [mediaType, id, item.queryKey],
        queryFn: item.queryFn,
        staleTime: item.staleTime,
        enabled: !!id,
      }
    })
  )
  if (data.some((d) => d.status === 'loading'))
    return {
      isLoading: true,
      item: null,
      credits: null,
      recommends: null,
      keyword: null,
      images: null,
    }
  return {
    isLoading: false,
    item: data[0].data as BaseItemDetail,
    credits: data[1].data as BaseCredits,
    recommends: data[2].data as MovieResponse<BaseItem[]>,
    keyword: data[3].data as KeyWordResponse,
    images: data[4].data as RelativeImageResponse,
  }
}

interface IFetchBaseReturnType {
  getDetail: typeof useQueryDetail
  getCredits: typeof useQueryCredits
  getImages: typeof useQueryImages
}
interface IFetchReturnType extends IFetchBaseReturnType {
  getKeywords: typeof useQueryKeywords
  getRecommends: typeof useQueryRecommends
}

// const useDataFetch = <T extends IMediaType>(mediaType: T, id: IMedia['id']): IFetchReturnType => {
//   return mediaType !== 'person'
//     ? {
//         getDetail: <T>() => getDetail<T>(mediaType, id),
//         getCredits: <T>() => getCredits<T>(mediaType, id),
//         getImages: <T>() => getImages<T>(mediaType, id),
//         // getKeywords: <T>() => getKeywords<T>(mediaType, id),
//         // getRecommends: <T>() => getRecommends<T>(mediaType, id),
//       }
//     : {
//         getDetail: <T>() => getDetail<T>(mediaType, id),
//         getCredits: <T>() => getCredits<T>(mediaType, id),
//         getImages: <T>() => getImages<T>(mediaType, id),
//       }
// }
// export { useDataFetch }
