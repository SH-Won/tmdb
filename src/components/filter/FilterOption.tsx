import { OptionFilterItem } from '@/const/filter'
import React, { useState } from 'react'
import { useCloseEvent } from '@/hooks'
import { BasicDropDown, OptionList } from 'my-react-component'
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
  // const { ref: container } = useCloseEvent(() => setOpen(false))
  const onClickOption = (item: OptionFilterItem) => {
    setSelected(item.name)
    onChangeFilter?.(item.value)
    // setOpen(false)
  }

  return (
    <div
      className="option-container"
      // ref={container}
    >
      <div className="title">{title}</div>
      <BasicDropDown selected={selected}>
        <OptionList items={items} click={onClickOption} itemSize="small" />
      </BasicDropDown>
    </div>
  )
}

export default FilterOption
