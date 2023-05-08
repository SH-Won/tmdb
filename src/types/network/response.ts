type CreateType<T> = {
  [Property in keyof T]: T[Property]
}
export type IKeyWord = {
  id: number
  name: string
}
export type IGenre = CreateType<IKeyWord>

export interface MovieResponse<T> {
  page: number
  results: T
  total_pages: number
  total_results: number
}
export interface KeyWordResponse {
  id: number
  keywords?: IKeyWord[]
  results?: IKeyWord[]
}
export interface GenreResponse {
  genres: IGenre[]
}
