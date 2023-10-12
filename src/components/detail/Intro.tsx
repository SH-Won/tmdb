import { useBreakPoints, useI18nTypes } from '@/hooks'
import { CircularProgressBar } from 'my-react-component'
import { useState } from 'react'
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
  const { t } = useI18nTypes()
  const [opacity, setOpacity] = useState<number>()
  const loading = !item || !opacity
  return (
    <div className={`detail-intro ${breakPointsClass}`}>
      <div className={`detail-background ${breakPointsClass}`}>
        <div style={{ opacity }}>
          <img
            loading="lazy"
            onLoad={() => setOpacity(1)}
            src={item && import.meta.env.VITE_BASE_BACK_DROP_IMAGE_URL + item.backdrop_path}
          />
        </div>
      </div>
      {!loading && (
        <div className="intro-content">
          <div className="intro-image">
            <img src={import.meta.env.VITE_BASE_IMAGE_URL + item.poster_path} />
          </div>
          <div className="intro-info">
            <h2>{item.title}</h2>
            <CircularProgressBar size={50} percent={Math.floor(item.vote_average * 10)} />
            <div className="intro-explain">
              <h3>{t('app.detail.information.intro_title')}</h3>
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
      )}
    </div>
  )
}

export default Intro
