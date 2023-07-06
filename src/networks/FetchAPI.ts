import axios, { AxiosResponse } from 'axios'
interface FetchParams {
  method: string
  url?: string
  query?: any
}
interface InterfaceAPI {
  baseUrl?: string
  getFullUrl: (url: string) => string
  fetch: (params: FetchParams) => Promise<AxiosResponse<unknown, unknown>>
}

export default class FetchAPI implements InterfaceAPI {
  constructor(public baseUrl?: string) {}
  getFullUrl(url: string) {
    return this.baseUrl + url
  }
  fetch = async (params: FetchParams) => {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    }
    // axios params => query
    return axios({
      method: params.method,
      url: this.baseUrl + params.url!,
      headers,
      params: params.query,
    })
  }
}
