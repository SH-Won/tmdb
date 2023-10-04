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
