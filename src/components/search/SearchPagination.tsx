import { MovieResponse } from '@/types/network/response'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BaseItem } from 'types/interface'
import PaginationNumbers from './PaginationNumbers'
// import PaginationNumbers from './PaginationNumbers'

interface SearchPaginationProps {
  data: MovieResponse<BaseItem[]>
  mediaType: string
  onClickNextPage: (pageNumber: number) => void
}
const SearchPagination = (props: SearchPaginationProps) => {
  const navigate = useNavigate()
  const goDetailPage = (item: BaseItem) => {
    // navigation(`detail/${movieId}`)
    if (item.release_date) {
      navigate(`/movie/${item.id}`)
    } else {
      navigate(`/tv/${item.id}`)
    }
  }
  return (
    <div>
      <div className="search-item-list">
        {props.data &&
          props.data.results.map((item) => (
            <div className="search-item" key={item.id} onClick={() => goDetailPage(item)}>
              <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.poster_path} />
              <div className="explain">
                <div className="title">
                  <h2>{item.original_title ?? item.original_name}</h2>
                  <span className="release-date">{item.release_date ?? item.first_air_date}</span>
                </div>
                <p className="overview"> {item.overview}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="pagination-numbers">
        {props.data && (
          <PaginationNumbers
            currentPage={props.data.page}
            totalPages={props.data.total_pages}
            click={(id: number) => props.onClickNextPage(id)}
          />
        )}
      </div>
    </div>
  )
}

export default SearchPagination
