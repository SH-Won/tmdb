import BackEnd from '@/networks'
import { Notification, PageLoadingSpinner } from 'my-react-component'
import { useQuery } from 'react-query'
import { BaseItem } from 'types/interface'
import './UpcommingPopup.scss'
interface UpcommingVideoProps {
  item: BaseItem
}

const UpcommingVideo = ({ item }: UpcommingVideoProps) => {
  const { data, isLoading } = useQuery(
    ['upcomming', item.id],
    async () => {
      const mediaType = item.release_date ? 'movie' : 'tv'
      const id = item.id
      const response = await BackEnd.getInstance().common.getSearch<{ id: number; results: any[] }>(
        {
          url: `/${mediaType}/${id}/videos`,
        }
      )
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!item,
    }
  )
  const Trailer = () => {
    const result = !isLoading ? data?.results[0] : ''
    if (!result) return <Notification text="트레일러가 없습니다!" height="300px" />
    return (
      <div className="trailer-iframe">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${result.key}?autoplay=1`}
        ></iframe>
      </div>
    )
  }
  return (
    <div>
      {isLoading ? <PageLoadingSpinner customHeight="200px" text={'불러오는 중'} /> : <Trailer />}
    </div>
  )
}

export default UpcommingVideo
