interface PaginationNumbersProps {
  currentPage: number
  totalPages: number
  click: (id: number) => void
}

const PaginationNumbers = (props: PaginationNumbersProps) => {
  const LAST_NUMBER = props.totalPages - props.currentPage - 4 > 0
  const startPageNumbers = Array(props.totalPages >= 2 ? 2 : props.totalPages)
    .fill(1)
    .map((v, i) => v + i)
  const middlePageNumbers = Array(7)
    .fill(props.currentPage - 2 <= 0 ? 3 : props.currentPage)
    .map((v, i) => v + i)
  const lastPageNumbers = Array(props.totalPages - props.currentPage - 4 > 2 ? 2 : 0)
    .fill(props.totalPages)
    .map((v, i) => v - i)
  // 1 2 3 4 5 6 7 8 9 10

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
      {props.currentPage - 3 > 2 && <span>...</span>}
      {middlePageNumbers.map((number, i) => (
        <div
          key={`page${number}`}
          onClick={() => props.click(number)}
          className={number === props.currentPage ? 'selected' : ''}
        >
          {number}
        </div>
      ))}
      {lastPageNumbers.length &&
        lastPageNumbers.map((number, i) => (
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
