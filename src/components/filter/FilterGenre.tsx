import { IGenre } from '@/types/network/response'
import { MouseEvent } from 'react'
interface FilterSelectProps {
  items: IGenre[]
  selectGenre: (e: MouseEvent<HTMLElement>, id: number) => void
  media: string
}

const FilterGenre = ({ items, selectGenre, media }: FilterSelectProps) => {
  ///genre/movie/list
  return (
    <div className="filter-select-container">
      {items?.map((item) => (
        <span
          key={item.name + '_' + media}
          data-id={item.id}
          onClick={(e) => selectGenre(e, item.id)}
        >
          {item.name}
        </span>
      ))}
    </div>
  )
}

export default FilterGenre
