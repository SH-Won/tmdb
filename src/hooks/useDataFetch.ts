import { BaseCredits, BaseItem, RelativeImageResponse } from '../../types/interface'
import BackEnd from '@/networks'
import { useQueries, useQuery, UseQueryResult } from 'react-query'
import { BaseItemDetail, IMedia, IMediaType } from 'types/interface'
import { KeyWordResponse, MovieResponse } from '@/types/network/response'

interface IFetchFuncParams {
  mediaType: IMediaType
  id: IMedia['id']
}

export const getDetail = <T>(mediaType: IMediaType, id: IMedia['id']): UseQueryResult<T> => {
  return useQuery<T>(
    [mediaType, id, 'detail'],
    () => BackEnd.getInstance()[mediaType].getDetail(id),
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
}
export const getCredits = <T>(mediaType: IMediaType, id: IMedia['id']): UseQueryResult<T> => {
  return useQuery<T>(
    [mediaType, id, 'credits'],
    () => BackEnd.getInstance()[mediaType].getCredits(id),
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
}
export const getImages = <T>(mediaType: IMediaType, id: IMedia['id']): UseQueryResult<T> => {
  return useQuery<T>(
    [mediaType, id, 'images'],
    () => BackEnd.getInstance()[mediaType].getImages(id),
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
}
export const getRecommends = <T>(
  mediaType: Exclude<IMediaType, 'person'>,
  id: IMedia['id']
): UseQueryResult<T> => {
  return useQuery<T>(
    [mediaType, id, 'recommends'],
    () => BackEnd.getInstance()[mediaType].getRecommends(id),
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
}
export const getKeywords = <T>(
  mediaType: Exclude<IMediaType, 'person'>,
  id: IMedia['id']
): UseQueryResult<T> => {
  return useQuery<T>(
    [mediaType, id, 'keywords'],
    () => BackEnd.getInstance()[mediaType].getKeywords(id),
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
}
export const getAllDetails = (mediaType: Exclude<IMediaType, 'person'>, id: IMedia['id']) => {
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
  getDetail: <T>() => UseQueryResult<T>
  getCredits: <T>() => UseQueryResult<T>
  getImages: <T>() => UseQueryResult<T>
}
interface IFetchReturnType extends IFetchBaseReturnType {
  getKeywords: <T>() => UseQueryResult<T>
  getRecommends: <T>() => UseQueryResult<T>
}

const useDataFetch = (mediaType: IMediaType, id: IMedia['id']) => {
  return mediaType !== 'person'
    ? {
        getDetail: <T>() => getDetail<T>(mediaType, id),
        getCredits: <T>() => getCredits<T>(mediaType, id),
        getImages: <T>() => getImages<T>(mediaType, id),
        getKeywords: <T>() => getKeywords<T>(mediaType, id),
        getRecommends: <T>() => getRecommends<T>(mediaType, id),
      }
    : {
        getDetail: <T>() => getDetail<T>(mediaType, id),
        getCredits: <T>() => getCredits<T>(mediaType, id),
        getImages: <T>() => getImages<T>(mediaType, id),
      }
}
export { useDataFetch }
