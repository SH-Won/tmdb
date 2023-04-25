// import '@/styles/ToggleBar.scss'
type toggleItem = {
  id: string
  name: string
}
interface ToggleBarProps {
  toggleItem: toggleItem[]
  selected: string
  onSelectItem: (id: string) => void
}
const ToggleBar = (props: ToggleBarProps) => {
  // const [selected, setSelected] = useState<string>('first')

  // const onSelectItem = (id: string) => {
  //   setSelected(id)
  // }
  return (
    <div className="toggle-bar">
      {props.toggleItem.map((item) => (
        <div
          className={`toggle-item ${props.selected === item.id ? 'selected' : ''}`}
          key={item.id}
          onClick={() => props.onSelectItem(item.id)}
        >
          {item.name}
        </div>
      ))}
      <div className={`underline ${props.selected}`}></div>
    </div>
  )
}

export default ToggleBar
