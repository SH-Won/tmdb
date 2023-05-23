import { useHelper } from '@/hooks'
import { MovieResponse } from '@/types/network/response'
import { BaseItem } from 'types/interface'
import PaginationNumbers from './PaginationNumbers'

interface SearchPaginationProps {
  data: MovieResponse<BaseItem[]>
  mediaType: string
  onClickNextPage: (pageNumber: number) => void
}
const SearchPagination = (props: SearchPaginationProps) => {
  const { goDetailPage } = useHelper()
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
      {props.data && (
        <PaginationNumbers
          currentPage={props.data.page}
          totalPages={props.data.total_pages}
          click={(id: number) => props.onClickNextPage(id)}
        />
      )}
    </div>
  )
}

export default SearchPagination
