import FetchAPI, { BaseClassProps } from './FetchAPI'
export default class PersonAPI extends FetchAPI implements BaseClassProps {
  urlPrefix: string
  constructor(public baseUrl: string) {
    super(baseUrl)
    this.urlPrefix = '/person/'
  }
  getPopular = async <T>(params: { page: number }): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: '/person/popular',
      query: {
        language: 'ko-KR',
        page: params.page,
      },
    })
    return response.data
  }
  getDetail = async <T>(personId: number): Promise<T> => {
    const url = this.urlPrefix + personId
    const response = await this.fetch({
      method: 'GET',
      url,
      query: {
        language: 'en_US',
      },
    })
    return response.data
  }
  getCredits = async <T>(personId: number): Promise<T> => {
    const url = this.urlPrefix + personId + '/combined_credits'
    const response = await this.fetch({
      method: 'GET',
      url,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }
  getImages = async <T>(personId: number): Promise<T> => {
    const url = this.urlPrefix + personId + '/images'
    const response = await this.fetch({
      method: 'GET',
      url,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }
}
