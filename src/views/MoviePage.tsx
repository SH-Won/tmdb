import { useHelper } from '@/hooks'
import BackEnd from '@/networks'
import { GenreResponse, MovieResponse } from '@/types/network/response'
import { Button, Colors, PageLoadingSpinner, PosterCard } from 'my-react-component'
import React, { useEffect, useMemo, useState, MouseEvent } from 'react'
import { useQuery } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import { BaseItem } from 'types/interface'
import { OPTION_FILTER } from '@/const/filter'
import '../styles/MoviePage.scss'
import FilterDownFall from '@/components/filter/FilterDownFall'
import FilterOption from '@/components/filter/FilterOption'
import FilterSelect from '@/components/filter/FilterSelect'
import FilterSearchButton from '@/components/filter/FilterSearchButton'

type Media = 'movie' | 'tv'
const getFormatDate = (isLastDay = false) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + (date.getDate() + 0)).slice(-2)
  const lastDay = new Date(year, parseInt(month), 0).getDate()
  return year + '-' + month + '-' + (!isLastDay ? day : lastDay)
}
const mapper = {
  popular: {
    sort_by: null,
    // 'vote_count.gte': 300,
    'vote_average.gte': 5,
    with_genres: null,
  },
  top_rated: {
    sort_by: 'vote_average.desc',
    'vote_count.gte': 300,
    with_genres: null,
  },
  now_playing: {
    sort_by: 'release_date.desc',
    with_release_type: '3',
    'vote_count.gte': 500,
    with_genres: null,
  },
  upcomming: {
    // sort_by: 'release_date.desc',
    // 'vote_count.gte': 500,
    // with_release_type: '3',
    'primary_release_date.gte': getFormatDate(),
    'primary_release_date.lte': getFormatDate(true),
    with_genres: null,
  },
  on_the_air: {
    // sort_by: 'first_air_date.desc',
    // with_status: '1',
    'vote_count.gte': 300,
    'air_date.gte': getFormatDate(),
    with_genres: null,
  },
  airing_today: {
    sort_by: 'popularity.desc',
    'air_date.gte': getFormatDate(),
    'air_date.lte': getFormatDate(),
    // 'vote_count.gte': 50,
    width_type: '3',
    with_genres: null,
  },
}

const MoviePage = () => {
  const { media, category } = useParams<{ media: Media; category: keyof typeof mapper }>()
  const { isValidImage, goDetailPage } = useHelper()
  const [items, setItems] = useState<BaseItem[]>([])
  const [page, setPage] = useState(1)
  const [genres, setGenres] = useState<{ [key: string]: boolean }>({})
  const [filter, setFilter] = useState({
    ...mapper[category!],
  })
  console.log(filter)
  console.log(media, category)
  const query = Object.entries(filter)
    .map(([key, value]) => {
      if (!value) return ''
      return `${key}=${value}`
    })
    .filter((el) => !!el)
    .join('&')
  const { data, isLoading } = useQuery(
    [`${media}_${category}`, page, query],
    async () => {
      const response = await BackEnd.getInstance().common.getItems<MovieResponse<BaseItem[]>>({
        // url: `/movie/${category}?${query}`,
        url: `/discover/${media}?${query}`,
        page,
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!category,
    }
  )
  const { data: movieGenre, isLoading: movieLoading } = useQuery(
    [media, 'genre'],
    async () => {
      const response = await BackEnd.getInstance().common.getGenre<GenreResponse>(media as Media)
      return response.genres
    },
    {
      staleTime: Infinity,
    }
  )
  // console.log(data)
  const onChangeFilter = (key: any, value: any) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }))
    setItems([])
    // setIsUserSelectFilter(true)
    setPage(1)
  }
  const selectGenre = (e: MouseEvent<HTMLElement>, id: number) => {
    const element = e.target as Element
    if (element.classList.contains('selected')) {
      element.classList.remove('selected')
      setGenres((prev) => ({
        ...prev,
        [id]: false,
      }))
    } else {
      element.classList.add('selected')
      setGenres((prev) => ({
        ...prev,
        [id]: true,
      }))
    }
  }
  const getSelectGenres = () => {
    return Object.entries(genres)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)
  }
  const prevGenresLength = useMemo(() => {
    return getSelectGenres().length
  }, [filter])

  const showSearchButton = useMemo(() => {
    const isExistSelectedGenre = Object.values(genres).filter((val) => !!val)
    if (isExistSelectedGenre.length === prevGenresLength) return false
    return true
  }, [genres, onChangeFilter])

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setItems(data.results)
        // setIsUserSelectFilter(false)
      } else {
        setItems((prev) => [...prev, ...data.results])
      }
    }
  }, [page, data])

  useEffect(() => {
    setFilter(mapper[category!])
  }, [category])
  console.log(data)
  return (
    <div className="movie-page">
      <div className="sort-filter">
        <FilterDownFall title="정렬">
          <FilterOption
            title="Sort Results By"
            items={OPTION_FILTER}
            onChangeFilter={(value) => onChangeFilter('sort_by', value)}
          />
        </FilterDownFall>
        <FilterDownFall title="장르">
          <FilterSelect items={movieGenre!} selectGenre={selectGenre} />
        </FilterDownFall>
      </div>
      <div className="movie-item-container">
        <div className="item-grid">
          {items.map((item) => (
            <div className="movie-item-container" key={item.id} onClick={() => goDetailPage(item)}>
              <PosterCard
                ratio={1.5}
                imageUrl={isValidImage(item.poster_path)}
                title={item.title ?? item.name}
                voteAverage={Math.floor(item.vote_average * 10)}
                releaseDate={item.release_date ?? item.first_air_date}
              />
            </div>
          ))}
        </div>
        {isLoading ? (
          <PageLoadingSpinner customHeight="100px" />
        ) : (
          <Button
            color={Colors.main}
            fontColor={Colors.white}
            width="auto"
            click={() => setPage((prev) => prev + 1)}
          >
            더 불러오기
          </Button>
        )}
      </div>
      <FilterSearchButton
        show={showSearchButton}
        click={() => onChangeFilter('with_genres', getSelectGenres().join(','))}
      />
    </div>
  )
}

export default MoviePage
