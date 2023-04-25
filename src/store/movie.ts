import { MOVIE_CATEGORY } from '@/const'
import { atom } from 'recoil'
import { IMovie } from 'types/interface'

export const _popularMovies = atom<IMovie[]>({
  key: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.POPULAR,
  default: [],
})

export const _topRatedMovies = atom<IMovie[]>({
  key: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.TOP_RATED,
  default: [],
})

export const _trendingMovies = atom<IMovie[]>({
  key: MOVIE_CATEGORY.prefix + '_' + MOVIE_CATEGORY.TRENDING,
  default: [],
})
