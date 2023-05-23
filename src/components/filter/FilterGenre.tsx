import { IGenre } from '@/types/network/response'
interface FilterSelectProps {
  genres: IGenre['id'][]
  items: IGenre[]
  selectGenre: (id: number, selected: boolean) => void
}

const FilterGenre = ({ items, selectGenre, genres }: FilterSelectProps) => {
  ///genre/movie/list
  const selected = Object.fromEntries(genres.map((id) => [id, true]))
  return (
    <div className="filter-genre-container">
      {items?.map((item) => (
        <span
          className={selected[item.id] ? 'selected' : ''}
          key={item.name}
          data-id={item.id}
          onClick={() => selectGenre(item.id, selected[item.id])}
        >
          {item.name}
        </span>
      ))}
    </div>
  )
}

export default FilterGenre
