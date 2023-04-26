import FetchAPI from './FetchAPI'

export default class CommponAPI extends FetchAPI {
  constructor(public baseUrl: string) {
    super(baseUrl)
  }
  getItems = async <T>(url: string): Promise<T> => {
    const response = await this.fetch({
      method: 'GET',
      url,
      query: {
        language: 'ko-KR',
        page: 1,
      },
    })
    return response.data
  }
}
