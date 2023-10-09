import { TrendingMovieParams } from './../types/network/request'
import { AxiosResponse } from 'axios'
import { IMovie } from 'types/interface'
import FetchAPI, { MediaClassProps } from './FetchAPI'
import { IFilterObj, Media } from '@/const/overall'

export default class MovieAPI extends FetchAPI implements MediaClassProps {
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
  getDetail = async <T>(movieId: IMovie['id']): Promise<T> => {
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
  getRecommends = async <T>(movieId: IMovie['id'], page = 1): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/movie/${movieId}/recommendations`,
      query: {
        language: 'ko-KR',
        page,
      },
    })
    return response.data
  }
  getKeywords = async <T>(movieId: IMovie['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/movie/${movieId}/keywords`,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }
  getImages = async <T>(movieId: IMovie['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/movie/${movieId}/images`,
    })
    return response.data
  }
  getGenres = async <T>(language: string): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: '/genre/movie/list',
      query: {
        language,
      },
    })
    return response.data
  }
  getDiscoverItems = async <T>(params: { filter: IFilterObj }): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: '/discover/movie',
      query: params.filter,
    })
    return response.data
  }
}
