import { ISearchFilter, ITv } from './../../types/interface'
import FetchAPI, { MediaClassProps } from './FetchAPI'
import { IFilterObj } from '@/const/overall'

export default class TvAPI extends FetchAPI implements MediaClassProps {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }
  getSearch = async <T>(params: { filter: ISearchFilter }): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: '/search/tv',
      query: params.filter,
    })
    return response.data
  }
  getVideo = async <T>(id: ITv['id']): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/tv/${id}/videos`,
    })
    return response.data
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
  getGenres = async <T>(language: string): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: '/genre/tv/list',
      query: {
        language,
      },
    })
    return response.data
  }
  getDiscoverItems = async <T>(params: { filter: IFilterObj }): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: '/discover/tv',
      query: params.filter,
    })
    return response.data
  }
}
