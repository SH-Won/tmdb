interface SelectedItemProps {
  selected: boolean
  text: string
  click?: () => void
}

const SelectedItem = (props: SelectedItemProps) => {
  const selected = props.selected ? 'selected' : ''
  return (
    <div className={`selected-item ${selected}`} onClick={props.click}>
      {props.text}
    </div>
  )
}

export default SelectedItem
