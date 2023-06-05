import { SelectedItem } from 'my-react-component'
import { BaseProvider } from 'types/interface'

interface FilterProviderProps {
  providers: number[]
  items: BaseProvider[]
  selectProvider: (id: number, selected: boolean) => void
}

const FilterProvider = ({ items, selectProvider, providers }: FilterProviderProps) => {
  const selected = Object.fromEntries(providers.map((id) => [id, true]))

  return (
    <div className="filter-provider-container">
      {items &&
        items.map((item) => (
          <SelectedItem
            type="background"
            size="custom"
            key={item.provider_name}
            selected={selected[item.provider_id]}
            click={() => selectProvider(item.provider_id, selected[item.provider_id])}
          >
            <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.logo_path} />
          </SelectedItem>
        ))}
    </div>
  )
}

export default FilterProvider

// <div
//   className={`provider-image-wrapper ${selected[item.provider_id] ? 'selected' : ''}`}
//   key={item.provider_name}
//   onClick={() => selectProvider(item.provider_id, selected[item.provider_id])}
//   onTouchStart={() => selectProvider(item.provider_id, selected[item.provider_id])}
//   onTouchEnd={(e) => e.preventDefault()}
// >
//   <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.logo_path} />
//   <div
//     className={`background ${selected[item.provider_id] ? 'selected' : ''}`}
//   ></div>
// </div>
