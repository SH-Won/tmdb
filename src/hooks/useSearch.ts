import { useCallback, useState } from 'react'

const useSearch = () => {
  const [searchText, setSearchText] = useState<string>('')

  const onChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value)
    },
    [searchText]
  )
  const validatorXSS = (text: string) => {
    if (!text) return true
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9| |]+$/
    if (!regex.test(text)) return false
    return true
  }
  return {
    searchText,
    onChangeText,
    validatorXSS,
  }
}

export { useSearch }
