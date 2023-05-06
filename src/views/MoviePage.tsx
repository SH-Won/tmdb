import { useHelper } from '@/hooks'
import BackEnd from '@/networks'
import { MovieResponse } from '@/types/network/response'
import { Button, Colors, PageLoadingSpinner, PosterCard } from 'my-react-component'
import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { BaseItem } from 'types/interface'
import { OPTION_FILTER } from '@/const/filter'
import '../styles/MoviePage.scss'
import FilterDownFall from '@/components/filter/FilterDownFall'
import FilterOption from '@/components/filter/FilterOption'
const MoviePage = () => {
  const [searchParam] = useSearchParams()
  const { isValidImage, goDetailPage } = useHelper()
  const category = searchParam.get('category')
  const [items, setItems] = useState<BaseItem[]>([])
  const [page, setPage] = useState(1)
  const [isUserSelectFilter, setIsUserSelectFilter] = useState(false)
  const [filter, setFilter] = useState({
    sort_by: null,
  })
  const query = Object.entries(filter)
    .map(([key, value]) => {
      if (!value) return ''
      return `${key}=${value}`
    })
    .filter((el) => !!el)
    .join('&')
  console.log(query)
  const { data, isLoading } = useQuery(
    [`movie_${category}`, page, query],
    async () => {
      const response = await BackEnd.getInstance().common.getItems<MovieResponse<BaseItem[]>>({
        // url: `/movie/${category}?${query}`,
        url: `/discover/movie?${query}`,
        page,
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!category,
      // onSuccess: (payload) => {
      //   if (!isUserSelectFilter) {
      //     setItems((prev) => [...prev, ...payload.results])
      //   } else {
      //     // setItems(payload.results)
      //     // setIsUserSelectFilter(false)
      //   }
      // },
    }
  )
  const onChangeFilter = (key: any, value: any) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }))
    setIsUserSelectFilter(true)
    setPage(1)
  }
  // const currentData = useMemo(() => {
  //   if(!isUserSelectFilter) return items
  //   else return []

  // },[])

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setItems(data.results)
        setIsUserSelectFilter(false)
      } else {
        setItems((prev) => [...prev, ...data.results])
      }
    }
  }, [page, data])

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
    </div>
  )
}

export default MoviePage
