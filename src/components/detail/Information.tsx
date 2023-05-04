import { IKeyWord } from '@/types/network/response'
import { BaseItemDetail } from 'types/interface'
import ColumnExplain from '../common/ColumnExplain'
interface Props {
  item: BaseItemDetail
  keywords: IKeyWord[] | undefined
}
const Information = ({ item, keywords }: Props) => {
  return (
    <div className="content-info">
      <h3>사항</h3>
      <div className="info-overview">
        <ColumnExplain title="원제" explain={item.original_title ?? item.original_name} />
        <ColumnExplain title="상태" explain={item.status} />
        <ColumnExplain title="원어" explain={item.original_language} />
        <ColumnExplain title="제작비" explain={item.budget ? item.budget.toString() : '-'} />
        <div className="keyword-container">
          <strong>키워드</strong>
          <div className="keyword-box">
            {keywords && keywords.map((keyword) => <span key={keyword.id}>{keyword.name}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
