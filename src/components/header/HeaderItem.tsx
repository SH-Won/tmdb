import { OptionList, BasicAccordion } from 'my-react-component'
import { useState } from 'react'

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
  return (
    <div
      className="header-item"
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
      onTouchStart={() => setOpen((prev) => !prev)}
    >
      {!isMobile ? (
        <>
          <span className="title">{title}</span>
          <div className="option-list-container">
            <OptionList items={items} click={click} open={open} itemSize="small" />
          </div>
        </>
      ) : (
        <BasicAccordion title={title} border={false}>
          <div className="mobile-option-list-container">
            {items.map((item) => (
              <span key={item.value} onClick={() => click?.(item)}>
                {item.name}
              </span>
            ))}
          </div>
        </BasicAccordion>
      )}
    </div>
  )
}

export default HeaderItem
