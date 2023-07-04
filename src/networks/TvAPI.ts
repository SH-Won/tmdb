import { ITv } from './../../types/interface'
import { AxiosResponse } from 'axios'
import FetchAPI from './FetchAPI'

export default class TvAPI extends FetchAPI {
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
  getDetailTv = async <T>(tvId: ITv['id']): Promise<T> => {
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
}
