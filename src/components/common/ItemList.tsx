import Transition from '@/layout/Transition'
import { useCallback } from 'react'

interface Props<T> {
  click?: (item: T) => void
  items: T[]
  renderItem: (item: T) => React.ReactElement
}

const ItemList = <T,>({ items, click, renderItem }: Props<T>) => {
  const RenderList = useCallback(() => {
    return <Transition className="item-list">{items.map((item) => renderItem(item))}</Transition>
  }, [items])
  return <RenderList />
}

export default ItemList
