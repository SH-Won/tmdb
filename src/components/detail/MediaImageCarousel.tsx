import { Media } from '@/const/overall'
import { useHelper, useI18nTypes, useQueryImages } from '@/hooks'
import { AutoCarousel, PageLoadingSpinner, RatioCardImage } from 'my-react-component'
import React from 'react'
import { BasicImage, RelativeImageResponse } from 'types/interface'
interface MediaImageCarouselProps {
  media_type: Media
  id: string
}
const MediaImageCarousel = ({ media_type, id }: MediaImageCarouselProps) => {
  const { t } = useI18nTypes()
  const { isValidImage } = useHelper()
  const { data: images, isLoading } = useQueryImages<RelativeImageResponse>(
    media_type,
    parseInt(id)
  )

  return (
    <>
      <h3>{t('app.detail.image.background')}</h3>
      {images?.backdrops && (
        <AutoCarousel<BasicImage>
          time={2000}
          items={
            images.backdrops.length >= 2
              ? images.backdrops.slice(1, 10)
              : images.backdrops!.length === 0
              ? [
                  {
                    file_path: '/noImage.svg',
                    aspect_ratio: 1.576,
                    height: 0,
                    iso_639_1: '',
                    vote_average: 0,
                    vote_count: 0,
                    width: 0,
                  },
                ]
              : images.backdrops!.slice(0)
          }
          renderItems={(item, index) => (
            <RatioCardImage
              key={index}
              ratio={1 / (item.aspect_ratio ?? 1)}
              eager={true}
              imageUrl={isValidImage(item.file_path)}
            />
          )}
        />
      )}
    </>
  )
}

export default MediaImageCarousel
