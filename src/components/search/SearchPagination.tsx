import { useHelper } from '@/hooks'
import { MovieResponse } from '@/types/network/response'
import { PaginationNumbers } from 'my-react-component'
import { BaseItem } from 'types/interface'

interface SearchPaginationProps {
  data: MovieResponse<BaseItem[]>
  mediaType: string
  onClickNextPage: (pageNumber: number) => void
}
const SearchPagination = (props: SearchPaginationProps) => {
  const { goDetailPage, isValidImage } = useHelper()
  return (
    <div>
      <div className="search-item-list">
        {props.data &&
          props.data.results.map((item) => (
            <div className="search-item" key={item.id}>
              <img src={isValidImage(item.poster_path)} onClick={() => goDetailPage(item)} />
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
