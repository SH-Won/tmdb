import { MouseEvent } from 'react'
import { BaseProvider } from 'types/interface'

interface FilterProviderProps {
  items: BaseProvider[]
  selectProvider: (e: MouseEvent<HTMLElement>, id: number) => void
  media: string
}

const FilterProvider = ({ items, selectProvider, media }: FilterProviderProps) => {
  console.log('re render')
  return (
    <div className="filter-provider-container">
      {items &&
        items.map((item) => (
          <div
            className="provider-image-wrapper"
            key={item.provider_name + '_' + media}
            onClick={(e) => selectProvider(e, item.provider_id)}
          >
            <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.logo_path} />
            <div className="background"></div>
          </div>
        ))}
    </div>
  )
}

export default FilterProvider
