import './styles/ProductListItem.scss'
interface ProductListItemProps {
  imageUrl: string
  onClick?: () => void
  disabled?: boolean
  label: string
}
const ProductListItem = (props: ProductListItemProps) => {
  return (
    <div className={`list-item ${props.disabled ? 'disabled' : ''}`} onClick={props.onClick}>
      <img src={props.imageUrl} />
      <span>{props.label}</span>
    </div>
  )
}

export default ProductListItem
