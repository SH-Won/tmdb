import { ItemType } from '@/const/toggleBar'
import BackEnd from '@/networks'
import { MovieResponse } from '@/types/network/response'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { IMovie } from 'types/interface'
import LoadingSpinner from './LoadingSpinner'
import MovieList from './MovieList'
import ToggleBar from './ToggleBar'

interface Props {
  title: string
  toggleItems: ItemType[]
}
const PopularMovie = ({ toggleItems, title }: Props) => {
  const [selectedItem, setSelectedItem] = useState<ItemType>(toggleItems[0])
  const { data, isLoading } = useQuery(
    [selectedItem.id],
    async () => {
      const response = await BackEnd.getInstance().common.getItems<MovieResponse<IMovie[]>>(
        selectedItem?.url
      )
      return response
    },
    {
      staleTime: 30000,
      enabled: !!selectedItem,
    }
  )

  return (
    <div className="list-container">
      <h3>{title}</h3>
      <ToggleBar items={toggleItems} onSelect={setSelectedItem} />
      {/* <LoadingSpinner /> */}
      {isLoading ? <LoadingSpinner /> : <MovieList movies={data!.results} />}
    </div>
  )
}

export default PopularMovie
