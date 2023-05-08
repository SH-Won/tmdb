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
        lauguage: 'ko-KR',
      },
    })
    return response.data
  }
}
