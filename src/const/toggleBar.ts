import { MOVIE_CATEGORY } from '@/const'
import { TRENDING_CATEGORY, TV_CATEGORY } from './movie'

const DEFAULT_MOVIE_PROVIDER =
  '8|119|337|356|97|350|96|3|11|100|190|521|475|538|546|551|554|559|444|567|569|315|677|692|701|1771|309|445|1796|283'
const DEFAULT_TV_PROVIDER =
  '8|119|337|356|97|350|96|190|475|538|546|551|554|444|315|692|701|309|445|1796|283'
export interface ItemType {
  id: string
  name: string
  order: number
  url: string
}
export const TOGGLE_MOVIE_ITEM: ItemType[] = [
  {
    id: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.POPULAR,
    name: '인기',
    order: 0,
    url: '/' + MOVIE_CATEGORY.prefix + '/' + MOVIE_CATEGORY.POPULAR,
  },
  {
    id: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.TOP_RATED,
    name: '순위',
    order: 1,
    url: '/' + MOVIE_CATEGORY.prefix + '/' + MOVIE_CATEGORY.TOP_RATED,
  },
  {
    id: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.NOW_PLAYING,
    name: '상영중',
    order: 2,
    url: '/' + MOVIE_CATEGORY.prefix + '/' + MOVIE_CATEGORY.NOW_PLAYING,
  },
  {
    id: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.UPCOMMING,
    name: '예정',
    order: 3,
    url: '/' + MOVIE_CATEGORY.prefix + '/' + MOVIE_CATEGORY.UPCOMMING,
  },
]
export const TOGGLE_TV_ITEM: ItemType[] = [
  {
    id: TV_CATEGORY.prefix + '_' + TV_CATEGORY.POPULAR,
    name: '인기',
    order: 0,
    url:
      '/' +
      TV_CATEGORY.prefix +
      '/' +
      TV_CATEGORY.POPULAR +
      '?vote_average.gte=7&watch_region=KR&with_watch_providers=8|119|337|356|97|350|96|190|475|538|546|551|554|444|315|692|701|309|445|1796|283',
  },
  {
    id: TV_CATEGORY.prefix + '_' + TV_CATEGORY.TOP_RATED,
    name: '순위',
    order: 1,
    url: '/' + TV_CATEGORY.prefix + '/' + TV_CATEGORY.TOP_RATED,
  },
  {
    id: TV_CATEGORY.prefix + '_' + TV_CATEGORY.AIR_TODAY,
    name: '오늘 예정',
    order: 2,
    url: '/' + TV_CATEGORY.prefix + '/' + TV_CATEGORY.AIR_TODAY,
  },
  {
    id: TV_CATEGORY.prefix + '_' + TV_CATEGORY.ON_THE_AIR,
    name: '방송 중',
    order: 3,
    url: '/' + TV_CATEGORY.prefix + '/' + TV_CATEGORY.ON_THE_AIR,
  },
]
export const TOGGLE_TRENDING_ITEMS: ItemType[] = [
  {
    id: TRENDING_CATEGORY.prefix + '_' + TRENDING_CATEGORY.DAY,
    name: '오늘',
    order: 0,
    url: '/' + TRENDING_CATEGORY.prefix + '/' + TRENDING_CATEGORY.ALL + '/' + TRENDING_CATEGORY.DAY,
  },
  {
    id: TRENDING_CATEGORY.prefix + '_' + TRENDING_CATEGORY.WEEK,
    name: '이번주',
    order: 1,
    url:
      '/' + TRENDING_CATEGORY.prefix + '/' + TRENDING_CATEGORY.ALL + '/' + TRENDING_CATEGORY.WEEK,
  },
]
// 임시 토글바 config
export const TOGGLE_UPCOMMING: ItemType[] = [
  {
    id: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.DISCOVER,
    name: '영화',
    order: 0,
    url:
      '/' +
      MOVIE_CATEGORY.DISCOVER +
      '/' +
      MOVIE_CATEGORY.prefix +
      '?release_date.gte=2023-05-10&sort_by=popularity.desc&with_watch_providers=8|119|337|356|97|350|96|3|11|100|190|521|475|538|546|551|554|559|444|567|569|315|677|692|701|1771|309|445|1796|283&watch_region=KR',
    // '?release_date.gte=2023-05-07&watch_region=KR&with_watch_monetization_types=flatrate',
  },
  {
    id: TV_CATEGORY.prefix + '_' + TV_CATEGORY.DISCOVER,
    name: 'TV',
    order: 1,
    url:
      '/' +
      TV_CATEGORY.DISCOVER +
      '/' +
      TV_CATEGORY.prefix +
      // '?air_date.gte=2023-05-10&sort_by=popularity.desc&with_watch_providers=8|119|337|356|97|350|96|190|475|538|546|551|554|444|315|692|701|309|445|1796|283&watch_region=KR&with_watch_monetization_types=flatrate',
      '?sort_by=air_date.desc&with_watch_providers=8|119|337|356|97|350|96|190|475|538|546|551|554|444|315|692|701|309|445|1796|283&watch_region=KR&with_watch_monetization_types=flatrate',
  },
]

//&sort_by=first_air_date.desc
//&sort_by=release_date.desc
