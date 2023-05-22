interface PaginationNumbersProps {
  currentPage: number
  totalPages: number
  click: (id: number) => void
}

const PaginationNumbers = (props: PaginationNumbersProps) => {
  const startPageNumbers = Array(2)
    .fill(1)
    .map((v, i) => v + i)
  const middlePageNumbers = Array(5)
    .fill(
      props.currentPage - 2 <= 3
        ? 3
        : props.currentPage + 4 >= props.totalPages
        ? props.totalPages - 4 - 2
        : props.currentPage - 2
    )
    .map((v, i) => v + i)
  const lastPageNumbers = Array(2)
    .fill(props.totalPages)
    .map((v, i) => v - i)
  // 1 2 3 4 5 6 7 8 9 10
  // 1 2 ... 5 6 7 8 9 ... 100 101
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
      {props.currentPage - 2 > 3 && <span>...</span>}
      {middlePageNumbers.map((number, i) => (
        <div
          key={`page${number}`}
          onClick={() => props.click(number)}
          className={number === props.currentPage ? 'selected' : ''}
        >
          {number}
        </div>
      ))}
      {props.totalPages - 4 > props.currentPage && <span>...</span>}
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
