import { MOVIE_CATEGORY } from '@/const'
import { TV_CATEGORY } from '@/const/movie'
import { MovieResponse } from '@/types/network/response'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IMovie, ITv } from 'types/interface'
import '@/styles/SearchPage.scss'
import SearchNavigation from '@/components/search/SearchNavigation'
import SearchPagination from '@/components/search/SearchPagination'
import { useBreakPoints, useI18nTypes, useQuerySearch } from '@/hooks'
import { PageLoadingSpinner } from 'my-react-component'
const SearchPage = () => {
  const { breakPointsClass } = useBreakPoints()
  const { t } = useI18nTypes()
  const [searchParam] = useSearchParams()
  const searchQuery = searchParam.get('query') as string
  const [filter, setFilter] = useState({
    movie: {
      page: 1,
      query: searchQuery,
      language: t('app.query.search_language'),
    },
    tv: {
      page: 1,
      query: searchQuery,
      language: t('app.query.search_language'),
    },
  })
  const [selected, setSelected] = useState<keyof typeof filter>('movie')

  const { data: searchMovieData, isLoading } = useQuerySearch<MovieResponse<IMovie[]>>(
    selected,
    filter[selected],
    selected === 'movie'
  )
  const { data: searchTvData, isLoading: tvloading } = useQuerySearch<MovieResponse<ITv[]>>(
    selected,
    filter[selected],
    selected === 'tv'
  )

  const navigationItems = useMemo(() => {
    return [
      {
        id: MOVIE_CATEGORY.prefix,
        name: t('app.navigation.movie'),
      },
      {
        id: TV_CATEGORY.prefix,
        name: t('app.navigation.tv'),
      },
    ]
  }, [])
  const currentData = useMemo(() => {
    if (isLoading || tvloading) return
    switch (selected) {
      case MOVIE_CATEGORY.prefix:
        return searchMovieData
      case TV_CATEGORY.prefix:
        return searchTvData
    }
  }, [filter, selected, isLoading, tvloading])

  const onClickNextPage = (pageNumber: number) => {
    setFilter((prevState) => ({
      ...prevState,
      [selected]: {
        page: pageNumber,
      },
    }))
    window.scrollTo(0, 0)
  }
  const loading = isLoading || tvloading
  return (
    <div className={`search-page ${breakPointsClass}`}>
      <SearchNavigation items={navigationItems} onSelect={setSelected} selected={selected} />
      {loading ? (
        <PageLoadingSpinner text={t('app.search_page.loading_text')} />
      ) : (
        <SearchPagination
          data={currentData!}
          mediaType={selected}
          onClickNextPage={onClickNextPage}
        />
      )}
    </div>
  )
}

export default SearchPage
