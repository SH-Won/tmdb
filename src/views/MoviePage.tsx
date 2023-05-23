import { useHelper, useI18nTypes } from '@/hooks'
import BackEnd from '@/networks'
import { CommonResponse, GenreResponse, IGenre, MovieResponse } from '@/types/network/response'
import { BasicAccordion, Button, Colors, PageLoadingSpinner, PosterCard } from 'my-react-component'
import { useEffect, useMemo, useState, MouseEvent } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { BaseItem, BaseProvider } from 'types/interface'
import { OPTION_FILTER } from '@/const/filter'
import '../styles/MoviePage.scss'
import FilterOption from '@/components/filter/FilterOption'
import FilterGenre from '@/components/filter/FilterGenre'
import FilterSearchButton from '@/components/filter/FilterSearchButton'
import { type Media, queryMapper as mapper } from '@/const/overall'
import FilterProvider from '@/components/filter/FilterProvider'

// const convertedUserSelectItems = (items: { [key: number]: boolean }) => {
//   return Object.entries(items)
//     .filter(([key, value]) => value)
//     .map(([key, value]) => key)
// }
const MoviePage = () => {
  const { media, category } = useParams<{ media: Media; category: keyof (typeof mapper)[Media] }>()
  const { t } = useI18nTypes()
  const { isValidImage, goDetailPage, getConvertedDate } = useHelper()
  const [items, setItems] = useState<BaseItem[]>([])
  const [page, setPage] = useState(1)
  const [genres, setGenres] = useState<IGenre['id'][]>([])
  const [providers, setProviders] = useState<BaseProvider['provider_id'][]>([])
  const [filter, setFilter] = useState({
    ...mapper[media!][category!],
  })
  const query = Object.entries(filter)
    .map(([key, value]) => {
      if (!value) return ''
      return `${key}=${value}`
    })
    .filter((el) => !!el)
    .join('&')
  const { data: watchProviders, isLoading: providerLoading } = useQuery(
    [media, 'provider'],
    async () => {
      const response = await BackEnd.getInstance().common.getProviders<
        CommonResponse<BaseProvider[]>
      >({
        media: media!,
        watch_region: 'KR',
      })
      return response.results
    },
    {
      staleTime: Infinity,
      enabled: !!media,
      onSuccess: (payload) => {
        setFilter((prev) => ({
          ...prev,
          watch_region: 'KR',
        }))
      },
    }
  )
  const { data, isLoading } = useQuery(
    [`${media}_${category}`, page, query],
    async () => {
      const response = await BackEnd.getInstance().common.getItems<MovieResponse<BaseItem[]>>({
        url: `/discover/${media}?${query}`,
        page,
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!watchProviders,
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
  const onChangeFilter = <T extends keyof typeof filter>(
    key: T,
    value: (typeof filter)[T]
  ): void => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }))
    setItems([])
    setPage(1)
  }
  const selectGenre = (id: number, selected: boolean) => {
    // const element = e.target as Element
    // if (element.classList.contains('selected')) {
    //   element.classList.remove('selected')
    //   setGenres((prev) => prev.filter((genreId) => genreId !== id))
    // } else {
    //   element.classList.add('selected')
    //   setGenres((prev) => [...prev, id])
    // }
    if (selected) {
      setGenres((prev) => prev.filter((genreId) => genreId !== id))
    } else {
      setGenres((prev) => [...prev, id])
    }
  }
  const prevGenres = useMemo<IGenre['id'][]>(() => {
    if (!filter['with_genres']) return []
    return filter['with_genres'].split(',').map(Number)
  }, [filter, watchProviders])

  const selectProvider = (id: number, selected: boolean) => {
    // if (!element.classList.contains('background')) return
    // if (element.classList.contains('selected')) {
    //   element.classList.remove('selected')
    //   setProviders((prev) => prev.filter((providerId) => providerId !== id))
    // } else {
    //   element.classList.add('selected')
    //   setProviders((prev) => [...prev, id])
    // }

    if (selected) {
      setProviders((prev) => prev.filter((providerId) => providerId !== id))
    } else {
      setProviders((prev) => [...prev, id])
    }
  }
  const prevProviders = useMemo<BaseProvider['provider_id'][]>(() => {
    if (!watchProviders || !filter['with_watch_providers']) return []
    const filterProviders = filter['with_watch_providers'].split('|')
    return filterProviders.length === watchProviders.length ? [] : filterProviders.map(Number)
  }, [filter, watchProviders])

  const isGenreChange = useMemo<boolean>(() => {
    const isUserAlreadySelect = genres.some((genreId) => prevGenres.includes(genreId))
    return genres.length !== prevGenres.length || (!isUserAlreadySelect && prevGenres.length !== 0)
  }, [genres, prevGenres])

  const isProviderChange = useMemo<boolean>(() => {
    const isUserAlreadySelect = providers.some((providerId) => prevProviders.includes(providerId))
    // 고른게 있어도 length 가 다르면 true
    // 고른게 있고 length 도 같으면 false
    return (
      providers.length !== prevProviders.length ||
      (!isUserAlreadySelect && prevProviders.length !== 0)
    )
  }, [providers, prevProviders])

  const isShowSearchButton = useMemo<boolean>(() => {
    return isGenreChange || isProviderChange
  }, [isGenreChange, isProviderChange])

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setItems(data.results)
      } else {
        setItems((prev) => [...prev, ...data.results])
      }
    }
  }, [page, data])

  useEffect(() => {
    if (!watchProviders) return
    setFilter(() => ({
      ...mapper[media!][category!],
      with_watch_providers: watchProviders.map((provider) => provider.provider_id).join('|'),
      watch_region: 'KR',
    }))
    setPage(1)
    setProviders([])
    setGenres([])
  }, [category, media, watchProviders])
  return (
    <div className="movie-page">
      <div className="filter-total-container">
        <div className="sort-filter">
          <BasicAccordion title={t('app.filter.sort')}>
            <FilterOption
              title={t('app.filter.sort_title')}
              items={OPTION_FILTER}
              onChangeFilter={(value) => onChangeFilter<'sort_by'>('sort_by', value)}
            />
          </BasicAccordion>
          <BasicAccordion title={t('app.filter.sort_providers_title')}>
            <FilterProvider
              items={watchProviders!}
              selectProvider={selectProvider}
              providers={providers}
            />
          </BasicAccordion>
          <BasicAccordion title={t('app.filter.genre')}>
            <FilterGenre items={movieGenre!} selectGenre={selectGenre} genres={genres} />
          </BasicAccordion>
        </div>
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
                releaseDate={getConvertedDate(item.release_date ?? item.first_air_date)}
              />
            </div>
          ))}
        </div>
        {providerLoading || isLoading ? (
          <PageLoadingSpinner customHeight="100px" />
        ) : (
          <Button
            color={Colors.main}
            fontColor={Colors.white}
            width="auto"
            click={() => setPage((prev) => prev + 1)}
          >
            {t('app.filter.load_more')}
          </Button>
        )}
      </div>
      <FilterSearchButton
        show={isShowSearchButton}
        text={t('app.button.search')}
        click={() => {
          onChangeFilter<'with_genres'>('with_genres', genres.join(','))
          onChangeFilter<'with_watch_providers'>(
            'with_watch_providers',
            !providers.length
              ? watchProviders!.map((provider) => provider.provider_id).join('|')
              : providers.join('|')
          )
        }}
      />
    </div>
  )
}

export default MoviePage
