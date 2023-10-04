interface SkeletonItemListProps {
  category?: string
  ratio: number
}
const SkeletonItemList = (props: SkeletonItemListProps) => {
  return (
    <div className={`skeleton-item-list ${props.category ?? ''}`}>
      {Array(10)
        .fill(0)
        .map((value, index) => (
          <div key={value + index}>
            <div style={{ paddingTop: `${props.ratio * 100}%`, position: 'relative' }}>
              <div className="skeletonImg"></div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default SkeletonItemList
