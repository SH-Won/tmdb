import { Media } from '@/const/overall'
import { useI18nTypes, useQueryDetail, useQueryKeywords } from '@/hooks'
import { IKeyWord, KeyWordResponse } from '@/types/network/response'
import { PageLoadingSpinner } from 'my-react-component'
import { Suspense } from 'react'
import { BaseItemDetail } from 'types/interface'
import ColumnExplain from '../common/ColumnExplain'
interface Props {
  // item: BaseItemDetail
  // keywords: IKeyWord[] | undefined
  media_type: Media
  id: string
}
const Information = ({ media_type, id }: Props) => {
  const { t } = useI18nTypes()
  const { data: item, isLoading } = useQueryDetail<BaseItemDetail>(media_type, parseInt(id))
  const { data: keyword, isLoading: isKeywordLoading } = useQueryKeywords<KeyWordResponse>(
    media_type,
    parseInt(id)
  )
  const loading = isLoading || isKeywordLoading
  return (
    <div className="content-info">
      <h3>사항</h3>

      {loading ? (
        <PageLoadingSpinner text="정보를 불러오고 있습니다" />
      ) : (
        <div className="info-overview">
          <ColumnExplain
            title={t('app.detail.information.original_title')}
            explain={item!.original_title ?? item!.original_name}
          />
          <ColumnExplain title={t('app.detail.information.status')} explain={item!.status} />
          <ColumnExplain
            title={t('app.detail.information.original_language')}
            explain={item!.original_language}
          />
          <ColumnExplain
            title={t('app.detail.information.budget')}
            explain={item!.budget ? item!.budget.toString() : '-'}
          />
          <div className="keyword-container">
            <strong>{t('app.detail.information.keyword_title')}</strong>
            <div className="keyword-box">
              {keyword &&
                keyword[`${keyword.results ? 'results' : 'keywords'}`]!.map((keyword) => (
                  <span key={keyword.id}>{keyword.name}</span>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Information
