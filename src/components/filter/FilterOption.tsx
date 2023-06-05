import { OptionFilterItem } from '@/const/filter'
import { useState } from 'react'
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
  const onClickOption = (item: OptionFilterItem) => {
    setSelected(item.name)
    onChangeFilter?.(item.value)
  }

  return (
    <div className="option-container">
      <div className="title">{title}</div>
      <BasicDropDown selected={selected}>
        <OptionList items={items} click={onClickOption} itemSize="small" />
      </BasicDropDown>
    </div>
  )
}

export default FilterOption
