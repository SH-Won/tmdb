import { KeyWordResponse } from '@/types/network/response'
import { BaseItemDetail } from 'types/interface'
import ColumnExplain from '../common/ColumnExplain'
interface Props {
  item: BaseItemDetail
  keywords: KeyWordResponse['keywords']
}
const Information = ({ item, keywords }: Props) => {
  console.log(keywords)
  return (
    <div className="content-info">
      <h3>사항</h3>
      <div className="info-overview">
        {/* <div className="explain-box">
          <span>원제</span>
          <span>{item.original_title}</span>
        </div> */}
        <ColumnExplain title="원제" explain={item.original_title} />
        <ColumnExplain title="상태" explain={item.status} />
        <ColumnExplain title="원어" explain={item.original_language} />
        <ColumnExplain title="제작비" explain={item.budget.toString() ?? '-'} />
        {/* <div className="explain-box">
          <span>수익</span>
          <span>{item.original_title}</span>
        </div>
        <div className="explain-box">
          <span>키워드</span>
          <span>{item.original_title}</span>
        </div> */}
        <div className="keyword-container">
          <strong>키워드</strong>
          <div className="keyword-box">
            {keywords.map((keyword) => (
              <span key={keyword.id}>{keyword.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
