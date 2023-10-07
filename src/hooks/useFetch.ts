import { BaseClassProps, MediaClassProps } from './../networks/FetchAPI'
import { useQuery } from 'react-query'
import BackEnd from '@/networks'
import { Media } from '@/const/overall'
import PersonAPI from '@/networks/PersonAPI'

// media_type 까지 props 로 받게 되면 그냥 movie 와 tv 를 분리하지 않고
// 함수의 파라미터로 다 받아 movie, tv 구분없는 함수를 하나 만드는게 나을 수도 있을 것 같다
// 그러면 파라미터로 movie, tv 를 구분해 준다면 MovieAPI, TvAPI 의 중복된 코드를 제거 할 수 있다.
type IMediaType = Media | 'person'
type IFuncKey<U extends IMediaType> = {
  [KEY in keyof BackEnd[U]]: BackEnd[U][KEY] extends <T>(
    parameter1: number,
    parameter2?: number
  ) => Promise<T>
    ? KEY
    : never
}[keyof BackEnd[U]]

type IFunc<T> = {
  [Key in keyof T]: T[Key]
}[keyof T]
type IKey = keyof MediaClassProps
const useFetch = <T, U extends IMediaType>(
  media_type: IMediaType,
  id: string,
  funcKey: IFuncKey<U>,
  page?: number
): { data: T | undefined; isLoading: boolean } => {
  const Backend = BackEnd.getInstance()[media_type]
  const { data, isLoading } = useQuery(
    [media_type, id, funcKey],
    async () => {
      let response
      if (Backend instanceof PersonAPI) {
        response = await Backend[funcKey as IFuncKey<'person'>]<T>(parseInt(id))
      } else {
        response = await Backend[funcKey as IFuncKey<'movie'>]<T>(parseInt(id), page)
      }
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  )
  return { data, isLoading }
}
export { useFetch }
