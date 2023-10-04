import { IGenre } from '@/types/network/response'
import { SelectedItem } from 'my-react-component'
interface FilterSelectProps {
  genres: IGenre['id'][]
  items: IGenre[]
  selectGenre: (id: number, selected: boolean) => void
}

const FilterGenre = ({ items, selectGenre, genres }: FilterSelectProps) => {
  const selected = Object.fromEntries(genres.map((id) => [id, true]))
  return (
    <div className="filter-genre-container">
      {items?.map((item) => (
        <SelectedItem
          type="border"
          key={item.name}
          selected={selected[item.id]}
          click={() => selectGenre(item.id, selected[item.id])}
          text={item.name}
          size="small"
        />
      ))}
    </div>
  )
}

export default FilterGenre
