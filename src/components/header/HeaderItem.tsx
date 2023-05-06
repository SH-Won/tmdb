import React, { useState } from 'react'
import OptionItemList from '../common/OptionItemList'

interface HeaderItemProps {
  title: string
  items: {
    name: string
    value: string
  }[]
  click?: (item: any) => void
}

const HeaderItem = ({ items, click, title }: HeaderItemProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div
      className="header-item"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="title">{title}</span>
      {open && <OptionItemList items={items} click={click} />}
    </div>
  )
}

export default HeaderItem
