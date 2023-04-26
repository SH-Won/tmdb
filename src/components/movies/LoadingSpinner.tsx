import './styles/LoadingSpinner.scss'
const LoadingSpinner = () => {
  return (
    <div className="movie-list loading">
      {Array(10)
        .fill(0)
        .map((value, index) => (
          <div key={value + index}></div>
        ))}
    </div>
  )
}

export default LoadingSpinner
