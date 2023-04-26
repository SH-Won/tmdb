import './styles/RatioImage.scss'
interface Props {
  imageUrl: string
  ratio: number
}

const RatioCard = (props: Props) => {
  const paddingTop = `${props.ratio * 100}%`
  return (
    <div className="ratio-image-wrapper" style={{ paddingTop }}>
      <img src={props.imageUrl} />
    </div>
  )
}

export default RatioCard
