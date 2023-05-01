import SelectedItem from '../common/SelectedItem'
import './SearchNavigation.scss'
interface SearchNavigationProps {
  items: {
    id: string
    name: string
  }[]
  selected: string
  onSelect: (id: string) => void
}
const SearchNavigation = (props: SearchNavigationProps) => {
  return (
    <div>
      <div className="search-navigation">
        {props.items.map((item) => (
          <SelectedItem
            key={item.id}
            text={item.name}
            selected={item.id === props.selected}
            click={() => props.onSelect(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchNavigation
