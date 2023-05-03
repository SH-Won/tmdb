export interface MovieResponse<T> {
  page: number
  results: T
  total_pages: number
  total_results: number
}
export interface KeyWordResponse {
  id: number
  keywords: {
    id: number
    name: string
  }[]
}
