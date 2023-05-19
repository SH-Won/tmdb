import { MOVIE_CATEGORY } from '@/const'
import { TV_CATEGORY } from '@/const/movie'
import BackEnd from '@/networks'
import { MovieResponse } from '@/types/network/response'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { IMovie, ITv } from 'types/interface'
import '@/styles/_SearchPage.scss'
import SearchNavigation from '@/components/search/SearchNavigation'
import SearchPagination from '@/components/search/SearchPagination'
import { useBreakPoints } from '@/hooks'
import { PageLoadingSpinner } from 'my-react-component'
const SearchPage = () => {
  const { breakPointsClass } = useBreakPoints()
  const [searchParam] = useSearchParams()
  const searchQuery = searchParam.get('query')
  const language = searchParam.get('language')
  const [pageState, setPageState] = useState({
    movie: {
      page: 1,
    },
    tv: {
      page: 1,
    },
  })
  const [selected, setSelected] = useState<keyof typeof pageState>('movie')
  const { data: searchMovieData, isLoading } = useQuery(
    ['search', 'movie', searchQuery, pageState['movie'].page],
    async () => {
      const response = await BackEnd.getInstance().common.getSearch<MovieResponse<IMovie[]>>({
        url: '/search/movie',
        query: {
          language,
          query: searchQuery,
          page: pageState['movie'].page,
        },
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: selected === 'movie',
    }
  )
  const { data: searchTvData, isLoading: tvloading } = useQuery(
    ['search', 'tv', searchQuery, pageState['tv'].page],
    async () => {
      const response = await BackEnd.getInstance().common.getSearch<MovieResponse<ITv[]>>({
        url: '/search/tv',
        query: {
          language,
          query: searchQuery,
          page: pageState['tv'].page,
        },
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: selected === 'tv',
    }
  )
  const navigationItems = useMemo(() => {
    return [
      {
        id: MOVIE_CATEGORY.prefix,
        name: '영화',
        // total: searchMovieData?.total_results,
      },
      {
        id: TV_CATEGORY.prefix,
        name: 'TV',
        // total: searchTvData?.total_results,
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
  }, [pageState, selected, isLoading, tvloading])

  const onClickNextPage = (pageNumber: number) => {
    setPageState((prevState) => ({
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
        <PageLoadingSpinner text={'불러오는 중 입니다'} />
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
