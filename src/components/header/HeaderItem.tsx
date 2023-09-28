import { OptionList } from 'my-react-component'
import Accordion from 'my-react-component/src/components/accordion/Accordion'
import { useState } from 'react'
// import OptionItemList from '../common/OptionItemList'

interface HeaderItemProps {
  title: string
  items: {
    name: string
    value: string
  }[]
  isMobile: boolean
  click?: (item: any) => void
}

const HeaderItem = ({ items, click, title, isMobile }: HeaderItemProps) => {
  const [open, setOpen] = useState<boolean>(false)
  // console.log('child component render')
  return (
    <div
      className="header-item"
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
      onTouchStart={() => setOpen((prev) => !prev)}
      // onTouchEnd={() => setOpen(false)}
    >
      {!isMobile ? (
        <>
          <span className="title">{title}</span>
          <div className="option-list-container">
            <OptionList items={items} click={click} open={open} itemSize="small" />
          </div>
        </>
      ) : (
        <Accordion title={title} border={false}>
          <div className="mobile-option-list-container">
            {items.map((item) => (
              <span key={item.value} onClick={() => click?.(item)}>
                {item.name}
              </span>
            ))}
          </div>
        </Accordion>
      )}
    </div>
  )
}

export default HeaderItem
