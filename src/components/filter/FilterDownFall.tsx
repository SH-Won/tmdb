import { OptionFilterItem } from '@/const/filter'
import { Colors, Element } from 'my-react-component'
import { useState } from 'react'
import './Filter.scss'
interface OptionfilterProps {
  title?: string
  children?: JSX.Element | JSX.Element[] | string
}
const FilterDownFall = ({ title, children }: OptionfilterProps) => {
  const [open, isOpen] = useState<boolean>(false)
  return (
    <div className="filter-downfall-container">
      <div className="header">
        <span className="title">{title}</span>
        <div onClick={() => isOpen((prev) => !prev)}>
          {/* <Element name="Right" size="big" color={Colors.grey_111} /> */}
          {'>'}
        </div>
      </div>
      {open && children}
    </div>
  )
}

export default FilterDownFall
