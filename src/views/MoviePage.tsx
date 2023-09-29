import { useHelper, useI18nTypes } from '@/hooks'
import BackEnd from '@/networks'
import { CommonResponse, GenreResponse, IGenre, MovieResponse } from '@/types/network/response'
import {
  BasicAccordion,
  Button,
  Colors,
  PageLoadingSpinner,
  PosterCard,
  SettingBar,
} from 'my-react-component'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useLoaderData } from 'react-router-dom'
import { BaseItem, BaseProvider } from 'types/interface'
import { OPTION_FILTER } from '@/const/filter'
import '../styles/MoviePage.scss'
import FilterOption from '@/components/filter/FilterOption'
import FilterGenre from '@/components/filter/FilterGenre'
import FilterSearchButton from '@/components/filter/FilterSearchButton'
import { type Media, queryMapper as mapper } from '@/const/overall'
import FilterProvider from '@/components/filter/FilterProvider'
import ItemList from '@/components/common/ItemList'

// const convertedUserSelectItems = (items: { [key: number]: boolean }) => {
//   return Object.entries(items)
//     .filter(([key, value]) => value)
//     .map(([key, value]) => key)
// }
const MoviePage = () => {
  const { media, category } = useLoaderData() as {
    media: Media
    category: keyof (typeof mapper)[Media]
  }
  const { t } = useI18nTypes()
  const { isValidImage, goDetailPage, getConvertedDate } = useHelper()
  const [items, setItems] = useState<BaseItem[]>([])
  const [page, setPage] = useState(1)
  const [genres, setGenres] = useState<IGenre['id'][]>([])
  const [providers, setProviders] = useState<BaseProvider['provider_id'][]>([])
  const [voteAverage, setVoteAverage] = useState<number>(
    mapper[media][category]['vote_average.gte']
  )
  const [filter, setFilter] = useState({
    ...mapper[media][category],
  })
  const [voteCount, setVoteCount] = useState<number>(mapper[media!][category!]['vote_count.gte'])
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
        media: media,
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
    if (selected) {
      setProviders((prev) => prev.filter((providerId) => providerId !== id))
    } else {
      setProviders((prev) => [...prev, id])
    }
  }
  const selectVoteAverage = (item: { key: string; value: number; order: number }) => {
    setVoteAverage(item.value)
  }
  const selectVoteCount = (item: { key: string; value: number; order: number }) => {
    setVoteCount(item.value)
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
  const prevVoteAverage = useMemo<number>(() => {
    return voteAverage
  }, [filter])
  const prevVoteCount = useMemo<number>(() => {
    return voteCount
  }, [filter])

  const isVoteAverageChange = useMemo<boolean>(() => {
    return prevVoteAverage !== voteAverage
  }, [voteAverage, prevVoteAverage])
  const isVoteCountChnage = useMemo<boolean>(() => {
    return prevVoteCount !== voteCount
  }, [voteCount, prevVoteCount])

  const isShowSearchButton = useMemo<boolean>(() => {
    return isGenreChange || isProviderChange || isVoteAverageChange || isVoteCountChnage
  }, [isGenreChange, isProviderChange, isVoteAverageChange, isVoteCountChnage])

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
      ...mapper[media][category],
      with_watch_providers: watchProviders.map((provider) => provider.provider_id).join('|'),
      watch_region: 'KR',
    }))
    setItems([])
    setPage(1)
    setProviders((prev) => [])
    setGenres((prev) => [])
    setVoteAverage((prev) => mapper[media][category]['vote_average.gte'])
    setVoteCount((prev) => mapper[media][category]['vote_count.gte'])
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
          <BasicAccordion title={t('app.filter.genre_rated')}>
            <div>
              <span className="setting-title">{t('app.filter.genre')}</span>
              <FilterGenre items={movieGenre!} selectGenre={selectGenre} genres={genres} />
              <span className="setting-title">{t('app.filter.rated')}</span>
              <SettingBar
                width={236}
                initialCount={voteAverage}
                magnification={1}
                count={10}
                onSelect={selectVoteAverage}
              />
              {/* <span className="setting-title">평점</span>
              <SettingBar
                width={236}
                initialCount={voteCount / 100}
                magnification={100}
                count={10}
                onSelect={selectVoteCount}
              /> */}
            </div>
          </BasicAccordion>
        </div>
      </div>
      <div className="movie-item-container">
        <ItemList
          className="item-grid"
          items={items}
          renderItem={(item) => (
            <div className="movie-item-container" key={item.id}>
              <PosterCard
                click={() => goDetailPage(item)}
                ratio={1.5}
                imageUrl={isValidImage(item.poster_path)}
                title={item.title ?? item.name}
                voteAverage={Math.floor(item.vote_average * 10)}
                releaseDate={getConvertedDate(item.release_date ?? item.first_air_date)}
              />
            </div>
          )}
        />
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
      {/* {providerLoading || isLoading ? (
        <PageLoadingSpinner customHeight="100px" />
      ) : (
        <div style={{ padding: '0 16px 16px 16px' }}>
          <Button
            color={Colors.main}
            fontColor={Colors.white}
            width="auto"
            click={() => setPage((prev) => prev + 1)}
          >
            {t('app.filter.load_more')}
          </Button>
        </div>
      )} */}
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
          onChangeFilter<'vote_average.gte'>('vote_average.gte', voteAverage)
          onChangeFilter<'vote_count.gte'>('vote_count.gte', voteCount)
        }}
      />
    </div>
  )
}

export default MoviePage
