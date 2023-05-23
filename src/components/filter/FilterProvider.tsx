import { MouseEvent } from 'react'
import { BaseProvider } from 'types/interface'

interface FilterProviderProps {
  providers: number[]
  items: BaseProvider[]
  selectProvider: (id: number, selected: boolean) => void
  media: string
}

const FilterProvider = ({ items, selectProvider, media, providers }: FilterProviderProps) => {
  const selected = Object.fromEntries(providers.map((id) => [id, true]))

  return (
    <div className="filter-provider-container">
      {items &&
        items.map((item) => (
          <div
            className="provider-image-wrapper"
            key={item.provider_name + '_' + media}
            onClick={() => selectProvider(item.provider_id, selected[item.provider_id])}
            onTouchStart={() => selectProvider(item.provider_id, selected[item.provider_id])}
            onTouchEnd={(e) => e.preventDefault()}
          >
            <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.logo_path} />
            <div
              // className="background"
              className={`background ${selected[item.provider_id] ? 'selected' : ''}`}
              // onTouchEnd={(e) => selectProvider(e, item.provider_id)}
            ></div>
          </div>
        ))}
    </div>
  )
}

export default FilterProvider
