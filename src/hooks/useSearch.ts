import { useState } from 'react'

const useSearch = () => {
  const [searchText, setSearchText] = useState<string>('')

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }
  return {
    searchText,
    onChangeText,
  }
}

export { useSearch }
