import { ItemType } from '@/const/toggleBar'
import { useBreakPoints } from '@/hooks'
import { useLayoutEffect, useRef, useState } from 'react'
import './styles/ToggleBar.scss'
// popular toprated trending
// api endpoint 가 각각 달라서
// 카테고리로 분류해야할지 아니면 movie/tv 등으로 분류해야할지
// 일단 영화/TV/트렌딩 으로 크게 분류하고
// 각각 인기/탑레이팅/현재상영중 따위로 분류한다.

interface ToggleBarProps {
  items: ItemType[]
  onSelect: (item: ItemType) => void
}
const ToggleBar = ({ items, onSelect }: ToggleBarProps) => {
  const { breakPointsClass } = useBreakPoints()
  const bar = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<number>(0)
  const [backgroundStyle, setBackgroundStyle] = useState<object>({})

  const onSelelctItem = (item: ItemType) => {
    if (selected === item.order) return
    const left = bar.current?.getBoundingClientRect().left as number
    const width = bar.current?.children[item.order].clientWidth as number
    const moveLeft =
      (bar.current?.children[item.order].getBoundingClientRect().left as number) - left
    setSelected(item.order)
    onSelect(item)
    setBackgroundStyle({
      width: width,
      transform: `translate(${moveLeft - 1}px)`,
    })
  }
  useLayoutEffect(() => {
    const width = bar.current?.children[selected].clientWidth as number
    console.log('toggle item width is =>', width)
    const left = bar.current?.getBoundingClientRect().left as number
    const moveLeft = (bar.current?.children[selected].getBoundingClientRect().left as number) - left
    setBackgroundStyle({
      width,
      transform: `translate(${moveLeft - 1}px)`,
    })
  }, [breakPointsClass])
  return (
    <div className="toggle-bar" ref={bar}>
      {items.map((item) => (
        <div
          className={`toggle-item ${selected === item.order ? 'selected' : ''}`}
          key={item.id}
          onClick={() => onSelelctItem(item)}
        >
          <span>{item.name}</span>
        </div>
      ))}
      <div className="item-background" style={backgroundStyle}></div>
    </div>
  )
}

export default ToggleBar
