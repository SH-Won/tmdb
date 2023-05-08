import { IGenre } from '@/types/network/response'
import { MouseEvent } from 'react'
interface FilterSelectProps {
  items: IGenre[]
  selectGenre: (e: MouseEvent<HTMLElement>, id: number) => void
}

const FilterSelect = ({ items, selectGenre }: FilterSelectProps) => {
  ///genre/movie/list
  return (
    <div className="filter-select-container">
      {items?.map((item) => (
        <span key={item.name} data-id={item.id} onClick={(e) => selectGenre(e, item.id)}>
          {item.name}
        </span>
      ))}
    </div>
  )
}

export default FilterSelect
