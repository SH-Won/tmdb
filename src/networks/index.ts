import CommponAPI from './CommonAPI'
import FetchAPI from './FetchAPI'
import MovieAPI from './MovieAPI'
import TvAPI from './TvAPI'

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
const baseUrl = isMobile()
  ? import.meta.env.VITE_MOVIE_BASE_URL
  : import.meta.env.VITE_MOVIE_BASE_URL
export default class BackEnd extends FetchAPI {
  movie
  tv
  common
  constructor() {
    super(baseUrl)
    this.common = new CommponAPI(this.baseUrl!)
    this.movie = new MovieAPI(this.baseUrl!)
    this.tv = new TvAPI(this.baseUrl!)
  }
  private static instance: BackEnd

  public static getInstance(): BackEnd {
    if (!BackEnd.instance) {
      BackEnd.instance = new BackEnd()
    }
    return BackEnd.instance
  }
}
