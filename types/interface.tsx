export interface IMovie extends BaseItem {
  // adult: boolean
  // backdrop_path: string
  // genre_ids: object
  // id: number
  // original_language: string
  // original_title: string
  // overview: string
  // popularity: number
  // poster_path: string
  // release_date: string
  // title: string
  // video: boolean
  // vote_average: number
  // vote_count: number
  release_date: string
}
// export interface ITv extends Omit<IMovie, 'release_date' | 'video'> {
//   first_air_date: string
// }
export interface ITv extends BaseItem {
  first_air_date: string
}
export interface BaseItem {
  adult: boolean
  backdrop_path: string
  genre_ids: object
  id: number
  original_language: string
  original_title: string
  original_name?: string
  overview: string
  popularity: number
  poster_path: string
  release_date?: string
  first_air_date?: string
  title: string
  name?: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface BaseItemDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: object
  budget: number
  genres: object
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  original_name?: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: object
  production_countries: object
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: object
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
export interface ITvDetail {
  adult: boolean
  backdrop_path: 'string'
  created_by: 'object'
  episode_run_time: 'object'
  first_air_date: 'string'
  genres: 'object'
  homepage: 'string'
  id: 'number'
  in_production: 'boolean'
  languages: 'object'
  last_air_date: 'string'
  last_episode_to_air: 'object'
  name: 'string'
  networks: 'object'
  next_episode_to_air: 'object'
  number_of_episodes: 'number'
  number_of_seasons: 'number'
  origin_country: 'object'
  original_language: 'string'
  original_name: 'string'
  overview: 'string'
  popularity: 'number'
  poster_path: 'string'
  production_companies: 'object'
  production_countries: 'object'
  seasons: 'object'
  spoken_languages: 'object'
  status: 'string'
  tagline: 'string'
  type: 'string'
  vote_average: 'number'
  vote_count: 'number'
}

export interface BaseCast {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string
}
export interface BaseCrew {
  adult: boolean
  credit_id: string
  department: string
  gender: number
  id: number
  job: string
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}
export interface BaseCredits {
  id: number
}
export interface BaseActorItem {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: string | null
  gender: number
  homepage: string | null
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}
export interface BaseCombineCredit {
  cast: BaseItem[]
  crew: BaseCrew[]
  id: number
}
export interface BaseProvider {
  display_priorities: { [key: string]: number }
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}
export interface IFilter {
  sort_by: string
}
