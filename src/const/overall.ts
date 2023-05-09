export const MOVIE_CONFIG = []

export const HEADER_MOVIE_OPTION = [
  {
    name: '인기',
    value: '/overall/movie/popular',
  },
  {
    name: '현재 상영중',
    value: '/overall/movie/now_playing',
  },
  {
    name: '개봉 예정',
    value: '/overall/movie/upcomming',
  },
  {
    name: '높은 평점',
    value: '/overall/movie/top_rated',
  },
]
export const HEADER_TV_OPTION = [
  {
    name: '인기',
    value: '/overall/tv/popular',
  },
  {
    name: '오늘 방영',
    value: '/overall/tv/airing_today',
  },
  {
    name: '방영 중',
    value: '/overall/tv/on_the_air',
  },
  {
    name: '높은 평점',
    value: '/overall/tv/top_rated',
  },
]

const getFormatDate = (isLastDay = false) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + (date.getDate() + 0)).slice(-2)
  const lastDay = new Date(year, parseInt(month), 0).getDate()
  return year + '-' + month + '-' + (!isLastDay ? day : lastDay)
}
export type Media = 'movie' | 'tv'

export const queryMapper = {
  movie: {
    popular: {
      sort_by: null,
      'vote_average.gte': 5,
      with_genres: '',
      with_watch_providers: '',
      watch_region: '',
    },
    top_rated: {
      sort_by: 'vote_average.desc',
      'vote_count.gte': 300,
      with_genres: '',
      with_watch_providers: '',
      watch_region: '',
    },
    now_playing: {
      sort_by: 'release_date.desc',
      with_release_type: '3',
      'vote_count.gte': 500,
      with_genres: '',
      with_watch_providers: '',
      watch_region: '',
    },
    upcomming: {
      'primary_release_date.gte': getFormatDate(),
      'primary_release_date.lte': getFormatDate(true),
      with_genres: '',
      with_watch_providers: '',
      watch_region: '',
    },
  },
  tv: {
    popular: {
      sort_by: null,
      'vote_average.gte': 5,
      with_genres: '',
      // with_original_language: 'ko|en|br',
      with_watch_providers: '',
      watch_region: '',
    },
    top_rated: {
      sort_by: 'vote_average.desc',
      'vote_count.gte': 300,
      with_genres: null,
      with_watch_providers: '',
      watch_region: '',
    },
    on_the_air: {
      'vote_count.gte': 300,
      'air_date.gte': getFormatDate(),
      with_genres: '',
      with_watch_providers: '',
      watch_region: '',
    },
    airing_today: {
      sort_by: 'popularity.desc',
      'air_date.gte': getFormatDate(),
      'air_date.lte': getFormatDate(),
      with_genres: '',
      with_watch_providers: '',
      watch_region: '',
    },
  },
}
