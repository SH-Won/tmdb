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
    url: '/' + TV_CATEGORY.prefix + '/' + TV_CATEGORY.POPULAR,
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
    id: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.UPCOMMING,
    name: '영화',
    order: 0,
    url: '/' + MOVIE_CATEGORY.prefix + '/' + MOVIE_CATEGORY.UPCOMMING,
  },
  {
    id: TV_CATEGORY.prefix + '_' + TV_CATEGORY.AIR_TODAY,
    name: 'TV',
    order: 1,
    url: '/' + TV_CATEGORY.prefix + '/' + TV_CATEGORY.AIR_TODAY,
  },
]
