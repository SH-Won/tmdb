import { IMovie, ISearchFilter } from 'types/interface'
import FetchAPI, { MediaClassProps } from './FetchAPI'
import { IFilterObj } from '@/const/overall'

export default class MovieAPI extends FetchAPI implements MediaClassProps {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }
  getSearch = async <T>(params: { filter: ISearchFilter }): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: '/search/movie',
      query: params.filter,
    })
    return response.data
  }
  getVideo = async <T>(id: IMovie['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/movie/${id}/videos`,
    })
    return response.data
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
