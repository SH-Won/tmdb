import FetchAPI from './FetchAPI'

export default class PersonAPI extends FetchAPI {
  urlPrefix: string
  // personId: string | undefined
  constructor(public baseUrl: string) {
    super(baseUrl)
    this.urlPrefix = '/person/'
  }
  getPersonData = async <T>(personId: string): Promise<T> => {
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
  getPersonCredits = async <T>(personId: string): Promise<T> => {
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
  getPersonImages = async <T>(personId: string): Promise<T> => {
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
