import { MOVIE_CATEGORY } from '@/const'
import { TRENDING_CATEGORY, TV_CATEGORY } from './movie'
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
    url: '/' + TV_CATEGORY.prefix + '/' + TV_CATEGORY.POPULAR + '?vote_average.gte=7',
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
      '?release_date.gte=2023-05-05&release_date.lte=2023-05-07&sort_by=popularity.desc',
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
      '?air_date.gte=2023-05-05&air_date.lte=2023-05-07&sort_by=popularity.desc',
  },
]

//&sort_by=first_air_date.desc
//&sort_by=release_date.desc
