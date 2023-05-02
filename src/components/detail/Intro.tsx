import { useBreakPoints } from '@/hooks'
import { CircularProgressBar } from 'my-react-component'
import { BaseCrew, BaseItemDetail } from 'types/interface'

interface Props {
  item: BaseItemDetail
  crews: {
    writers: BaseCrew[]
    directors: BaseCrew[]
  }
}
const Intro = ({ item, crews }: Props) => {
  const { breakPointsClass } = useBreakPoints()
  const introStyle = {
    backgroundImage: `url(${import.meta.env.VITE_BASE_BACK_DROP_IMAGE_URL + item.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // backgroundColor: 'rgb(0,0,0,0.5)',
  }
  return (
    <div className="detail-intro" style={breakPointsClass !== 'mobile' ? introStyle : {}}>
      <div className={`detail-background ${breakPointsClass}`}>
        <div className="intro-image" style={breakPointsClass === 'mobile' ? introStyle : {}}>
          {breakPointsClass === 'mobile' ? (
            <div className="image-background">
              <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.poster_path} />
            </div>
          ) : (
            <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.poster_path} />
          )}
        </div>
        <div className="intro-info">
          <h2>
            {item.title}
            {/* ({item.release_date.split('-')[0]}) */}
          </h2>
          <CircularProgressBar size={50} percent={Math.floor(item.vote_average * 10)} />
          <div className="intro-explain">
            <h3>개요</h3>
            <span>{item.overview}</span>
          </div>
          <div className="intro-crew">
            {crews?.directors.map((director) => (
              <div className="crew-box" key={director.id}>
                <span>{director.name}</span>
                <span> {director.job}</span>
              </div>
            ))}
            {crews?.writers.map((writer) => (
              <div className="crew-box" key={writer.id}>
                <span>{writer.name}</span>
                <span> {writer.job}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro
