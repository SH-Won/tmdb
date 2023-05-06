import { OptionFilterItem } from '@/const/filter'
import React, { useState } from 'react'
interface FilterOptionProps {
  title?: string
  items: OptionFilterItem[]
  onChangeFilter?: (value: OptionFilterItem['value']) => void
}
const FilterOption = ({ items, title, onChangeFilter }: FilterOptionProps) => {
  const [selected, setSelected] = useState<string>(items[0].name)
  const [open, setOpen] = useState<boolean>(false)

  const onClickOption = (item: OptionFilterItem) => {
    setSelected(item.name)
    onChangeFilter?.(item.value)
    setOpen(false)
  }
  return (
    <div className="option-container">
      <div className="title">{title}</div>
      <div className="option-toggle">
        <div className="option-selected" onClick={() => setOpen((prev) => !prev)}>
          {selected}
        </div>
        {open && (
          <div className="option-items">
            {items.map((item) => (
              <span
                key={item.name}
                className={selected === item.name ? 'selected' : ''}
                onClick={() => onClickOption(item)}
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterOption
