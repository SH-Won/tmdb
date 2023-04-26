import React from 'react'
import { BaseItemDetail } from 'types/interface'
interface Props {
  item: BaseItemDetail
}
const Information = ({ item }: Props) => {
  return (
    <div className="content-info">
      <div className="info-overview">
        <div className="explain-box">
          <span>원제</span>
          <span>{item.original_title}</span>
        </div>
        <div className="explain-box">
          <span>상태</span>
          <span>{item.status}</span>
        </div>
        <div className="explain-box">
          <span>원어</span>
          <span>{item.original_language}</span>
        </div>
        <div className="explain-box">
          <span>제작비</span>
          <span>{item.budget ?? '-'}</span>
        </div>
        {/* <div className="explain-box">
          <span>수익</span>
          <span>{item.original_title}</span>
        </div>
        <div className="explain-box">
          <span>키워드</span>
          <span>{item.original_title}</span>
        </div> */}
      </div>
    </div>
  )
}

export default Information
