import { useCallback, useState } from 'react'

const useSearch = () => {
  const [searchText, setSearchText] = useState<string>('')

  const onChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value)
    },
    [searchText]
  )
  return {
    searchText,
    onChangeText,
  }
}

export { useSearch }

// useEffect(() => {
//   //
//   setToastInstance(new ToastController(toastState, setToastState))
// }, [])
// console.log(toastState)
// const movieQueries = useQueries([
//   {
//     queryKey: [MOVIE_CATEGORY.prefix, MOVIE_CATEGORY.POPULAR],
//     queryFn: async () => {
//       const response = await BackEnd.getInstance().movie.getMovies<IMovie[]>(
//         MOVIE_CATEGORY.POPULAR
//       )
//       return response.data
//     },
//     onSuccess: (response: any) => {
//       setPopularMovies(response.results)
//     },
//     staleTime: 50000,
//   },
//   {
//     queryKey: [MOVIE_CATEGORY.prefix, MOVIE_CATEGORY.TOP_RATED],
//     queryFn: async () => {
//       const response = await BackEnd.getInstance().movie.getMovies(MOVIE_CATEGORY.TOP_RATED)
//       return response.data
//     },
//     onSuccess: (response: any) => {
//       setTopRatedMovies(response.results)
//     },
//     staleTime: 50000,
//   },
//   {
//     queryKey: [MOVIE_CATEGORY.prefix, MOVIE_CATEGORY.TRENDING],
//     queryFn: async () => {
//       const response = await BackEnd.getInstance().movie.getTrendingMovies<IMovie[]>({
//         media_type: 'all',
//         time_window: 'day',
//       })
//       return response.data
//     },
//     onSuccess: (response: any) => {
//       setTrendingMovies(response.results)
//     },
//     staleTime: 50000,
//   },
// ])
// useEffect(() => {
//   if (!movieQueries.some((query) => query.isLoading)) {
//     setLoading(false)
//   }
// }, [movieQueries])

// if (!isLoading) {
//   console.log(
//     Object.fromEntries(Object.entries(data.results[0]).map(([key, value]) => [key, typeof value]))
//   )
// }
// setLoading(false)
