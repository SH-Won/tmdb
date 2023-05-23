import { useI18nTypes } from '@/hooks'
import { IKeyWord } from '@/types/network/response'
import { BaseItemDetail } from 'types/interface'
import ColumnExplain from '../common/ColumnExplain'
interface Props {
  item: BaseItemDetail
  keywords: IKeyWord[] | undefined
}
const Information = ({ item, keywords }: Props) => {
  const { t } = useI18nTypes()
  return (
    <div className="content-info">
      <h3>사항</h3>
      <div className="info-overview">
        <ColumnExplain
          title={t('app.detail.information.original_title')}
          explain={item.original_title ?? item.original_name}
        />
        <ColumnExplain title={t('app.detail.information.status')} explain={item.status} />
        <ColumnExplain
          title={t('app.detail.information.original_language')}
          explain={item.original_language}
        />
        <ColumnExplain
          title={t('app.detail.information.budget')}
          explain={item.budget ? item.budget.toString() : '-'}
        />
        <div className="keyword-container">
          <strong>{t('app.detail.information.keyword_title')}</strong>
          <div className="keyword-box">
            {keywords && keywords.map((keyword) => <span key={keyword.id}>{keyword.name}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
