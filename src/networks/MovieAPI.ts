import { TrendingMovieParams } from './../types/network/request'
import { AxiosResponse } from 'axios'
import { IMovie } from 'types/interface'
import FetchAPI from './FetchAPI'

export default class MovieAPI extends FetchAPI {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }
  getMovies = async <T>(category: string): Promise<T> => {
    // page 를 parameter 로 받을 수도 있음
    try {
      const response = await this.fetch({
        method: 'GET',
        url: `/movie/${category}`,
        query: {
          language: 'ko-KR',
          page: 1,
        },
      })
      return response.data
    } catch (e) {
      throw new Error('error')
    }
  }
  getTrendingMovies = async <T>(params: TrendingMovieParams): Promise<AxiosResponse<T>> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/trending/${params.media_type}/${params.time_window}`,
    })
    return response
  }
  getDetailMovie = async <T>(movieId: IMovie['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/movie/${movieId}`,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }
  getCredits = async <T>(movieId: IMovie['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/movie/${movieId}/credits`,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }
}
