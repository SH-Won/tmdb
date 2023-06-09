import { Button, Colors } from 'my-react-component'

interface FilterSearchButtonProps {
  show: boolean
  text: string
  click: () => void
}
const FilterSearchButton = ({ show, click, text }: FilterSearchButtonProps) => {
  if (!show) return null
  return (
    <div className="search-btn">
      <Button color={Colors.main} fontColor={Colors.white} width="auto" click={click}>
        {text}
      </Button>
    </div>
  )
}

export default FilterSearchButton
