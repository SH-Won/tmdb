interface RatioImageCardProps {
  imageUrl: string
  label: string
  click?: (() => void) | (() => Promise<void>)
}
const RatioImageCard = (props: RatioImageCardProps) => {
  return (
    <div className="image-container">
      <div className="img-wrapper">
        <img src={props.imageUrl} />
      </div>
      <span>{props.label}</span>
    </div>
  )
}

export default RatioImageCard
