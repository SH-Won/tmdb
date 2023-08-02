import FetchAPI from './FetchAPI'

export default class CommponAPI extends FetchAPI {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }

  getItems = async <T>(params: any): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: params.url,
      query: {
        language: 'ko-KR',
        page: params.page,
      },
    })
    return response.data
  }
  getCredits = async <T>(url: string): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url,
      query: {
        language: 'ko-KR',
      },
    })
    return response.data
  }

  getSearch = async <T>(params: any): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: params.url,
      query: params.query,
    })
    return response.data
  }
  getGenre = async <T>(category: string): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/genre/${category}/list`,
      query: {
        lauguage: 'ko',
      },
    })
    return response.data
  }
  getProviders = async <T>(params: { media: string; watch_region: string }): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url: `/watch/providers/${params.media}`,
      query: {
        watch_region: params.watch_region,
      },
    })
    return response.data
  }
  getPopularPerson = async <T>(params: { page: number }): Promise<T> => {
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
}
