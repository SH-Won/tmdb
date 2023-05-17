import { OptionFilterItem } from '@/const/filter'
import React, { useState } from 'react'
import OptionItemList from '../common/OptionItemList'
interface FilterOptionProps {
  title?: string
  items: {
    name: string
    value: string
  }[]
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
        <div className={`option-list ${open ? 'slide' : ''}`}>
          <OptionItemList items={items} selected={selected} click={onClickOption} />
        </div>
      </div>
    </div>
  )
}

export default FilterOption
