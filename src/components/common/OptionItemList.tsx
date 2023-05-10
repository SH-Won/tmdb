interface OptionItemListProps {
  items: {
    name: string
    value: string
  }[]
  selected?: string
  click?: (item: any) => void
}
const OptionItemList = ({ items, selected, click }: OptionItemListProps) => {
  return (
    <div className="option-items">
      {items.map((item) => (
        <span
          key={item.name}
          className={selected === item.name ? 'selected' : ''}
          onClick={() => click?.(item)}
        >
          {item.name}
        </span>
      ))}
    </div>
  )
}

export default OptionItemList
