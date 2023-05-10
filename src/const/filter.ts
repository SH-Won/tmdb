export interface OptionFilterItem {
  name: string
  value:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'release_date.asc'
    | 'release_date.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'original_title.asc'
}
export const OPTION_FILTER: OptionFilterItem[] = [
  {
    name: '인기도 내림차순',
    value: 'popularity.desc',
  },
  {
    name: '인기도 오름차순',
    value: 'popularity.asc',
  },
  {
    name: '평점 내림차순',
    value: 'vote_average.desc',
  },
  {
    name: '평점 오름차순',
    value: 'vote_average.asc',
  },
  {
    name: '상영일 내림차순',
    value: 'release_date.desc',
  },
  {
    name: '상영일 오름차순',
    value: 'release_date.desc',
  },
  {
    name: '제목 오름차순',
    value: 'original_title.asc',
  },
]
