import { useHelper, useI18nTypes } from '@/hooks'
import Transition from '@/layout/Transition'
import BackEnd from '@/networks'
import { CommonResponse } from '@/types/network/response'
import { PageLoadingSpinner, RatioCardImage } from 'my-react-component'
import { useQuery } from 'react-query'
import { BasePopularPerson } from 'types/interface'
import '@/styles/PersonPage.scss'
import ColumnExplain from '@/components/common/ColumnExplain'
import { useState } from 'react'
import PaginationNumbers from '@/components/search/PaginationNumbers'

const PersonPage = () => {
  const { isValidImage, goActorPage } = useHelper()
  const { t } = useI18nTypes()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery(
    ['person', 'popular', page],
    async () => {
      const response = await BackEnd.getInstance().common.getPopularPerson<
        CommonResponse<BasePopularPerson[]>
      >({
        page,
      })
      return response
    },
    {
      staleTime: Infinity,
      enabled: !!page,
    }
  )
  return (
    <div className="person-page">
      {isLoading ? (
        <PageLoadingSpinner customHeight="100vh" text={t('app.person_page.loading_text')} />
      ) : (
        <>
          <Transition className="person-container">
            {data!.results.map((item) => (
              <div className="person-item" key={item.id}>
                <RatioCardImage
                  imageUrl={isValidImage(item.profile_path)}
                  ratio={1.2}
                  click={() => goActorPage(item.id)}
                />
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
          <PaginationNumbers
            currentPage={page}
            totalPages={data!.total_pages}
            click={(number) => setPage(number)}
          />
        </>
      )}
    </div>
  )
}

export default PersonPage
