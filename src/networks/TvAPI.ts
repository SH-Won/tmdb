import { ITv } from './../../types/interface'
import { AxiosResponse } from 'axios'
import FetchAPI, { MediaClassProps } from './FetchAPI'

export default class TvAPI extends FetchAPI implements MediaClassProps {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }
  getTvItems = async <T>(category: string): Promise<AxiosResponse<T>> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/tv/${category}`,
      query: {
        language: 'ko-KR',
        page: 1,
      },
    })
    return response
  }
  getDetail = async <T>(tvId: ITv['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/tv/${tvId}`,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }
  getCredits = async <T>(tvId: ITv['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/tv/${tvId}/credits`,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }
  getRecommends = async <T>(tvId: ITv['id'], page = 1): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/tv/${tvId}/recommendations`,
      query: {
        language: 'ko-KR',
        page,
      },
    })
    return response.data
  }
  getKeywords = async <T>(tvId: ITv['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/tv/${tvId}/keywords`,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }
  getImages = async <T>(tvId: ITv['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/tv/${tvId}/images`,
    })
    return response.data
  }
}
