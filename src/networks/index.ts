import FetchAPI from './FetchAPI'
import MovieAPI from './MovieAPI'

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
const baseUrl = isMobile()
  ? import.meta.env.VITE_MOVIE_BASE_URL
  : import.meta.env.VITE_MOVIE_BASE_URL
export default class BackEnd extends FetchAPI {
  movie
  constructor() {
    super(baseUrl)
    this.movie = new MovieAPI(this.baseUrl!)
  }
  private static instance: BackEnd

  public static getInstance(): BackEnd {
    if (!BackEnd.instance) {
      BackEnd.instance = new BackEnd()
    }
    return BackEnd.instance
  }
}
