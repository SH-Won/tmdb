import { useQuery } from 'react-query'
import BackEnd from '@/networks'
import { Media } from '@/const/overall'

// media_type 까지 props 로 받게 되면 그냥 movie 와 tv 를 분리하지 않고
// 함수의 파라미터로 다 받아 movie, tv 구분없는 함수를 하나 만드는게 나을 수도 있을 것 같다
// 그러면 파라미터로 movie, tv 를 구분해 준다면 MovieAPI, TvAPI 의 중복된 코드를 제거 할 수 있다.
type IFuncKey = {
  [KEY in keyof BackEnd['movie' | 'tv']]: BackEnd['movie' | 'tv'][KEY] extends <T>(
    parameter1: number,
    parameter2?: number
  ) => Promise<T>
    ? KEY
    : never
}[keyof BackEnd['movie' | 'tv']]
const useFetch = <T>(
  media_type: Media,
  id: string,
  funcKey: IFuncKey,
  page?: number
): { data: T | undefined; isLoading: boolean } => {
  const Backend = BackEnd.getInstance()
  const { data, isLoading } = useQuery(
    [media_type, id, funcKey],
    async () => {
      const response = await Backend[media_type][funcKey]<T>(parseInt(id), page)
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
