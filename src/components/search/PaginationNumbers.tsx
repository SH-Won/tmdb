interface PaginationNumbersProps {
  currentPage: number
  totalPages: number
  click: (id: number) => void
}

const PaginationNumbers = (props: PaginationNumbersProps) => {
  // const MIDDLE_RANGE = 5
  // const START_LIMIT = props.totalPages >= 2 ? 2 : props.totalPages
  // const END_LIMIT = props.totalPages > START_LIMIT + MIDDLE_RANGE + 2 ? 2 : 0

  const START_LIMIT = 3
  const MIDDLE_LIMIT = 6
  const END_LIMIT = 2
  if (props.totalPages <= START_LIMIT + MIDDLE_LIMIT + END_LIMIT) {
    return (
      <div className="pagination-numbers">
        {Array(props.totalPages)
          .fill(1)
          .map((v, i) => v + i)
          .map((number, i) => (
            <div
              key={`page${number}`}
              onClick={() => props.click(number)}
              className={number === props.currentPage ? 'selected' : ''}
            >
              {number}
            </div>
          ))}
      </div>
    )
  }
  const startPageNumbers = Array(START_LIMIT)
    .fill(1)
    .map((v, i) => v + i)
  const middlePageNumbers = Array(MIDDLE_LIMIT)
    .fill(
      props.currentPage - START_LIMIT <= START_LIMIT + 1 // 3
        ? START_LIMIT + 1
        : props.currentPage + END_LIMIT + Math.floor(MIDDLE_LIMIT / 2) >= props.totalPages // 4
        ? props.totalPages - MIDDLE_LIMIT - START_LIMIT + 1 // 6
        : props.currentPage - Math.floor(MIDDLE_LIMIT / 2)
    )
    .map((v, i) => v + i)
  const lastPageNumbers = Array(END_LIMIT)
    .fill(props.totalPages)
    .map((v, i) => v - i)

  return (
    <div className="pagination-numbers">
      {startPageNumbers.map((number, i) => (
        <div
          key={`page${number}`}
          onClick={() => props.click(number)}
          className={number === props.currentPage ? 'selected' : ''}
        >
          {number}
        </div>
      ))}
      {props.currentPage - Math.floor(MIDDLE_LIMIT / 2) > START_LIMIT + 1 && <span>...</span>}
      {middlePageNumbers.map((number, i) => (
        <div
          key={`page${number}`}
          onClick={() => props.click(number)}
          className={number === props.currentPage ? 'selected' : ''}
        >
          {number}
        </div>
      ))}
      {props.totalPages - END_LIMIT - Math.floor(MIDDLE_LIMIT / 2) > props.currentPage && (
        <span>...</span>
      )}
      {lastPageNumbers.reverse().map((number, i) => (
        <div
          key={`page${number}`}
          onClick={() => props.click(number)}
          className={number === props.currentPage ? 'selected' : ''}
        >
          {number}
        </div>
      ))}
    </div>
  )
}

export default PaginationNumbers
