import { useHelper } from '@/hooks'
import Transition from '@/layout/Transition'
import BackEnd from '@/networks'
import { CommonResponse } from '@/types/network/response'
import { PageLoadingSpinner, RatioCardImage } from 'my-react-component'
import { useQuery } from 'react-query'
import { BasePopularPerson } from 'types/interface'
import '@/styles/PersonPage.scss'
import ColumnExplain from '@/components/common/ColumnExplain'

const PersonPage = () => {
  const { isValidImage, goActorPage } = useHelper()
  const { data, isLoading } = useQuery(['person', 'popular'], async () => {
    const response = await BackEnd.getInstance().common.getPopularPerson<
      CommonResponse<BasePopularPerson[]>
    >({
      page: 1,
    })
    return response
  })
  return (
    <div className="person-page">
      {isLoading ? (
        <PageLoadingSpinner customHeight="100vh" text="로딩 중 입니다" />
      ) : (
        <Transition className="person-container">
          {data!.results.map((item) => (
            <div className="person-item" key={item.id} onClick={() => goActorPage(item.id)}>
              <RatioCardImage imageUrl={isValidImage(item.profile_path)} ratio={1.2} />
              <div className="person-item-explain">
                <ColumnExplain
                  title={item.name}
                  explain={item.known_for.map((el) => el.title ?? el.name).join(', ')}
                  breakWords={true}
                />
              </div>
            </div>
          ))}
        </Transition>
      )}
    </div>
  )
}

export default PersonPage
